"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import es from "../translations/es.json"
import en from "../translations/en.json"
import ca from "../translations/ca.json"
import fr from "../translations/fr.json"

type Language = "es" | "en" | "ca" | "fr"

const translations = { es, en, ca, fr }

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string, options?: any) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("es")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language
        if (savedLanguage && translations[savedLanguage]) {
            setLanguageState(savedLanguage)
        }
        // Small delay to let first paint settle, then fade in
        requestAnimationFrame(() => {
            setMounted(true)
        })
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
    }

    const t = (path: string, options?: any) => {
        const keys = path.split(".")
        let result: any = translations[language]

        for (const key of keys) {
            if (result && result[key] !== undefined) {
                result = result[key]
            } else {
                console.warn(`Translation key not found: ${path}`)
                return path
            }
        }
        return result
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            <div
                style={{
                    opacity: mounted ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                }}
            >
                {children}
            </div>
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
