"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Instagram, MessageCircle, CalendarDays, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"

function ContactInfoCard({ icon: Icon, title, content, href, className = "" }: any) {
  const Card = (
    <div className={`flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg ${className}`}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</h4>
        <p className="mt-1 font-serif text-lg font-bold text-foreground leading-snug">{content}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="block h-full">
        {Card}
      </a>
    )
  }

  return <div className="h-full">{Card}</div>
}

export function ContactSection() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="contacto" className="bg-secondary/20 py-20 md:py-28 min-h-[600px] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] rounded-full bg-accent/5 blur-3xl opacity-50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            {mounted ? t("contact.badge") : "Contacto"}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance tracking-tight">
            {mounted ? t("contact.title") : "Reserva tu mesa"}
          </h2>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-accent" />
        </motion.div>

        {!mounted ? (
          <div className="grid gap-8 lg:grid-cols-5 h-[600px]">
            <div className="space-y-6 lg:col-span-2">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-[104px] rounded-2xl bg-card border border-border/50 animate-pulse" />
                ))}
              </div>
              <div className="h-[200px] rounded-2xl bg-primary/5 border border-primary/10 animate-pulse" />
            </div>
            <div className="h-full rounded-3xl bg-card border border-border/50 animate-pulse lg:col-span-3" />
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12 min-h-[600px]">

            {/* Left Column: Info Cards & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 lg:col-span-5"
            >
              {/* Top info cards grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                <ContactInfoCard
                  icon={MapPin}
                  title={t("contact.address.title")}
                  content={t("contact.address.value")}
                  href="https://maps.google.com/?q=Mont-Gust+Restaurant"
                />

                <ContactInfoCard
                  icon={Phone}
                  title={t("contact.phone.title")}
                  content="+34 603 74 48 47"
                  href="tel:+34603744847"
                />
              </div>

              {/* Reservation CTA Box */}
              <div className="mt-auto relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:p-10 text-center shadow-inner">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />

                <div className="relative z-10">
                  <h3 className="font-serif text-3xl font-bold text-foreground">
                    {t("contact.reservations.title")}
                  </h3>
                  <p className="mt-3 text-muted-foreground text-sm lg:text-base text-balance mx-auto max-w-sm">
                    {t("contact.reservations.desc")}
                  </p>

                  <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <Button
                      size="lg"
                      className="group flex-1 items-center gap-2 rounded-xl bg-primary text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
                      asChild
                    >
                      <a href="tel:+34603744847">
                        <Phone size={18} />
                        {t("contact.reservations.call")}
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="group flex-1 items-center gap-2 rounded-xl border-primary/20 bg-background/50 backdrop-blur-sm transition-all hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-0.5"
                      asChild
                    >
                      <a
                        href="http://wa.me/34603744847"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle size={18} />
                        {t("contact.reservations.whatsapp")}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center pt-2">
                <a
                  href="https://www.instagram.com/montgust_restaurant/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-border/50 bg-card px-6 py-3 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <Instagram size={16} />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                    SÍGUENOS EN INSTAGRAM
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Map Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 relative h-[400px] lg:h-auto overflow-hidden rounded-3xl shadow-xl border border-border/50 group bg-card"
            >
              {/* Neutral background pattern shown while image loads or if it fails */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

              <iframe
                src="https://maps.google.com/maps?q=Mont-Gust%20Restaurant%2C%20Mont-roig%20del%20Camp&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-[1.1] opacity-90 transition-transform duration-700 group-hover:scale-105"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-background/95 p-5 lg:p-6 shadow-2xl backdrop-blur-xl border border-border/50 transition-transform group-hover:-translate-y-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={16} className="text-primary" />
                      <p className="text-sm font-bold tracking-widest text-primary uppercase">MONT-GUST</p>
                    </div>
                    <p className="text-foreground font-medium pl-6">
                      Carrer de Cambrils, 15
                    </p>
                    <p className="text-muted-foreground text-sm pl-6">
                      43300 Mont-roig del Camp, Tarragona
                    </p>
                  </div>
                  <Button size="lg" className="w-full sm:w-auto gap-2 rounded-xl shadow-md hover:shadow-lg transition-all" asChild>
                    <a
                      href="https://maps.google.com/?q=Mont-Gust+Restaurant"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={18} />
                      {t("contact.reservations.how_to_get")}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </section>
  )
}
