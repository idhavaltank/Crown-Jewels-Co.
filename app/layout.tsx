"use client";

// 1. React and related libraries imports
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

// 2. Styles imports
import "./globals.css";

// 3. GraphQL client
import { client } from "@/graphql/client";

// 4. Context providers
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// 5. Redux store
import { store } from "@/Redux/store";

// 6. Components
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

// Props definition and function component
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        {/* Redux store provider to enable global state management */}
        <Provider store={store}>
          {/* Apollo client provider to enable GraphQL queries */}
          <ApolloProvider client={client}>
            {/* Authentication context provider */}
            <AuthProvider>
              {/* Shopping cart context provider */}
              <CartProvider>
                <div className="root">
                  {/* Layout header */}
                  <Header />
                  {/* Render child components */}
                  {children}
                  {/* Layout footer */}
                  <Footer />
                </div>
              </CartProvider>
            </AuthProvider>
          </ApolloProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
