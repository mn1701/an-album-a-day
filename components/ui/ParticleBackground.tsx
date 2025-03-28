"use client"

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      fadeSpeed: number;
      life: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];
    const particleCount = 100;

    const cosmicColors = [
      "rgba(255, 163, 113, OPACITY)",
      "rgba(166, 168, 255, OPACITY)",
      "rgba(168, 123, 255, OPACITY)",
    ];

    const createParticle = () => {
      const randomColor = cosmicColors[Math.floor(Math.random() * cosmicColors.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        opacity: 0,
        fadeSpeed: Math.random() * 0.01 + 0.005,
        life: Math.random() * 300 + 200,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: randomColor,
      };
    };

    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const updateParticles = () => {
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        particle.opacity += particle.fadeSpeed;

        if (particle.opacity > 1) {
          particle.fadeSpeed *= -1;
        }

        particle.life -= 1;

        if (particle.life <= 0) {
          particles[index] = createParticle();
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace("OPACITY", particle.opacity.toString());
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}