import { gql } from "@apollo/client";

export const signinMutation = gql`
  mutation Signin($input: AuthInput!) {
    signin(input: $input) {
      id
      token
    }
  }
`;