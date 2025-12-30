
"use client";

import { useSettings } from "@/context/SettingsContext";
import { SettingSection } from "../SettingSection";
import { SettingToggle } from "../SettingToggle";
import { Download, Trash2, Eye, FileText } from "lucide-react";
import { useState } from "react";

export function PrivacySecurity() {
    const { dataSharing, anonymousAnalytics, updateSetting, resetSettings } = useSettings();
    const [auditLoading, setAuditLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDownloadAudit = () => {
        setAuditLoading(true);
        setTimeout(() => {
            // Generate Real Text File
            const element = document.createElement("a");
            const file = new Blob(
                [`SWASTHYA SAKHA - AUDIT LOG\nGenerated: ${new Date().toLocaleString()}\n\n[INFO] Login Successful 10:00 AM\n[INFO] Symptom Check: Fever\n[INFO] Settings Updated\n`],
                { type: "text/plain" }
            );
            element.href = URL.createObjectURL(file);
            element.download = "sakha_audit_log_30days.txt";
            document.body.appendChild(element); // Required for FireFox
            element.click();
            document.body.removeChild(element);

            setAuditLoading(false);
        }, 1500);
    };

    const handleDeleteAccount = () => {
        if (confirm("Are you sure? This action is irreversible.")) {
            resetSettings();
            localStorage.clear();
            alert("Account data has been wiped from this device.");
            window.location.reload();
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <SettingSection title="Data Controls" description="Manage how your data is used and shared.">
                <SettingToggle
                    label="Anonymous Analytics"
                    description="Share completely anonymized usage data to help us improve."
                    isOn={anonymousAnalytics}
                    onToggle={() => updateSetting("anonymousAnalytics", !anonymousAnalytics)}
                    icon={Eye}
                />
            </SettingSection>

            <SettingSection title="Transparency & trust" description="Download records of every action taken on your account.">
                <button
                    onClick={handleDownloadAudit}
                    disabled={auditLoading}
                    className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:bg-white hover:border-emerald-200 hover:shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-gray-900 text-sm">Download Audit Log</h4>
                            <p className="text-xs text-gray-500">Log File • Last 30 Days</p>
                        </div>
                    </div>
                    {auditLoading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-emerald-600" />
                    ) : (
                        <Download className="h-5 w-5 text-gray-400" />
                    )}
                </button>
            </SettingSection>

            <SettingSection title="Danger Zone" className="!border-red-100 !bg-red-50/30">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-red-900 text-sm">Delete Account & Data</h4>
                        <p className="text-xs text-red-700/70 mt-1 max-w-xs">
                            Permanently remove your account and all associated health records. This action cannot be undone.
                        </p>
                    </div>
                    <button
                        onClick={handleDeleteAccount}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-red-50 hover:ring-red-200"
                    >
                        Delete Data
                    </button>
                </div>
            </SettingSection>

        </div>
    );
}
