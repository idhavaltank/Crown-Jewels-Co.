import { gql } from "@apollo/client";

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


export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      status
      total
    }
  }
`;
