"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { motion, AnimatePresence } from "framer-motion"

export function ScheduleSection() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    setMounted(true)
    // Update time every minute
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // We use a safe default to avoid hydration mismatch, 
  // but we animate the entrance once mounted to avoid the "pop"
  const schedule = [
    { day: t("schedule.days.monday"), hours: t("schedule.status.closed") },
    { day: t("schedule.days.tuesday"), hours: "08:30 - 16:30" },
    { day: t("schedule.days.wednesday"), hours: "08:30 - 16:30" },
    { day: t("schedule.days.thursday"), hours: `08:30 - 16:00 ${t("schedule.status.open")} 19:30 - 23:00` },
    { day: t("schedule.days.friday"), hours: `08:30 - 16:00 ${t("schedule.status.open")} 19:30 - 23:00` },
    { day: t("schedule.days.saturday"), hours: `08:30 - 16:00 ${t("schedule.status.open")} 19:30 - 23:00` },
    { day: t("schedule.days.sunday"), hours: "08:30 - 16:30" },
  ]

  const getCurrentDayIndex = () => {
    const day = now.getDay()
    return day === 0 ? 6 : day - 1
  }

  const checkIsOpen = (hoursString: string) => {
    if (!mounted || hoursString === t("schedule.status.closed")) return false

    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const openKeyword = t("schedule.status.open")

    const ranges = hoursString.includes(openKeyword)
      ? hoursString.split(openKeyword)
      : [hoursString]

    return ranges.some(range => {
      const match = range.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/)
      if (match) {
        const startTotal = parseInt(match[1]) * 60 + parseInt(match[2])
        const endTotal = parseInt(match[3]) * 60 + parseInt(match[4])
        return currentMinutes >= startTotal && currentMinutes <= endTotal
      }
      return false
    })
  }

  const currentDayIndex = mounted ? getCurrentDayIndex() : 0
  const currentlyOpen = mounted ? checkIsOpen(schedule[currentDayIndex].hours) : false

  return (
    <section id="horario" className="bg-secondary/30 py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-bold tracking-[0.2em] text-primary/60 uppercase">
            {t("schedule.badge")}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-6xl text-balance">
            {t("schedule.title")}
          </h2>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-accent/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden rounded-[2rem] bg-card border border-primary/5 shadow-2xl shadow-primary/5 min-h-[400px]"
        >
          <AnimatePresence mode="wait">
            {!mounted ? (
              <motion.div
                key="skeleton"
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  <p className="text-xs font-bold text-primary/40 uppercase tracking-widest animate-pulse">
                    Cargando horario...
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="flex items-center justify-between bg-primary/5 px-8 py-6 border-b border-primary/10">
            <div className="flex items-center gap-2">
              <Clock size={22} className="text-primary" />
              <span className="font-serif text-xl font-bold text-primary">
                {t("schedule.badge")}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {mounted && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] md:text-xs font-bold border ${currentlyOpen
                    ? "bg-green-500/10 text-green-600 border-green-500/20"
                    : "bg-red-500/10 text-red-600 border-red-500/20"
                    }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${currentlyOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                  {currentlyOpen
                    ? (t("nav.home") === "Inicio" ? "ABIERTO AHORA" : "OPEN NOW")
                    : (t("nav.home") === "Inicio" ? "CERRADO AHORA" : "CLOSED NOW")}
                </motion.div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 divide-y divide-primary/5">
            {schedule.map((item, index) => {
              const isToday = index === currentDayIndex && mounted
              const isClosed = item.hours === t("schedule.status.closed")

              return (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className={`group relative flex items-center justify-between px-8 py-5 transition-all duration-300 ${isToday ? "bg-primary/[0.03]" : "hover:bg-primary/[0.01]"
                    }`}
                >
                  {isToday && (
                    <motion.div
                      layoutId="activeDayBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg font-bold transition-colors ${isToday ? "text-primary" : "text-foreground/80 group-hover:text-primary"
                        }`}
                    >
                      {item.day}
                    </span>
                    {isToday && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary animate-pulse">
                        {t("nav.home") === "Inicio" ? "HOY" : "TODAY"}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div
                      className={`text-base font-medium transition-colors ${isClosed
                        ? "italic text-primary/40 line-through"
                        : isToday ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                    >
                      {item.hours.includes(t("schedule.status.open")) ? (
                        <div className="flex flex-col items-end sm:flex-row sm:gap-4">
                          {item.hours.split(t("schedule.status.open")).map((shift: string, i: number) => (
                            <span key={i} className="flex items-center gap-2">
                              {i === 1 && <span className="text-[10px] text-primary/30 font-bold hidden sm:inline">/</span>}
                              {shift.trim()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        item.hours
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
