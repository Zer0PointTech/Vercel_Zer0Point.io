import { useCallback, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

type User = {
  name: string;
  email: string;
} | null;

// Simplified auth hook for Vercel deployment (no auth required for this site)
export function useAuth(_options?: UseAuthOptions) {
  const logout = useCallback(async () => {
    // No-op for this site
  }, []);

  const state = useMemo(() => {
    return {
      user: null as User,
      loading: false,
      error: null as Error | null,
      isAuthenticated: false,
    };
  }, []);

  return {
    ...state,
    refresh: () => Promise.resolve(),
    logout,
  };
}
