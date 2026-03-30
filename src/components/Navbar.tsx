"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";

const nav_Items = ["Home", "Bookings", "About Us", "Contact"];

function Navbar() {
  const pathName = usePathname();
  const [authOpen,setAuthOpen] = useState(false);

  return (
    <>
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Image src="/logo.png" alt="Logo" width={44} height={44} priority />

        {/* Nav Links */}
        <div className="flex gap-10 hidden md:flex items-center">
          {nav_Items.map((item, index) => {
            const href =
              item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`;
            const active = href === pathName;

            return (
              <Link
                key={index}
                href={href}
                className={`text-sm  font-medium transition ${
                  active ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        <button onClick={()=>setAuthOpen(true)}
      
          className="group relative px-5 py-2 rounded-full text-sm font-medium 
      text-white overflow-hidden
      bg-white/10 backdrop-blur-lg border border-white/20
      hover:bg-white/20 transition-all duration-300"
        >
          {/* Subtle Glow */}
          <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />

          {/* Text */}
          <span className="relative tracking-wide">Login</span>
        </button>
      </div>

      
    </motion.div>

    <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)}/>
    
    </>
  );
}

export default Navbar;
