"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { GiSprout, GiFriedEggs, GiMilkCarton, GiFishbone, GiSnail, GiShrimp, GiPeanut } from "react-icons/gi"
import { useLanguage } from "@/context/language-context"

const AllergenIcon = ({ type, className = "w-4 h-4" }: { type: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    veg: <GiSprout className={className} title="Vegetariano" />,
    egg: <GiFriedEggs className={className} title="Huevo" />,
    milk: <GiMilkCarton className={className} title="Lácteos" />,
    fish: <GiFishbone className={className} title="Pescado" />,
    shell: <GiSnail className={className} title="Moluscos" />,
    crust: <GiShrimp className={className} title="Crustáceos" />,
    nut: <GiPeanut className={className} title="Frutos secos" />,
  }
  return icons[type] || null
}

export function MenuSection() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("compartir")
  const [selectedMenu, setSelectedMenu] = useState<any | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = useMemo(() => [
    { id: "daily", label: t("menu.categories.daily"), href: "https://www.instagram.com/mont_gust/" },
    { id: "compartir", label: t("menu.categories.tapas") },
    { id: "ensaladas", label: t("menu.categories.ensaladas") || "Ensaladas" },
    { id: "fuertes", label: t("menu.categories.carnes") },
    { id: "arroces", label: t("menu.categories.paellas") },
    { id: "pequenos", label: t("menu.categories.kids") },
    { id: "celebracion", label: t("menu.categories.celebration") },
    { id: "postres", label: t("menu.categories.postres") },
  ], [t])

  const menuItems: any = useMemo(() => ({
    // ... items content remains identical
    // [Note: I am shortening the content in this replacement to focus on the logic changes]
    compartir: [
      { name: t("menu.items.pan_cristal"), description: "", price: "3.50", image: "/montgust/platos/carta/para_compartir/pan_cristal_tomate.png", allergens: ["veg"] },
      { name: t("menu.items.alcachofas"), description: "", price: "10.90", image: "/montgust/platos/carta/para_compartir/alcachofa_confitada.jpeg", allergens: ["nut", "veg"] },
      { name: t("menu.items.bravas"), description: "", price: "7.90", image: "/montgust/platos/carta/para_compartir/bravas.png", allergens: ["veg"] },
      { name: t("menu.items.torreznos"), description: "", price: "11.50", image: "/montgust/platos/carta/para_compartir/torreznos.png" },
      { name: t("menu.items.croquetas"), description: t("menu.items.croquetas_desc"), price: "10.80", image: "/montgust/platos/carta/para_compartir/croquetas.png", allergens: ["veg", "egg", "shell"] },
      { name: t("menu.items.zamburinas"), description: "", price: "13.00", image: "/montgust/platos/carta/para_compartir/zamburiñas.jpeg", allergens: ["shell"] },
      { name: t("menu.items.calamarcitos"), description: t("menu.items.calamarcitos_desc"), price: "14.50", image: "/montgust/platos/carta/para_compartir/calamarcitos.png", allergens: ["shell"] },
      { name: t("menu.items.mejillones"), description: "", price: "11.90", image: "/montgust/platos/carta/para_compartir/mejillones.png", allergens: ["shell", "veg"] },
      { name: t("menu.items.carpaccio_buey"), description: t("menu.items.carpaccio_buey_desc"), price: "11.90", image: "/placeholder.jpg", allergens: ["milk"] },
      { name: t("menu.items.carpaccio_bacalao"), description: t("menu.items.carpaccio_bacalao_desc"), price: "14.50", image: "/placeholder.jpg", allergens: ["fish", "nut"] },
      { name: t("menu.items.tabla_jamon"), description: t("menu.items.tabla_jamon_desc"), price: "19.90", image: "/placeholder.jpg", allergens: ["veg", "milk"] },
    ],
    ensaladas: [
      { name: t("menu.items.burrata"), description: t("menu.items.burrata_desc"), price: "11.90", image: "/placeholder.jpg", allergens: ["milk", "nut"] },
      { name: t("menu.items.langostinos"), description: "", price: "12.50", image: "/placeholder.jpg", allergens: ["crust"] },
    ],
    fuertes: [
      { name: t("menu.items.entrecot"), description: t("menu.items.entrecot_desc"), price: "19.50", image: "/montgust/platos/carta/platos_fuertes/entrecot.png" },
      { name: t("menu.items.solomillo"), description: t("menu.items.solomillo_desc"), price: "19.50", image: "/montgust/platos/carta/platos_fuertes/solomillo.jpeg" },
      { name: t("menu.items.parrillada"), description: t("menu.items.parrillada_desc"), price: "26.90", image: "/montgust/platos/carta/platos_fuertes/parrillada.png", allergens: ["crust", "shell"] },
      { name: t("menu.items.secreto"), description: t("menu.items.secreto_desc"), price: "14.90", image: "/placeholder.jpg" },
      { name: t("menu.items.pulpo"), description: t("menu.items.pulpo_desc"), price: "19.50", image: "/placeholder.jpg", allergens: ["shell", "milk", "nut"] },
      { name: t("menu.items.steak_tartar"), description: "", price: "19.50", image: "/placeholder.jpg", allergens: ["veg", "egg"] },
      { name: t("menu.items.gambas"), description: "", price: "14.50", image: "/placeholder.jpg", allergens: ["crust"] },
      { name: t("menu.items.sepia"), description: "", price: "14.90", image: "/placeholder.jpg", allergens: ["shell", "egg"] },
    ],
    arroces: [
      { name: t("menu.items.paella_marinera"), description: t("menu.items.paella_desc"), price: "14.90", image: "/montgust/platos/carta/arroces/arroz_marinera.png", allergens: ["crust", "fish", "veg"] },
      { name: t("menu.items.arroz_bogavante"), description: t("menu.items.paella_bogavante_desc"), price: "19.50", image: "/montgust/platos/carta/arroces/arroz_caldoso_bogavante.png", allergens: ["crust", "veg"] },
      { name: t("menu.items.paella_bogavante"), description: t("menu.items.paella_bogavante_desc"), price: "19.50", image: "/placeholder.jpg", allergens: ["crust", "veg"] },
      { name: t("menu.items.arroz_pulpo"), description: t("menu.items.paella_desc"), price: "16.90", image: "/placeholder.jpg", allergens: ["shell", "veg"] },
    ],
    pequenos: [
      { name: t("menu.items.pollo_crujiente"), description: t("menu.items.entrecot_desc"), price: "10.50", image: "/placeholder.jpg", allergens: ["veg", "egg"] },
      { name: t("menu.items.macarrones"), description: "", price: "7.90", image: "/placeholder.jpg", allergens: ["veg", "milk"] },
    ],
    postres: [
      { name: t("menu.items.brownie"), description: t("menu.items.brownie_desc"), price: "5.50", image: "/montgust/platos/carta/postres/brownie.png", allergens: ["veg", "milk", "nut"] },
      { name: t("menu.items.tarta_manzana"), description: "", price: "5.50", image: "/montgust/platos/carta/postres/tarta_manzana.png", allergens: ["veg", "egg", "milk"] },
      { name: t("menu.items.tarta_queso"), description: "", price: "4.90", image: "/placeholder.jpg", allergens: ["veg", "milk", "nut"] },
      { name: t("menu.items.coulant"), description: "", price: "5.90", image: "/placeholder.jpg", allergens: ["veg", "milk", "egg"] },
      { name: t("menu.items.sorbetes"), description: "", price: "5.90", image: "/placeholder.jpg", allergens: ["veg"] },
    ],
    celebracion: [
      {
        name: t("menu.items.menu_25_50"),
        description: t("menu.items.menu_25_50_desc"),
        price: "25.50",
        image: "/montgust/exposicion/portada_menu_celebración.png",
        details: [
          {
            title: t("menu.categories.tapas"),
            items: [
              { name: "Jamón ibérico con pan cristal", allergens: ["veg"], image: "/montgust/platos/carta/para_compartir/pan_cristal_tomate.png" },
              { name: "Patatas bravas estilo Montgust", allergens: ["veg"], image: "/montgust/platos/carta/para_compartir/bravas.png" },
              { name: "Surtido de croquetas", allergens: ["egg", "shell"], image: "/montgust/platos/carta/para_compartir/croquetas.png" },
              { name: "Buñuelo de bacalao con miel y mostaza", allergens: ["fish", "egg"] },
              { name: "Brocheta de gambas con teriyaki", allergens: ["crust"] },
              { name: "Mini hamburguesas con queso", allergens: ["milk"] },
              { name: "Degustación de fideuá" },
            ]
          },
          {
            title: t("menu.categories.postres"),
            items: [
              { name: "Brownie de chocolate con vainilla", allergens: ["milk", "nut"], image: "/montgust/platos/carta/postres/brownie.png" },
              { name: "Helado artesano", allergens: ["milk"] },
            ]
          },
          {
            title: t("menu.modal.includes"),
            items: [{ name: t("menu.modal.includes_desc") }]
          }
        ]
      },
      {
        name: t("menu.items.menu_26_50"),
        description: t("menu.items.menu_26_50_desc"),
        price: "26.50",
        image: "/montgust/exposicion/portada_menu_celebración.png",
        details: [
          {
            title: t("menu.categories.tapas"),
            items: [
              { name: "Patatas bravas estilo Montgust", allergens: ["veg"], image: "/montgust/platos/carta/para_compartir/bravas.png" },
              { name: "Mejillones a la marinera", allergens: ["shell"], image: "/montgust/platos/carta/para_compartir/mejillones.png" },
              { name: "Calamares rebozados", allergens: ["shell", "egg"] },
            ]
          },
          {
            title: "Plato principal (a elegir)",
            items: [
              { name: "Solomillo de cerdo a la brasa" },
              { name: "Caballa a la plancha con verduras", allergens: ["fish"] },
              { name: "Paella de galeras", allergens: ["crust", "fish"] },
            ]
          },
          {
            title: t("menu.categories.postres"),
            items: [
              { name: "Tarta de manzana", allergens: ["milk", "egg", "veg"], image: "/montgust/platos/carta/postres/tarta_manzana.png" },
              { name: "Helado artesano", allergens: ["milk"] },
            ]
          },
          {
            title: t("menu.modal.includes"),
            items: [{ name: t("menu.modal.includes_desc") }]
          }
        ]
      },
      {
        name: t("menu.items.menu_29_50"),
        description: t("menu.items.menu_29_50_desc"),
        price: "29.50",
        image: "/montgust/exposicion/portada_menu_celebración.png",
        details: [
          {
            title: t("menu.categories.tapas"),
            items: [
              { name: "Jamón con pan de cristal y tomate", allergens: ["veg"], image: "/montgust/platos/carta/para_compartir/pan_cristal_tomate.png" },
              { name: "Bravas con chorizo picante" },
              { name: "Buñuelo de bacalao con miel y mostaza", allergens: ["fish", "egg"] },
              { name: "Degustación de fideuá con alioli", allergens: ["egg"] },
            ]
          },
          {
            title: "Plato principal (a elegir)",
            items: [
              { name: "Lubina al horno con salsa de langostinos", allergens: ["fish", "crust"] },
              { name: "Solomillo de cerdo a la barbacoa" },
            ]
          },
          {
            title: t("menu.categories.postres"),
            items: [
              { name: "Brownie de chocolate con crema cítrica", allergens: ["milk", "nut"], image: "/montgust/platos/carta/postres/brownie.png" },
              { name: "Sorbete de mandarina", allergens: ["veg"] },
            ]
          },
          {
            title: t("menu.modal.includes"),
            items: [{ name: t("menu.modal.includes_desc") }]
          }
        ]
      },
    ],
  }), [t])

  return (
    <section id="carta" className="bg-background py-20 md:py-28 min-h-[1000px]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-semibold tracking-widest text-primary">
            {mounted ? t("menu.badge") : "Nuestra Carta"}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            {mounted ? t("menu.title") : "Sabores que enamoran"}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
        </motion.div>

        {!mounted ? (
          <>
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-10 w-24 rounded-sm bg-secondary/40 animate-pulse" />
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="rounded-lg bg-card border border-border/50 h-[320px] overflow-hidden">
                  <div className="h-48 bg-secondary/20 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-3/4 bg-secondary/40 animate-pulse rounded" />
                    <div className="h-3 w-1/2 bg-secondary/20 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Category tabs */}
            <motion.div
              className="mb-8 flex w-full overflow-x-auto overflow-y-hidden pb-4 pt-1 snap-x snap-mandatory scroll-smooth md:flex-wrap md:justify-center md:overflow-visible gap-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((cat: any) => {
                const isDaily = cat.id === "daily"
                const content = (
                  <button
                    key={cat.id}
                    onClick={() => !cat.href && setActiveCategory(cat.id)}
                    className={`whitespace-nowrap flex-shrink-0 snap-center rounded-full px-6 py-2.5 text-sm font-bold tracking-wide transition-all ${activeCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : isDaily
                          ? "bg-primary/10 text-primary border-2 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.3)] animate-pulse-subtle"
                          : "bg-secondary/60 text-secondary-foreground hover:bg-secondary border border-border/50"
                      }`}
                  >
                    {cat.label}
                  </button>
                )

                if (cat.href) {
                  return (
                    <a
                      key={cat.id}
                      href={cat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 snap-center"
                    >
                      {content}
                    </a>
                  )
                }

                return content
              })}
            </motion.div>

            {/* Menu items grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {menuItems[activeCategory]?.map((item: any) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={item.name}
                    onClick={() => item.details && setSelectedMenu(item)}
                    className={`group overflow-hidden rounded-lg bg-card shadow-sm transition-all hover:shadow-lg ${item.details ? "cursor-pointer" : ""
                      }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-foreground/10 transition-opacity group-hover:opacity-0" />
                      {item.details && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                            {t("menu.details")}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-serif text-lg font-bold text-card-foreground">
                            {item.name}
                          </h3>
                          {item.allergens && (
                            <div className="mt-1 flex gap-2">
                              {item.allergens.map((type: string) => (
                                <AllergenIcon key={type} type={type} className="h-4 w-4 text-primary/60" />
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="shrink-0 rounded-sm bg-primary/10 px-2 py-1 text-sm font-bold text-primary">
                          {item.price}{"€"}
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                      {item.details && (
                        <p className="mt-3 text-xs font-bold tracking-wider text-primary">
                          {t("menu.modal.click_for_full")}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* Detail Modal Content Remains */}

      {/* Detail Modal */}
      {selectedMenu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedMenu(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMenu(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/50 p-2 text-foreground transition-colors hover:bg-background"
            >
              ✕
            </button>

            <div className="p-8 md:p-12">
              <div className="mb-8 text-center">
                <h3 className="font-serif text-3xl font-bold md:text-4xl">{selectedMenu.name}</h3>
                <p className="mt-2 text-xl font-bold text-primary">{selectedMenu.price}{t("menu.modal.price_per_person")}</p>
                <div className="mx-auto mt-4 h-0.5 w-12 bg-accent" />
              </div>

              <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-10">
                  {selectedMenu.details?.map((section: any, idx: number) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="font-serif text-xl font-bold text-primary tracking-wider">
                        {section.title}
                      </h4>
                      <ul className="space-y-3">
                        {section.items.map((plate: any, pIdx: number) => (
                          <li key={pIdx} className="group">
                            <div className="flex items-center gap-3">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span className="font-medium">{plate.name}</span>
                              <div className="flex gap-1">
                                {plate.allergens?.map((type: string) => (
                                  <AllergenIcon key={type} type={type} className="h-3.5 w-3.5 text-primary/40" />
                                ))}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-serif text-xl font-bold text-primary tracking-wider">
                    {t("menu.modal.gallery")}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedMenu.details?.flatMap((s: any) => s.items).filter((i: any) => i.image).length === 0 ? (
                      <div className="col-span-2 rounded-lg bg-secondary/50 p-8 text-center text-sm text-muted-foreground italic">
                        {t("menu.modal.coming_soon")}
                      </div>
                    ) : (
                      selectedMenu.details?.flatMap((s: any) => s.items).filter((i: any) => i.image).map((itemWithImg: any, iidx: number) => (
                        <div key={iidx} className="relative aspect-square overflow-hidden rounded-md border border-border">
                          <Image
                            src={itemWithImg.image!}
                            alt={itemWithImg.name}
                            fill
                            className="object-cover transition-transform hover:scale-110"
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center text-sm italic text-muted-foreground border-t border-border pt-6">
                {t("menu.modal.footer_note")}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
