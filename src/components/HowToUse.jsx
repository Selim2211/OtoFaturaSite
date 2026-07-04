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
    images: [{ src: '/screenshots/adim-1-kurulum.png', label: 'OtoFatura Kurulum Sihirbazı', w: 599, h: 464 }],
  },
  {
    n: '02',
    icon: MousePointerClick,
    title: 'Faturanızı Sürükleyip Bırakın',
    desc: 'Açılan ekranın ortasındaki alana fatura veya fişlerinizi sürükleyin. PDF, JPG, PNG — hepsi olur. Birden fazla belgeyi aynı anda atabilirsiniz.',
    tag: 'Yükleme',
    images: [{ src: '/screenshots/adim-2-yukle.png', label: 'Sürükle & Bırak Ekranı', w: 1344, h: 889 }],
  },
  {
    n: '03',
    icon: ScanLine,
    title: 'Taranan Kalemleri İnceleyin ve Aktarın',
    desc: 'OtoFatura faturayı saniyeler içinde okur; ürünleri ve firmayı kendi kayıtlarınızla eşleştirir. Hızlıca göz atın, doğruysa tek tuşla "Wolvox ERP\'ye Aktar" deyin.',
    tag: 'İnceleme',
    images: [{ src: '/screenshots/adim-3-incele.png', label: 'Eşleştirilen Fatura Kalemleri', w: 1915, h: 1007 }],
  },
  {
    n: '04',
    icon: CheckCircle2,
    title: 'İşlem Tamam — Her Şey Akınsoft\'ta',
    desc: 'Hepsi bu kadar! Ürünleriniz, fatura ve cari kaydınız anında Akınsoft Wolvox\'a işlenir. Programınızı açıp kontrol edebilirsiniz — her kalem yerli yerinde.',
    tag: 'Sonuç',
    images: [
      { src: '/screenshots/adim-4-stok.png', label: 'Wolvox Stok Hareket Raporu', w: 1917, h: 186 },
      { src: '/screenshots/adim-4-cari.png', label: 'Wolvox Cari Kaydı', w: 1284, h: 23 },
    ],
  },
]

/* Ekran görüntüsünü tarayıcı/pencere çerçevesi içinde şık gösteren kart.
 * Gerçek piksel boyutları (w/h) verilerek tarayıcı yükleme öncesi doğru
 * en-boy oranını hesaplar — resim gelene kadar sayfa zıplamaz (CLS önleme). */
function Shot({ src, label, w, h }) {
  const handleError = (e) => {
    const el = e.currentTarget
    el.style.display = 'none'
    if (el.nextSibling) el.nextSibling.style.display = 'flex'
  }
  return (
    <div className="rounded-xl overflow-hidden border border-signal/12 shadow-glow bg-void">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-void-elevated border-b border-signal/10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-data text-[11px] text-ink-400 truncate">{label}</span>
      </div>
      <img src={src} alt={label} width={w} height={h} loading="lazy" decoding="async" onError={handleError} className="w-full h-auto block" />
      <div className="hidden items-center justify-center h-48 text-ink-500 text-xs flex-col gap-2 bg-void-panel">
        <ScanLine size={22} className="opacity-50" />
        <span>{label}</span>
        <span className="font-data text-[10px] text-ink-500">public/screenshots/ klasörüne ekleyin</span>
      </div>
    </div>
  )
}

/* Adım numarası — holografik dönen halka içinde teknik font */
function StepBadge({ icon: Icon, n }) {
  return (
    <div className="relative flex-shrink-0 w-14 h-14">
      <span className="holo-ring animate-holo-spin" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center glow-blue">
        <Icon size={22} className="text-white" />
      </div>
      <span className="font-data absolute -bottom-2 -right-2 text-[11px] font-bold text-void bg-signal rounded-full w-6 h-6 flex items-center justify-center">
        {n.slice(1)}
      </span>
    </div>
  )
}

function Step({ step, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const flipped = i % 2 === 1

  return (
    <div ref={ref} className="relative">
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${flipped ? 'lg:[direction:rtl]' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: flipped ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:[direction:ltr] flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <StepBadge icon={step.icon} n={step.n} />
            <span className="font-data text-[11px] font-bold uppercase tracking-widest chip px-2.5 py-1 rounded-full">
              {step.tag}
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-[1.7rem] font-extrabold text-ink-50 tracking-tight leading-snug">
            {step.title}
          </h3>
          <p className="text-base text-ink-300 leading-relaxed max-w-md">
            {step.desc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: flipped ? -40 : 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          className="lg:[direction:ltr]"
        >
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-signal/15 to-brand-600/15 rounded-3xl blur-2xl opacity-70 -z-10" />
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
    <section id="how-it-works" className="py-24 px-6 bg-void relative overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40 pointer-events-none" />
      <div className="aurora top-1/4 right-[-5%] w-[28rem] h-[28rem] bg-signal/8" />
      <div className="aurora bottom-1/4 left-[-5%] w-[26rem] h-[26rem] bg-brand-600/12" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-20"
        >
          <span className="inline-block chip text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            4 Basit Adım
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-50 tracking-tight mb-4">
            Nasıl{' '}
            <span className="text-grad">Kullanılır?</span>
          </h2>
          <p className="text-ink-300 max-w-xl mx-auto text-base leading-relaxed">
            İndirmekten Akınsoft'a kaydetmeye kadar — gerçek ekran görüntüleriyle, adım adım.
          </p>
        </motion.div>

        <div className="relative flex flex-col gap-20 lg:gap-28">
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px border-l-2 border-dashed border-signal/15 -translate-x-1/2 -z-10" />
          {steps.map((step, i) => <Step key={step.n} step={step} i={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <a
            href="#features"
            className="inline-flex items-center gap-2 text-signal font-semibold text-sm hover:gap-3 transition-all"
          >
            Özellikleri keşfet
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
