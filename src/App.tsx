import { useState, useRef, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  subtitle: string;
  mg: string;
  brand: string;
  desc: string;
  color: string;
  popular?: boolean;
};

const PRODUCTS: Product[] = [
  // Vidalista
  { id: 'vidalista10',  name: 'VIDALISTA® 10',  subtitle: 'Tadalafil Tablets IP 10mg',  mg: '10mg',   brand: 'Vidalista', desc: 'Long-lasting performance for a better life.',         color: 'from-[#4D2A16] to-[#8B5A2B]', popular: true },
  { id: 'vidalista20',  name: 'VIDALISTA® 20',  subtitle: 'Tadalafil Tablets IP 20mg',  mg: '20mg',   brand: 'Vidalista', desc: 'Stronger support for greater confidence.',           color: 'from-[#5C3317] to-[#9B6A3B]' },
  { id: 'vidalista40',  name: 'VIDALISTA® 40',  subtitle: 'Tadalafil Tablets IP 40mg',  mg: '40mg',   brand: 'Vidalista', desc: 'Enhanced formula for extended performance.',          color: 'from-[#3D1F0E] to-[#7A4A28]' },
  { id: 'vidalista60',  name: 'VIDALISTA® 60',  subtitle: 'Tadalafil Tablets IP 60mg',  mg: '60mg',   brand: 'Vidalista', desc: 'Maximum strength tadalafil tablet.',                 color: 'from-[#2D1508] to-[#6A3A18]' },
  { id: 'supervidalista', name: 'SUPER VIDALISTA', subtitle: 'Tadalafil + Dapoxetine', mg: 'Combo', brand: 'Vidalista', desc: 'Dual action formula for complete satisfaction.',      color: 'from-[#1a1a2e] to-[#3a3a5c]' },
  // Fildena
  { id: 'fildena50',    name: 'FILDENA® 50',    subtitle: 'Sildenafil Citrate 50mg',    mg: '50mg',   brand: 'Fildena',   desc: 'Effective sildenafil for everyday use.',            color: 'from-[#7B2D8B] to-[#A855B8]' },
  { id: 'fildena100',   name: 'FILDENA® 100',   subtitle: 'Sildenafil Citrate 100mg',   mg: '100mg',  brand: 'Fildena',   desc: 'Fast acting & reliable solution.',                  color: 'from-[#5B21B6] to-[#7C3AED]', popular: true },
  { id: 'fildena120',   name: 'FILDENA® STRONG 120', subtitle: 'Sildenafil 120mg',     mg: '120mg',  brand: 'Fildena',   desc: 'Complete support for lasting moments.',             color: 'from-[#C81E1E] to-[#8B0000]' },
  { id: 'fildenapro',   name: 'FILDENA® PROFESSIONAL', subtitle: 'Sildenafil 100mg Sublingual', mg: '100mg', brand: 'Fildena', desc: 'Fast-dissolve sublingual tablet for quick action.', color: 'from-[#9D174D] to-[#BE185D]' },
  // Vilitra
  { id: 'vilitra20',    name: 'VILITRA 20',      subtitle: 'Vardenafil 20mg',            mg: '20mg',   brand: 'Vilitra',   desc: 'Clinically proven Vardenafil excellence.',          color: 'from-[#B8962E] to-[#D4AF37]' },
  { id: 'vilitra40',    name: 'VILITRA 40',      subtitle: 'Vardenafil 40mg',            mg: '40mg',   brand: 'Vilitra',   desc: 'Stronger dose for better results.',                 color: 'from-[#92700A] to-[#B8962E]' },
  { id: 'vilitra60',    name: 'VILITRA 60',      subtitle: 'Vardenafil 60mg',            mg: '60mg',   brand: 'Vilitra',   desc: 'Maximum Vardenafil potency available.',             color: 'from-[#6B5010] to-[#92700A]' },
  // Cenforce
  { id: 'cenforce100',  name: 'CENFORCE 100',    subtitle: 'Sildenafil Tablets 100mg',   mg: '100mg',  brand: 'Cenforce',  desc: 'Trusted quality at affordable pricing.',            color: 'from-[#1B5E20] to-[#2E7D32]', popular: true },
  { id: 'cenforce150',  name: 'CENFORCE 150',    subtitle: 'Sildenafil Tablets 150mg',   mg: '150mg',  brand: 'Cenforce',  desc: 'High-strength sildenafil for maximum effect.',      color: 'from-[#145214] to-[#1B5E20]' },
  { id: 'cenforce200',  name: 'CENFORCE 200',    subtitle: 'Sildenafil Tablets 200mg',   mg: '200mg',  brand: 'Cenforce',  desc: 'Ultra-strength formula for advanced users.',        color: 'from-[#0D3D0D] to-[#145214]' },
  // Kamagra
  { id: 'kamagra100',   name: 'KAMAGRA 100',     subtitle: 'Sildenafil Jelly/Tablets',   mg: '100mg',  brand: 'Kamagra',   desc: 'Popular choice worldwide for performance.',         color: 'from-[#D97706] to-[#F59E0B]', popular: true },
  { id: 'kamagraoral',  name: 'KAMAGRA ORAL JELLY', subtitle: 'Sildenafil Jelly 100mg', mg: '100mg',  brand: 'Kamagra',   desc: 'Fast-absorbing oral jelly in 7 flavours.',          color: 'from-[#B45309] to-[#D97706]' },
  { id: 'kamagraefferv', name: 'KAMAGRA EFFERVESCENT', subtitle: 'Sildenafil 100mg',   mg: '100mg',  brand: 'Kamagra',   desc: 'Effervescent tablet for rapid dissolution.',        color: 'from-[#92400E] to-[#B45309]' },
  { id: 'kamagrapolo',  name: 'KAMAGRA POLO',    subtitle: 'Sildenafil Chewable 100mg', mg: '100mg',  brand: 'Kamagra',   desc: 'Convenient chewable tablet — no water needed.',     color: 'from-[#78350F] to-[#92400E]' },
];

const NAV_BRANDS = [
  {
    label: 'Featured',
    products: PRODUCTS.filter(p => p.popular),
  },
  {
    label: 'Vidalista',
    products: PRODUCTS.filter(p => p.brand === 'Vidalista'),
  },
  {
    label: 'Fildena',
    products: PRODUCTS.filter(p => p.brand === 'Fildena'),
  },
  {
    label: 'Vilitra',
    products: PRODUCTS.filter(p => p.brand === 'Vilitra'),
  },
  {
    label: 'Cenforce & Kamagra',
    products: PRODUCTS.filter(p => p.brand === 'Cenforce' || p.brand === 'Kamagra'),
  },
];

const FILTER_BRANDS = ['All', 'Vidalista', 'Fildena', 'Vilitra', 'Cenforce', 'Kamagra'] as const;

const HERO_IMAGES = [
  '/images/hero1.png',
  '/images/hero2.png',
  '/images/hero3.png',
  '/images/hero4.png',
];

function useHoverSound() {
  const audioCtx = useRef<AudioContext | null>(null);
  const play = () => {
    try {
      if (!audioCtx.current) audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtx.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.start(); osc.stop(ctx.currentTime + 0.21);
    } catch {}
  };
  return play;
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState('100 Boxes');
  const [msg, setMsg] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const playSound = useHoverSound();

  const filtered = activeFilter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.brand === activeFilter);

  const openEnquiry = (product?: Product) => {
    if (product) setSelectedProduct(product);
    setEnquiryOpen(true);
  };

  // Hero image auto-rotate
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = enquiryOpen ? 'hidden' : 'auto';
  }, [enquiryOpen]);

  const buildMessage = () => {
    const prod = selectedProduct ? `${selectedProduct.name} (${selectedProduct.subtitle})` : 'General Enquiry';
    return `Hello AlphaVigor / TruePharma Team 👋,%0A%0AI am interested in:%0A📦 Product: ${prod}%0A🔢 Quantity: ${quantity}%0A%0A💬 Message: ${msg || 'Please share best price, shipping and catalogue.'}%0A%0A Sent from TruePharma Website ✨`;
  };

  const handleWhatsapp = () => window.open(`https://wa.me/917622068016?text=${buildMessage()}`, '_blank');
  const handleTelegram = () => window.open(`https://t.me/AlphaVigor?text=${buildMessage()}`, '_blank');
  const handleEmail = () => {
    const subject = `Enquiry for ${selectedProduct?.name || 'Pharma Products'} - Qty: ${quantity}`;
    window.location.href = `mailto:info@truepharma.co.in,export@truepharma.co.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(decodeURIComponent(buildMessage().replace(/%0A/g, '\n')))}`;
  };

  return (
    <div className="min-h-screen bg-[#f6f8ff] text-[#0f204a] font-[Inter,system-ui,sans-serif] antialiased selection:bg-[#0d3b9c] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        *{font-family:Inter,sans-serif} .display{font-family:"Plus Jakarta Sans",Inter,sans-serif}
        ::-webkit-scrollbar{height:6px;width:6px} ::-webkit-scrollbar-thumb{background:#c1cee8;border-radius:10px}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes float2{0%,100%{transform:translateY(0) rotate(3deg)}50%{transform:translateY(-14px) rotate(-2deg)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(22px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:0.8}70%{transform:scale(1.4);opacity:0}100%{transform:scale(1.4);opacity:0}}
        @keyframes bounce-x{0%,100%{transform:translateX(0)}50%{transform:translateX(-5px)}}
        .scrollbar-none::-webkit-scrollbar{display:none}
        .scrollbar-none{-ms-overflow-style:none;scrollbar-width:none}
        @keyframes hero-fade{0%{opacity:0}10%{opacity:1}90%{opacity:1}100%{opacity:0}}
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-[#eaf0ff] shadow-[0_2px_20px_rgba(13,59,156,0.06)]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-8 h-[68px]">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0d3b9c] via-[#2d82ff] to-[#20e3b2] grid place-items-center shadow-md">
              <span className="text-white font-black text-[14px]">✚</span>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight text-[16px] display">TruePharma</div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#7a8ab0] font-semibold -mt-0.5">Care. Commitment. Cure.</div>
            </div>
          </div>

          {/* Desktop nav — brand dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium">
            {NAV_BRANDS.map(brand => (
              <div key={brand.label} className="relative group">
                <button
                  className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-[#f3f6ff] text-[#3a4a71] hover:text-[#0d3b9c] transition font-semibold"
                  onMouseEnter={playSound}
                >
                  {brand.label}
                  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 min-w-[220px]">
                  <div className="bg-white rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.14)] border border-[#eef2ff] p-2 overflow-hidden">
                    {brand.products.map(p => (
                      <div
                        key={p.id}
                        onClick={() => openEnquiry(p)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-[#f3f6ff] cursor-pointer group/item"
                      >
                        <div className={`w-8 h-5 rounded-[3px] bg-gradient-to-br ${p.color} shrink-0`} />
                        <div>
                          <div className="text-[12px] font-semibold text-[#0f204a] group-hover/item:text-[#0d3b9c] leading-none">{p.name}</div>
                          <div className="text-[10px] text-[#8a9ac0] mt-0.5">{p.subtitle}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openEnquiry()}
              onMouseEnter={playSound}
              className="hidden md:inline-flex items-center gap-2 bg-[#0d3b9c] text-white rounded-full px-4 py-2 text-[12px] font-bold shadow-[0_8px_20px_rgba(13,59,156,0.35)] hover:shadow-[0_12px_28px_rgba(13,59,156,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Enquire Now <span>→</span>
            </button>
            <button
              onClick={() => setMobileMenu(v => !v)}
              className="lg:hidden w-9 h-9 grid place-items-center rounded-full bg-[#f1f5ff] text-[#0d3b9c]"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-[#eaf0ff] bg-white px-4 py-4 space-y-1 text-[14px]">
            {NAV_BRANDS.map(brand => (
              <details key={brand.label} className="group/mobile">
                <summary className="flex items-center justify-between py-2 font-semibold cursor-pointer list-none text-[#0f204a]">
                  {brand.label}
                  <svg className="w-4 h-4 opacity-40 group-open/mobile:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="pl-3 pb-2 space-y-1">
                  {brand.products.map(p => (
                    <div key={p.id} onClick={() => { openEnquiry(p); setMobileMenu(false); }} className="py-1.5 text-[12px] text-[#5a6a90] cursor-pointer hover:text-[#0d3b9c]">
                      {p.name} — {p.subtitle}
                    </div>
                  ))}
                </div>
              </details>
            ))}
            <button onClick={() => openEnquiry()} className="w-full mt-3 bg-[#0d3b9c] text-white rounded-full py-3 font-bold text-[13px]">Enquire Now →</button>
          </div>
        )}
      </header>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f0f4ff]" style={{ minHeight: '520px' }}>
        {/* Hero image slideshow */}
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="TruePharma Products"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === heroIdx ? 1 : 0 }}
          />
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b9c]/85 via-[#0d3b9c]/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20 flex flex-col justify-center" style={{ minHeight: '520px' }}>
          {/* Badge — near navbar */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/30 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white w-fit mb-4">
            <span className="w-4 h-4 rounded-full bg-white/20 grid place-items-center text-[10px]">✔</span>
            Trusted by Healthcare Professionals Worldwide
          </div>

          <h1 className="display text-[36px] md:text-[52px] font-[800] leading-[1.05] tracking-tight text-white max-w-[580px]">
            Innovating Healthcare,<br />
            <span className="bg-gradient-to-r from-[#7ecfff] to-[#20e3b2] bg-clip-text text-transparent">Improving Lives</span>
          </h1>
          <p className="mt-4 text-[14px] md:text-[15px] leading-6 text-white/80 max-w-[460px]">
            TruePharma & <strong className="text-white">AlphaVigor</strong> — Your global partner for premium pharmaceutical products. WHO-GMP certified. Serving 50+ countries.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={playSound}
              className="inline-flex items-center gap-2 bg-white text-[#0d3b9c] rounded-full px-5 py-3 text-[13px] font-bold shadow-[0_10px_24px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] transition-all"
            >
              Explore Products →
            </button>
            <button
              onClick={() => openEnquiry()}
              onMouseEnter={playSound}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-3 text-[13px] font-bold shadow-[0_10px_24px_rgba(37,211,102,0.4)] hover:translate-y-[-2px] transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp Enquiry
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-8">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === heroIdx ? 'bg-white w-6' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ──────────────────────────────────────────────────── */}
      <section id="products" className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">Our Products</div>
            <h2 className="display text-[22px] md:text-[28px] font-extrabold mt-1">Premium Quality Medicines</h2>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 pb-2">
          {FILTER_BRANDS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              onMouseEnter={playSound}
              className={`whitespace-nowrap inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold border transition
                ${activeFilter === f
                  ? 'bg-[#0d3b9c] text-white border-[#0d3b9c] shadow-[0_6px_16px_rgba(13,59,156,0.3)]'
                  : 'bg-white border-[#e2e9f7] text-[#5a6a90] hover:bg-[#f5f7ff]'}`}
            >
              {f}
            </button>
          ))}

          {/* Download Catalogue */}
          <a
            href="#"
            download
            onMouseEnter={playSound}
            className="ml-auto hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-[#0d3b9c] to-[#2563eb] text-white rounded-full px-4 py-1.5 text-[11px] font-bold shadow-[0_6px_16px_rgba(13,59,156,0.25)] hover:shadow-[0_10px_24px_rgba(13,59,156,0.35)] hover:scale-[1.02] transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download Catalogue
          </a>
        </div>

        {/* Mobile Download Catalogue */}
        <div className="mt-2 md:hidden">
          <a
            href="#"
            download
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0d3b9c] text-white rounded-full py-2.5 text-[12px] font-bold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download Catalogue
          </a>
        </div>

        {/* Product grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(product => (
            <div
              key={product.id}
              onMouseEnter={playSound}
              className="group relative bg-white rounded-[16px] border border-[#e8edf8] shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-3 flex flex-col hover:shadow-[0_16px_40px_rgba(13,59,156,0.12)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {product.popular && (
                <div className="absolute top-2.5 right-2.5 bg-[#e8ecff] text-[#0d3b9c] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#c8d4ff]">Popular</div>
              )}
              <div className="h-[110px] rounded-[10px] bg-[#fafbff] border border-[#f0f3ff] grid place-items-center relative overflow-hidden">
                <div className={`w-[92px] h-[56px] rounded-[6px] bg-gradient-to-br ${product.color} shadow-lg grid place-items-center text-white font-black text-[10px] text-center leading-tight p-1`}>
                  {product.name.split(' ')[0]}<br />{product.mg}
                </div>
                {/* Shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-all duration-[800ms]" />
              </div>
              <div className="mt-3 flex-1 flex flex-col">
                <div className="text-[11px] font-extrabold tracking-wide">{product.name}</div>
                <div className="text-[10px] text-[#7481a8] mt-0.5">{product.subtitle}</div>
                <div className="mt-1.5">
                  <span className="text-[8px] px-2 py-0.5 rounded-full bg-[#eef3ff] border border-[#dde7ff] text-[#5a6a90]">{product.brand}</span>
                </div>
                <div className="mt-2 text-[11px] leading-4 text-[#6b7a9f] flex-1">{product.desc}</div>
                <button
                  onClick={() => openEnquiry(product)}
                  className="mt-3 w-full bg-[#0d3b9c] text-white rounded-full py-2 text-[11px] font-bold inline-flex items-center justify-center gap-1.5 hover:bg-[#0a2f7e] transition"
                >
                  Enquiry →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE ────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#edf2ff] py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">Why Choose TruePharma</div>
            <h3 className="display text-[20px] md:text-[22px] font-extrabold mt-1">Quality You Can Trust, Care You Deserve</h3>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              { t: 'High Quality', d: 'International quality standards', i: '🎯' },
              { t: 'Innovation', d: 'Continuous research & development', i: '🌟' },
              { t: 'Global Reach', d: '50+ countries worldwide', i: '🌐' },
              { t: 'Patient Care', d: 'Committed to better healthcare', i: '❤️‍🩹' },
              { t: 'Ethical Practices', d: 'Transparency & integrity', i: '🤝' },
              { t: 'Timely Delivery', d: 'On-time delivery every time', i: '🚚' },
            ].map(c => (
              <div key={c.t} onMouseEnter={playSound} className="bg-[#fbfcff] border border-[#eef2ff] rounded-[12px] p-4 text-center hover:shadow-[0_10px_24px_rgba(13,59,156,0.08)] hover:-translate-y-1 transition-all group">
                <div className="w-9 h-9 mx-auto rounded-full bg-[#eef3ff] group-hover:bg-[#0d3b9c] group-hover:text-white grid place-items-center text-[18px] transition">{c.i}</div>
                <div className="mt-2 text-[12px] font-bold">{c.t}</div>
                <div className="mt-1 text-[10px] leading-4 text-[#7a8ab0]">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 grid md:grid-cols-[1fr_1.3fr] gap-8 items-center">
        <div>
          <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">About TruePharma</div>
          <h3 className="display text-[20px] md:text-[26px] font-extrabold leading-tight mt-2">Your Trusted Partner<br />in Healthcare</h3>
          <p className="mt-3 text-[13px] leading-6 text-[#6b7a9f]">TruePharma is a fast-growing pharmaceutical company committed to improving lives through high-quality, affordable and reliable medicines. Partnered with AlphaVigor for a premium ED & wellness portfolio.</p>
          <ul className="mt-5 space-y-2.5">
            {[
              'WHO-GMP certified manufacturing',
              'Advanced R&D and quality control',
              'Affordable pricing for everyone',
              'Timely delivery across the globe',
            ].map(li => (
              <li key={li} className="flex gap-2.5 text-[12px]">
                <span className="w-4 h-4 rounded-full bg-[#e6fbe6] text-[#1a9a1a] grid place-items-center text-[10px] shrink-0 mt-0.5">✔</span>
                <span className="text-[#3a4a71]">{li}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 mt-6">
            <button onClick={() => openEnquiry()} onMouseEnter={playSound} className="inline-flex items-center gap-2 bg-[#0d3b9c] text-white rounded-full px-4 py-2.5 text-[12px] font-bold hover:bg-[#0a2f7e] transition">
              Get In Touch →
            </button>
            <a
              href="#"
              download
              className="inline-flex items-center gap-2 bg-white border border-[#cdd9f5] text-[#0d3b9c] rounded-full px-4 py-2.5 text-[12px] font-bold hover:bg-[#f3f6ff] transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Catalogue
            </a>
          </div>
        </div>

        {/* About image */}
        <div className="relative">
          <img
            src="/images/hero3.png"
            alt="TruePharma Products"
            className="w-full h-[280px] md:h-[360px] object-cover rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          />
          <div className="absolute -bottom-4 left-4 right-4 bg-white rounded-[12px] border border-[#eef2ff] shadow-[0_12px_28px_rgba(0,0,0,0.1)] grid grid-cols-3 divide-x divide-[#eef2ff] p-3">
            {[
              { k: 'WHO-GMP', v: 'Certified', i: '🛡️' },
              { k: 'Advanced', v: 'Technology', i: '🔬' },
              { k: '50+', v: 'Countries', i: '🌍' },
            ].map(b => (
              <div key={b.k} className="flex gap-2 items-center px-2 py-1">
                <div className="w-7 h-7 rounded-full bg-[#eef3ff] grid place-items-center text-[14px]">{b.i}</div>
                <div><div className="text-[10px] font-bold leading-none">{b.k}</div><div className="text-[9px] text-[#7a8ab0]">{b.v}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET IN TOUCH ──────────────────────────────────────────────── */}
      <section id="contact" className="bg-white border-y border-[#edf2ff] py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">Get In Touch</div>
            <h3 className="display text-[20px] md:text-[24px] font-extrabold mt-1">We're Here to Help You</h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { i: '📍', t: 'Our Location', d: 'G-5 & G-6, Industrial Estate, Gorwa, Vadodara - 390016, Gujarat, India' },
                { i: '📞', t: 'Call Us', d: '+91 76220 68016\n+91 98795 53225' },
                { i: '✉️', t: 'Email Us', d: 'info@truepharma.co.in\nexport@truepharma.co.in' },
                { i: '🕒', t: 'Working Hours', d: 'Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed' },
              ].map(c => (
                <div key={c.t} className="bg-[#fbfcff] border border-[#eef2ff] rounded-[10px] p-3 flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#eef3ff] grid place-items-center text-[12px] shrink-0">{c.i}</div>
                  <div>
                    <div className="text-[11px] font-bold">{c.t}</div>
                    <div className="text-[10px] text-[#6b7a9f] leading-4 mt-0.5 whitespace-pre-line">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick enquiry CTA */}
          <div className="bg-gradient-to-br from-[#0d3b9c] to-[#1e63ff] rounded-[18px] p-8 flex flex-col items-center justify-center text-center text-white">
            <div className="w-14 h-14 rounded-full bg-white/20 grid place-items-center text-[28px] mb-4">💊</div>
            <h4 className="display text-[20px] font-extrabold">Need a Quote?</h4>
            <p className="mt-2 text-[13px] text-white/80 max-w-[300px]">Send us a message on WhatsApp or Telegram — we reply within 30 minutes.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button
                onClick={handleWhatsapp}
                onMouseEnter={playSound}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-3 text-[13px] font-bold shadow-[0_8px_20px_rgba(37,211,102,0.4)] hover:scale-[1.02] transition"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp
              </button>
              <button
                onClick={handleTelegram}
                onMouseEnter={playSound}
                className="inline-flex items-center justify-center gap-2 bg-[#229ED9] text-white rounded-full px-5 py-3 text-[13px] font-bold shadow-[0_8px_20px_rgba(34,158,217,0.4)] hover:scale-[1.02] transition"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                Telegram
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAYMENTS ──────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
        <div className="text-center mb-6">
          <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">We Accept Payment As</div>
          <div className="display text-[18px] font-extrabold mt-1">Secure & Easy Payments</div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-[600px] mx-auto">
          {[
            { name: 'PayPal', icon: '🅿', color: 'text-[#003087]', bg: 'bg-[#f0f5ff]' },
            { name: 'USDT', icon: '₮', color: 'text-[#26A17B]', bg: 'bg-[#f0fff8]' },
            { name: 'Bitcoin', icon: '₿', color: 'text-[#F7931A]', bg: 'bg-[#fff8f0]' },
            { name: 'Bank Transfer', icon: '🏦', color: 'text-[#0d3b9c]', bg: 'bg-[#f3f6ff]' },
          ].map(p => (
            <div
              key={p.name}
              className={`${p.bg} border border-[#eef2ff] rounded-[14px] px-6 py-4 flex items-center gap-3 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all min-w-[140px] justify-center`}
            >
              <span className={`text-[22px] ${p.color}`}>{p.icon}</span>
              <span className={`text-[14px] font-bold ${p.color}`}>{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="bg-[#08133a] text-[#a8b2cf] pt-10 pb-5">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid md:grid-cols-[1.5fr_1fr_1fr] gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-300 grid place-items-center text-white font-black">✚</div>
              <div>
                <div className="font-bold text-[14px] leading-none">TruePharma</div>
                <div className="text-[8px] opacity-60 tracking-[0.2em] uppercase">Care. Commitment. Cure.</div>
              </div>
            </div>
            <p className="text-[11px] leading-5 max-w-[300px]">
              A global pharmaceutical company dedicated to delivering high-quality medicines. Partnered with AlphaVigor for premium wellness portfolio.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex gap-2.5">
              {/* Telegram */}
              <a
                href="https://t.me/AlphaVigor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#229ED9] text-white grid place-items-center hover:scale-110 transition shadow-md"
                title="Telegram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white grid place-items-center hover:scale-110 transition shadow-md"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/917622068016"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white grid place-items-center hover:scale-110 transition shadow-md"
                title="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              {/* Mail */}
              <a
                href="mailto:info@truepharma.co.in"
                className="w-9 h-9 rounded-full bg-[#0d3b9c] text-white grid place-items-center hover:scale-110 transition shadow-md"
                title="Email"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-white text-[12px] font-bold mb-3">Quick Links</div>
            <ul className="space-y-2 text-[11px]">
              {['Home', 'Products', 'About Us', 'Contact Us'].map(l => (
                <li key={l} className="hover:text-white cursor-pointer transition">{l}</li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <div className="text-white text-[12px] font-bold mb-3">Our Products</div>
            <ul className="space-y-2 text-[11px]">
              {PRODUCTS.slice(0, 8).map(p => (
                <li key={p.id} onClick={() => openEnquiry(p)} className="hover:text-white cursor-pointer transition">{p.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-8 border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px]">
          <div>© 2024 TruePharma. All Rights Reserved.</div>
          <div className="flex gap-4"><span className="cursor-pointer hover:text-white">Privacy Policy</span><span className="cursor-pointer hover:text-white">Terms & Conditions</span></div>
          <div className="flex items-center gap-1">Designed with <span className="text-red-400 mx-1">❤</span> for Better Health</div>
        </div>
      </footer>

      {/* ── FIXED FLOATING BUTTONS ────────────────────────────────────── */}
      {/* WhatsApp */}
      <div className="fixed bottom-24 right-4 z-50 flex flex-col items-center gap-1">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-[pulse-ring_2s_ease-out_infinite]" />
          <button
            onClick={handleWhatsapp}
            className="relative w-12 h-12 rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.5)] grid place-items-center hover:scale-110 transition animate-[bounce-x_2s_ease-in-out_infinite]"
            title="WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </button>
        </div>
        <span className="text-[9px] font-semibold text-[#25D366] bg-white rounded-full px-2 py-0.5 shadow text-center">WhatsApp</span>
      </div>

      {/* Telegram */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-1">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#229ED9] animate-[pulse-ring_2.4s_ease-out_infinite_0.4s]" />
          <button
            onClick={handleTelegram}
            className="relative w-12 h-12 rounded-full bg-[#229ED9] text-white shadow-[0_10px_28px_rgba(34,158,217,0.5)] grid place-items-center hover:scale-110 transition animate-[bounce-x_2.4s_ease-in-out_infinite_0.4s]"
            title="Telegram"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
          </button>
        </div>
        <span className="text-[9px] font-semibold text-[#229ED9] bg-white rounded-full px-2 py-0.5 shadow text-center">Telegram</span>
      </div>

      {/* ── ENQUIRY MODAL ─────────────────────────────────────────────── */}
      {enquiryOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-[#0a194e]/60 backdrop-blur-[6px]" onClick={() => setEnquiryOpen(false)} style={{ animation: 'fadeIn 0.2s ease' }} />
          <div
            className="relative w-full md:max-w-[520px] bg-white rounded-t-[20px] md:rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.35)] border border-white overflow-hidden"
            style={{ animation: 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0d3b9c] to-[#1e63ff] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 grid place-items-center text-[18px]">💊</div>
                <div>
                  <div className="font-bold text-[14px] leading-tight">Enquire Now – AlphaVigor ✨</div>
                  <div className="text-[11px] opacity-80">Get best price • WHO-GMP Quality • Fast reply</div>
                </div>
              </div>
              <button onClick={() => setEnquiryOpen(false)} className="w-8 h-8 rounded-full bg-white/15 grid place-items-center hover:bg-white/25 text-[14px]">✕</button>
            </div>

            <div className="p-4 space-y-3 max-h-[78vh] overflow-auto">
              {/* Product & Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#3a4a71]">Select Product 🎯</label>
                  <select
                    value={selectedProduct?.id || ''}
                    onChange={e => setSelectedProduct(PRODUCTS.find(p => p.id === e.target.value) || null)}
                    className="mt-1 w-full rounded-[10px] border border-[#dde6f7] bg-[#fbfcff] px-3 py-2.5 text-[12px] font-medium outline-none focus:border-[#0d3b9c]"
                  >
                    <option value="">Choose product...</option>
                    {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name} – {p.subtitle}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#3a4a71]">Quantity 📦</label>
                  <select
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    className="mt-1 w-full rounded-[10px] border border-[#dde6f7] bg-[#fbfcff] px-3 py-2.5 text-[12px] outline-none focus:border-[#0d3b9c]"
                  >
                    {['50 Boxes', '100 Boxes', '200 Boxes', '500 Boxes', '1000 Boxes', 'Custom Qty'].map(q => <option key={q}>{q}</option>)}
                  </select>
                </div>
              </div>

              {/* Selected product preview */}
              {selectedProduct && (
                <div className="flex items-center gap-3 bg-[#f6f8ff] border border-[#e6ebff] rounded-[10px] p-2.5">
                  <div className={`w-14 h-9 rounded-[6px] bg-gradient-to-br ${selectedProduct.color} grid place-items-center text-white text-[9px] font-black shrink-0`}>{selectedProduct.mg}</div>
                  <div className="leading-tight flex-1">
                    <div className="text-[12px] font-bold">{selectedProduct.name}</div>
                    <div className="text-[10px] text-[#6b7a9f]">{selectedProduct.subtitle} · {quantity}</div>
                  </div>
                  <div className="text-[10px] px-2 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] font-bold shrink-0">✅ In Stock</div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="text-[11px] font-semibold text-[#3a4a71]">Message 💬</label>
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="e.g. Need best price for export to USA, share catalogue..."
                  rows={3}
                  className="mt-1 w-full rounded-[10px] border border-[#dde6f7] px-3 py-2.5 text-[12px] outline-none focus:border-[#0d3b9c] resize-none"
                />
              </div>

              {/* Send buttons */}
              <div className="pt-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                <button onClick={handleWhatsapp} className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3 text-[12px] font-bold shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:scale-[1.02] active:scale-[0.98] transition">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  WhatsApp
                </button>
                <button onClick={handleTelegram} className="inline-flex items-center justify-center gap-2 bg-[#229ED9] text-white rounded-full py-3 text-[12px] font-bold shadow-[0_8px_20px_rgba(34,158,217,0.35)] hover:scale-[1.02] active:scale-[0.98] transition">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                  Telegram
                </button>
                <button onClick={handleEmail} className="inline-flex items-center justify-center gap-2 bg-[#0d3b9c] text-white rounded-full py-3 text-[12px] font-bold shadow-[0_8px_20px_rgba(13,59,156,0.35)] hover:scale-[1.02] active:scale-[0.98] transition">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Email
                </button>
              </div>

              <div className="text-center text-[10px] text-[#8aa0c8] pt-1">🔒 Secure enquiry · Reply within 30 mins · Trusted by 1000+ healthcare pros</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
