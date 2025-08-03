// 1. Import gql tagged template literal to write GraphQL operations
import { gql } from "@apollo/client";

// 2. GraphQL query to fetch first 10 products filtered by attribute "color" = "white-gold"
export const GET_PRODUCTS = gql`
  query GetFilteredProducts {
    products(
      first: 10
      channel: "online-inr"
      filter: { attributes: [{ slug: "color", values: ["white-gold"] }] }
    ) {
      edges {
        node {
          id
          name
          variants {
            id
            name
            sku
          }
          media {
            url
          }
        }
      }
    }
  }
`;

// 3. GraphQL query to fetch detailed information about a single product by id or slug and channel
export const GET_PRODUCT_DETAIL = gql`
  query GetProduct($id: ID, $slug: String, $channel: String) {
    product(id: $id, slug: $slug, channel: $channel) {
      id
      name
      slug
      description
      seoTitle
      seoDescription
      defaultVariant {
        id
        name
        sku
        pricing {
          priceUndiscounted {
            gross {
              amount
              currency
            }
          }
          price {
            gross {
              amount
              currency
            }
          }
        }
      }
      variants {
        id
        name
        sku
        pricing {
          price {
            gross {
              amount
              currency
            }
          }
        }
        attributes {
          attribute {
            id
            name
          }
          values {
            id
            name
          }
        }
      }
      media {
        id
        url
        alt
        type
      }
      attributes {
        attribute {
          id
          name
        }
        values {
          id
          name
        }
      }
      category {
        id
        name
        slug
      }
      productType {
        id
        name
      }
      isAvailableForPurchase
      availableForPurchase
    }
  }
`;

// 4. GraphQL mutation to create an order given an input data structure
export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      status
      total
    }
  }
`;
