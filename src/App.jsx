import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import SecurityBanner from './components/SecurityBanner'
import HowItWorks from './components/HowItWorks'
import ROICalculator from './components/ROICalculator'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <SecurityBanner />
      <HowItWorks />
      <ROICalculator />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  )
}
