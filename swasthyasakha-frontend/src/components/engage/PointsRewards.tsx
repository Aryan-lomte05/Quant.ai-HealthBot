"use client";

import { motion } from "framer-motion";
import { CopyPlus, Gift, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

export function PointsRewards() {
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [redeemSuccess, setRedeemSuccess] = useState(false);

    const handleRedeem = () => {
        setIsRedeeming(true);
        // Simulate API call
        setTimeout(() => {
            setIsRedeeming(false);
            setRedeemSuccess(true);
        }, 1500);
    };

    const resetModal = () => {
        setShowRedeemModal(false);
        setTimeout(() => {
            setRedeemSuccess(false);
            setIsRedeeming(false);
        }, 300);
    };

    return (
        <>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
                {/* Background patterns */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/20 rounded-full blur-xl -ml-5 -mb-5" />

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <p className="text-emerald-100 text-sm font-medium mb-1">Total Points</p>
                            <h3 className="text-4xl font-bold tracking-tight">2,450</h3>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                            <Gift className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between border border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-orange-400/90 flex items-center justify-center">
                                    <CopyPlus className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Free Health Checkup</p>
                                    <p className="text-xs text-emerald-100">3000 pts required</p>
                                </div>
                            </div>
                            <motion.div
                                className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center"
                                whileHover={{ rotate: -90 }}
                            >
                                <div className="h-5 w-5 rounded-full border-2 border-white/60 border-t-white animate-spin" style={{ animationDuration: '3s' }} />
                            </motion.div>
                        </div>

                        <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "81%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-yellow-400"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-emerald-100 font-medium">
                            <span>81% to next reward</span>
                            <span>550 pts needed</span>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowRedeemModal(true)}
                            className="w-full py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors mt-2"
                        >
                            Redeem Rewards
                            <ArrowRight className="h-4 w-4" />
                        </motion.button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={showRedeemModal}
                onClose={resetModal}
                title={redeemSuccess ? "Success!" : "Redeem Points"}
            >
                <div className="flex flex-col items-center text-center p-2">
                    {redeemSuccess ? (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Rewards Redeemed!</h4>
                            <p className="text-gray-500 text-sm mb-6">You've successfully claimed your reward. Check your email for details.</p>
                            <button
                                onClick={resetModal}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 w-full"
                            >
                                Close
                            </button>
                        </motion.div>
                    ) : (
                        <div className="w-full">
                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl mb-6 text-left">
                                <div className="h-12 w-12 rounded-lg bg-orange-400 flex items-center justify-center shrink-0">
                                    <Gift className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Health Store Voucher</h4>
                                    <p className="text-xs text-gray-500">Worth ₹500</p>
                                </div>
                                <div className="ml-auto font-bold text-emerald-600">500 pts</div>
                            </div>

                            <p className="text-sm text-gray-500 mb-6 text-left">
                                Are you sure you want to redeem 500 points for this voucher? This action cannot be undone.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={resetModal}
                                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRedeem}
                                    disabled={isRedeeming}
                                    className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 flex items-center justify-center gap-2"
                                >
                                    {isRedeeming ? (
                                        <>Processing...</>
                                    ) : (
                                        <>Confirm Redeem <ArrowRight className="h-4 w-4" /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
