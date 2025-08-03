import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_API_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT;

console.log({ GRAPHQL_API_ENDPOINT });
export const client = new ApolloClient({
  uri: GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache(),
});
