import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset="283"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="283;0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <img
          src="../../assets/oasishop.png"
          alt="Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
