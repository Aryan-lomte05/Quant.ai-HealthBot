"use client";

import { Phone, MessageCircle } from "lucide-react";

export function MentalHealthSupport() {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white rounded-full shadow-sm text-teal-600">
                        <HeartHandshakeIcon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-teal-900">Mental Health Crisis</h2>
                </div>

                <div className="space-y-3">
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-teal-100 flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-900">Kiran Helpline</p>
                            <p className="text-xs text-gray-500">24/7 Mental Health Support</p>
                        </div>
                        <a
                            href="tel:18005990019"
                            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-bold text-sm hover:bg-teal-700 transition-colors"
                        >
                            <Phone className="h-4 w-4" /> Call
                        </a>
                    </div>

                    <div className="p-4 bg-white rounded-xl shadow-sm border border-teal-100 flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-900">AASRA</p>
                            <p className="text-xs text-gray-500">Suicide Prevention</p>
                        </div>
                        <a
                            href="tel:919820466726"
                            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-bold text-sm hover:bg-teal-700 transition-colors"
                        >
                            <Phone className="h-4 w-4" /> Call
                        </a>
                    </div>
                </div>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6 bg-white">
                <div className="mb-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-indigo-500" />
                        Anonymous Counselor Chat
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Connect with a listener immediately. Privacy guaranteed.
                    </p>
                </div>

                <div className="h-48 bg-gray-50 rounded-xl border border-dotted border-gray-300 flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                        <MessageCircle className="h-6 w-6" />
                    </div>
                    <p className="text-gray-400 text-sm">
                        Chat service is currently loading... <br />
                        (This is a placeholder for future WebSocket integration)
                    </p>
                </div>

                <div className="mt-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                        disabled
                    />
                    <button disabled className="px-4 py-2 bg-indigo-500 text-white rounded-xl font-medium opacity-50 cursor-not-allowed">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

function HeartHandshakeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 5 9.04 11l.96.96 2.59 2.59" />
            <path d="M19.07 4.93 17 9l-.96.96-2.59 2.59" />
            <path d="M8 11v6a2 2 0 0 0 2 2h3" />
            <path d="M16 11v6a2 2 0 0 1-2 2h-3" />
        </svg>
    );
}
