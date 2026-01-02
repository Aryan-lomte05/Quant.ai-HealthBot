"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Square, ClipboardList } from "lucide-react";

export function PreparednessChecklist() {
    const defaultItems = [
        { id: "water", text: "Water (3-day supply)", checked: false },
        { id: "food", text: "Non-perishable food (3-day supply)", checked: false },
        { id: "meds", text: "Prescription medicines & First Aid Kit", checked: false },
        { id: "flash", text: "Flashlight & extra batteries", checked: false },
        { id: "docs", text: "Important documents (ID, Insurance)", checked: false },
        { id: "cash", text: "Emergency cash", checked: false },
        { id: "contacts", text: "Written emergency contacts", checked: false },
    ];

    const [items, setItems] = useState(defaultItems);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("emergency-checklist");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse checklist", e);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("emergency-checklist", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const toggleItem = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const progress = Math.round(
        (items.filter((i) => i.checked).length / items.length) * 100
    );

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <ClipboardList className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Preparedness Checklist</h2>
                    <p className="text-xs text-gray-500">Your emergency kit readiness</p>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-indigo-600">{progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="space-y-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                    >
                        <div
                            className={`flex-shrink-0 transition-colors ${item.checked ? "text-indigo-600" : "text-gray-300 group-hover:text-gray-400"
                                }`}
                        >
                            {item.checked ? (
                                <CheckSquare className="h-6 w-6" />
                            ) : (
                                <Square className="h-6 w-6" />
                            )}
                        </div>
                        <span
                            className={`text-sm font-medium transition-colors ${item.checked ? "text-gray-400 line-through" : "text-gray-700"
                                }`}
                        >
                            {item.text}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
