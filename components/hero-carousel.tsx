"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function HeroCarousel() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  const slides = [
    {
      image: "/montgust/WhatsApp Image 2026-03-07 at 15.03.22.jpeg",
      title: t("hero.slide1.title"),
      subtitle: t("hero.slide1.subtitle"),
    },
    {
      image: "/montgust/dentro.png",
      title: t("hero.slide2.title"),
      subtitle: t("hero.slide2.subtitle"),
    },
    {
      image: "/montgust/platos/exposicion/bogavante_expo.png",
      title: t("hero.slide3.title"),
      subtitle: t("hero.slide3.subtitle"),
    },
  ]

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  const activeSlide = slides[current] || slides[0]

  if (!mounted) {
    return (
      <section id="inicio" className="relative h-screen w-full overflow-hidden bg-foreground/80">
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="h-12 w-64 rounded bg-primary-foreground/10 animate-pulse" />
          <div className="mt-4 h-6 w-48 rounded bg-primary-foreground/5 animate-pulse" />
          <div className="mt-8 h-12 w-32 rounded-sm bg-primary-foreground/10 animate-pulse" />
        </div>
      </section>
    )
  }

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-6xl lg:text-7xl text-balance">
          {activeSlide.title}
        </h1>
        <p className="mt-4 text-lg font-light tracking-wide text-primary-foreground/90 md:text-xl">
          {activeSlide.subtitle}
        </p>
        <a
          href="/#carta"
          onClick={(e) => {
            e.preventDefault()
            const element = document.getElementById("carta")
            if (element) {
              const offset = 80
              const bodyRect = document.body.getBoundingClientRect().top
              const elementRect = element.getBoundingClientRect().top
              const elementPosition = elementRect - bodyRect
              const offsetPosition = elementPosition - offset

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              })
            }
          }}
          className="mt-8 inline-block rounded-sm bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
        >
          {t("hero.cta")}
        </a>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/20 p-2 text-primary-foreground backdrop-blur-sm transition-all hover:bg-background/40"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/20 p-2 text-primary-foreground backdrop-blur-sm transition-all hover:bg-background/40"
        aria-label="Imagen siguiente"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all ${index === current
              ? "w-8 bg-primary"
              : "w-2.5 bg-primary-foreground/50"
              }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
