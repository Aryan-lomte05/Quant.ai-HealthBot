/**
 * Authentication Utilities
 * Manages user session via localStorage
 */

const STORAGE_KEY = 'user_phone';

export const setUserPhone = (phone: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, phone);
    }
};

export const getUserPhone = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(STORAGE_KEY);
    }
    return null;
};

export const clearAuth = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
};

export const isAuthenticated = (): boolean => {
    return !!getUserPhone();
};

/**
 * Parses chatbot response to handle escaped newlines
 * @param response Raw response string from API
 * @returns Cleaned string with proper line breaks
 */
export const parseResponse = (response: string): string => {
    if (!response) return '';
    return response
        .replace(/\\n/g, '\n') // Handle escaped newlines
        .replace(/\\"/g, '"'); // Handle escaped quotes if any
};
