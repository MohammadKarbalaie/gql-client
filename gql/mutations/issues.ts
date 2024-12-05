import { gql } from "@apollo/client";

export const CreateIssueMutaion = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      createdAt
    }
  }
`;
