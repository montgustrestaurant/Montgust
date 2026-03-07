"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Music, SkipForward, SkipBack } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"

const playlist = [
    { title: "Jazz Session 1", src: "/music/Jazz.mp3" },
    { title: "Jazz Session 2", src: "/music/jazz2.mp3" },
    { title: "Jazz Session 3", src: "/music/jazz3.mp3" },
]

export function MusicPlayer() {
    const { t } = useLanguage()
    const [mounted, setMounted] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateProgress = () => {
            const currentProgress = (audio.currentTime / audio.duration) * 100
            setProgress(currentProgress || 0)
        }

        const handleNext = () => {
            const nextIndex = (currentTrackIndex + 1) % playlist.length
            setCurrentTrackIndex(nextIndex)
            // Auto-play next track
            if (isPlaying) {
                setTimeout(() => {
                    audio.play().catch((e) => console.log("Audio play failed:", e))
                }, 100)
            }
        }

        audio.addEventListener("timeupdate", updateProgress)
        audio.addEventListener("ended", handleNext)

        return () => {
            audio.removeEventListener("timeupdate", updateProgress)
            audio.removeEventListener("ended", handleNext)
        }
    }, [currentTrackIndex, isPlaying])

    // Effect to handle source changes and maintain playback state
    useEffect(() => {
        if (mounted && audioRef.current && isPlaying) {
            audioRef.current.play().catch((e) => console.log("Audio play failed on track change:", e))
        }
    }, [currentTrackIndex, mounted])

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length)
    }

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
    }

    if (!mounted) return <div className="fixed bottom-6 left-6 z-[100]" />

    return (
        <div className="fixed bottom-6 left-6 z-[100]">
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex].src}
                preload="auto"
            />

            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-black/40 p-2 shadow-2xl backdrop-blur-xl transition-all duration-300 ${isExpanded ? "pr-6" : "pr-2"
                    }`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* Progress ring/circle background */}
                <div className="relative h-12 w-12 shrink-0">
                    <svg className="h-full w-full -rotate-90">
                        <circle
                            cx="24"
                            cy="24"
                            r="22"
                            fill="transparent"
                            stroke="white"
                            strokeOpacity="0.1"
                            strokeWidth="2"
                        />
                        <motion.circle
                            cx="24"
                            cy="24"
                            r="22"
                            fill="transparent"
                            stroke="currentColor"
                            className="text-primary"
                            strokeWidth="2"
                            strokeDasharray="138.23"
                            animate={{ strokeDashoffset: 138.23 - (138.23 * progress) / 100 }}
                            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                        />
                    </svg>

                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
                    </button>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, width: 0, x: -10 }}
                            animate={{ opacity: 1, width: "auto", x: 0 }}
                            exit={{ opacity: 0, width: 0, x: -10 }}
                            className="flex items-center gap-4 overflow-hidden whitespace-nowrap"
                        >
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                    {t("music.station")}
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="h-3 w-1 rounded-full bg-white/60"
                                                animate={{
                                                    height: isPlaying ? [12, 4, 12] : 4,
                                                }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                    delay: i * 0.1,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-medium text-white/90">{t("music.ambient")}</span>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-white/10" />

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prevTrack}
                                    className="text-white/60 transition-colors hover:text-white"
                                    aria-label="Pista anterior"
                                >
                                    <SkipBack size={16} />
                                </button>
                                <button
                                    onClick={nextTrack}
                                    className="text-white/60 transition-colors hover:text-white"
                                    aria-label="Siguiente pista"
                                >
                                    <SkipForward size={16} />
                                </button>
                                <button
                                    onClick={toggleMute}
                                    className="text-white/60 transition-colors hover:text-white"
                                    aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                                >
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
