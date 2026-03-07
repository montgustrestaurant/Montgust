"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const reviews = [
  {
    name: "Emma Pedrola",
    text: "Habíamos reservado para comer a las 15:30 un sábado y, casi de inmediato, nos llamaron para informarnos de que cerraban a las 16:00 porque abrían de nuevo por la noche y debían descansar. Nos explicaron que el tiempo para comer podía ser algo justo y nos recomendaron venir a las 15:00. Nos pareció un detalle muy honesto y de agradecer. La comida estuvo deliciosa y la camarera fue extremadamente amable en todo momento. Incluso alargaron el horario hasta las 16:20 para que pudiéramos tomarnos el café con calma. Recomendamos sin duda este restaurante: el trato, el precio y la calidad de la comida son inmejorables.",
    rating: 5,
    link: "https://maps.app.goo.gl/jyPXQtujrEXFGLtM6",
  },
  {
    name: "Maria Beltran",
    text: "MontGust siempre es un acierto para ir a comer. Menú diario rico y bien de precio. Productos de calidad. Atención por parte de todo el personal de 10. También hemos probado el menú calçotada y fue espectacular. Los calçots estaban buenísimos!!! Sin duda un sitio al que siempre volvemos!",
    rating: 5,
    link: "https://maps.app.goo.gl/p8fpFzoSEJ25BKHWA",
  },
  {
    name: "Narcís Sabaté",
    text: "Paellas espectaculares, menú muy bien cantidad calidad precio muy bien. El servicio muy atento. Recomendado 100%",
    rating: 5,
    link: "https://maps.app.goo.gl/KNkwVPRTPfbMMywK7",
  },
  {
    name: "Cesar Pelicano",
    text: "Muy buena atención, servicio excelente. La comida excelente, el arroz de galeras espectacular. Sin esperas, todo perfecto y muy buen precio.",
    rating: 5,
    link: "https://maps.app.goo.gl/o6gSeXCj7wkT33Rs6",
  },
  {
    name: "Marta",
    text: "Servicio excelente y comida espectacular. Es difícil encontrar hoy en día un restaurante con una relación calidad-precio tan buena",
    rating: 5,
    link: "https://maps.app.goo.gl/Q79AamzVu4ETLwcR9",
  },
]

export function ReviewsCarousel() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  const handleNext = useCallback(() => {
    setIsFading(true)
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % reviews.length)
      setIsFading(false)
    }, 300)
  }, [])

  const handlePrev = useCallback(() => {
    setIsFading(true)
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length)
      setIsFading(false)
    }, 300)
  }, [])

  const handleDotClick = (index: number) => {
    if (index === current) return
    setIsFading(true)
    setTimeout(() => {
      setCurrent(index)
      setIsFading(false)
    }, 300)
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 6000)
    return () => clearInterval(interval)
  }, [handleNext])

  if (!mounted) {
    return (
      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mx-auto h-4 w-20 rounded bg-primary/20 animate-pulse" />
            <div className="mx-auto mt-4 h-8 w-64 rounded bg-foreground/10 animate-pulse" />
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
          </div>
          <div className="min-h-[460px] rounded-lg bg-card p-8 md:p-12 shadow-lg animate-pulse" />
        </div>
      </section>
    )
  }

  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold tracking-widest text-primary">
            {t("reviews.badge")}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            {t("reviews.title")}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
        </div>

        <div className="relative">
          <div className="flex min-h-[700px] flex-col rounded-lg bg-card p-8 shadow-lg md:min-h-[520px] lg:min-h-[460px] md:p-12">
            <div className={`flex flex-1 flex-col transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}>
              <p className="mb-6 flex-1 font-serif text-lg leading-relaxed text-card-foreground md:text-xl">
                {reviews[current].text}
              </p>
              <div className="mt-auto flex items-end justify-between pt-6">
                <div>
                  <div className="flex items-baseline gap-3">
                    <p className="font-serif text-xl font-semibold text-card-foreground">
                      {reviews[current].name}
                    </p>
                    <a
                      href={reviews[current].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary/60 transition-colors hover:text-primary hover:underline"
                    >
                      {t("reviews.google_maps")}
                    </a>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < reviews[current].rating
                            ? "fill-accent text-accent"
                            : "text-border"
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handlePrev}
                    className="group rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                    aria-label="Reseña anterior"
                  >
                    <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="group rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                    aria-label="Reseña siguiente"
                  >
                    <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${index === current
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30"
                }`}
              aria-label={`Ir a resenya ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
