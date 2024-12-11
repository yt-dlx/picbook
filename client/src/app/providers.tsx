// app/providers.tsx
"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}