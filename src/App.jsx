import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowToUse from './components/HowToUse'
import Features from './components/Features'
import SecurityBanner from './components/SecurityBanner'
import ROICalculator from './components/ROICalculator'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowToUse />
      <Features />
      <SecurityBanner />
      <ROICalculator />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  )
}
