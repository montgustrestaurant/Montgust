"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useLanguage } from "@/context/language-context"

export function MobileNewsButton() {
    const { t } = useLanguage()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Show after a short delay on mobile
        const timer = setTimeout(() => {
            if (window.innerWidth < 768) {
                setIsVisible(true)
            }
        }, 1000)

        const handleResize = () => {
            setIsVisible(window.innerWidth < 768)
        }

        window.addEventListener("resize", handleResize)
        return () => {
            clearTimeout(timer)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    className="fixed bottom-6 right-6 z-[60] md:hidden"
                >
                    <Link href="/novedades">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: [
                                    "0 0 0 0px rgba(var(--primary-rgb), 0.2)",
                                    "0 0 0 10px rgba(var(--primary-rgb), 0)",
                                ]
                            }}
                            transition={{
                                boxShadow: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20"
                        >
                            <Sparkles size={16} />
                            <span>{t("nav.news")}</span>
                            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                        </motion.div>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
