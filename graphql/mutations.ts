import { gql } from "@apollo/client";

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
