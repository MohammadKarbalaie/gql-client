import { gql } from "@apollo/client";

export const fetchIssuesQuery = gql`
  query Issues {
    issues {
      content
      id
      name
      status
      userId
    }
  }
`;
