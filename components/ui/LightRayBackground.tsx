"use client";

import { useEffect, useRef } from "react";

export default function LightRayBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null); // Track the animation frame ID

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rays: {
      x: number;
      y: number;
      width: number;
      height: number;
      opacity: number;
      fadeSpeed: number;
      life: number;
      delay: number; // Delay before the ray starts fading in
      angle: number; // Keep random angles
      color: string;
    }[] = [];
    const rayCount = 30;

    const lightRayColors = [
      "rgba(255, 183, 3, OPACITY)", // Soft yellow
      "rgba(251, 133, 0, OPACITY)", // Soft orange
    ];

    const createRay = () => {
      const randomColor = lightRayColors[Math.floor(Math.random() * lightRayColors.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: canvas.width, // Span the entire canvas width
        height: Math.random() + 1, // Random height for variety
        opacity: 0, // Start fully transparent
        fadeSpeed: Math.random() * 0.001 + 0.005, // Speed of fading in and out
        life: Math.random() * 200 + 400, // Lifespan of the ray
        delay: Math.random() * 100, // Random delay before fading in
        angle: Math.random() * 360, // Random angle for rotation
        color: randomColor,
      };
    };

    const createRays = () => {
      for (let i = 0; i < rayCount; i++) {
        rays.push(createRay());
      }
    };

    const updateRays = () => {
        rays.forEach((ray, index) => {
          if (ray.delay > 0) {
            // Decrease delay before the ray starts fading in
            ray.delay -= 1;
            return;
          }
      
          ray.opacity += ray.fadeSpeed;
      
          // Reverse fade direction when fully visible or fully transparent
          if (ray.opacity >= 0.6 || ray.opacity <= 0) {
            ray.fadeSpeed *= -1;
          }
      
          // Decrease life and reset ray when it expires
          ray.life -= 1;
          if (ray.life <= 0) {
            rays[index] = createRay();
          }
        });
      };

    const drawRays = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
      gradient.addColorStop(1, "rgba(240, 240, 255, 0.7)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rays.forEach((ray) => {
        ctx.save();
        ctx.translate(ray.x, ray.y); // Translate to ray's position
        ctx.rotate((ray.angle * Math.PI) / 180); // Rotate by the ray's angle
        ctx.globalAlpha = ray.opacity;
        ctx.fillStyle = ray.color.replace("OPACITY", ray.opacity.toString());

        ctx.shadowBlur = 20;
        ctx.shadowColor = ray.color.replace("OPACITY", ray.opacity.toString());

        ctx.fillRect(0, 0, ray.width, ray.height); // Draw the ray
        ctx.restore();
      });
    };

    const animate = () => {
      updateRays();
      drawRays();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    createRays();
    animate();

    return () => {
      // Cleanup animation frame and event listener
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}