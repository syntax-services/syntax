'use client';
import React, { useEffect, useRef } from "react";

export function AbandonedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Pre-calculated wall cracks for realistic concrete look
    const cracks = [
      {
        path: [
          { x: width * 0.1, y: 0 },
          { x: width * 0.12, y: 150 },
          { x: width * 0.08, y: 280 },
          { x: width * 0.15, y: 400 },
          { x: width * 0.05, y: 550 }
        ]
      },
      {
        path: [
          { x: width * 0.9, y: height },
          { x: width * 0.85, y: height - 180 },
          { x: width * 0.88, y: height - 320 },
          { x: width * 0.8, y: height - 480 }
        ]
      },
      {
        path: [
          { x: width * 0.45, y: 0 },
          { x: width * 0.47, y: 100 },
          { x: width * 0.43, y: 210 }
        ]
      }
    ];

    // Bulbs with realistic details
    const bulbs = [
      { x: width * 0.22, y: 0, length: 260, size: 16, status: 1.0, flickerTimer: 0, speed: 0.04 },
      { x: width * 0.40, y: 0, length: 170, size: 14, status: 0.8, flickerTimer: 20, speed: 0.03 },
      { x: width * 0.72, y: 0, length: 210, size: 15, status: 0.9, flickerTimer: 45, speed: 0.05 },
      { x: width * 0.88, y: 0, length: 320, size: 17, status: 0.6, flickerTimer: 10, speed: 0.02 }
    ];

    // Glitching dimension portals popping up and closing
    interface DimensionPortal {
      x: number;
      y: number;
      w: number;
      h: number;
      life: number;     // 0 to 100
      maxLife: number;  // duration
      type: "grid" | "matrix" | "telemetry";
      glitchX: number;
    }

    let activePortals: DimensionPortal[] = [];

    const drawConcreteWall = (ctx: CanvasRenderingContext2D) => {
      // Dark grunge concrete base
      ctx.fillStyle = "#0c0c0e";
      ctx.fillRect(0, 0, width, height);

      // Draw concrete blocks/panel seams
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 3;
      const blockWidth = width / 3;
      const blockHeight = height / 2;

      // Draw panel grid line dividers
      for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * blockWidth, 0);
        ctx.lineTo(i * blockWidth, height);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, blockHeight);
      ctx.lineTo(width, blockHeight);
      ctx.stroke();

      // Draw crack paths
      ctx.strokeStyle = "rgba(4, 4, 5, 0.7)";
      ctx.lineWidth = 1.8;
      cracks.forEach((crack) => {
        ctx.beginPath();
        ctx.moveTo(crack.path[0].x, crack.path[0].y);
        for (let pt = 1; pt < crack.path.length; pt++) {
          ctx.lineTo(crack.path[pt].x, crack.path[pt].y);
        }
        ctx.stroke();
      });

      // Ambient radial darkness (Abandoned building look)
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, Math.max(width, height) * 0.85);
      gradient.addColorStop(0, "rgba(9, 9, 11, 0.1)");
      gradient.addColorStop(0.6, "rgba(7, 7, 9, 0.75)");
      gradient.addColorStop(1, "rgba(3, 3, 4, 0.98)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawDetailedWiresAndBulbs = (ctx: CanvasRenderingContext2D, time: number) => {
      bulbs.forEach((bulb) => {
        bulb.flickerTimer += 1;
        
        // Random malfunction flickering logic
        let isLightOn = true;
        const rand = Math.random();
        if (rand < 0.06) {
          isLightOn = rand > 0.42;
        }

        // Draw sways
        const sway = Math.sin(time * 0.0008 + bulb.flickerTimer * bulb.speed) * 6;
        const bulbX = bulb.x + sway;
        const bulbY = bulb.length;

        // 1. Draw hanging double-wire cable
        ctx.beginPath();
        ctx.strokeStyle = "rgba(10, 10, 12, 0.95)";
        ctx.lineWidth = 3.5;
        ctx.moveTo(bulb.x, 0);
        ctx.bezierCurveTo(bulb.x, bulb.length / 2, bulbX - 2, bulb.length / 2, bulbX, bulbY);
        ctx.stroke();

        // 2. Draw brass socket/cap
        ctx.fillStyle = "#1e1b18"; // Dark metallic brown
        ctx.fillRect(bulbX - 6, bulbY - 8, 12, 8);
        ctx.fillStyle = "#5c5043"; // Brass highlight
        ctx.fillRect(bulbX - 4, bulbY - 5, 8, 2);

        // 3. Draw bulb glass body
        ctx.beginPath();
        ctx.arc(bulbX, bulbY + bulb.size, bulb.size, 0, Math.PI * 2);
        ctx.fillStyle = isLightOn ? "rgba(251, 146, 60, 0.08)" : "rgba(24, 24, 27, 0.35)";
        ctx.fill();
        ctx.strokeStyle = isLightOn ? "rgba(251, 146, 60, 0.45)" : "rgba(63, 63, 70, 0.5)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (isLightOn) {
          // Warm filament glow
          const glow = ctx.createRadialGradient(bulbX, bulbY + bulb.size, 1, bulbX, bulbY + bulb.size, bulb.size * 5.5);
          glow.addColorStop(0, "rgba(251, 146, 60, 1)");
          glow.addColorStop(0.18, "rgba(251, 146, 60, 0.38)");
          glow.addColorStop(0.55, "rgba(251, 146, 60, 0.08)");
          glow.addColorStop(1, "rgba(251, 146, 60, 0)");
          
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(bulbX, bulbY + bulb.size, bulb.size * 5.5, 0, Math.PI * 2);
          ctx.fill();

          // Loop Filament Drawing
          ctx.beginPath();
          ctx.strokeStyle = "#ffe4e6";
          ctx.lineWidth = 2.0;
          ctx.moveTo(bulbX - 4, bulbY + bulb.size * 0.7);
          ctx.bezierCurveTo(bulbX - 2, bulbY + bulb.size * 1.3, bulbX + 2, bulbY + bulb.size * 1.3, bulbX + 4, bulbY + bulb.size * 0.7);
          ctx.stroke();
        }
      });
    };

    const drawGlitchPortals = (ctx: CanvasRenderingContext2D, time: number) => {
      // Spawn new dimension portals randomly
      if (Math.random() < 0.012 && activePortals.length < 3) {
        const pW = 120 + Math.random() * 160;
        const pH = 80 + Math.random() * 110;
        activePortals.push({
          x: 60 + Math.random() * (width - pW - 120),
          y: 80 + Math.random() * (height - pH - 160),
          w: pW,
          h: pH,
          life: 0,
          maxLife: 150 + Math.random() * 120,
          type: Math.random() > 0.5 ? "grid" : "matrix",
          glitchX: 0
        });
      }

      activePortals.forEach((p, idx) => {
        p.life += 1;

        // Collapse/fade animation
        const percent = p.life / p.maxLife;
        let drawH = p.h;
        let opacity = 0.85;

        if (percent < 0.08) {
          // Horizontal opening line animation (like CRT turning on)
          drawH = p.h * (percent / 0.08);
          opacity = percent / 0.08;
        } else if (percent > 0.9) {
          // Collapse back to line
          drawH = p.h * ((1 - percent) / 0.1);
          opacity = (1 - percent) / 0.1;
        }

        if (drawH < 2) drawH = 2;

        ctx.save();
        ctx.translate(p.x, p.y + p.h / 2 - drawH / 2);

        // Holographic portal backing glow
        ctx.fillStyle = "rgba(99, 102, 241, 0.03)";
        ctx.fillRect(0, 0, p.w, drawH);

        // Portal border lines
        ctx.strokeStyle = "rgba(99, 102, 241, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(0, 0, p.w, drawH);

        // Cybernetic HUD brackets on corners
        ctx.strokeStyle = "#ec4899";
        ctx.lineWidth = 2.5;
        const bLen = 12;
        // Top-left bracket
        ctx.beginPath();
        ctx.moveTo(0, bLen); ctx.lineTo(0, 0); ctx.lineTo(bLen, 0); ctx.stroke();
        // Bottom-right bracket
        ctx.beginPath();
        ctx.moveTo(p.w, drawH - bLen); ctx.lineTo(p.w, drawH); ctx.lineTo(p.w - bLen, drawH); ctx.stroke();

        // Render interior glitch data inside this portal dimension
        if (percent >= 0.08 && percent <= 0.9) {
          ctx.fillStyle = "rgba(99, 102, 241, 0.7)";
          ctx.font = "9px monospace";

          // Random cyber numbers streaming
          if (p.type === "grid") {
            for (let cy = 15; cy < p.h; cy += 16) {
              for (let cx = 10; cx < p.w - 10; cx += 32) {
                const randVal = Math.floor(Math.random() * 99);
                ctx.fillText(randVal.toString().padStart(2, "0"), cx, cy);
              }
            }
          } else {
            // Matrix streaming code lines
            ctx.fillStyle = "rgba(236, 72, 153, 0.65)";
            for (let cx = 15; cx < p.w - 15; cx += 24) {
              const strLength = Math.floor(Math.random() * 5) + 2;
              let txt = "";
              for (let c = 0; c < strLength; c++) {
                txt += String.fromCharCode(33 + Math.floor(Math.random() * 90));
              }
              ctx.fillText(txt, cx, 20 + Math.sin(time * 0.005 + cx) * 15);
            }
          }
        }

        ctx.restore();
      });

      // Remove expired portals
      activePortals = activePortals.filter((p) => p.life < p.maxLife);
    };

    const drawPortalPortal = (ctx: CanvasRenderingContext2D, time: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.28;

      const portalPulse = baseRadius + Math.sin(time * 0.003) * 6;

      ctx.save();

      // Portal outer glowing mask
      const portalGlow = ctx.createRadialGradient(centerX, centerY, portalPulse * 0.8, centerX, centerY, portalPulse * 1.35);
      portalGlow.addColorStop(0, "rgba(99, 102, 241, 0.12)");
      portalGlow.addColorStop(0.5, "rgba(236, 72, 153, 0.07)");
      portalGlow.addColorStop(1, "rgba(9, 9, 11, 0)");
      ctx.fillStyle = portalGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, portalPulse * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Draw portal concentric rings
      const ringCount = 3;
      for (let i = 0; i < ringCount; i++) {
        const radius = portalPulse - i * 14;
        const color = i % 2 === 0 ? "rgba(99, 102, 241, 0.55)" : "rgba(236, 72, 153, 0.55)";

        ctx.strokeStyle = color;
        ctx.lineWidth = 2 - i * 0.5;
        ctx.setLineDash([120 - i * 20, 80 + i * 10]);
        ctx.beginPath();
        const rot = time * 0.0006 * (i % 2 === 0 ? 1 : -1.2);
        ctx.arc(centerX, centerY, radius, rot, rot + Math.PI * 2);
        ctx.stroke();
      }

      ctx.setLineDash([]);
      ctx.restore();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      drawConcreteWall(ctx);
      drawPortalPortal(ctx, time);
      drawGlitchPortals(ctx, time);
      drawDetailedWiresAndBulbs(ctx, time);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#09090b]"
    />
  );
}
