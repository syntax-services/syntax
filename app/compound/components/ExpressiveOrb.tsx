'use client';
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ExpressiveOrbProps {
  status: string;
  isCompounding: boolean;
  onClick?: () => void;
}

export function ExpressiveOrb({ status, isCompounding, onClick }: ExpressiveOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;

    // Parameters for Siri-like waves
    const waveCount = 5;
    const phases = Array(waveCount).fill(0).map(() => Math.random() * Math.PI * 2);
    const speeds = [0.006, 0.008, 0.010, 0.005, 0.007];
    const amplitudes = [22, 16, 26, 12, 18];
    const waveColors = [
      "rgba(99, 102, 241, 0.6)",   // Indigo
      "rgba(236, 72, 153, 0.55)",  // Pink
      "rgba(14, 165, 233, 0.5)",   // Sky
      "rgba(168, 85, 247, 0.45)",  // Purple
      "rgba(244, 63, 94, 0.6)"     // Rose
    ];

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      // Create main orb glass gradient
      const glassGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size / 2);
      glassGlow.addColorStop(0, "rgba(99, 102, 241, 0.15)");
      glassGlow.addColorStop(0.5, "rgba(236, 72, 153, 0.05)");
      glassGlow.addColorStop(0.85, "rgba(9, 9, 11, 0.2)");
      glassGlow.addColorStop(1, "rgba(255, 255, 255, 0.05)");
      ctx.fillStyle = glassGlow;

      ctx.save();
      // Mask waves inside a circular clipping path
      ctx.beginPath();
      ctx.arc(centerX, centerY, size / 2 - 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillRect(0, 0, size, size);

      // Calculate compounding frequency scaling
      const speedScale = isCompounding ? 2.5 : 1.0;
      const ampScale = isCompounding ? 1.4 : 1.0;

      // Draw Siri wave paths
      for (let w = 0; w < waveCount; w++) {
        phases[w] += speeds[w] * speedScale;
        ctx.beginPath();
        ctx.strokeStyle = waveColors[w];
        ctx.lineWidth = w === 0 ? 3.5 : 2.0;

        for (let x = 0; x <= size; x++) {
          const relativeX = (x / size) * Math.PI * 2;
          const sineVal = Math.sin(relativeX * 1.5 + phases[w]);
          const cosineVal = Math.cos(relativeX * 0.8 - phases[w]);
          const waveHeight = (sineVal + cosineVal) * amplitudes[w] * ampScale;
          
          // Apply Gaussian envelope to keep waves within the center
          const envelope = Math.exp(-Math.pow((x - centerX) / (size * 0.4), 2));
          const y = centerY + waveHeight * envelope;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      ctx.restore();

      // Outer glass ring highlight
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, size / 2 - 1, 0, Math.PI * 2);
      ctx.stroke();

      // Highlight crescent on the glass sphere
      const highlight = ctx.createLinearGradient(centerX, 0, centerX, size);
      highlight.addColorStop(0, "rgba(255, 255, 255, 0.18)");
      highlight.addColorStop(0.3, "rgba(255, 255, 255, 0.02)");
      highlight.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - size * 0.22, size / 2.3, size / 5, 0, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isCompounding]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="relative cursor-pointer group flex items-center justify-center"
      >
        {/* Glowing backdrop shadow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 blur-3xl opacity-80 group-hover:scale-110 transition-transform duration-500" />
        
        {/* Core Canvas element */}
        <canvas
          ref={canvasRef}
          className="relative rounded-full border border-zinc-800/50 shadow-2xl shadow-black/80 bg-zinc-950/20 backdrop-blur-md"
        />

        {/* Pulsing ring indicator */}
        <motion.div
          animate={{
            scale: isCompounding ? [1, 1.08, 1] : [1, 1.03, 1],
            opacity: isCompounding ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: isCompounding ? 1.2 : 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/35 pointer-events-none"
        />
      </motion.div>

      {/* State Label */}
      <div className="text-center">
        <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">
          Compounding Flow Engine
        </h3>
        <p className="text-xl font-medium text-zinc-200 mt-1 capitalize">
          {status}
        </p>
      </div>
    </div>
  );
}
