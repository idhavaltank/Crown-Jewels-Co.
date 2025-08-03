"use client";

import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

import "./globals.css";
// import "../styles/base.css";

import { client } from "@/graphql/client";

import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { store } from "@/Redux/store";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <AuthProvider>
              <CartProvider>
                <div className="root">
                  <Header />
                  {children}
                  <Footer />
                </div>
              </CartProvider>
            </AuthProvider>
          </ApolloProvider>
        </Provider>
      </body>
    </html>
  );
}
