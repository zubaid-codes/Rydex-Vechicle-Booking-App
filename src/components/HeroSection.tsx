"use client";
import React from "react";
import { motion } from "motion/react";
import { Bike, BikeIcon, Book, Bus, Car, Truck, Van } from "lucide-react";

const vehicles = [
  { icon: Bike, label: "Bike" },
  { icon: Car, label: "Car" },
  { icon: Bus, label: "Bus" },
  { icon: Truck, label: "Truck" },
  { icon: Van, label: "Van" },
];

function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/heroImage.jpg')" }}
      />

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/90 to-black" />

      {/* Color Accent Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.12),transparent_40%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-1.5 rounded-full text-xs 
          bg-white/10 border border-white/20 backdrop-blur-md text-gray-300"
        >
          🚀 India’s Smart Vehicle Booking Platform
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white font-extrabold tracking-tight 
          text-4xl sm:text-5xl md:text-7xl leading-tight"
        >
          Book Your Ride <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">
            Fast, Easy & Reliable
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-2xl text-gray-300 text-base sm:text-lg leading-relaxed"
        >
          Whether it's a quick bike ride, a comfortable car trip, or heavy
          transport —
          <span className="text-white font-medium">
            {" "}
            Rydex connects you instantly{" "}
          </span>
          with the right vehicle at the best price.
        </motion.p>

        {/* Features Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-400"
        >
          <span>⚡ Instant Booking</span>
          <span>💰 Best Pricing</span>
          <span>📍 Live Tracking</span>
          <span>🛡️ Safe & Verified</span>
        </motion.div>

        {/* Vehicle Icons (Glass UI) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex gap-6 px-6 py-4 rounded-2xl 
          bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
        >
          {vehicles.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.15, y: -6 }}
                className="flex flex-col items-center  text-gray-300 hover:text-white transition"
              >
                <Icon size={30} />
                <span className="text-xs mt-1">{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          {/* <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-full font-semibold text-white
            bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400
            shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/60
            transition-all duration-300"
          >
            <BikeIcon />
            Book Now →
          </motion.button> */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full 
      font-semibold text-white overflow-hidden
      bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400
      shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/50
      transition-all duration-300"
          >
            {/* Soft Glow Layer */}
            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />

            {/* Content */}
            <span className="relative flex items-center gap-3">
              {/* Icon with motion */}
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center"
              >
                <Bike size={20} />
              </motion.span>

              {/* Text */}
              <span className="tracking-wide">Book Now</span>

              {/* Arrow */}
              <motion.span
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-gray-400"
        >
          ⭐ Rated 4.8 by 10,000+ users • Available in 20+ cities
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
