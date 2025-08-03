import { ApolloClient, InMemoryCache } from "@apollo/client";

// const GRAPHQL_API_ENDPOINT = process.env.GRAPHQL_API_ENDPOINT;

// console.log({ GRAPHQL_API_ENDPOINT });
export const client = new ApolloClient({
  uri: "https://saleor.kombee.co.in/graphql/",
  cache: new InMemoryCache(),
});
