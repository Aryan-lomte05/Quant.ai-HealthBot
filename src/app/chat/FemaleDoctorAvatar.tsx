'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Environment } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';

// Enhanced FemaleDoctorModel with breathing and dynamic animations
function FemaleDoctorModel({ state }: { state: string }) {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF("/models/female-doctor.glb");
    const { actions } = useAnimations(animations, group);
    const clock = useRef(0);

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

    useFrame((_, delta) => {
        if (!group.current) return;

        clock.current += delta;

        // BREATHING - Always active
        const breathCycle = Math.sin(clock.current * 1.5) * 0.02;
        group.current.scale.set(1, 1 + breathCycle, 1);

        // Different animations based on state
        if (state === 'idle') {
            // Gentle floating motion
            group.current.position.y = Math.sin(clock.current * 0.8) * 0.03;
            group.current.rotation.y = Math.sin(clock.current * 0.5) * 0.03;
        }

        if (state === 'thinking') {
            // Head tilt animation
            group.current.rotation.z = Math.sin(clock.current * 2) * 0.08;
            group.current.rotation.x = Math.sin(clock.current * 1.5) * 0.04;
        }

        if (state === 'speaking') {
            // Bounce animation when speaking
            const bounce = Math.abs(Math.sin(clock.current * 4)) * 0.06;
            group.current.position.y = bounce;

            // Slight head movement
            group.current.rotation.y = Math.sin(clock.current * 3) * 0.06;
        }
    });

    return (
        <group ref={group}>
            <primitive object={scene} scale={1.6} position={[0, -0.5, 0]} rotation={[0, 0, 0]} />
        </group>
    );
}

// Audio Waveform Visualization - Premium speaking effect
function AudioWaveform({ state }: { state: string }) {
    const waveRef = useRef<THREE.Group>(null);
    const clock = useRef(0);

    useFrame((_, delta) => {
        if (!waveRef.current) return;
        clock.current += delta;

        // Animate wave particles
        waveRef.current.children.forEach((child, i) => {
            const mesh = child as THREE.Mesh;
            const offset = i * 0.3;
            const intensity = state === 'speaking' ? 1 : 0;

            // Wave motion
            const wave = Math.sin(clock.current * 3 + offset) * intensity;
            mesh.position.y = wave * 0.4;

            // Opacity fade
            const material = mesh.material as THREE.MeshBasicMaterial;
            material.opacity = intensity * (0.6 + Math.abs(wave) * 0.4);
        });
    });

    // Create wave bars
    const bars = Array.from({ length: 12 }, (_, i) => {
        const x = (i - 5.5) * 0.15;
        return (
            <mesh key={i} position={[x, 0, -1]}>
                <boxGeometry args={[0.08, 0.3, 0.08]} />
                <meshBasicMaterial
                    color="#ec4899"
                    transparent
                    opacity={0}
                />
            </mesh>
        );
    });

    return <group ref={waveRef}>{bars}</group>;
}

// Floating Particle System - Premium ambient effect
function ParticleSystem({ state }: { state: string }) {
    const particlesRef = useRef<THREE.Points>(null);
    const clock = useRef(0);

    useEffect(() => {
        if (!particlesRef.current) return;

        const geometry = particlesRef.current.geometry;
        const positions = geometry.attributes.position.array as Float32Array;

        // Initialize particle positions
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] = (Math.random() - 0.5) * 3; // x
            positions[i + 1] = (Math.random() - 0.5) * 3; // y
            positions[i + 2] = (Math.random() - 0.5) * 2; // z
        }
        geometry.attributes.position.needsUpdate = true;
    }, []);

    useFrame((_, delta) => {
        if (!particlesRef.current) return;
        clock.current += delta;

        const geometry = particlesRef.current.geometry;
        const positions = geometry.attributes.position.array as Float32Array;

        const intensity = state === 'speaking' ? 1.5 : state === 'thinking' ? 0.8 : 0.3;

        for (let i = 0; i < positions.length; i += 3) {
            // Floating motion
            positions[i + 1] += Math.sin(clock.current + i) * 0.001 * intensity;

            // Circular orbit
            const angle = clock.current * 0.3 + i;
            positions[i] += Math.cos(angle) * 0.001 * intensity;
            positions[i + 2] += Math.sin(angle) * 0.001 * intensity;

            // Reset if too far
            if (positions[i + 1] > 2) positions[i + 1] = -2;
            if (positions[i + 1] < -2) positions[i + 1] = 2;
        }

        geometry.attributes.position.needsUpdate = true;
    });

    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial
                size={0.05}
                color="#ec4899"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Dynamic Aura/Glow Effect
function DynamicAura({ state }: { state: string }) {
    const auraRef = useRef<THREE.Mesh>(null);
    const clock = useRef(0);

    useFrame((_, delta) => {
        if (!auraRef.current) return;
        clock.current += delta;

        const material = auraRef.current.material as THREE.MeshBasicMaterial;

        // Pulsing effect based on state
        let pulseSpeed = 1;
        let pulseIntensity = 0.2;
        let baseOpacity = 0.1;

        if (state === 'speaking') {
            pulseSpeed = 3;
            pulseIntensity = 0.4;
            baseOpacity = 0.25;
        } else if (state === 'thinking') {
            pulseSpeed = 2;
            pulseIntensity = 0.3;
            baseOpacity = 0.15;
        }

        const pulse = Math.sin(clock.current * pulseSpeed) * pulseIntensity;
        material.opacity = baseOpacity + pulse;

        // Gentle rotation
        auraRef.current.rotation.z = clock.current * 0.1;
    });

    return (
        <mesh ref={auraRef} position={[0, 0, -0.5]}>
            <circleGeometry args={[2, 64]} />
            <meshBasicMaterial
                color={state === 'speaking' ? '#ec4899' : '#f472b6'}
                transparent
                opacity={0.1}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

// Loading fallback
function LoadingFallback() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime;
            meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
        </mesh>
    );
}

// Premium medical styling wrapper
export default function FemaleDoctorAvatar({ state = 'idle' }) {
    return (
        <div className="relative h-full w-full rounded-3xl overflow-hidden glass-panel-medical">
            {/* Premium medical styling overlays */}

            {/* State glow border */}
            <div className={`absolute inset-0 rounded-3xl shadow-medical-glow animate-pulse-slow ${state === "speaking" ? "shadow-[0_0_30px_rgba(236,72,153,0.5)]" :
                state === "thinking" ? "shadow-[0_0_20px_rgba(244,114,182,0.4)]" :
                    ""
                }`} />

            {/* Status indicator - Responsive (Bottom Center Mobile, Top Right Desktop) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 lg:top-3 lg:right-3 lg:left-auto lg:bottom-auto lg:translate-x-0">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-xl ${state === "speaking" ? "bg-pink-500/90 text-white border border-pink-400" :
                    state === "thinking" ? "bg-pink-400/80 text-white border border-pink-300" :
                        "bg-slate-900/80 text-slate-300 border border-slate-700/50"
                    }`}>
                    <span className={`h-2 w-2 rounded-full ${state === "speaking" ? "bg-white animate-pulse" :
                        state === "thinking" ? "bg-pink-200 animate-pulse" :
                            "bg-pink-400"
                        }`} />
                    <span className="capitalize tracking-tight">
                        {state === "speaking" ? "Speaking" :
                            state === "thinking" ? "Thinking" : "Ready"}
                    </span>
                </div>
            </div>

            {/* 3D Canvas */}
            <div className="h-full w-full">
                <Canvas
                    camera={{ position: [0, 0.5, 3], fov: 45 }}
                    style={{ background: "transparent" }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 2]}
                    shadows
                >
                    {/* Enhanced Lighting for premium look */}
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} />
                    <spotLight
                        position={[0, 5, 0]}
                        angle={0.3}
                        penumbra={1}
                        intensity={0.6}
                    />

                    {/* Rim lighting for depth */}
                    <pointLight position={[2, 2, -2]} intensity={0.5} color="#ec4899" />
                    <pointLight position={[-2, 2, -2]} intensity={0.5} color="#f472b6" />

                    {/* Environment */}
                    <Environment preset="city" />

                    {/* Premium Visual Effects */}
                    <DynamicAura state={state} />
                    <ParticleSystem state={state} />
                    <AudioWaveform state={state} />

                    {/* Model */}
                    <Suspense fallback={<LoadingFallback />}>
                        <FemaleDoctorModel state={state} />
                    </Suspense>

                    {/* Enhanced state-based lighting */}
                    {state === 'speaking' && (
                        <>
                            <pointLight position={[0, 1, 2]} intensity={1.5} color="#ec4899" />
                            <pointLight position={[0, -1, 2]} intensity={0.8} color="#f472b6" />
                        </>
                    )}
                    {state === 'thinking' && (
                        <pointLight position={[0, 0, 2]} intensity={1} color="#f472b6" />
                    )}

                    {/* Camera controls */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableDamping
                        dampingFactor={0.05}
                        rotateSpeed={0.5}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Canvas>
            </div>

            {/* Pulsing Ring Effect - Speaking State */}
            {state === "speaking" && (
                <>
                    <div className="absolute inset-0 rounded-3xl border-2 border-pink-500/40 animate-ping"
                        style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-4 rounded-3xl border border-pink-400/30 animate-pulse-slow" />
                </>
            )}

            {/* Audio Equalizer Bars - Speaking State */}
            {state === "speaking" && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-1 h-12">
                    {[...Array(7)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-pink-500 to-pink-300 rounded-full animate-pulse"
                            style={{
                                height: `${30 + Math.random() * 70}%`,
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: `${0.6 + Math.random() * 0.4}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Decorative EKG line - bottom */}
            <div className="absolute bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent rounded-full">
                {state === "speaking" && (
                    <div className="absolute inset-0 h-full bg-pink-500/60 animate-pulse-slow" />
                )}
            </div>

            {/* Premium corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-pink-400/30 rounded-tl-lg" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-pink-300/30 rounded-br-lg" />
        </div>
    );
}

useGLTF.preload("/models/female-doctor.glb");
