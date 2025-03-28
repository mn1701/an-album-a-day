"use client"

import { useTheme } from "next-themes"
import { ParticleBackground, LightRayBackground } from "@/components/index"

export default function Background() { 
    const { theme }  = useTheme();

    return (
        <div className="absolute inset-0 z-[-1]">
            {theme === "dark" ? <ParticleBackground /> : <LightRayBackground />}
        </div>
    )
}