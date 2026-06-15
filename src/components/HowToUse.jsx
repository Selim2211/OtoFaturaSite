import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, MousePointerClick, ScanLine, CheckCircle2, ArrowRight } from 'lucide-react'

const steps = [
  {
    n: '01',
    icon: Download,
    title: 'Kurulumu 1 Dakikada Tamamlayın',
    desc: 'Tek dosyayı indirin, çift tıklayın. Karmaşık ayar yok, teknik bilgi gerekmez — kurulum sihirbazı gerisini sizin için halleder.',
    tag: 'Kurulum',
    images: [{ src: '/screenshots/adim-1-kurulum.png', label: 'OtoFatura Kurulum Sihirbazı' }],
  },
  {
    n: '02',
    icon: MousePointerClick,
    title: 'Faturanızı Sürükleyip Bırakın',
    desc: 'Açılan ekranın ortasındaki alana fatura veya fişlerinizi sürükleyin. PDF, JPG, PNG — hepsi olur. Birden fazla belgeyi aynı anda atabilirsiniz.',
    tag: 'Yükleme',
    images: [{ src: '/screenshots/adim-2-yukle.png', label: 'Sürükle & Bırak Ekranı' }],
  },
  {
    n: '03',
    icon: ScanLine,
    title: 'Taranan Kalemleri İnceleyin ve Aktarın',
    desc: 'OtoFatura faturayı saniyeler içinde okur; ürünleri ve firmayı kendi kayıtlarınızla eşleştirir. Hızlıca göz atın, doğruysa tek tuşla "Wolvox ERP\'ye Aktar" deyin.',
    tag: 'İnceleme',
    images: [{ src: '/screenshots/adim-3-incele.png', label: 'Eşleştirilen Fatura Kalemleri' }],
  },
  {
    n: '04',
    icon: CheckCircle2,
    title: 'İşlem Tamam — Her Şey Akınsoft\'ta',
    desc: 'Hepsi bu kadar! Ürünleriniz, fatura ve cari kaydınız anında Akınsoft Wolvox\'a işlenir. Programınızı açıp kontrol edebilirsiniz — her kalem yerli yerinde.',
    tag: 'Sonuç',
    images: [
      { src: '/screenshots/adim-4-stok.png', label: 'Wolvox Stok Hareket Raporu' },
      { src: '/screenshots/adim-4-cari.png', label: 'Wolvox Cari Kaydı' },
    ],
  },
]

/* Ekran görüntüsünü tarayıcı/pencere çerçevesi içinde şık gösteren kart */
function Shot({ src, label }) {
  const handleError = (e) => {
    const el = e.currentTarget
    el.style.display = 'none'
    if (el.nextSibling) el.nextSibling.style.display = 'flex'
  }
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 border-b border-slate-700">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[11px] text-slate-400 font-mono truncate">{label}</span>
      </div>
      <img src={src} alt={label} loading="lazy" onError={handleError} className="w-full block" />
      {/* Fallback */}
      <div className="hidden items-center justify-center h-48 text-slate-500 text-xs flex-col gap-2 bg-slate-900">
        <ScanLine size={22} className="opacity-50" />
        <span>{label}</span>
        <span className="text-[10px] text-slate-600 font-mono">public/screenshots/ klasörüne ekleyin</span>
      </div>
    </div>
  )
}

function Step({ step, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = step.icon
  const flipped = i % 2 === 1   // tek adımlarda görsel sola

  return (
    <div ref={ref} className="relative">
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${flipped ? 'lg:[direction:rtl]' : ''}`}>
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: flipped ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:[direction:ltr] flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-[#005B9F] flex items-center justify-center shadow-lg shadow-blue-200">
                <Icon size={24} className="text-white" />
              </div>
              <span className="absolute -top-2 -right-2 text-[34px] font-black text-blue-100 leading-none select-none -z-10">{step.n}</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#005B9F] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              {step.tag}
            </span>
          </div>
          <h3 className="text-2xl sm:text-[1.7rem] font-extrabold text-slate-900 tracking-tight leading-snug">
            {step.title}
          </h3>
          <p className="text-base text-slate-600 leading-relaxed max-w-md">
            {step.desc}
          </p>
        </motion.div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: flipped ? -40 : 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          className="lg:[direction:ltr]"
        >
          <div className="relative">
            {/* Soft glow */}
            <div className="absolute -inset-3 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-3xl blur-2xl opacity-60 -z-10" />
            {step.images.length === 1 ? (
              <Shot {...step.images[0]} />
            ) : (
              <div className="flex flex-col gap-3">
                {step.images.map((img) => <Shot key={img.src} {...img} />)}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function HowToUse() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-20"
        >
          <span className="inline-block bg-blue-50 text-[#005B9F] text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 mb-4 uppercase tracking-wider">
            4 Basit Adım
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Nasıl{' '}
            <span className="text-brand-gradient">Kullanılır?</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base leading-relaxed">
            İndirmekten Akınsoft'a kaydetmeye kadar — gerçek ekran görüntüleriyle, adım adım.
          </p>
        </motion.div>

        {/* Steps with vertical connector */}
        <div className="relative flex flex-col gap-20 lg:gap-28">
          {/* Center dashed line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px border-l-2 border-dashed border-slate-200 -translate-x-1/2 -z-10" />
          {steps.map((step, i) => <Step key={step.n} step={step} i={i} />)}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <a
            href="#features"
            className="inline-flex items-center gap-2 text-[#005B9F] font-semibold text-sm hover:gap-3 transition-all"
          >
            Özellikleri keşfet
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
