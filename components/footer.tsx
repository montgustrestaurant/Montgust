"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <footer className="bg-foreground py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="font-serif text-2xl font-bold text-background">Mont-Gust</h3>
              <div className="mt-3 h-16 w-full rounded bg-background/10 animate-pulse" />
            </div>
            <div>
              <div className="mb-4 h-4 w-20 rounded bg-background/10 animate-pulse" />
              <div className="flex flex-col gap-2.5">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-4 w-24 rounded bg-background/5 animate-pulse" />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4 h-4 w-28 rounded bg-background/10 animate-pulse" />
              <div className="flex flex-col gap-3">
                <div className="h-4 w-48 rounded bg-background/5 animate-pulse" />
                <div className="h-4 w-32 rounded bg-background/5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  const quickLinks = [
    { label: t("nav.home"), href: "/#inicio" },
    { label: t("nav.menu"), href: "/#carta" },
    { label: t("nav.schedule"), href: "/#horario" },
    { label: t("nav.essence"), href: "/#esencia" },
    { label: t("nav.news"), href: "/novedades" },
    { label: t("nav.contact"), href: "/#contacto" },
  ]

  return (
    <footer className="bg-foreground py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-background">
              Mont-Gust
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-background/60">
              {t("footer.desc")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-widest text-accent">
              {t("footer.links")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-widest text-accent">
              {t("footer.info")}
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="shrink-0 text-accent" />
                <span className="text-sm text-background/60">
                  Carrer de Cambrils, 15, Mont-roig del Camp
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-accent" />
                <span className="text-sm text-background/60">
                  +34 603 744 847
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-8 text-center">
          <p className="text-xs text-background/40">
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
