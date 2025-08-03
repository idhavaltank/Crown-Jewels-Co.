"use client";

// 1. React and related libraries
import React, { useEffect, useState } from "react";

// 2. Styles
import "./products.css";

// 3. Components
import ProductCard from "@/components/ProductCard";

// 4. Types
import { Product } from "./types";

// 5. Services / hooks
import { useGetProducts } from "@/services/products.service";

const ProductsPage = () => {
  // 2. Variables / state
  const { fetchProducts, error, isLoading } = useGetProducts();
  const [products, setProducts] = useState<Product[]>([]);

  // 4. Functions

  // Load products asynchronously and update state accordingly
  const loadProducts = async () => {
    const { data, error } = await fetchProducts();
    if (data?.length) {
      setProducts(data);
    } else if (error) {
      setProducts([]);
    }
  };

  // 3. useEffect - to load products on component mount only
  useEffect(() => {
    loadProducts();
    // disabling linter to avoid warning, as fetchProducts is stable or memoized
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 5. Return JSX render logic

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
