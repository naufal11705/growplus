"use client"

import OwnedVoucherCard from "@/Components/Widget/Voucher/owned-voucher-card"
import PointsDisplay from "@/Components/Widget/Voucher/points-display"
import TabButton from "@/Components/Widget/Voucher/tab-button"
import VoucherCard from "@/Components/Widget/Voucher/voucher-card"
import { mockOwnedVouchers } from "@/Data/Voucher"
import Layout from "@/Layouts/Layout"
import { Voucher } from "@/types/voucher"
import { AnimatePresence, motion } from "framer-motion"
import { CreditCard, Gift, Search, Ticket } from "lucide-react"
import { useEffect, useState } from "react"

interface BannerProps {
    totalPoints: number
    vouchers: Voucher[]
}

export default function VoucherDashboard({ totalPoints, vouchers }: BannerProps) {
    const [userPoints, setUserPoints] = useState(totalPoints)
    const [searchQuery, setSearchQuery] = useState("")
    const [vouchersItem, setVouchersItem] = useState(vouchers)
    const [ownedVouchers, setOwnedVouchers] = useState(mockOwnedVouchers)
    const [activeTab, setActiveTab] = useState("available")

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setVouchersItem(vouchersItem)
            setOwnedVouchers(mockOwnedVouchers)
        } else {
            const filteredVouchers = vouchersItem.filter(
                (voucher) =>
                    voucher.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    voucher.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    voucher.provider.toLowerCase().includes(searchQuery.toLowerCase()),
            )

            const filteredOwnedVouchers = mockOwnedVouchers.filter(
                (voucher) =>
                    voucher.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    voucher.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    voucher.provider.toLowerCase().includes(searchQuery.toLowerCase()),
            )

            setVouchersItem(filteredVouchers)
            setOwnedVouchers(filteredOwnedVouchers)
        }
    }, [searchQuery])

    const handleRedeemVoucher = (voucherId: string) => {
        const voucher = vouchers.find((v) => v.id === voucherId)
        if (voucher && userPoints >= voucher.pointsCost) {
            setUserPoints(userPoints - voucher.pointsCost)

            const newOwnedVoucher = {
                ...voucher,
                redeemDate: new Date().toLocaleDateString(),
                id: `owned-${voucher.id}`,
            }

            setOwnedVouchers((prev) => [newOwnedVoucher, ...prev])

            alert(`Voucher "${voucher.title}" redeemed successfully!`)
        }
    }

    const handleUseVoucher = (voucherId: string) => {
        alert(`Voucher code has been copied to clipboard. You can now use it at the provider's website or store.`)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-12 md:mt-20">
                <div className="lg:p-8 p-4">
                    <div className="">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <h1 className="text-3xl font-bold text-gray-800 mb-6">Voucher Rewards</h1>

                            <PointsDisplay points={userPoints} />
                        </motion.div>

                        <div className="flex justify-between items-center mb-6">
                            <div className="flex space-x-2">
                                <TabButton
                                    isActive={activeTab === "available"}
                                    onClick={() => setActiveTab("available")}
                                    icon={<Gift className="h-4 w-4 mr-2" />}
                                    label="Voucher Tersedia"
                                />
                                <TabButton
                                    isActive={activeTab === "owned"}
                                    onClick={() => setActiveTab("owned")}
                                    icon={<Ticket className="h-4 w-4 mr-2" />}
                                    label="Voucher Saya"
                                    count={ownedVouchers.length}
                                />
                            </div>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pinky focus:border-transparent"
                                placeholder={`Cari ${activeTab === "available" ? "available" : "your"} vouchers...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === "available" ? (
                                <motion.div
                                    key="available"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {vouchersItem.map((voucher) => (
                                        <VoucherCard
                                            key={voucher.id}
                                            voucher={voucher}
                                            userPoints={userPoints}
                                            onRedeem={() => handleRedeemVoucher(voucher.id)}
                                        />
                                    ))}

                                    {vouchersItem.length === 0 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                                            <p className="text-gray-500 text-lg">No vouchers found matching your search.</p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="owned"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {ownedVouchers.map((voucher) => (
                                        <OwnedVoucherCard key={voucher.id} voucher={voucher} onUse={() => handleUseVoucher(voucher.id)} />
                                    ))}

                                    {ownedVouchers.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="col-span-full text-center py-12 flex flex-col items-center"
                                        >
                                            <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
                                            <p className="text-gray-500 text-lg">You haven't redeemed any vouchers yet.</p>
                                            <button
                                                onClick={() => setActiveTab("available")}
                                                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                                            >
                                                Browse Available Vouchers
                                            </button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
