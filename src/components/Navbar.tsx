"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav_Items = ["Home", "Bookings", "About Us", "Contact"];

function Navbar() {
  const pathName = usePathname();

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Image src="/logo.png" alt="Logo" width={44} height={44} priority />

        {/* Nav Links */}
        <div className="flex gap-6">
          {nav_Items.map((item, index) => {
            const href =
              item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`;
            const active = href === pathName;

            return (
              <Link
                key={index}
                href={href}
                className={`text-sm font-medium transition ${
                  active ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
