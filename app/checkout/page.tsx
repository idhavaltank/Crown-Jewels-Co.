"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import "./checkout.css";

import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

import { CREATE_ORDER_MUTATION } from "@/graphql/queries";

import FormInput from "@/components/FormInput";
import OrderButton from "@/components/OrderButton";
import FeedBackToast from "@/components/FeedBackToast";

import { FORM_FIELDS, initialShippingAddressValues } from "./constants";
import { AddressType } from "./types";
import { PRIVATE_NAVIGATION, PUBLIC_NAVIGATION } from "@/constants";
import CartItemRow from "@/components/CartItemRow";

type ToastMessageType = {
  type: "success" | "error" | "info";
  text: string;
};

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [shippingAddress, setShippingAddress] = useState<AddressType>(
    initialShippingAddressValues
  );

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [toastMessage, setToastMessage] = useState<ToastMessageType | null>(
    null
  );

  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER_MUTATION);

  // Update input fields and clear specific errors
  const updateAddressField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  // Validate required fields and postal code format
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    FORM_FIELDS.forEach(({ name, required }) => {
      const val = shippingAddress[name]?.trim() ?? "";
      if (required && !val) {
        errors[name] = "This field is required.";
      }
      if (name === "postalCode" && val && !/^\d{5}(-\d{4})?$/.test(val)) {
        errors[name] = "Invalid postal code format.";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit order handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setToastMessage({
        type: "error",
        text: "Please login to continue.",
      });
      router.push(PUBLIC_NAVIGATION.LOGIN);
      return;
    }

    if (cartItems.length === 0) {
      setToastMessage({ type: "error", text: "Your cart is empty." });
      router.push(PRIVATE_NAVIGATION.PRODUCT.VIEW);
      return;
    }

    if (!validateForm()) {
      setToastMessage({
        type: "error",
        text: "Please fix the errors in the form before continuing.",
      });
      return;
    }

    try {
      const input = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
      };

      const { data } = await createOrder({ variables: { input } });

      if (data?.createOrder) {
        setToastMessage({
          type: "success",
          text: `Order placed successfully! Order ID: ${data.createOrder.id}`,
        });
        clearCart();
        setTimeout(() => {
          router.push(PRIVATE_NAVIGATION.PRODUCT.VIEW);
        }, 2000);
      }
    } catch {
      setToastMessage({
        type: "error",
        text: "Failed to place the order. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 max-w-full my-12 px-4">
      {/* Order Summary */}
      <section className="flex-1 border rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        <ul>
          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            cartItems.map(({ productId, name, thumbnailUrl, quantity }) => (
              <CartItemRow
                key={productId}
                productId={productId}
                quantity={quantity}
                name={name}
                thumbnailUrl={thumbnailUrl}
              />
            ))
          )}
        </ul>
      </section>

      {/* Checkout Form */}
      <section className="flex-1 bg-card rounded-lg border border-border p-6 shadow max-w-md w-full">
        <h1 className="text-3xl font-semibold text-text mb-6">Checkout</h1>
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Shipping Address
            </h2>
            {FORM_FIELDS.map(({ label, name, required, placeHolder }) => (
              <div key={name} className="mb-4">
                <FormInput
                  label={label}
                  error={formErrors[name]}
                  inputProps={{
                    id: name,
                    type: "text",
                    name,
                    value: shippingAddress[name],
                    onChange: updateAddressField,
                    placeholder: placeHolder,
                    required,
                    "aria-invalid": !!formErrors[name],
                    "aria-describedby": formErrors[name]
                      ? `${name}-error`
                      : undefined,
                    className: `w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                      formErrors[name]
                        ? "border-error focus:ring-error"
                        : "border-border focus:ring-primary"
                    } text-text`,
                  }}
                />
                {formErrors[name] && (
                  <p
                    id={`${name}-error`}
                    className="mt-1 text-sm text-error"
                    role="alert"
                    aria-live="assertive"
                  >
                    {formErrors[name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Payment Method
            </h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-3 border border-border rounded text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              aria-label="Select payment method"
              disabled={loading}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          {/* Submit Button */}
          <OrderButton loading={loading} type="submit" />

          {/* Toast Message */}
          {toastMessage && (
            <FeedBackToast
              type={toastMessage.type}
              message={toastMessage.text}
              onClose={() => setToastMessage(null)}
            />
          )}

          {/* GraphQL Error Display */}
          {error && !toastMessage && (
            <p
              className="text-error mt-4 text-center"
              role="alert"
              aria-live="assertive"
            >
              Error: {error.message}
            </p>
          )}
        </form>
      </section>
    </div>
  );
};

export default CheckoutPage;
