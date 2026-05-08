import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

// Export the router instance directly
export const router = createRouter({
  routeTree,
  context: { queryClient },
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}