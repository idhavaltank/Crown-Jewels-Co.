"use client";

import React, { useEffect, useState } from "react";

import "./products.css";

import ProductCard from "@/components/ProductCard";

import { Product } from "./types";

import { useGetProducts } from "@/services/products.service";

const ProductsPage = () => {
  const { fetchProducts, error, isLoading } = useGetProducts();
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const { data, error } = await fetchProducts();
    if (data?.length) {
      setProducts(data);
    } else if (error) {
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <p className="text-center mt-10" role="status" aria-live="polite">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="text-center mt-10 text-red-600"
        role="alert"
        aria-live="assertive"
      >
        Error: {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center mt-10" role="status" aria-live="polite">
        No products available.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product: Product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsPage;
