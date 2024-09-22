"use client";
import React, { useState } from "react";
import Link from "next/link"; // Importing Link from next.js for navigation
import { useRouter } from "next/navigation";

// Defining a type for form data
interface SignUpFormData {
  email: string;
  username: string;
  password: string;
}

const SignUp: React.FC = () => {

    const router = useRouter()

  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handling input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation logic
  const validate = (): boolean => {
    const newErrors: Partial<SignUpFormData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (validate()) {
      // Get the current user list from localStorage (or create an empty array)
      const existingUsers = JSON.parse(localStorage.getItem("userlist") || "[]");

      // Add the new user data
      const newUser = {
        email: formData.email,
        username: formData.username,
        password: formData.password, // You may want to hash the password in a real-world app
      };

      // Update the userlist in localStorage
      localStorage.setItem("userlist", JSON.stringify([...existingUsers, newUser]));

      // Show success message and clear the form
      setSuccessMessage("User registered successfully!");
      setFormData({ email: "", username: "", password: "" });
      setErrors({});

      router.push("/signIN");

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Sign In */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="signIN" className="text-indigo-600 hover:text-indigo-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
