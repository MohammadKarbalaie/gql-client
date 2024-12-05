"use client";

import { graphqlClient } from "@/gql/client";
import { ApolloProvider as DefaultApolloProvider } from "@apollo/client";

export const ApolloProvider: React.FC<IChildren> = ({ children }) => {
  return (
    <DefaultApolloProvider client={graphqlClient}>
      {children}
    </DefaultApolloProvider>
  );
};
