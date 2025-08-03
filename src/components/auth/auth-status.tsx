"use client";

import { useAuth } from "@/contexts/auth-context";

export function AuthStatus() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-sm text-gray-500">Checking auth...</div>;
  }

  return (
    <div className="text-sm text-gray-500">
      {isAuthenticated ? (
        <span className="text-green-600">
          ✓ Logged in as {user?.firstName} {user?.lastName}
        </span>
      ) : (
        <span className="text-red-600">✗ Not authenticated</span>
      )}
    </div>
  );
}
