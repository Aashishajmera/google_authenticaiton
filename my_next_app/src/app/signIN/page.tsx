"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use for redirection

const SignIn = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user exists in localStorage for custom email/password login
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Get the existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("userlist") || "[]");

    // Check if the user exists and password matches
    const user = existingUsers.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (user) {
      // Redirect to home page if user exists
      router.push("/home"); // Change "/home" to your actual home page route
    } else {
      // Show error if the user does not exist or password is wrong
      setError("Invalid email or password");
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    const existingUsers = JSON.parse(localStorage.getItem("userlist") || "[]");

    const userExists = existingUsers.find(
      (user: { email: string }) => user.email === session?.user?.email
    );

    if (userExists) {
    //   router.push("/"); // Redirect to home if user exists
    } else {
      setError("User does not exist in our records.");
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      handleGoogleSignIn();
    }
  }, [status, session]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4">
          <p className="text-center text-sm text-gray-500">Or sign in with</p>
          <button
            onClick={() => signIn("google")}
            className="w-full mt-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Sign In with Google
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signUP" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
