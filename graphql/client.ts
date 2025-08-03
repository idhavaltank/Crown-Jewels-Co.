import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_API_ENDPOINT = process.env.NEXT_GRAPHQL_API_ENDPOINT;

console.log({ GRAPHQL_API_ENDPOINT });
export const client = new ApolloClient({
  uri: process.env.NEXT_GRAPHQL_API_ENDPOINT || "https://saleor.kombee.co.in/graphql/",
  cache: new InMemoryCache(),
});
