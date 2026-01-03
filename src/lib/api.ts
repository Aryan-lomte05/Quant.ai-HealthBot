/**
 * API Client
 * Centralized handling of all backend API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface SignupData {
    name: string;
    phone: string;
    email: string;
    password: string;
    age: number;
    weight: number;
    height: number;
    gender: 'male' | 'female' | 'other';
    location: string;
}

export interface LoginData {
    phone: string;
    password: string;
}

export interface ChatResponse {
    success: boolean;
    response: string;
    timestamp?: string;
}

export type VoicePreference = 'male' | 'female';

export interface TTSRequest {
    text: string;
    voice: VoicePreference;
}

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'API Request Failed');
    }
    return response.json();
};

export const api = {
    // Auth Endpoints
    sendOTP: async (phone: string) => {
        const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone }),
        });
        return handleResponse(res);
    },

    verifyOTP: async (phone: string, otp: string) => {
        const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, otp }),
        });
        return handleResponse(res);
    },

    signup: async (data: SignupData) => {
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    login: async (data: LoginData) => {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    // Chat Endpoint
    sendChatMessage: async (phone: string, message: string): Promise<ChatResponse> => {
        const res = await fetch(`${API_BASE_URL}/api/chat/web`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, message }),
        });
        return handleResponse(res);
    },

    // TTS Endpoint - Returns audio blob
    generateTTS: async (request: TTSRequest): Promise<Blob> => {
        const res = await fetch(`${API_BASE_URL}/api/tts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ error: 'TTS generation failed' }));
            throw new Error(errorData.error || 'TTS generation failed');
        }

        return res.blob();
    },
};
