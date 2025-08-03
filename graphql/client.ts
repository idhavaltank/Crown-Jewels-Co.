import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache(),
});
