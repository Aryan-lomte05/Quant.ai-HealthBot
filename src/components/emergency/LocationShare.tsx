"use client";

import { useState } from "react";
import { MapPin, Navigation, Share2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function LocationShare() {
    const [location, setLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getLocation = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                });
                setLoading(false);
            },
            (err) => {
                setError("Unable to retrieve your location. Please enable permissions.");
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const shareLocation = async () => {
        if (!location) return;

        const text = `I need help. My location: https://maps.google.com/?q=${location.lat},${location.lng}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Emergency Location",
                    text: text,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            navigator.clipboard.writeText(text);
            alert("Location link copied to clipboard");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <MapPin className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Your Location</h2>
            </div>

            <div className="space-y-4">
                {!location ? (
                    <button
                        onClick={getLocation}
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Navigation className="h-5 w-5 animate-spin" /> Fetching...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Navigation className="h-5 w-5" /> Share My Coordinates
                            </span>
                        )}
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Latitude:</span>
                                <span className="font-mono font-medium text-gray-900">{location.lat.toFixed(6)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Longitude:</span>
                                <span className="font-mono font-medium text-gray-900">{location.lng.toFixed(6)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Accuracy:</span>
                                <span className="font-mono font-medium text-green-600">±{Math.round(location.accuracy)}m</span>
                            </div>
                        </div>

                        <button
                            onClick={shareLocation}
                            className="w-full py-3 px-4 bg-green-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg shadow-green-500/20"
                        >
                            <Share2 className="h-5 w-5" /> Share Location
                        </button>
                    </div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2"
                    >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {error}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
