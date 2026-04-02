"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleDashed, Lock, Mail, User, X } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

type propType = {
  open: boolean;
  onClose: () => void;
};

type stepType = "login" | "signup" | "otp";

function AuthModal({ open, onClose }: propType) {
  const [step, setStep] = useState<stepType>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { data } = useSession();
  console.log(data);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
     setErr("")
      setStep("otp")
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErr(error.response.data.message ?? "Something went Wrong");
    }
  };

  const handleEmailVerify= async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/verify-email", {
        email,
        otp:otp.join(""),
      });
      console.log(data)
      setOtp(["", "", "", "", "", ""]);
      setErr("")
      setStep("login");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErr(error.response.data.message ?? "Something went Wrong");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    console.log(res);
  };

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

 const handleOtpChange = (index: number, value: string) => {
   // Allow only single digit
   if (!/^[0-9]?$/.test(value)) return;

   const updated = [...otp];
   updated[index] = value;
   setOtp(updated);

   // Auto focus next
   if (value && index < otp.length - 1) {
     document.getElementById(`otp-${index + 1}`)?.focus();
   }

     if (!value && index>0) {
       document.getElementById(`otp-${index -1}`)?.focus();
     }
 };

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
                  <X className="cursor-pointer" />
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
                <button
                  onClick={handleGoogleLogin}
                  className="w-full h-11 rounded-xl bg-white text-black flex items-center justify-center gap-3 text-sm font-semibold hover:scale-[1.03] active:scale-[0.98] transition"
                >
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
                    <h2 className="text-xl font-semibold text-center">Welcome back</h2>

                    <div className="mt-5 space-y-4">
                      {/* Email */}
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 focus-within:border-cyan-400 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition">
                        <Mail size={18} className="text-gray-300" />
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="email"
                          placeholder="example@gmail.com"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>

                      {/* Password */}
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 focus-within:border-cyan-400 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition">
                        <Lock size={18} className="text-gray-300" />
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type="password"
                          placeholder="Enter your password"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>

                      {/* Login Button */}
                      <button
                        onClick={handleLogin}
                        className="w-full flex justify-center items-center h-11 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg"
                      >
                        {!loading ? (
                          "Login"
                        ) : (
                          <CircleDashed
                            size={18}
                            color="white"
                            className="animate-spin"
                          />
                        )}
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
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>
                      {/* Email */}
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 focus-within:border-cyan-400 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition">
                        <Mail size={18} className="text-gray-300" />
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="email"
                          placeholder="example@gmail.com"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>

                      {/* Password */}
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 focus-within:border-cyan-400 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition">
                        <Lock size={18} className="text-gray-300" />
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type="password"
                          placeholder="Enter your password"
                          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                      </div>

                      {err && <p className="text-red-500 ">{err}</p>}

                      {/*  signup button */}
                      <button
                        onClick={handleSignup}
                        disabled={loading}
                        className="w-full flex justify-center items-center h-11 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg"
                      >
                        {!loading ? (
                          "Send Otp"
                        ) : (
                          <CircleDashed
                            size={18}
                            color="white"
                            className="animate-spin"
                          />
                        )}
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

                {step == "otp" && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200"
                  >
                    {/* <h2 className="text-xl font-semibold">Verify Email</h2>

                    <div className="mt-6 flex  justify-between gap-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          value={digit}
                          maxLength={1}
                          className="w-10 h-12 sm:w-12 text-center text-lg bg-white border border-black/20 outline-none"
                        />
                      ))}
                    </div> */}
                    {/* <h2 className="text-3xl text-center font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                      Verify Email
                    </h2> */}
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent tracking-tight">
                      Verify Email
                    </h2>

                    <p className="text-sm text-gray-900 text-center mt-2">
                      Enter the 6-digit code sent to your email
                    </p>

                    <div className="mt-6 flex justify-center gap-3">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          value={digit}
                          maxLength={1}
                          inputMode="numeric" // 👈 helps mobile keyboard
                          autoComplete="one-time-code"
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          className="
    w-11 h-12 sm:w-12 sm:h-14
    text-center text-lg font-medium font-mono
    rounded-lg
    border border-gray-300
    bg-white
    outline-none
    text-black
    transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-200
    hover:border-gray-400
  "
                        />
                      ))}
                    </div>
                    {err && <p className="text-red-500 ">{err}</p>}

                    <button
                      className="
    mt-6 w-full py-3 rounded-lg
    bg-blue-600 text-white font-medium
    transition-colors duration-200 flex justify-center items-center
    hover:bg-blue-700
    active:bg-blue-800
  "
                      onClick={handleEmailVerify}
                    >
                      {!loading ? (
                        "Verify and Create Account"
                      ) : (
                        <CircleDashed
                          size={18}
                          color="white"
                          className="animate-spin"
                        />
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Didn’t receive code?{" "}
                      <span className="text-blue-600 cursor-pointer hover:underline">
                        Resend
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
