"use client";

import { AlertOctagon, CloudRain, Sun, Thermometer } from "lucide-react";

export function DisasterAlerts() {
    // Static placeholder data
    const alerts = [
        {
            id: 1,
            type: "Heatwave",
            severity: "High",
            icon: Sun,
            color: "bg-orange-50 text-orange-800 border-orange-200",
            iconColor: "text-orange-600",
            message: "Severe heatwave expected in your region. Stay hydrated.",
        },
        {
            id: 2,
            type: "Flood Alert",
            severity: "Moderate",
            icon: CloudRain,
            color: "bg-blue-50 text-blue-800 border-blue-200",
            iconColor: "text-blue-600",
            message: "Heavy rains predicted. Avoid low-lying areas.",
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <AlertOctagon className="h-5 w-5 text-red-600" />
                <h2 className="text-xl font-bold text-gray-800">Active Alerts</h2>
            </div>

            <div className="grid gap-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`p-4 rounded-xl border ${alert.color} flex items-start gap-4`}
                    >
                        <div className={`p-2 bg-white/50 rounded-lg ${alert.iconColor}`}>
                            <alert.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold">{alert.type}</span>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/50 border border-current opacity-80`}>
                                    {alert.severity}
                                </span>
                            </div>
                            <p className="text-sm opacity-90 leading-relaxed">
                                {alert.message}
                            </p>
                        </div>
                    </div>
                ))}

                {alerts.length === 0 && (
                    <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
                        No active disaster alerts in your area.
                    </div>
                )}
            </div>
        </div>
    );
}
