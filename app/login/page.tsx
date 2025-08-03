"use client";

// 1. React and related libraries
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

// 2. Styles
import "./login.css";

// 3. Components
import FormInput from "@/components/FormInput";
import Spinner from "@/components/Icons/Spinner";

// 4. Contexts
import { useAuth } from "@/contexts/AuthContext";

// 5. Types
import { LoginFormType } from "./types";

// 6. Constants / Config
import { PRIVATE_NAVIGATION } from "@/constants";
import { initialLoginValues } from "./constants";

// 7. GraphQL mutations
import { TOKEN_CREATE } from "@/graphql/mutations";

const LoginPage = () => {
  // 2. Variables / state
  const { login } = useAuth();
  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [formValues, setFormValues] =
    useState<LoginFormType>(initialLoginValues);

  // Apollo mutation hook for creating token on login
  const [tokenCreate, { loading }] = useMutation(TOKEN_CREATE, {
    onCompleted: (data) => {
      const tokenData = data.tokenCreate;
      if (tokenData.errors && tokenData.errors.length > 0) {
        setError(tokenData.errors[0].message);
      } else if (tokenData.token) {
        login(tokenData);
        router.push(PRIVATE_NAVIGATION.PRODUCT.VIEW);
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // 3. No useEffect hooks needed

  // 4. Functions

  // Handle form submission for login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { email, password } = formValues;

    // Basic front-end validation for presence of email and password
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Call Apollo mutation with email and password variables
    tokenCreate({ variables: { email, password } });
  };

  // 5. Return JSX layout
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-lg shadow max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-text mb-6 text-center">Login</h2>

        {/* Email Input */}
        <FormInput
          inputProps={{
            type: "email",
            placeholder: "Email",
            value: formValues?.email,
            onChange: (e) =>
              setFormValues((prev) => ({ ...prev, email: e.target.value })),
            required: true,
          }}
          label="Email"
        />

        {/* Password Input */}
        <FormInput
          inputProps={{
            type: "password",
            placeholder: "Enter Password",
            value: formValues?.password,
            onChange: (e) =>
              setFormValues((prev) => ({ ...prev, password: e.target.value })),
            required: true,
          }}
          label="Password"
        />

        {/* Submit Button - shows Spinner when loading */}
        <button
          type="submit"
          className="bg-cta w-full hover:bg-primary text-background font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-highlight"
        >
          {loading ? (
            <>
              <Spinner />
              Login
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Error message display */}
        {error && <p className="text-error mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
