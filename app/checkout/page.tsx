"use client";

// 1. React and related libraries
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// 2. Styles
import "./checkout.css";

// 3. Contexts
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

// 4. GraphQL queries/mutations
import { CREATE_ORDER_MUTATION } from "@/graphql/queries";

// 5. Components
import CartItemRow from "@/components/CartItemRow";
import FeedBackToast from "@/components/FeedBackToast";
import FormInput from "@/components/FormInput";
import OrderButton from "@/components/OrderButton";

// 6. Constants / types
import { PRIVATE_NAVIGATION, PUBLIC_NAVIGATION } from "@/constants";
import { FORM_FIELDS, initialShippingAddressValues } from "./constants";
import { AddressType, ToastMessageType } from "./types";


const CheckoutPage = () => {
  // 2. Variables / state

  // Cart and user auth context data
  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();

  // Next.js router for navigation
  const router = useRouter();

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  // Shipping address form data state
  const [shippingAddress, setShippingAddress] = useState<AddressType>(
    initialShippingAddressValues
  );

  // Form field validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Toast messages for user feedback
  const [toastMessage, setToastMessage] = useState<ToastMessageType | null>(
    null
  );

  // Apollo mutation hook for creating order
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER_MUTATION);

  // 3. No useEffect hooks needed in this component

  // 4. Functions

  // Update a single shipping address input field and clear its error if any
  const updateAddressField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  // Validate required fields and postal code format in the shipping address form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    FORM_FIELDS.forEach(({ name, required }) => {
      const val = shippingAddress[name]?.trim() ?? "";
      if (required && !val) {
        errors[name] = "This field is required.";
      }
      // Simple postal code regex validation for US ZIP codes (5 digit or 5+4)
      if (name === "postalCode" && val && !/^\d{5}(-\d{4})?$/.test(val)) {
        errors[name] = "Invalid postal code format.";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submit handler for placing an order
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check authentication
    if (!token) {
      setToastMessage({
        type: "error",
        text: "Please login to continue.",
      });
      router.push(PUBLIC_NAVIGATION.LOGIN);
      return;
    }

    // Check if cart is empty
    if (cartItems.length === 0) {
      setToastMessage({ type: "error", text: "Your cart is empty." });
      router.push(PRIVATE_NAVIGATION.PRODUCT.VIEW);
      return;
    }

    // Validate form fields before proceeding
    if (!validateForm()) {
      setToastMessage({
        type: "error",
        text: "Please fix the errors in the form before continuing.",
      });
      return;
    }

    try {
      // Prepare order input payload
      const input = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
      };

      // Create order via GraphQL
      const { data } = await createOrder({ variables: { input } });

      if (data?.createOrder) {
        setToastMessage({
          type: "success",
          text: `Order placed successfully! Order ID: ${data.createOrder.id}`,
        });
        clearCart(); // clear cart after order placed

        // Redirect to product view page after 2 seconds
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

  // 5. Return JSX
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 max-w-full my-12 px-4">
      {/* Order Summary Section */}
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

      {/* Checkout Form Section */}
      <section className="flex-1 bg-card rounded-lg border border-border p-6 shadow max-w-md w-full">
        <h1 className="text-3xl font-semibold text-text mb-6">Checkout</h1>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* Shipping Address Inputs */}
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

          {/* Payment Method Selection */}
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

          {/* Submit / Order Button */}
          <OrderButton loading={loading} type="submit" />

          {/* Toast message for feedback */}
          {toastMessage && (
            <FeedBackToast
              type={toastMessage.type}
              message={toastMessage.text}
              onClose={() => setToastMessage(null)}
            />
          )}

          {/* GraphQL error display (if any, and no toast message currently) */}
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
