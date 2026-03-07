"use client"

import { useState, useEffect } from "react"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"

const getNavLinks = (t: (key: string) => any) => [
  { label: t("nav.home"), href: "/#inicio" },
  { label: t("nav.menu"), href: "/#carta" },
  { label: t("nav.schedule"), href: "/#horario" },
  { label: t("nav.essence"), href: "/#esencia" },
  { label: t("nav.news"), href: "/novedades" },
  { label: t("nav.contact"), href: "/#contacto" },
]

function LanguageSelector({ scrolled }: { scrolled: boolean }) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "ca", label: "CA" },
    { code: "fr", label: "FR" },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold transition-all ${scrolled
          ? "border-primary/20 text-primary hover:bg-primary/10"
          : "border-white/20 text-white hover:bg-white/10"
          }`}
      >
        <Globe size={14} />
        {language.toUpperCase()}
        <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 min-w-[80px] overflow-hidden rounded-lg border border-border bg-background/95 shadow-xl backdrop-blur-md"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2 text-left text-xs font-medium transition-colors hover:bg-secondary hover:text-primary ${language === lang.code ? "bg-secondary text-primary" : "text-foreground"
                  }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(forceScrolled)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = getNavLinks(t)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (forceScrolled) {
        setScrolled(true)
      } else {
        setScrolled(window.scrollY > 50)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [forceScrolled])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return

    e.preventDefault()
    const targetId = href.replace("/#", "")
    const element = document.getElementById(targetId)

    if (element) {
      const offset = 80 // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })

      setMobileOpen(false)
    }
  }

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="font-serif text-2xl font-bold text-primary-foreground">Mont-Gust</div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 backdrop-blur-md shadow-md"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#inicio"
          onClick={(e) => scrollToSection(e, "/#inicio")}
          className="flex items-center gap-2"
        >
          <span
            className={`font-serif text-2xl font-bold tracking-wide transition-colors duration-300 ${scrolled ? "text-primary" : "text-primary-foreground"
              }`}
          >
            Mont-Gust
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.li key={link.href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${scrolled ? "text-foreground" : "text-primary-foreground"
                    }`}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <LanguageSelector scrolled={scrolled} />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSelector scrolled={scrolled} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <motion.ul
              className="flex flex-col gap-1 px-6 py-4"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        y: { stiffness: 1000, velocity: -100 }
                      }
                    },
                    closed: {
                      y: 20,
                      opacity: 0,
                      transition: {
                        y: { stiffness: 1000 }
                      }
                    }
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                  >
                    <span>{link.label}</span>
                    {link.href === "/novedades" && (
                      <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary animate-pulse">
                        ✨ {t("menu.badge")}
                      </span>
                    )}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
