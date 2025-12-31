"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// ✅ ORIGINAL FemaleDoctorModel - UNCHANGED
function FemaleDoctorModel({ state = "idle" }: { state?: string }) {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF("/models/female-doctor.glb");
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        Object.values(actions).forEach((action) => action?.stop());

        if (state === "idle" && actions["Idle"]) {
            actions["Idle"].reset().fadeIn(0.5).play();
        } else if (state === "thinking" && actions["Thinking"]) {
            actions["Thinking"].reset().fadeIn(0.5).play();
        } else if (state === "speaking" && actions["Talking"]) {
            actions["Talking"].reset().fadeIn(0.5).play();
        } else if (actions["Idle"]) {
            actions["Idle"].reset().fadeIn(0.5).play();
        }
    }, [state, actions]);

    useFrame(() => {
        if (group.current && state === "idle") {
            group.current.position.y = -1.5 + Math.sin(Date.now() * 0.001) * 0.02;
        }
    });

    return (
        <group ref={group}>
            <primitive
                object={scene}
                scale={1.6}                    // ✅ ORIGINAL scale
                position={[0, 1.0, 0]}         // ✅ ORIGINAL position
                rotation={[0, 0, 0]}
            />
        </group>
    );
}

// ✅ ORIGINAL Canvas + Medical styling overlays
export default function FemaleDoctorAvatar({ state = "idle" }) {
    return (
        <div className="relative h-full w-full rounded-3xl overflow-hidden glass-panel-medical">
            {/* ✅ Medical styling OVERLAYS - doesn't affect 3D positioning */}

            {/* State glow border */}
            <div className={`absolute inset-0 rounded-3xl shadow-medical-glow animate-pulse-slow ${state === "speaking" ? "shadow-medical-glow" :
                state === "thinking" ? "shadow-[0_0_20px_rgba(99,102,241,0.4)]" :
                    state === "emergency" ? "shadow-urgent-glow" : ""
                }`} />

            {/* Status indicator - top right */}
            <div className="absolute top-3 right-3 z-20">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-xl ${state === "speaking" ? "bg-medical-success/90 text-white border border-medical-success" :
                    state === "thinking" ? "bg-medical-ai/80 text-white border border-medical-ai" :
                        "bg-slate-900/80 text-slate-300 border border-slate-700/50"
                    }`}>
                    <span className={`status-dot h-2 w-2 ${state === "speaking" ? "status-dot-active" : "status-dot-idle"
                        }`} />
                    <span className="capitalize tracking-tight">
                        {state === "speaking" ? "Speaking" :
                            state === "thinking" ? "Thinking" : "Ready"}
                    </span>
                </div>
            </div>

            {/* ✅ ORIGINAL Canvas - EXACT positioning */}
            <div className="h-full w-full">
                <Canvas
                    camera={{ position: [0, 0.5, 3], fov: 45 }}  // ✅ ORIGINAL CAMERA
                    style={{ background: "transparent" }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 2]}
                >
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={1.2} />
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} />
                    <spotLight
                        position={[0, 5, 0]}
                        angle={0.3}
                        penumbra={1}
                        intensity={0.6}
                    />

                    <FemaleDoctorModel state={state} />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableDamping
                        dampingFactor={0.05}
                        rotateSpeed={0.5}
                    />
                </Canvas>
            </div>

            {/* EKG line - bottom decorative only */}
            <div className="absolute bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-medical-success/40 to-transparent rounded-full">
                {state === "speaking" && (
                    <div className="absolute inset-0 h-full bg-medical-success/60 animate-pulse-slow" />
                )}
            </div>
        </div>
    );
}

useGLTF.preload("/models/female-doctor.glb");
