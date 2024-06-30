import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

import { AuthLoader } from "@/lib/auth";
import { queryClient } from "@/lib/react-query";
import { MainErrorFallback } from "@/components/error";

type AppProviderProps = {
  children: React.ReactNode;
};

//TODO: make this more rich UI
const Loading = () => {
  return <h2>🌀 Loading...</h2>;
};

const AppPrivider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AuthLoader renderLoading={() => <>Loading ...</>}>
              {children}
            </AuthLoader>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppPrivider;
