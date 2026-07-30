import { useState, useRef, useEffect } from 'react';

/* ─── Types ─────────────────────────────────────────────────────────── */
type Product = {
  id: string; name: string; subtitle: string; mg: string;
  brand: string; desc: string; color: string; tag?: string; popular?: boolean;
  img: string;
};

/* ─── Data ───────────────────────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  // Vidalista
  { id:'vidalista5',       name:'VIDALISTA® 5',           subtitle:'Tadalafil Tablets IP 5mg',          mg:'5mg',   brand:'Vidalista', desc:'Low-dose daily tadalafil for consistent, on-demand readiness. Ideal for wellness maintenance across global markets.',            color:'from-[#4D2A16] to-[#8B5A2B]', img:'/images/products/vidalista5.jpg' },
  { id:'vidalista10',      name:'VIDALISTA® 10',          subtitle:'Tadalafil Tablets IP 10mg',         mg:'10mg',  brand:'Vidalista', desc:'Long-acting tadalafil — up to 36 hrs of performance support for confident, lasting results.',                                color:'from-[#4D2A16] to-[#8B5A2B]', popular:true, tag:'Best Seller', img:'/images/products/vidalista10.jpg' },
  { id:'vidalista20',      name:'VIDALISTA® 20',          subtitle:'Tadalafil Tablets IP 20mg',         mg:'20mg',  brand:'Vidalista', desc:'Standard clinical dose of tadalafil. Trusted by healthcare distributors across 25+ markets.',                                  color:'from-[#5C3317] to-[#9B6A3B]', img:'/images/products/vidalista20.jpg' },
  { id:'vidalistact',      name:'VIDALISTA® CT',          subtitle:'Tadalafil Chewable Tablets 20mg',   mg:'20mg',  brand:'Vidalista', desc:'Chewable tadalafil format — faster onset, no water needed. Strong retail and wholesale appeal worldwide.',                  color:'from-[#6B3A1F] to-[#A06030]', img:'/images/products/vidalistact.jpg' },
  { id:'vidalistapro',     name:'VIDALISTA PROFESSIONAL', subtitle:'Tadalafil Sublingual Tablets 20mg', mg:'20mg',  brand:'Vidalista', desc:'Fast-dissolve sublingual tadalafil — onset in 15 min, premium-grade export formulation.',                                    color:'from-[#3D1F0E] to-[#7A4A28]', tag:'Pro', img:'/images/products/vidalistapro.jpg' },
  { id:'vidalista60',      name:'VIDALISTA® 60',          subtitle:'Tadalafil Tablets 60mg',            mg:'60mg',  brand:'Vidalista', desc:'Maximum-strength tadalafil. A top export SKU for markets demanding superior potency.',                                         color:'from-[#2D1508] to-[#6A3A18]', img:'/images/products/vidalista60.jpg' },
  { id:'vidalista80',      name:'VIDALISTA® 80',          subtitle:'Tadalafil Tablets 80mg',            mg:'80mg',  brand:'Vidalista', desc:'Ultra-high potency tadalafil for specialty distributors and markets with premium demand.',                                    color:'from-[#1E0E05] to-[#5A2E10]', img:'/images/products/vidalista80.jpg' },
  { id:'vidalistablack80', name:'VIDALISTA BLACK® 80',    subtitle:'Tadalafil Tablets 80mg',            mg:'80mg',  brand:'Vidalista', desc:'Premium black-label tadalafil — ultra-potency formulation preferred by top-tier export channels.',                           color:'from-[#0f0f0f] to-[#2a2a2a]', tag:'Premium', img:'/images/products/vidalistablack80.jpg' },
  { id:'supervidalista',   name:'SUPER VIDALISTA',        subtitle:'Tadalafil 20mg + Dapoxetine 60mg',  mg:'Combo', brand:'Vidalista', desc:'Dual-action formula combining ED relief and premature ejaculation control in a single tablet.',                              color:'from-[#1a1a2e] to-[#3a3a5c]', tag:'Combo', img:'/images/products/supervidalista.jpg' },
  // Fildena
  { id:'fildena100',       name:'FILDENA® 100',           subtitle:'Sildenafil Citrate 100mg',          mg:'100mg', brand:'Fildena',   desc:'The gold-standard sildenafil dose. One of the highest-volume export SKUs globally.',                                          color:'from-[#5B21B6] to-[#7C3AED]', popular:true, tag:'Top Export', img:'/images/products/fildena100.jpg' },
  { id:'fildena120',       name:'FILDENA® STRONG 120',    subtitle:'Sildenafil Citrate 120mg',          mg:'120mg', brand:'Fildena',   desc:'Super-strength sildenafil for markets demanding higher-potency formulations.',                                                color:'from-[#C81E1E] to-[#8B0000]', img:'/images/products/fildena120.jpg' },
  { id:'fildenapro',       name:'FILDENA® PROFESSIONAL',  subtitle:'Sildenafil 100mg Sublingual',       mg:'100mg', brand:'Fildena',   desc:'Fast-dissolve sublingual format — onset in 15 min, ideal for premium wellness retail.',                                     color:'from-[#9D174D] to-[#BE185D]', tag:'Pro', img:'/images/products/fildenapro.jpg' },
  { id:'fildenasa',        name:'FILDENA® SUPER ACTIVE',  subtitle:'Sildenafil Softgel Capsules 100mg', mg:'100mg', brand:'Fildena',   desc:'Softgel capsule format for faster absorption. Premium presentation ideal for specialty retail and export.',                  color:'from-[#1e3a6e] to-[#2563eb]', img:'/images/products/fildenasuperactive.jpg' },
  // Vilitra
  { id:'vilitra20',        name:'VILITRA 20',             subtitle:'Vardenafil 20mg',                   mg:'20mg',  brand:'Vilitra',   desc:'Clinically proven vardenafil at the standard therapeutic dose. Competitive B2B pricing available.',                          color:'from-[#B8962E] to-[#D4AF37]', popular:true, img:'/images/products/vilitra20.jpg' },
  { id:'vilitra40',        name:'VILITRA 40',             subtitle:'Vardenafil 40mg',                   mg:'40mg',  brand:'Vilitra',   desc:'Double-strength vardenafil for markets with high-potency demand. Batch certified.',                                           color:'from-[#92700A] to-[#B8962E]', img:'/images/products/vilitra40.jpg' },
  { id:'vilitra60',        name:'VILITRA 60',             subtitle:'Vardenafil 60mg',                   mg:'60mg',  brand:'Vilitra',   desc:'Maximum vardenafil potency. Premium grade, ideal for specialty distributors.',                                               color:'from-[#6B5010] to-[#92700A]', img:'/images/products/vilitra60.jpg' },
  // Cenforce
  { id:'cenforce50',       name:'CENFORCE 50',            subtitle:'Sildenafil Tablets IP 50mg',        mg:'50mg',  brand:'Cenforce',  desc:'Entry-level sildenafil citrate. Fast absorption, proven reliability — strong demand in starter markets.',                    color:'from-[#1B5E20] to-[#2E7D32]', img:'/images/products/cenforce50.jpg' },
  { id:'cenforce150',      name:'CENFORCE 150',           subtitle:'Sildenafil Tablets 150mg',          mg:'150mg', brand:'Cenforce',  desc:'High-strength sildenafil for markets requiring intensified treatment protocols.',                                             color:'from-[#145214] to-[#1B5E20]', img:'/images/products/cenforce150.jpg' },
  { id:'cenforcesoft',     name:'CENFORCE SOFT-100',      subtitle:'Sildenafil Chewable Tablets 100mg', mg:'100mg', brand:'Cenforce',  desc:'Chewable sildenafil — no water required. Discreet, portable, with strong retail and export appeal.',                       color:'from-[#0D3D0D] to-[#145214]', popular:true, tag:'#1 Export', img:'/images/products/cenforcesoft100.jpg' },
  // Kamagra
  { id:'kamagra100',       name:'KAMAGRA 100',            subtitle:'Sildenafil Tablets 100mg',          mg:'100mg', brand:'Kamagra',   desc:'Globally recognised sildenafil brand. Available in tablets, jelly & effervescent formats.',                                  color:'from-[#D97706] to-[#F59E0B]', popular:true, tag:'Global Brand', img:'/images/products/kamagra100.jpg' },
  { id:'kamagraoral',      name:'KAMAGRA ORAL JELLY',     subtitle:'Sildenafil 100mg — 7 Flavours',     mg:'100mg', brand:'Kamagra',   desc:'Fast-absorbing oral jelly in 7 popular flavours. Top retail-friendly export presentation.',                                color:'from-[#B45309] to-[#D97706]', img:'/images/products/kamagraoral.jpg' },
  { id:'kamagraefferv',    name:'KAMAGRA EFFERVESCENT',   subtitle:'Sildenafil 100mg Effervescent',     mg:'100mg', brand:'Kamagra',   desc:'Dissolve-in-water format. Discreet, portable, and ideal for wellness retail channels.',                                    color:'from-[#92400E] to-[#B45309]', img:'/images/products/kamagraefferv.jpg' },
  { id:'kamagrapolo',      name:'KAMAGRA POLO',           subtitle:'Sildenafil Chewable 100mg',         mg:'100mg', brand:'Kamagra',   desc:'Mint-flavoured chewable sildenafil — no water required. Strong retail appeal worldwide.',                                  color:'from-[#78350F] to-[#92400E]', img:'/images/products/kamagrapolo.jpg' },
];

const NAV_BRANDS = [
  { label:'Featured',           products: PRODUCTS.filter(p => p.popular) },
  { label:'Vidalista',          products: PRODUCTS.filter(p => p.brand === 'Vidalista') },
  { label:'Fildena',            products: PRODUCTS.filter(p => p.brand === 'Fildena') },
  { label:'Vilitra',            products: PRODUCTS.filter(p => p.brand === 'Vilitra') },
  { label:'Cenforce & Kamagra', products: PRODUCTS.filter(p => p.brand === 'Cenforce' || p.brand === 'Kamagra') },
];

const FILTER_BRANDS = ['All','Vidalista','Fildena','Vilitra','Cenforce','Kamagra'] as const;
const HERO_IMAGES   = ['/images/hero1.png','/images/hero2.png','/images/hero3.png','/images/hero4.png'];
const ALL_INITIAL   = 8;
const CAT_LIMIT     = 4;

/* ─── Sound hook ─────────────────────────────────────────────────────── */
function useHoverSound() {
  const ctx = useRef<AudioContext|null>(null);
  return () => {
    try {
      if (!ctx.current) ctx.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
      const c = ctx.current, o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.frequency.setValueAtTime(600, c.currentTime);
      o.frequency.exponentialRampToValueAtTime(1200, c.currentTime+0.15);
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.08, c.currentTime+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime+0.2);
      o.start(); o.stop(c.currentTime+0.21);
    } catch {}
  };
}

/* ─── SVG icons ─────────────────────────────────────────────────────── */
const IcoWA = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const IcoTG = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;
const IcoMail = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
const IcoIG = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const IcoDown = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>;
const IcoCaret = () => <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>;

/* ─── Logo SVG ───────────────────────────────────────────────────────── */
const Logo = ({ size = 38 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="url(#lg1)"/>
    <ellipse cx="20" cy="20" rx="11" ry="11" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none"/>
    <ellipse cx="20" cy="20" rx="6" ry="11" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none"/>
    <line x1="9" y1="20" x2="31" y2="20" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    <line x1="11" y1="15" x2="29" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
    <line x1="11" y1="25" x2="29" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
    <rect x="17.5" y="12" width="5" height="16" rx="2" fill="white"/>
    <rect x="12" y="17.5" width="16" height="5" rx="2" fill="white"/>
    <path d="M27 10 L33 10 L33 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85"/>
    <line x1="27" y1="16" x2="33" y2="10" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.85"/>
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0d3b9c"/>
        <stop offset="50%" stopColor="#1a6fdd"/>
        <stop offset="100%" stopColor="#20c4b0"/>
      </linearGradient>
    </defs>
  </svg>
);

/* ─── Splash Screen ──────────────────────────────────────────────────── */
function Splash({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in'|'hold'|'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 400);
    const t2 = setTimeout(() => setPhase('out'),  2200);
    const t3 = setTimeout(() => onDone(),          2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg,#04091f 0%,#0a1a4a 50%,#051630 100%)',
        opacity: phase === 'out' ? 0 : 1,
        transition: phase === 'out' ? 'opacity 0.7s ease' : 'none',
        pointerEvents: phase === 'out' ? 'none' : 'all',
      }}
    >
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-[80px]"/>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cyan-400/10 blur-[60px]"/>

      <div
        style={{
          transform: phase === 'in' ? 'scale(0.5) translateY(20px)' : 'scale(1) translateY(0)',
          opacity: phase === 'in' ? 0 : 1,
          transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease',
        }}
        className="flex flex-col items-center gap-5"
      >
        <div style={{ filter:'drop-shadow(0 0 40px rgba(29,130,255,0.6))' }}>
          <Logo size={80}/>
        </div>
        <div className="text-center">
          <div className="text-white font-black text-[32px] tracking-tight leading-none" style={{ fontFamily:'"Plus Jakarta Sans",Inter,sans-serif', letterSpacing:'-1px' }}>
            AlphaVigor
          </div>
          <div className="mt-1 text-[11px] tracking-[0.35em] uppercase text-white/50 font-semibold">
            Global Wellness Exports
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 text-[11px] text-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#20e3b2]"/>
          B2B Pharma Exports · Serving 25+ Countries
        </div>
        <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-[#20e3b2] rounded-full"
            style={{
              width: phase === 'hold' ? '100%' : '0%',
              transition: phase === 'hold' ? 'width 1.6s ease' : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Product Image Ticker ───────────────────────────────────────────── */
function ProductTicker() {
  const items = PRODUCTS.map(p => ({ img: p.img, name: p.name }));
  // Double for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className="bg-[#04091f] border-b border-white/8 overflow-hidden py-2 relative">
      <div
        className="flex gap-3 w-max"
        style={{ animation: 'tickerImg 60s linear infinite' }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <div className="w-[54px] h-[36px] rounded-[6px] overflow-hidden border border-white/10 bg-white/5 shrink-0">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy"/>
            </div>
            <span className="text-[10px] font-semibold text-white/50 whitespace-nowrap pr-3">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────────────── */
export default function App() {
  const [splash, setSplash]           = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showMore, setShowMore]         = useState(false);
  const [enquiryOpen, setEnquiryOpen]   = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product|null>(null);
  const [quantity, setQuantity]         = useState('1,000 Units');
  const [msg, setMsg]                   = useState('');
  const [mobileMenu, setMobileMenu]     = useState(false);
  const [heroIdx, setHeroIdx]           = useState(0);
  const playSound = useHoverSound();

  const allBrand    = activeFilter === 'All';
  const baseFiltered = allBrand ? PRODUCTS : PRODUCTS.filter(p => p.brand === activeFilter);
  const limit       = allBrand ? (showMore ? baseFiltered.length : ALL_INITIAL) : CAT_LIMIT;
  const displayed   = baseFiltered.slice(0, limit);
  const hasMore     = baseFiltered.length > limit;

  const handleSplashDone = () => {
    setSplash(false);
    setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior:'smooth' }), 200);
  };

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i+1) % HERO_IMAGES.length), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = enquiryOpen ? 'hidden' : 'auto';
  }, [enquiryOpen]);

  const openEnquiry = (p?: Product) => { if(p) setSelectedProduct(p); setEnquiryOpen(true); };

  const buildMsg = () => {
    const prod = selectedProduct ? `${selectedProduct.name} (${selectedProduct.subtitle})` : 'General Export Enquiry';
    return `Hello AlphaVigor Export Team 👋,%0A%0AI am interested in bulk supply of:%0A📦 Product: ${prod}%0A🔢 Quantity: ${quantity}%0A%0A💬 ${msg || 'Please share your best export price, MOQ, lead time and full product catalogue.'}%0A%0A✉️ Sent via AlphaVigor Export Portal`;
  };
  const buildPlain = () => decodeURIComponent(buildMsg().replace(/%0A/g,'\n'));

  const doWA    = () => window.open(`https://wa.me/917622068016?text=${buildMsg()}`,'_blank');
  const doTG    = () => window.open(`https://t.me/AlphaVigor?text=${buildMsg()}`,'_blank');
  const doEmail = () => { window.location.href=`mailto:export@truepharma.co.in?subject=${encodeURIComponent(`Export Enquiry – ${selectedProduct?.name||'Pharma Products'} | Qty: ${quantity}`)}&body=${encodeURIComponent(buildPlain())}`; };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');
        *{font-family:Inter,sans-serif} .display{font-family:"Plus Jakarta Sans",Inter,sans-serif}
        ::-webkit-scrollbar{height:5px;width:5px} ::-webkit-scrollbar-thumb{background:#c1cee8;border-radius:8px}
        .scrollbar-none::-webkit-scrollbar{display:none} .scrollbar-none{-ms-overflow-style:none;scrollbar-width:none}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:.7}70%{transform:scale(1.5);opacity:0}100%{transform:scale(1.5);opacity:0}}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes tickerImg{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      `}</style>

      {/* ── SPLASH ───────────────────────────────────────────────────── */}
      {splash && <Splash onDone={handleSplashDone}/>}

      <div className="min-h-screen bg-[#f5f7ff] text-[#0f204a] antialiased selection:bg-[#0d3b9c] selection:text-white" style={{opacity: splash?0:1, transition:'opacity 0.4s ease'}}>

        {/* ── PRODUCT IMAGE TICKER (above navbar) ──────────────────────── */}
        <ProductTicker />

        {/* ── NAVBAR ─────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/92 border-b border-[#e4ecff] shadow-[0_2px_24px_rgba(13,59,156,0.07)]">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-8 h-[68px]">

            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <Logo size={40}/>
              <div className="leading-tight">
                <div className="font-black tracking-tight text-[17px] display text-[#0a1a3d]">AlphaVigor</div>
                <div className="text-[9px] tracking-[0.22em] uppercase text-[#6a82b8] font-semibold -mt-0.5">Global Wellness Exports</div>
              </div>
            </div>

            {/* Desktop brand nav */}
            <nav className="hidden lg:flex items-center gap-0.5 text-[13px] font-medium">
              {NAV_BRANDS.map(brand => (
                <div key={brand.label} className="relative group">
                  <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-[#eef2ff] text-[#3a4a71] hover:text-[#0d3b9c] transition-all font-semibold" onMouseEnter={playSound}>
                    {brand.label} <IcoCaret/>
                  </button>
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 min-w-[240px]">
                    <div className="bg-white rounded-[16px] shadow-[0_24px_60px_rgba(0,0,0,0.16)] border border-[#eef2ff] p-2">
                      {brand.products.map(p => (
                        <div key={p.id} onClick={() => openEnquiry(p)} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[#f3f6ff] cursor-pointer group/item">
                          <div className="w-9 h-6 rounded-[4px] overflow-hidden shrink-0 border border-[#e8edf8]">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover"/>
                          </div>
                          <div>
                            <div className="text-[12px] font-bold text-[#0f204a] group-hover/item:text-[#0d3b9c] leading-none">{p.name}</div>
                            <div className="text-[10px] text-[#8a9ac0] mt-0.5">{p.subtitle}</div>
                          </div>
                          {p.tag && <span className="ml-auto text-[9px] font-bold bg-[#eef3ff] text-[#0d3b9c] px-1.5 py-0.5 rounded-full shrink-0">{p.tag}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <a href="#contact" className="hidden md:inline-flex text-[#3a4a71] text-[12px] font-semibold hover:text-[#0d3b9c] transition px-2">Contact</a>
              <button onClick={() => openEnquiry()} onMouseEnter={playSound} className="hidden md:inline-flex items-center gap-2 bg-[#0d3b9c] text-white rounded-full px-4 py-2 text-[12px] font-bold shadow-[0_8px_20px_rgba(13,59,156,0.35)] hover:shadow-[0_12px_28px_rgba(13,59,156,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                Get Export Quote →
              </button>
              <button onClick={() => setMobileMenu(v=>!v)} className="lg:hidden w-9 h-9 grid place-items-center rounded-full bg-[#eef2ff] text-[#0d3b9c]">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className="lg:hidden border-t border-[#eaf0ff] bg-white px-4 py-4 space-y-1 text-[14px]">
              {NAV_BRANDS.map(brand => (
                <details key={brand.label} className="group/m">
                  <summary className="flex items-center justify-between py-2 font-bold cursor-pointer list-none text-[#0f204a]">
                    {brand.label}
                    <svg className="w-4 h-4 opacity-40 group-open/m:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
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
              <button onClick={() => openEnquiry()} className="w-full mt-3 bg-[#0d3b9c] text-white rounded-full py-3 font-bold text-[13px]">Get Export Quote →</button>
            </div>
          )}
        </header>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ minHeight: 540 }}>
          {HERO_IMAGES.map((src,i) => (
            <img key={src} src={src} alt="AlphaVigor Export Pharma" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" style={{opacity: i===heroIdx ? 1 : 0}}/>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#04091f]/92 via-[#0d3b9c]/70 to-transparent"/>
          <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(circle,white 1px,transparent 1px)',backgroundSize:'28px 28px'}}/>

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col justify-center" style={{minHeight:540}}>
            {/* Badge */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 rounded-full px-3 py-1 text-[11px] font-semibold">
                ✈️ Serving 25+ Countries
              </span>
            </div>

            <h1 className="display text-[38px] md:text-[58px] font-[900] leading-[1.0] tracking-tight text-white max-w-[640px]">
              Premium Men's<br/>
              <span className="bg-gradient-to-r from-[#4db8ff] to-[#20e3b2] bg-clip-text text-transparent">Wellness Exports</span>
            </h1>
            <p className="mt-5 text-[14px] md:text-[16px] leading-7 text-white/75 max-w-[500px]">
              Your trusted B2B source for <strong className="text-white">Sildenafil, Tadalafil & Vardenafil</strong> formulations. Bulk supply, competitive pricing, global shipping.
            </p>

            {/* Trust metrics */}
            <div className="mt-6 flex flex-wrap gap-4">
              {[['🌍 25+','Countries'],['Fast','Shipping'],['B2B','Specialists'],['24 hr','Response']].map(([k,v])=>(
                <div key={k} className="flex items-center gap-2">
                  <div className="text-[18px] font-black text-white leading-none">{k}</div>
                  <div className="text-[10px] text-white/50 leading-tight">{v}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} onMouseEnter={playSound} className="inline-flex items-center gap-2 bg-white text-[#0d3b9c] rounded-full px-6 py-3 text-[13px] font-black shadow-[0_12px_30px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 transition-all">
                View Product Catalogue →
              </button>
              <button onClick={doWA} onMouseEnter={playSound} className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-6 py-3 text-[13px] font-black shadow-[0_12px_30px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 transition-all">
                <IcoWA/> WhatsApp Enquiry
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-8">
              {HERO_IMAGES.map((_,i)=>(
                <button key={i} onClick={()=>setHeroIdx(i)} className={`h-1.5 rounded-full transition-all ${i===heroIdx?'bg-white w-8':'bg-white/35 w-1.5'}`}/>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────────────────── */}
        <section id="products" className="max-w-[1440px] mx-auto px-4 md:px-8 py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
            <div>
              <div className="text-[10px] tracking-[0.25em] font-bold text-[#0d3b9c] uppercase mb-1">Export Product Catalogue</div>
              <h2 className="display text-[24px] md:text-[30px] font-extrabold leading-tight">Men's Wellness Export Range</h2>
              <p className="mt-1.5 text-[13px] text-[#6b7a9f] max-w-[480px]">Wholesale & bulk supply available. Contact us for MOQ, pricing, and regulatory documentation.</p>
            </div>
            <a href="#" download onMouseEnter={playSound} className="hidden md:inline-flex shrink-0 items-center gap-2 bg-gradient-to-r from-[#0d3b9c] to-[#2563eb] text-white rounded-full px-5 py-2.5 text-[12px] font-bold shadow-[0_6px_20px_rgba(13,59,156,0.3)] hover:shadow-[0_10px_28px_rgba(13,59,156,0.4)] hover:scale-[1.02] transition-all">
              <IcoDown/> Download Full Catalogue
            </a>
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-2">
            {FILTER_BRANDS.map(f => (
              <button key={f} onClick={() => { setActiveFilter(f); setShowMore(false); }} onMouseEnter={playSound}
                className={`whitespace-nowrap inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-bold border transition-all
                  ${activeFilter===f ? 'bg-[#0d3b9c] text-white border-[#0d3b9c] shadow-[0_6px_18px_rgba(13,59,156,0.3)]' : 'bg-white border-[#e0e8f7] text-[#5a6a90] hover:bg-[#f3f6ff] hover:border-[#c0cef0]'}`}>
                {f}
              </button>
            ))}
            <a href="#" download className="md:hidden ml-auto inline-flex items-center gap-1.5 bg-[#0d3b9c] text-white rounded-full px-3 py-1.5 text-[11px] font-bold">
              <IcoDown/> Catalogue
            </a>
          </div>

          {/* Category sub-heading */}
          {activeFilter !== 'All' && (
            <p className="mb-4 text-[12px] text-[#6b7a9f]">
              Showing {Math.min(CAT_LIMIT, baseFiltered.length)} of {baseFiltered.length} {activeFilter} products
              {baseFiltered.length > CAT_LIMIT && <button onClick={()=>{}} className="ml-2 text-[#0d3b9c] font-semibold hover:underline">— view all via enquiry</button>}
            </p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-2">
            {displayed.map(product => (
              <div key={product.id} onMouseEnter={playSound} className="group relative bg-white rounded-[18px] border border-[#e8edf8] shadow-[0_6px_20px_rgba(0,0,0,0.04)] p-3.5 flex flex-col hover:shadow-[0_18px_44px_rgba(13,59,156,0.13)] hover:-translate-y-1.5 transition-all duration-300">
                {product.tag && (
                  <div className="absolute top-3 right-3 bg-[#0d3b9c] text-white text-[9px] font-black px-2 py-0.5 rounded-full z-10">{product.tag}</div>
                )}
                {/* Product image */}
                <div className="h-[140px] rounded-[12px] overflow-hidden relative bg-[#f8f9ff] border border-[#eef2ff]">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-all duration-700 pointer-events-none"/>
                </div>

                <div className="mt-3 flex-1 flex flex-col">
                  <div className="text-[11.5px] font-extrabold tracking-wide text-[#0a1a3d] leading-snug">{product.name}</div>
                  <div className="text-[10px] text-[#7481a8] mt-0.5">{product.subtitle}</div>
                  <div className="mt-2 text-[11px] leading-4 text-[#6b7a9f] flex-1">{product.desc}</div>

                  <div className="mt-3 flex gap-1.5">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#e8f5e9] text-[#1a7a2a] font-semibold border border-[#c8e6c9]">✓ In Stock</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#eef3ff] text-[#0d3b9c] font-semibold border border-[#dde7ff]">Bulk Available</span>
                  </div>

                  <button onClick={() => openEnquiry(product)} className="mt-2.5 w-full bg-gradient-to-r from-[#0d3b9c] to-[#1a5ee8] text-white rounded-full py-2 text-[11.5px] font-bold inline-flex items-center justify-center gap-1.5 hover:shadow-[0_6px_18px_rgba(13,59,156,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Get Export Price →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less for All */}
          {allBrand && (
            <div className="flex justify-center mt-8">
              {hasMore ? (
                <button onClick={() => setShowMore(true)} onMouseEnter={playSound} className="inline-flex items-center gap-2 bg-white border-2 border-[#0d3b9c] text-[#0d3b9c] rounded-full px-7 py-3 text-[13px] font-bold hover:bg-[#0d3b9c] hover:text-white transition-all shadow-[0_6px_20px_rgba(13,59,156,0.12)]">
                  Show More Products ({baseFiltered.length - ALL_INITIAL} more)
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
              ) : showMore ? (
                <button onClick={() => { setShowMore(false); document.getElementById('products')?.scrollIntoView({behavior:'smooth'}); }} className="inline-flex items-center gap-2 bg-white border border-[#e0e8f7] text-[#5a6a90] rounded-full px-7 py-3 text-[13px] font-bold hover:bg-[#f3f6ff] transition-all">
                  Show Less
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
                </button>
              ) : null}
            </div>
          )}
        </section>

        {/* ── WHY CHOOSE ───────────────────────────────────────────────── */}
        <section className="bg-white border-y border-[#edf2ff] py-12">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <div className="text-[10px] tracking-[0.25em] font-bold text-[#0d3b9c] uppercase mb-1">Why Partner With Us</div>
              <h3 className="display text-[22px] md:text-[26px] font-extrabold">The Preferred Export Partner for Global Distributors</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { t:'Global Export',    d:'Shipping to 25+ countries with full documentation',                i:'✈️' },
                { t:'Bulk Pricing',     d:'Competitive MOQ & tiered pricing for all order sizes',             i:'💰' },
                { t:'Genuine Molecules',d:'100% authentic branded formulations — no counterfeits',            i:'🔬' },
                { t:'Fast Dispatch',    d:'Orders processed within 48 hours of confirmation',                 i:'⚡' },
                { t:'Regulatory Docs',  d:'COA, MSDS, product dossiers provided with every order',            i:'📋' },
              ].map(c => (
                <div key={c.t} onMouseEnter={playSound} className="bg-[#fbfcff] border border-[#eef2ff] rounded-[14px] p-4 text-center hover:shadow-[0_10px_28px_rgba(13,59,156,0.1)] hover:-translate-y-1 transition-all group">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-[#eef3ff] group-hover:bg-[#0d3b9c] group-hover:text-white grid place-items-center text-[20px] transition">{c.i}</div>
                  <div className="mt-2.5 text-[12px] font-bold">{c.t}</div>
                  <div className="mt-1 text-[10px] leading-4 text-[#7a8ab0]">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT / WHO WE ARE ───────────────────────────────────────── */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-14 grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-bold text-[#0d3b9c] uppercase mb-2">About AlphaVigor</div>
            <h3 className="display text-[22px] md:text-[28px] font-extrabold leading-tight">India's Premier Men's Wellness Export House</h3>
            <p className="mt-4 text-[13px] leading-6 text-[#6b7a9f]">
              AlphaVigor, powered by TruePharma, is a pharmaceutical exporter specialising in men's sexual health and wellness formulations. We supply bulk quantities of Sildenafil, Tadalafil, and Vardenafil-based products to distributors, wholesalers, and healthcare importers across 25+ countries.
            </p>
            <p className="mt-3 text-[13px] leading-6 text-[#6b7a9f]">
              Every shipment comes with a full Certificate of Analysis, regulatory dossier, and dedicated export support — so your customs clearance is seamless, every time.
            </p>
            <ul className="mt-5 space-y-2.5">
              {['Complete regulatory documentation (COA, MSDS)','Flexible MOQ — starting from 1,000 units','Discreet, secure international packaging','Dedicated export manager for every account','Fast international dispatch within 48 hrs'].map(li => (
                <li key={li} className="flex gap-2.5 text-[12.5px]">
                  <span className="w-4 h-4 rounded-full bg-[#e6fbe6] text-[#1a9a1a] grid place-items-center text-[10px] shrink-0 mt-0.5">✔</span>
                  <span className="text-[#3a4a71]">{li}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-7">
              <button onClick={() => openEnquiry()} onMouseEnter={playSound} className="inline-flex items-center gap-2 bg-[#0d3b9c] text-white rounded-full px-5 py-2.5 text-[12px] font-bold hover:bg-[#0a2f7e] hover:shadow-[0_8px_20px_rgba(13,59,156,0.4)] transition-all">
                Request Product List →
              </button>
              <a href="#" download className="inline-flex items-center gap-2 bg-white border border-[#cdd9f5] text-[#0d3b9c] rounded-full px-4 py-2.5 text-[12px] font-bold hover:bg-[#f3f6ff] transition">
                <IcoDown/> Catalogue PDF
              </a>
            </div>
          </div>

          <div className="relative mt-8 md:mt-0">
            <img src="/images/hero3.png" alt="AlphaVigor Export Products" className="w-full h-[300px] md:h-[380px] object-cover rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"/>
            {/* Floating stat cards */}
            <div className="absolute -bottom-5 left-4 right-4 bg-white rounded-[14px] border border-[#eef2ff] shadow-[0_16px_40px_rgba(0,0,0,0.12)] grid grid-cols-3 divide-x divide-[#eef2ff] p-3">
              {[{k:'🌍 25+',v:'Countries',i:'🌍'},{k:'B2B',v:'Specialists',i:'💼'},{k:'48 hr',v:'Dispatch',i:'⚡'}].map(b=>(
                <div key={b.k} className="flex gap-2 items-center px-2 py-1">
                  <div className="w-7 h-7 rounded-full bg-[#eef3ff] grid place-items-center text-[14px]">{b.i}</div>
                  <div><div className="text-[11px] font-black leading-none text-[#0a1a3d]">{b.k}</div><div className="text-[9px] text-[#7a8ab0]">{b.v}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────── */}
        <section id="contact" className="bg-white border-y border-[#edf2ff] py-14">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-[10px] tracking-[0.25em] font-bold text-[#0d3b9c] uppercase mb-2">Export Enquiries</div>
              <h3 className="display text-[22px] md:text-[26px] font-extrabold">Talk to Our Export Team</h3>
              <p className="mt-2 text-[13px] text-[#6b7a9f]">Our dedicated export managers are available 6 days a week. We respond to all enquiries within 24 hours.</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { i:'📍', t:'Manufacturing & Export HQ', d:'G-5 & G-6, Industrial Estate\nGorwa, Vadodara – 390016\nGujarat, India' },
                  { i:'📞', t:'Export Hotline', d:'+91 76220 68016\n+91 98795 53225' },
                  { i:'✉️', t:'Export Email', d:'export@truepharma.co.in\ninfo@truepharma.co.in' },
                  { i:'🕒', t:'Business Hours', d:'Mon – Sat: 9:00 AM – 6:30 PM IST\nSunday: Closed' },
                ].map(c => (
                  <div key={c.t} className="bg-[#fbfcff] border border-[#eef2ff] rounded-[12px] p-3.5 flex gap-3 hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)] transition">
                    <div className="w-8 h-8 rounded-full bg-[#eef3ff] grid place-items-center text-[14px] shrink-0">{c.i}</div>
                    <div>
                      <div className="text-[11px] font-bold text-[#0a1a3d]">{c.t}</div>
                      <div className="text-[10px] text-[#6b7a9f] leading-4 mt-0.5 whitespace-pre-line">{c.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA panel */}
            <div className="bg-gradient-to-br from-[#061230] to-[#0d3b9c] rounded-[20px] p-8 flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5"/>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#20e3b2]/10"/>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-white/15 grid place-items-center text-[28px] mb-4 border border-white/20">💊</div>
                <h4 className="display text-[22px] font-extrabold">Ready to Order?</h4>
                <p className="mt-2 text-[13px] text-white/70 max-w-[280px] leading-6">
                  Send us your product list and required quantities. We'll respond with pricing, lead time and full documentation within 24 hours.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <button onClick={doWA} onMouseEnter={playSound} className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-3 text-[13px] font-bold shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-[1.02] transition">
                    <IcoWA/> WhatsApp
                  </button>
                  <button onClick={doTG} onMouseEnter={playSound} className="inline-flex items-center justify-center gap-2 bg-[#229ED9] text-white rounded-full px-5 py-3 text-[13px] font-bold shadow-[0_8px_24px_rgba(34,158,217,0.4)] hover:scale-[1.02] transition">
                    <IcoTG/> Telegram
                  </button>
                </div>
                <p className="mt-4 text-[10px] text-white/40">Average response time: under 30 minutes</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PAYMENTS ─────────────────────────────────────────────────── */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
          <div className="text-center mb-7">
            <div className="text-[10px] tracking-[0.25em] font-bold text-[#0d3b9c] uppercase mb-1">Secure Payments</div>
            <div className="display text-[20px] font-extrabold">We Accept International Payments</div>
            <p className="mt-1 text-[12px] text-[#6b7a9f]">All transactions are 100% secure and confidential.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-[700px] mx-auto">
            {[
              { name:'PayPal',        icon:'🅿',  col:'text-[#003087]', bg:'bg-[#f0f5ff] border-[#ccd9f7]', note:'Business accounts' },
              { name:'USDT (TRC-20)', icon:'₮',  col:'text-[#26A17B]', bg:'bg-[#f0fff8] border-[#b6ede0]', note:'Tether stablecoin' },
              { name:'Bitcoin',       icon:'₿',  col:'text-[#F7931A]', bg:'bg-[#fff8f0] border-[#f7d9a8]', note:'BTC accepted' },
              { name:'Bank Transfer', icon:'🏦', col:'text-[#0d3b9c]', bg:'bg-[#f3f6ff] border-[#ccd9f7]', note:'SWIFT / Wire' },
            ].map(p => (
              <div key={p.name} className={`${p.bg} border rounded-[16px] px-6 py-4 flex flex-col items-center gap-1 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all min-w-[150px]`}>
                <span className={`text-[28px] ${p.col}`}>{p.icon}</span>
                <span className={`text-[14px] font-black ${p.col}`}>{p.name}</span>
                <span className="text-[9px] text-[#9aabcf]">{p.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <footer className="bg-[#05102e] text-[#8a9ac0] pt-12 pb-0">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-[1.8fr_1fr_1fr_1.2fr] gap-10 pb-10">

              {/* Brand col */}
              <div>
                <div className="flex items-center gap-3 text-white mb-4">
                  <Logo size={36}/>
                  <div>
                    <div className="font-black text-[16px] display leading-none">AlphaVigor</div>
                    <div className="text-[9px] opacity-50 tracking-[0.22em] uppercase mt-0.5">Global Wellness Exports</div>
                  </div>
                </div>
                <p className="text-[12px] leading-5 max-w-[280px]">
                  India's premier export house for men's wellness pharmaceuticals. Serving global distributors with genuine, high-quality formulations since 2009.
                </p>

                {/* Socials */}
                <div className="mt-5 flex gap-2.5">
                  <a href="https://t.me/AlphaVigor" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#229ED9] text-white grid place-items-center hover:scale-110 transition shadow-md" title="Telegram"><IcoTG/></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white grid place-items-center hover:scale-110 transition shadow-md" title="Instagram"><IcoIG/></a>
                  <a href="https://wa.me/917622068016" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#25D366] text-white grid place-items-center hover:scale-110 transition shadow-md" title="WhatsApp"><IcoWA/></a>
                  <a href="mailto:export@truepharma.co.in" className="w-9 h-9 rounded-full bg-[#0d3b9c] text-white grid place-items-center hover:scale-110 transition shadow-md" title="Email"><IcoMail/></a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <div className="text-white text-[12px] font-bold mb-4 uppercase tracking-wider">Quick Links</div>
                <ul className="space-y-2.5 text-[12px]">
                  {[['Products','#products'],['About Us','#'],['Contact','#contact'],['Download Catalogue','#'],['Wholesale Enquiry','#']].map(([l,h])=>(
                    <li key={l}><a href={h} className="hover:text-white transition flex items-center gap-1.5"><span className="text-[#0d3b9c]">›</span>{l}</a></li>
                  ))}
                </ul>
              </div>

              {/* Top Products */}
              <div>
                <div className="text-white text-[12px] font-bold mb-4 uppercase tracking-wider">Top Products</div>
                <ul className="space-y-2.5 text-[12px]">
                  {PRODUCTS.filter(p=>p.popular).map(p=>(
                    <li key={p.id} onClick={()=>openEnquiry(p)} className="hover:text-white cursor-pointer transition flex items-center gap-1.5">
                      <span className="text-[#0d3b9c]">›</span>{p.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact col */}
              <div>
                <div className="text-white text-[12px] font-bold mb-4 uppercase tracking-wider">Export Contact</div>
                <div className="space-y-3 text-[12px]">
                  <div className="flex gap-2.5 items-start">
                    <span className="mt-0.5 shrink-0 text-[#0d3b9c]">📍</span>
                    <span>Gorwa Industrial Estate, Vadodara 390016, Gujarat, India</span>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="text-[#0d3b9c]">📞</span>
                    <a href="tel:+917622068016" className="hover:text-white transition">+91 76220 68016</a>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="text-[#0d3b9c]">✉️</span>
                    <a href="mailto:export@truepharma.co.in" className="hover:text-white transition break-all">export@truepharma.co.in</a>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="text-[#0d3b9c]">🕒</span>
                    <span>Mon – Sat, 9 AM – 6:30 PM IST</span>
                  </div>
                </div>

                {/* Quick CTA */}
                <button onClick={()=>openEnquiry()} onMouseEnter={playSound} className="mt-5 w-full bg-[#0d3b9c] text-white rounded-[10px] py-2.5 text-[12px] font-bold inline-flex items-center justify-center gap-2 hover:bg-[#1a5ee8] transition">
                  Get Export Quote →
                </button>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px]">
              <div className="text-white/30">© {new Date().getFullYear()} AlphaVigor / TruePharma. All Rights Reserved.</div>
              <div className="flex gap-4 text-white/30">
                <span className="cursor-pointer hover:text-white/60 transition">Privacy Policy</span>
                <span className="cursor-pointer hover:text-white/60 transition">Terms & Conditions</span>
                <span className="cursor-pointer hover:text-white/60 transition">Export Policy</span>
              </div>
              <div className="text-white/25 flex items-center gap-1">Made with <span className="text-red-400/60 mx-0.5">❤</span> in India, for the world</div>
            </div>
          </div>
        </footer>

        {/* ── FLOATING BUTTONS ─────────────────────────────────────────── */}
        <div className="fixed bottom-20 right-4 z-50 flex flex-col items-center gap-1">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#25D366] animate-[pulse-ring_2.2s_ease-out_infinite]"/>
            <button onClick={doWA} className="relative w-12 h-12 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.55)] grid place-items-center hover:scale-110 active:scale-95 transition-all animate-[bob_2.5s_ease-in-out_infinite]" title="WhatsApp">
              <IcoWA/>
            </button>
          </div>
          <span className="text-[8px] font-black text-[#25D366] bg-white rounded-full px-2 py-0.5 shadow-sm">WhatsApp</span>
        </div>

        <div className="fixed bottom-2 right-4 z-50 flex flex-col items-center gap-1">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#229ED9] animate-[pulse-ring_2.2s_ease-out_infinite_0.6s]"/>
            <button onClick={doTG} className="relative w-12 h-12 rounded-full bg-[#229ED9] text-white shadow-[0_10px_30px_rgba(34,158,217,0.55)] grid place-items-center hover:scale-110 active:scale-95 transition-all animate-[bob_2.8s_ease-in-out_infinite_0.6s]" title="Telegram">
              <IcoTG/>
            </button>
          </div>
          <span className="text-[8px] font-black text-[#229ED9] bg-white rounded-full px-2 py-0.5 shadow-sm">Telegram</span>
        </div>

        {/* ── ENQUIRY MODAL ─────────────────────────────────────────────── */}
        {enquiryOpen && (
          <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="absolute inset-0 bg-[#04091f]/70 backdrop-blur-[8px]" onClick={()=>setEnquiryOpen(false)} style={{animation:'fadeIn .2s ease'}}/>
            <div className="relative w-full md:max-w-[540px] bg-white rounded-t-[22px] md:rounded-[22px] shadow-[0_30px_90px_rgba(0,0,0,0.4)] overflow-hidden" style={{animation:'slideUp .35s cubic-bezier(0.16,1,0.3,1)'}}>
              {/* Header */}
              <div className="bg-gradient-to-r from-[#04091f] to-[#0d3b9c] p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Logo size={36}/>
                  <div>
                    <div className="font-black text-[14px] leading-tight">Request Export Price</div>
                    <div className="text-[10px] opacity-60 mt-0.5">Best price · Fast reply · Bulk supply</div>
                  </div>
                </div>
                <button onClick={()=>setEnquiryOpen(false)} className="w-8 h-8 rounded-full bg-white/12 grid place-items-center hover:bg-white/20 text-[14px] transition">✕</button>
              </div>

              <div className="p-5 space-y-4 max-h-[78vh] overflow-auto">
                {/* Product & Qty */}
                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_.7fr] gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#3a4a71]">Select Product</label>
                    <select value={selectedProduct?.id||''} onChange={e=>setSelectedProduct(PRODUCTS.find(p=>p.id===e.target.value)||null)} className="mt-1 w-full rounded-[10px] border border-[#dde6f7] bg-[#fbfcff] px-3 py-2.5 text-[12px] font-medium outline-none focus:border-[#0d3b9c]">
                      <option value="">Choose product…</option>
                      {['Vidalista','Fildena','Vilitra','Cenforce','Kamagra'].map(brand=>(
                        <optgroup key={brand} label={`── ${brand} ──`}>
                          {PRODUCTS.filter(p=>p.brand===brand).map(p=><option key={p.id} value={p.id}>{p.name} – {p.subtitle}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#3a4a71]">Order Quantity</label>
                    <select value={quantity} onChange={e=>setQuantity(e.target.value)} className="mt-1 w-full rounded-[10px] border border-[#dde6f7] bg-[#fbfcff] px-3 py-2.5 text-[12px] outline-none focus:border-[#0d3b9c]">
                      {['500 Units','1,000 Units','2,000 Units','5,000 Units','10,000+ Units','Custom Qty'].map(q=><option key={q}>{q}</option>)}
                    </select>
                  </div>
                </div>

                {/* Product preview */}
                {selectedProduct && (
                  <div className="flex items-center gap-3 bg-[#f5f8ff] border border-[#dde7ff] rounded-[12px] p-3">
                    <div className="w-16 h-10 rounded-[7px] overflow-hidden shrink-0 border border-[#dde7ff]">
                      <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-black text-[#0a1a3d]">{selectedProduct.name}</div>
                      <div className="text-[10px] text-[#6b7a9f]">{selectedProduct.subtitle} · {quantity}</div>
                    </div>
                    <div className="text-[10px] px-2.5 py-1 rounded-full bg-[#e8f5e9] text-[#1a7a2a] font-bold shrink-0">✅ In Stock</div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="text-[11px] font-bold text-[#3a4a71]">Message / Requirements</label>
                  <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="e.g. Need CIF pricing for export to UK, share product dossier and COA. Also interested in Fildena range…" rows={3} className="mt-1 w-full rounded-[10px] border border-[#dde6f7] px-3 py-2.5 text-[12px] outline-none focus:border-[#0d3b9c] resize-none"/>
                </div>

                {/* Send buttons */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button onClick={doWA} className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white rounded-full py-3 text-[12px] font-bold shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:scale-[1.02] active:scale-[0.98] transition">
                    <IcoWA/> WhatsApp
                  </button>
                  <button onClick={doTG} className="inline-flex items-center justify-center gap-1.5 bg-[#229ED9] text-white rounded-full py-3 text-[12px] font-bold shadow-[0_8px_20px_rgba(34,158,217,0.35)] hover:scale-[1.02] active:scale-[0.98] transition">
                    <IcoTG/> Telegram
                  </button>
                  <button onClick={doEmail} className="inline-flex items-center justify-center gap-1.5 bg-[#0d3b9c] text-white rounded-full py-3 text-[12px] font-bold shadow-[0_8px_20px_rgba(13,59,156,0.35)] hover:scale-[1.02] active:scale-[0.98] transition">
                    <IcoMail/> Email
                  </button>
                </div>
                <p className="text-center text-[10px] text-[#9aabcf]">🔒 Confidential · Reply within 30 min · Genuine products</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
