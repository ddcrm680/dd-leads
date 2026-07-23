"use client";

import { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import Logo from "../../images/favicon_io/android-chrome-512x512.png";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-lg p-8">
        {/* Logo */}

        <div className="flex justify-center mb-5">
          <img
            src={Logo}
            alt="Lead CRM Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Heading */}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Lead CRM</h1>

          <p className="text-muted-foreground mt-2">Sign in to continue</p>
        </div>

        {/* Email */}

        <div className="mb-5">
          <label className="text-sm font-medium mb-2 block">Email</label>

          <div className="flex items-center rounded-xl border border-border px-4 h-12 focus-within:ring-2 focus-within:ring-primary">
            {/* <FiMail className="text-muted-foreground mr-3" /> */}

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Password */}

        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Password</label>

          <div className="flex items-center rounded-xl border border-border px-4 h-12 focus-within:ring-2 focus-within:ring-primary">
            {/* <FiLock className="text-muted-foreground mr-3" /> */}

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* {showPassword ? (
                <FiEyeOff className="text-muted-foreground" />
              ) : (
                <FiEye className="text-muted-foreground" />
              )} */}
            </button>
          </div>
        </div>

        {/* Button */}

        <button className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
          Sign In
        </button>

        {/* Footer */}

        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 Lead CRM
        </p>
      </div>
    </div>
  );
}
