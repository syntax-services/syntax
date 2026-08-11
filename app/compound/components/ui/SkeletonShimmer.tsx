'use client';
import React from "react";
import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
}

export const SkeletonShimmer: React.FC<SkeletonProps> = ({
  className = "",
  height = "h-12",
  width = "w-full",
  rounded = "rounded-2xl",
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#111116] border border-white/5 ${height} ${width} ${rounded} ${className}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
        animate={{
          translateX: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export const DashboardBentoSkeleton = () => {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <SkeletonShimmer height="h-32" rounded="rounded-3xl" />
      <div className="grid grid-cols-3 gap-3">
        <SkeletonShimmer height="h-24" rounded="rounded-2xl" />
        <SkeletonShimmer height="h-24" rounded="rounded-2xl" />
        <SkeletonShimmer height="h-24" rounded="rounded-2xl" />
      </div>
      <SkeletonShimmer height="h-48" rounded="rounded-3xl" />
    </div>
  );
};
