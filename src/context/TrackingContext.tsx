"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Medication = {
    id: number;
    name: string;
    dose: string;
    time: string;
    taken: boolean;
};

type TrackingState = {
    metrics: {
        steps: number;
        water: number;
        sleep: number;
    };
    medications: Medication[];
    symptoms: string[];
    symptomSeverity: number;
    mood: string | null;
    goals: {
        steps: number;
        water: number;
        sleep: number;
    };
    symptomHistory: { date: string; symptoms: string[]; severity: number }[];
};

type TrackingContextType = {
    state: TrackingState;
    updateMetrics: (key: keyof TrackingState['metrics'], value: number) => void;
    toggleMedication: (id: number) => void;
    addMedication: (med: Omit<Medication, 'id' | 'taken'>) => void;
    toggleSymptom: (symptom: string) => void;
    setSymptomSeverity: (severity: number) => void;
    setMood: (mood: string) => void;
    updateGoals: (goals: TrackingState['goals']) => void;
    saveDailySymptomLog: () => void;
};

const defaultState: TrackingState = {
    metrics: { steps: 4520, water: 4, sleep: 7.5 },
    medications: [
        { id: 1, name: "Metformin", dose: "500mg", time: "08:00 AM", taken: true },
        { id: 2, name: "Vitamin D", dose: "1000IU", time: "09:00 AM", taken: false },
        { id: 3, name: "Atorvastatin", dose: "10mg", time: "09:00 PM", taken: false },
    ],
    symptoms: [],
    symptomSeverity: 3,
    mood: null,
    goals: { steps: 10000, water: 8, sleep: 8 },
    symptomHistory: [
        { date: "Dec 29, 2024", symptoms: ["Headache", "Fatigue"], severity: 4 },
        { date: "Dec 28, 2024", symptoms: ["Nausea"], severity: 6 },
    ],
};

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export function TrackingProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<TrackingState>(defaultState);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('healthTrackingData');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Ensure new fields exist if loading from old state
                if (!parsed.goals) parsed.goals = defaultState.goals;
                if (!parsed.symptomHistory) parsed.symptomHistory = defaultState.symptomHistory;
                setState(parsed);
            } catch (e) {
                console.error("Failed to load tracking data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('healthTrackingData', JSON.stringify(state));
        }
    }, [state, isLoaded]);

    const updateMetrics = (key: keyof TrackingState['metrics'], value: number) => {
        setState(prev => ({
            ...prev,
            metrics: { ...prev.metrics, [key]: value }
        }));
    };

    const toggleMedication = (id: number) => {
        setState(prev => ({
            ...prev,
            medications: prev.medications.map(m => m.id === id ? { ...m, taken: !m.taken } : m)
        }));
    };

    const addMedication = (med: Omit<Medication, 'id' | 'taken'>) => {
        setState(prev => ({
            ...prev,
            medications: [...prev.medications, { ...med, id: Date.now(), taken: false }]
        }));
    };

    const toggleSymptom = (symptom: string) => {
        setState(prev => {
            const exists = prev.symptoms.includes(symptom);
            return {
                ...prev,
                symptoms: exists
                    ? prev.symptoms.filter(s => s !== symptom)
                    : [...prev.symptoms, symptom]
            };
        });
    };

    const setSymptomSeverity = (severity: number) => {
        setState(prev => ({ ...prev, symptomSeverity: severity }));
    };

    const setMood = (mood: string) => {
        setState(prev => ({ ...prev, mood }));
    };

    const updateGoals = (goals: TrackingState['goals']) => {
        setState(prev => ({ ...prev, goals }));
    };

    const saveDailySymptomLog = () => {
        setState(prev => {
            // Only save if there are symptoms
            if (prev.symptoms.length === 0) return prev;

            const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            // Check if already logged for today, if so replace
            const history = prev.symptomHistory.filter(log => log.date !== today);

            return {
                ...prev,
                symptomHistory: [
                    { date: today, symptoms: prev.symptoms, severity: prev.symptomSeverity },
                    ...history
                ]
            };
        });
    };

    return (
        <TrackingContext.Provider value={{
            state,
            updateMetrics,
            toggleMedication,
            addMedication,
            toggleSymptom,
            setSymptomSeverity,
            setMood,
            updateGoals,
            saveDailySymptomLog
        }}>
            {children}
        </TrackingContext.Provider>
    );
}

export function useTracking() {
    const context = useContext(TrackingContext);
    if (context === undefined) {
        throw new Error('useTracking must be used within a TrackingProvider');
    }
    return context;
}
