'use client'
import React from "react";
import {motion} from 'motion/react'
import { Bike, Bus, Car, Truck, Van } from "lucide-react";
const vehicles = [
  { icon: Bike },
  { icon: Car },
  { icon: Bus },
  { icon: Truck },
  { icon: Van },
];
function HeroSection({onAuthRequired}:{onAuthRequired:()=>void}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/heroImage.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white font-extrabold tracking-tight 
          text-4xl sm:text-5xl md:text-7xl leading-tight"
        >
          Book Any Vehicle <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Anytime, Anywhere
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-xl text-gray-300 text-base sm:text-lg"
        >
          From daily rides to heavy transport — everything in one powerful
          platform.
        </motion.p>

        {/* Glassmorphism Icon Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex gap-6 px-6 py-4 rounded-2xl 
          bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
        >
          {vehicles.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, y: -5 }}
                className="cursor-pointer text-gray-300 hover:text-white transition"
              >
                <Icon size={32} />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-10 py-4 rounded-full font-semibold text-white
          bg-gradient-to-r from-blue-500 to-cyan-400
          shadow-lg shadow-blue-500/30
          hover:shadow-blue-500/50
          transition-all duration-300"
          onClick={onAuthRequired}
        >
          Book Now →
        </motion.button>
      </div>
    </div>
  );
}

export default HeroSection;
