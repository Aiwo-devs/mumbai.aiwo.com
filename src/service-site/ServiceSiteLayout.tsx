import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.css";

const queryClient = new QueryClient();

export function ServiceSiteLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="service-site">{children}</div>
    </QueryClientProvider>
  );
}
