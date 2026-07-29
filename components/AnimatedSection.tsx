"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  animationData: any;
  title: string;
  description: string;
}

export default function AnimatedSection({ animationData, title, description }: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl shadow-lg bg-white/80 dark:bg-black/40">
      <div className="w-32 h-32">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-neutral-700 dark:text-neutral-300">{description}</p>
    </div>
  );
}
