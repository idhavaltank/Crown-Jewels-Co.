import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://saleor.kombee.co.in/graphql/",
  cache: new InMemoryCache(),
});
