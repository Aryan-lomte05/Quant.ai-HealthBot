"use client";

import { ProfileForm } from "@/components/profile/ProfileForm";

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-emerald-950">
                    User Profile
                </h1>
                <p className="mt-2 text-emerald-900/60">
                    Manage your personal information and account details.
                </p>
            </header>

            <ProfileForm />
        </div>
    );
}
