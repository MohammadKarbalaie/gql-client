import { gql } from "@apollo/client";

export const DeleteIssueMutation = gql`
  mutation DeleteIssue($deleteIssueId: ID!) {
    deleteIssue(id: $deleteIssueId)
  }
`;
