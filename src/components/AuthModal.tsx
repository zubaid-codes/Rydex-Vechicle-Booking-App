"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lock, Mail, User, X } from "lucide-react";
import Image from "next/image";

type propType = {
  open: boolean;
  onClose: () => void;
};

type stepType = "login" | "signup" | "otp";

function AuthModal({ open, onClose }: propType) {
  const [step, setStep] = useState<stepType>("login");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-xl flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-md"
            >
              {/* Glass Card */}
              <div className="relative rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-7 sm:p-8 text-white">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-300 hover:text-white transition"
                >
                  <X />
                </button>

                {/* Branding */}
                <div className="mb-7 text-center">
                  <h1 className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    RYDEX
                  </h1>
                  <p className="mt-1 text-xs text-gray-300">
                    Premium Vehicle Booking
                  </p>
                </div>

                {/* Google Button */}
                <button className="w-full h-11 rounded-xl bg-white text-black flex items-center justify-center gap-3 text-sm font-semibold hover:scale-[1.03] active:scale-[0.98] transition">
                  <Image
                    src={"/google.png"}
                    alt="Google"
                    width={18}
                    height={18}
                  />
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-gray-300">OR</span>
                  <div className="flex-1 h-px bg-white/20" />
                </div>

                {/* FORM */}
                {step === "login" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-xl font-semibold">Welcome back 👋</h2>

                    <div className="mt-5 space-y-4">
                      {/* Email */}
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 focus-within:border-cyan-400 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition">
                        <Mail size={18} className="text-gray-300" />
                        <input
                          type="email"
                          placeholder="example@gmail.com"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>

                      {/* Password */}
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 focus-within:border-cyan-400 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition">
                        <Lock size={18} className="text-gray-300" />
                        <input
                          type="password"
                          placeholder="Enter your password"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>

                      {/* Login Button */}
                      <button className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg">
                        Login
                      </button>
                    </div>

                    {/* Switch */}
                    <p className="mt-6 text-center text-sm text-gray-300">
                      Don’t have an account?{" "}
                      <span
                        onClick={() => setStep("signup")}
                        className="text-white font-semibold cursor-pointer hover:underline"
                      >
                        Sign up
                      </span>
                    </p>
                  </motion.div>
                )}

                {step === "signup" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-xl font-semibold">Create Account</h2>

                    <div className="mt-5 space-y-4">
                      {/* name */}
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 focus-within:border-cyan-400 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition">
                        <User size={18} className="text-gray-300" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>
                      {/* Email */}
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 focus-within:border-cyan-400 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition">
                        <Mail size={18} className="text-gray-300" />
                        <input
                          type="email"
                          placeholder="example@gmail.com"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>

                      {/* Password */}
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 focus-within:border-cyan-400 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition">
                        <Lock size={18} className="text-gray-300" />
                        <input
                          type="password"
                          placeholder="Enter your password"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>

                      {/*  signup button */}
                      <button className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg">
                        Login
                      </button>
                    </div>

                    {/* Switch */}
                    <p className="mt-6 text-center text-sm text-gray-300">
                      Already have an account?{" "}
                      <span
                        onClick={() => setStep("login")}
                        className="text-white font-semibold cursor-pointer hover:underline"
                      >
                        Login
                      </span>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
