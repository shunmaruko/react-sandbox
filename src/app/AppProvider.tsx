import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

import { MainErrorFallback } from "@/components/Error";

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
        <HelmetProvider>{children}</HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppPrivider;
