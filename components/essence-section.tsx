"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Utensils, Home, PartyPopper, Briefcase, Snowflake, Leaf } from "lucide-react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"

export function EssenceSection() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      Icon: Utensils,
      name: t("essence.features.takeaway.name"),
      description: t("essence.features.takeaway.desc"),
      href: "#contacto",
      cta: t("essence.features.takeaway.cta"),
      className: "col-span-3 lg:col-span-1",
      background: <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-orange-200/20" />,
    },
    {
      Icon: Home,
      name: t("essence.features.homemade.name"),
      description: t("essence.features.homemade.desc"),
      href: "#carta",
      cta: t("essence.features.homemade.cta"),
      className: "col-span-3 lg:col-span-2",
      background: <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-blue-200/20" />,
    },
    {
      Icon: PartyPopper,
      name: t("essence.features.events.name"),
      description: t("essence.features.events.desc"),
      href: "#contacto",
      cta: t("essence.features.events.cta"),
      className: "col-span-3 lg:col-span-2",
      background: <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-purple-200/20" />,
    },
    {
      Icon: Briefcase,
      name: t("essence.features.business.name"),
      description: t("essence.features.business.desc"),
      href: "#contacto",
      cta: t("essence.features.business.cta"),
      className: "col-span-3 lg:col-span-1",
      background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-emerald-200/20" />,
    },
    {
      Icon: Snowflake,
      name: t("essence.features.ac.name"),
      description: t("essence.features.ac.desc"),
      href: "#contacto",
      cta: t("essence.features.ac.cta"),
      className: "col-span-3 lg:col-span-1",
      background: <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 to-cyan-200/20" />,
    },
    {
      Icon: Leaf,
      name: t("essence.features.inclusive.name"),
      description: t("essence.features.inclusive.desc"),
      href: "#carta",
      cta: t("essence.features.inclusive.cta"),
      className: "col-span-3 lg:col-span-2",
      background: <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-green-200/20" />,
    },
  ]

  return (
    <section id="esencia" className="bg-background py-20 md:py-28 min-h-[800px]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-semibold tracking-widest text-primary">
            {mounted ? t("essence.badge") : "Nuestra esencia"}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            {mounted ? t("essence.title") : "Cocinamos con el corazón"}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
        </motion.div>

        {!mounted ? (
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1 rounded-xl bg-secondary/20 animate-pulse h-[400px]" />
            <div className="lg:col-span-2 grid gap-4 grid-cols-3 grid-rows-3 h-[400px]">
              <div className="col-span-1 row-span-1 bg-secondary/20 animate-pulse rounded-xl" />
              <div className="col-span-2 row-span-1 bg-secondary/20 animate-pulse rounded-xl" />
              <div className="col-span-2 row-span-1 bg-secondary/20 animate-pulse rounded-xl" />
              <div className="col-span-1 row-span-1 bg-secondary/20 animate-pulse rounded-xl" />
              <div className="col-span-1 row-span-1 bg-secondary/20 animate-pulse rounded-xl" />
              <div className="col-span-2 row-span-1 bg-secondary/20 animate-pulse rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main highlights */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="relative overflow-hidden rounded-xl h-full min-h-[400px]">
                <Image
                  src="/montgust/exposicion/foto_expo_bentogrid.png"
                  alt="Nuestro restaurante"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Bento Grid Features */}
            <div className="lg:col-span-2">
              <BentoGrid className="lg:grid-rows-3">
                {features.map((feature) => (
                  <BentoCard key={feature.name} {...feature} />
                ))}
              </BentoGrid>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
