// Import gql tagged template literal for writing GraphQL queries/mutations
import { gql } from "@apollo/client";

// Define and export the TOKEN_CREATE GraphQL mutation using gql
export const TOKEN_CREATE = gql`
  mutation TokenCreate($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      user {
        email
        isStaff
        userPermissions {
          code
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
