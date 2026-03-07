import { Navbar } from "@/components/navbar"
import { HeroCarousel } from "@/components/hero-carousel"
import { MenuSection } from "@/components/menu-section"
import { ScheduleSection } from "@/components/schedule-section"
import { EssenceSection } from "@/components/essence-section"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { MobileNewsButton } from "@/components/mobile-news-button"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroCarousel />
      <MenuSection />
      <ScheduleSection />
      <EssenceSection />
      <ReviewsCarousel />
      <ContactSection />
      <Footer />
      <MobileNewsButton />
    </main>
  )
}
