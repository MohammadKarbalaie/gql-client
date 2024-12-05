"use client";

import { useQuery } from "@apollo/client";
import { fetchIssuesQuery } from "@/gql/queries/issues";

export const IssuesListContainer: React.FC = () => {
  const { loading, error, data } = useQuery<{ issues: Array<Issue> }>(
    fetchIssuesQuery
  );

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(data?.issues);
  return (
    <div>
      {(data?.issues || []).map((el, index) => (
        <div key={index}>{el.content}</div>
      ))}
    </div>
  );
};
