"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserPhone, clearAuth } from '@/lib/auth';
import { api } from '@/lib/api';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    age?: number;
    weight?: number;
    height?: number;
    gender?: string;
    location?: string;
    isVerified: boolean;
    points: number;
    badges: string[];
    bloodGroup?: string;
    allergies: string[];
    conditions: string[];
    emergencyContact?: string;
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    refreshUser: () => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        const phone = getUserPhone();
        if (!phone) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            // We use the existing login endpoint but for "refreshing" session
            // In a real prod app, we'd have a /me endpoint
            // For now, we'll try to fetch user info from the database via phone
            const response = await fetch(`/api/user?phone=${phone}`);
            const data = await response.json();

            if (data.success) {
                setUser(data.user);
            } else {
                // If user not found, clear auth
                if (data.message === 'User not found') {
                    clearAuth();
                    setUser(null);
                }
                setError(data.message);
            }
        } catch (err) {
            console.error('Failed to fetch user:', err);
            setError('Failed to load user profile');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const logout = () => {
        clearAuth();
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <UserContext.Provider value={{ user, loading, error, refreshUser: fetchUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
