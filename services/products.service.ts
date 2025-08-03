// Redux hook to dispatch actions
import { useDispatch } from "react-redux";

// React hooks for state and memoization
import { useState, useCallback } from "react";

// Apollo Client instance to perform GraphQL requests
import { client } from "@/graphql/client";

// Redux action to set products in store
import { setProducts } from "@/Redux/slices/productsSlice";

// GraphQL queries for product detail and product list
import { GET_PRODUCT_DETAIL, GET_PRODUCTS } from "@/graphql/queries";

// TypeScript type for Product
import { Product } from "@/app/product/types";

// Custom hook to fetch product details using a slug
export const useGetProductDetail = () => {
  // Local state for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // Local state for any error message
  const [error, setError] = useState<string | undefined>(undefined);

  // Memoized function to fetch product detail
  const fetchProduct = useCallback(async (variables: { slug: string }) => {
    setIsLoading(true); // Indicate loading started
    setError(undefined); // Reset error before request
    try {
      // Execute GraphQL query with variables and force fresh fetch
      const { data, loading, errors } = await client.query({
        query: GET_PRODUCT_DETAIL,
        variables: {
          slug: variables.slug,
          channel: "online-inr",
        },
        fetchPolicy: "network-only",
      });

      setIsLoading(loading); // Update loading state

      if (errors && errors.length > 0) {
        setError(errors[0].message || "Unknown error"); // Capture GraphQL errors
      }

      return { data, loading, error: errors };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Handle network or other errors
      setError(err?.message ?? "Error fetching product details");
      setIsLoading(false);
      return { data: null, loading: false, error: err };
    }
  }, []);

  // Return fetch function along with loading and error states
  return { fetchProduct, isLoading, error };
};

// Custom hook to fetch a list of products and update Redux store
export const useGetProducts = () => {
  const dispatch = useDispatch(); // Redux dispatch function

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | undefined>(undefined); // Error state

  // Memoized function to fetch products list
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      // Execute GraphQL query to get products, force fresh fetch
      const { data, loading, errors } = await client.query({
        query: GET_PRODUCTS,
        fetchPolicy: "network-only",
      });

      setIsLoading(loading);

      if (errors && errors.length > 0) {
        setError(errors[0].message || "Unknown error");
      } else if (data?.products?.edges?.length) {
        // Map product edges to array with added thumbnail field
        const products: Product[] = data.products.edges.map(
          (edge: { node: Product }) => ({
            ...edge.node,
            thumbnail: edge.node?.media?.[0]?.url,
          })
        );

        // Create lookup map of products by ID
        const ProductById: Record<string, Product> = {};
        for (const product of products) {
          ProductById[product.id] = { ...product };
        }
        // Update Redux store with products list and map
        dispatch(setProducts({ list: products, ProductById }));
        return { data: products, loading, error: errors };
      } else {
        // Clear products if none found
        dispatch(setProducts({ list: [], ProductById: {} }));
      }

      return { loading, error: errors };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Handle errors during fetch
      setError(err.message ?? "Error fetching products");
      setIsLoading(false);
      return { data: null, loading: false, error: err };
    } finally {
      setIsLoading(false); // Ensure loading state reset
    }
  }, [dispatch]);

  // Return fetch function and associated states
  return { fetchProducts, isLoading, error };
};
