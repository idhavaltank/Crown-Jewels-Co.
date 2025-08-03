import { useDispatch } from "react-redux";

import { client } from "@/graphql/client";

import { setProducts } from "@/Redux/slices/productsSlice";

import { GET_PRODUCT_DETAIL, GET_PRODUCTS } from "@/graphql/queries";

import { Product } from "@/app/product/types";

export const useGetProductDetail = () => {
  let isLoading = false;
  let hasError = undefined;
  const fetchProduct = async (variables: { slug: string }) => {
    const { data, loading, error } = await client.query({
      query: GET_PRODUCT_DETAIL,
      variables: {
        slug: variables?.slug,
        channel: "online-inr",
      },
    });
    isLoading = loading;
    hasError = error?.message;
    return { data, loading, error };
  };

  return { fetchProduct, isLoading, error: hasError };
};

export const useGetProducts = () => {
  let isLoading = false;
  let hasError: string | undefined = undefined;
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    isLoading = true;
    const { data, loading, error } = await client.query({
      query: GET_PRODUCTS,
    });

    hasError = error ? error.message : undefined;

    if (data?.products?.edges?.length) {
      // Extract product nodes from edges
      const products: Product[] = data.products.edges.map(
        (edge: { node: Product }) => ({
          ...edge.node,
          thumbnail: edge.node?.media[0]?.url,
        })
      );
      const ProductById = {};

      for (const product of products) {
        const id = product.id;
        const thumbnail = product?.thumbnail;
        Object.assign(ProductById, {
          [id]: { ...product, ...(thumbnail && { thumbnail }) },
        });
      }
      isLoading = false;
      dispatch(setProducts({ list: products, ProductById }));

      return { data: products, loading, error };
    }
    return { loading, error };
  };

  return { fetchProducts, isLoading, error: hasError };
};
