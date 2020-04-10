import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
  }
}

export function apollo(
  {
    fetch,
    ssrMode,
    headers,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { fetch?: any; ssrMode: boolean; headers?: any } = {
    ssrMode: false,
  }
): ApolloClient<NormalizedCacheObject> {
  const cache = new InMemoryCache();
  if (typeof window !== "undefined" && window.__APOLLO_STATE__) {
    // https://www.apollographql.com/docs/react/performance/server-side-rendering/#store-rehydration
    cache.restore(window.__APOLLO_STATE__);
  }

  const link = new HttpLink({
    uri: "http://localhost:9002/graphql",
    credentials: "same-origin",
    headers,
    fetch,
  });

  return new ApolloClient({
    cache,
    link,
    ssrMode,
  });
}
