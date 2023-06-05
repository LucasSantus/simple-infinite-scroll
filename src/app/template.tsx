"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IRootTemplateProps {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: IRootTemplateProps) {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
