"use client";

import { useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="text-blue font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:tet-7xl">
                <h1>Echo will help you with</h1>
                <div className ="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    <TypewriterComponent 
                    options={{
                        strings: [
                            "Text Generation..",
                            "Music Generation..",
                            "Code Generation..",
                            "Video Generation..",
                            "Image Generation..",
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                    />
                </div>
            </div>
        </div>
    )
}