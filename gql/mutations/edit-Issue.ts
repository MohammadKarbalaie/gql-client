import { gql } from "@apollo/client";

export const EditIssueMutation = gql`
  mutation EditIssue($input: EditIssueInput!) {
    editIssue(input: $input) {
      status
      name
      content
    }
  }
`;
