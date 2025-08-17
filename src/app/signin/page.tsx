"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked:
      "This email is already linked to another sign-in method. Please use the same provider you used originally.",
    AccessDenied: "You do not have permission to sign in.",
    Configuration: "There is a problem with the server configuration.",
    default: "An unexpected error occurred. Please try again.",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Sign In</h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to manage your portfolio content.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
            {errorMessages[error] || errorMessages.default}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/admin" })}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FaGithub size={20} /> Sign in with GitHub
          </button>

          <button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full flex items-center justify-center gap-3 bg-red-600 text-white py-3 rounded-lg hover:bg-red-500 transition"
          >
            <FaGoogle size={20} /> Sign in with Google
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          You must be an authorized admin to access the dashboard.
        </p>
      </div>
    </div>
  );
}
