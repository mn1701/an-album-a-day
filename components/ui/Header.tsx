"use client"

import ModeToggle from "@/components/ui/ModeToggle";

export default function Header() {
    return (
        <main className="flex absolute justify-end items-center p-4 w-full z-10"> 
            <ModeToggle />
        </main>
    );
}