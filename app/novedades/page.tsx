"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MusicPlayer } from "@/components/music-player"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import { IconTools, IconClock, IconUsers, IconMessage } from "@tabler/icons-react"
import { Marquee } from "@/components/ui/marquee"

export default function NovedadesPage() {
    const { t } = useLanguage()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar forceScrolled={true} />
                <div className="pt-32 px-6 max-w-7xl mx-auto">
                    <div className="h-12 w-64 bg-secondary animate-pulse rounded-md mb-4" />
                    <div className="h-6 w-96 bg-secondary animate-pulse rounded-md" />
                </div>
            </main>
        )
    }

    const vegetablePhotos = [
        "/montgust/novedades/alcachofa.jpeg",
        "/montgust/novedades/berenjena.jpeg",
        "/montgust/novedades/pimiento.jpeg",
    ];

    const data = [
        {
            category: t("news.calcotada.category"),
            title: t("news.calcotada.title"),
            src: "/montgust/novedades/calcots1.jpg",
            content: (
                <CalcotadaContent
                    translatedMenu={t("news.calcotada", { returnObjects: true }) as any}
                    photos={vegetablePhotos}
                />
            ),
        },
        {
            category: t("news.tapas_menu.category"),
            title: t("news.tapas_menu.title"),
            src: "/montgust/novedades/tapas.jpeg",
            content: (
                <TapasContent
                    translatedMenu={t("news.tapas_menu", { returnObjects: true }) as any}
                />
            ),
        },
    ];

    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar forceScrolled={true} />

            {/* Hero Header */}
            <section className="relative pt-40 pb-20 px-6 bg-secondary/30 border-b border-border">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link
                            href="/"
                            className="group mb-8 flex items-center gap-2 text-sm font-bold text-primary transition-all"
                        >
                            <motion.div
                                whileHover={{ x: -5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft size={16} />
                                <span className="group-hover:underline">{t("news.back_home")}</span>
                            </motion.div>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
                            {t("news.title")}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t("news.subtitle")}
                        </p>
                        <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-accent" />
                    </motion.div>
                </div>
            </section>

            {/* Carousel Section */}
            <section className="flex-1 py-10 md:py-20 bg-background overflow-hidden">
                <Carousel items={cards} />
            </section>

            <Footer />
            <MusicPlayer />
        </main>
    )
}

const Content = ({ text, image }: { text: string; image: string }) => {
    return (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                    La esencia de Mont-Gust en cada detalle.
                </span>{" "}
                {text}
            </p>
            <div className="relative aspect-video mt-8 overflow-hidden rounded-2xl">
                <img
                    src={image}
                    alt="News item image"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

const CalcotadaContent = ({ translatedMenu, photos }: { translatedMenu: any; photos: string[] }) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 text-center">
                        {translatedMenu.title}
                    </h3>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 text-center mb-10 italic">
                        {translatedMenu.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Left Column: Starters & Main */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 border-b border-primary/20 pb-2 mb-4">
                                    <IconUsers className="text-primary" size={24} />
                                    {translatedMenu.sharing}
                                </h4>
                                <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary font-bold mt-1.5">•</span>
                                        {translatedMenu.croquettes}
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary font-bold mt-1.5">•</span>
                                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">{translatedMenu.calcots}</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 border-b border-primary/20 pb-2 mb-4">
                                    <IconTools className="text-primary" size={24} />
                                    {translatedMenu.second}
                                </h4>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    {translatedMenu.meat_grill}
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Dessert & Info */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 border-b border-primary/20 pb-2 mb-4">
                                    <IconClock className="text-primary" size={24} />
                                    {translatedMenu.dessert}
                                </h4>
                                <p className="text-neutral-800 dark:text-neutral-200 font-semibold italic">
                                    {translatedMenu.crema_catalana}
                                </p>
                            </div>

                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                <h4 className="text-lg font-bold text-primary mb-3 tracking-wider text-center">
                                    {translatedMenu.includes}
                                </h4>
                                <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm mb-4 font-medium">
                                    {translatedMenu.drinks}
                                </p>
                                <div className="text-center">
                                    <span className="text-4xl font-serif font-black text-primary">
                                        {translatedMenu.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-3 bg-accent/20 p-4 rounded-xl text-accent-foreground text-sm font-medium border border-accent/30">
                        <IconMessage size={20} />
                        {translatedMenu.reservation}
                    </div>
                </div>
            </div>

            {/* Magic UI Marquee for Vegetables */}
            <div className="py-10 bg-secondary/10 rounded-3xl overflow-hidden">
                <h4 className="text-2xl font-serif font-bold text-center mb-8">
                    {translatedMenu.category}: Nuestras verduras de temporada
                </h4>
                <Marquee pauseOnHover className="[--duration:30s]">
                    {photos.map((photo, i) => (
                        <div
                            key={i}
                            className="relative aspect-square w-64 md:w-80 flex-shrink-0 rounded-2xl overflow-hidden group shadow-lg"
                        >
                            <img
                                src={photo}
                                alt={`Vegetable ${i}`}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

const TapasContent = ({ translatedMenu }: { translatedMenu: any }) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl">
                <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
                    <h3 className="text-4xl md:text-6xl font-serif font-black text-primary mb-2 tracking-tight">
                        {translatedMenu.title}
                    </h3>
                    <div className="bg-accent/10 px-4 py-1 rounded-full text-accent font-bold text-sm md:text-base mb-6">
                        {translatedMenu.schedule}
                    </div>

                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-xl">
                        {translatedMenu.description}
                    </p>

                    <div className="w-full bg-primary/5 p-8 md:p-12 rounded-[2rem] border-2 border-primary/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-500" />

                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-primary font-serif text-2xl md:text-3xl font-bold mb-4">
                                {translatedMenu.price}
                            </span>
                            <h4 className="text-2xl md:text-4xl font-serif font-bold text-neutral-800 dark:text-neutral-100 mb-6 leading-tight">
                                {translatedMenu.offer}
                            </h4>
                            <div className="h-0.5 w-16 bg-accent/30 mb-6" />
                            <p className="text-accent font-bold text-lg md:text-xl italic">
                                {translatedMenu.tagline}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-3 bg-white dark:bg-neutral-900 px-6 py-3 rounded-xl text-primary text-sm font-bold shadow-sm border border-primary/10">
                        <IconMessage size={20} />
                        {translatedMenu.reservation}
                    </div>
                </div>
            </div>
        </div>
    );
};
