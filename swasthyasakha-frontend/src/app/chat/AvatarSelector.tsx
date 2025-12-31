"use client";

const AVATARS = [
    {
        id: "male",
        label: "Male",
        icon: "👨‍⚕️",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: "female",
        label: "Female",
        icon: "👩‍⚕️",
        color: "from-pink-500 to-purple-500",
    },
];

export default function AvatarSelector({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <div className="flex items-center gap-1 rounded-2xl bg-slate-900/80 p-1 backdrop-blur-sm">
            {AVATARS.map((avatar) => {
                const isSelected = value === avatar.id;

                return (
                    <button
                        key={avatar.id}
                        onClick={() => onChange(avatar.id)}
                        className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs transition-all duration-200 ${isSelected
                            ? `bg-gradient-to-r ${avatar.color} text-white shadow-md`
                            : "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                    >
                        <span className="text-base">{avatar.icon}</span>
                        <span className="font-medium">{avatar.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
