import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export function getApolloClient(headers?: Record<string, string>) {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_BACKEND_URL || 'http://localhost:8000/graphql/',
    headers, // Pass headers directly
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { errorPolicy: 'all' },
      query: { errorPolicy: 'all' },
    },
  });
}