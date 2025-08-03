"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./login.css";
import FormInput from "@/components/FormInput";
import { useAuth } from "@/contexts/AuthContext";

import { LoginFormType } from "./types";

import { PRIVATE_NAVIGATION } from "@/constants";
import { initialLoginValues } from "./constants";
import Spinner from "@/components/Icons/Spinner";

import { TOKEN_CREATE } from "@/graphql/mutations";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [formValues, setFormValues] =
    useState<LoginFormType>(initialLoginValues);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { email, password } = formValues;
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    tokenCreate({ variables: { email, password } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-lg shadow max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-text mb-6 text-center">Login</h2>

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
        {error && <p className="text-error mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
