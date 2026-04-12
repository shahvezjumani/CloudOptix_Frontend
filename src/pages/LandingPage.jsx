import Navbar               from '../components/landing/Navbar'
import HeroSection          from '../components/landing/HeroSection'
import HowItWorksSection    from '../components/landing/HowItWorksSection'
import FeaturesSection      from '../components/landing/FeaturesSection'
import InteractiveDemoSection from '../components/landing/InteractiveDemoSection'
import OptimizationSection  from '../components/landing/OptimizationSection'
import SecuritySection      from '../components/landing/SecuritySection'
import TestimonialsSection  from '../components/landing/TestimonialsSection'
import PricingSection       from '../components/landing/PricingSection'
import CTASection           from '../components/landing/CTASection'
import Footer               from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen aurora-bg text-white overflow-x-hidden">
      <div className="fixed inset-0 grid-pattern opacity-25 pointer-events-none z-0" />
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <InteractiveDemoSection />
      <OptimizationSection />
      <SecuritySection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}
