// Import ApolloClient and InMemoryCache from Apollo Client library
import { ApolloClient, InMemoryCache } from "@apollo/client";

// Create and export an instance of ApolloClient configured with:
// - uri: The GraphQL API endpoint taken from environment variables
// - cache: An instance of InMemoryCache to cache query results for optimization
export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache(),
});
