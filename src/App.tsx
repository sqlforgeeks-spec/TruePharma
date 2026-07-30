import { useState, useRef, useEffect } from 'react';

/* ─── Types ─────────────────────────────────────────────────────────── */
type Product = {
  id: string; name: string; subtitle: string; mg: string;
  brand: string; color: string; tag?: string; popular?: boolean;
  img: string;
};

/* ─── Data ───────────────────────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  // Vidalista
  { id:'vidalista5',       name:'VIDALISTA® 5',           subtitle:'Tadalafil Tablets IP 5mg',          mg:'5mg',   brand:'Vidalista', color:'from-[#4D2A16] to-[#8B5A2B]', img:'/images/products/vidalista5.jpg' },
  { id:'vidalista10',      name:'VIDALISTA® 10',          subtitle:'Tadalafil Tablets IP 10mg',         mg:'10mg',  brand:'Vidalista', color:'from-[#4D2A16] to-[#8B5A2B]', popular:true, tag:'Best Seller', img:'/images/products/vidalista10.jpg' },
  { id:'vidalista20',      name:'VIDALISTA® 20',          subtitle:'Tadalafil Tablets IP 20mg',         mg:'20mg',  brand:'Vidalista', color:'from-[#5C3317] to-[#9B6A3B]', img:'/images/products/vidalista20.jpg' },
  { id:'vidalistact',      name:'VIDALISTA® CT',          subtitle:'Tadalafil Chewable Tablets 20mg',   mg:'20mg',  brand:'Vidalista', color:'from-[#6B3A1F] to-[#A06030]', img:'/images/products/vidalistact.jpg' },
  { id:'vidalistapro',     name:'VIDALISTA PROFESSIONAL', subtitle:'Tadalafil Sublingual Tablets 20mg', mg:'20mg',  brand:'Vidalista', color:'from-[#3D1F0E] to-[#7A4A28]', tag:'Pro', img:'/images/products/vidalistapro.jpg' },
  { id:'vidalista60',      name:'VIDALISTA® 60',          subtitle:'Tadalafil Tablets 60mg',            mg:'60mg',  brand:'Vidalista', color:'from-[#2D1508] to-[#6A3A18]', img:'/images/products/vidalista60.jpg' },
  { id:'vidalista80',      name:'VIDALISTA® 80',          subtitle:'Tadalafil Tablets 80mg',            mg:'80mg',  brand:'Vidalista', color:'from-[#1E0E05] to-[#5A2E10]', img:'/images/products/vidalista80.jpg' },
  { id:'vidalistablack80', name:'VIDALISTA BLACK® 80',    subtitle:'Tadalafil Tablets 80mg',            mg:'80mg',  brand:'Vidalista', color:'from-[#0f0f0f] to-[#2a2a2a]', tag:'Premium', img:'/images/products/vidalistablack80.jpg' },
  { id:'supervidalista',   name:'SUPER VIDALISTA',        subtitle:'Tadalafil 20mg + Dapoxetine 60mg',  mg:'Combo', brand:'Vidalista', color:'from-[#1a1a2e] to-[#3a3a5c]', tag:'Combo', img:'/images/products/supervidalista.jpg' },
  // Fildena
  { id:'fildena100',       name:'FILDENA® 100',           subtitle:'Sildenafil Citrate 100mg',          mg:'100mg', brand:'Fildena',   color:'from-[#5B21B6] to-[#7C3AED]', popular:true, tag:'Top Export', img:'/images/products/fildena100.jpg' },
  { id:'fildena120',       name:'FILDENA® STRONG 120',    subtitle:'Sildenafil Citrate 120mg',          mg:'120mg', brand:'Fildena',   color:'from-[#C81E1E] to-[#8B0000]', img:'/images/products/fildena120.jpg' },
  { id:'fildenapro',       name:'FILDENA® PROFESSIONAL',  subtitle:'Sildenafil 100mg Sublingual',       mg:'100mg', brand:'Fildena',   color:'from-[#9D174D] to-[#BE185D]', tag:'Pro', img:'/images/products/fildenapro100.jpg' },
  { id:'fildenasa',        name:'FILDENA® SUPER ACTIVE',  subtitle:'Sildenafil Softgel Capsules 100mg', mg:'100mg', brand:'Fildena',   color:'from-[#1e3a6e] to-[#2563eb]', img:'/images/products/fildenasuperactive.jpg' },
  // Vilitra
  { id:'vilitra20',        name:'VILITRA 20',             subtitle:'Vardenafil 20mg',                   mg:'20mg',  brand:'Vilitra',   color:'from-[#B8962E] to-[#D4AF37]', popular:true, img:'/images/products/vilitra20.jpg' },
  { id:'vilitra40',        name:'VILITRA 40',             subtitle:'Vardenafil 40mg',                   mg:'40mg',  brand:'Vilitra',   color:'from-[#92700A] to-[#B8962E]', img:'/images/products/vilitra40.jpg' },
  { id:'vilitra60',        name:'VILITRA 60',             subtitle:'Vardenafil 60mg',                   mg:'60mg',  brand:'Vilitra',   color:'from-[#6B5010] to-[#92700A]', img:'/images/products/vilitra60.jpg' },
  // Cenforce
  { id:'cenforce25',       name:'CENFORCE 25',            subtitle:'Sildenafil Citrate Tablets IP 25mg', mg:'25mg', brand:'Cenforce',  color:'from-[#065F46] to-[#059669]', img:'/images/products/cenforce25.jpg' },
  { id:'cenforce50',       name:'CENFORCE 50',            subtitle:'Sildenafil Tablets IP 50mg',        mg:'50mg',  brand:'Cenforce',  color:'from-[#1B5E20] to-[#2E7D32]', img:'/images/products/cenforce50.jpg' },
  { id:'cenforce100',      name:'CENFORCE 100',           subtitle:'Sildenafil Citrate Tablets IP 100mg', mg:'100mg', brand:'Cenforce', color:'from-[#14532D] to-[#166534]', popular:true, tag:'Popular', img:'/images/products/cenforce100.jpg' },
  { id:'cenforce150',      name:'CENFORCE 150',           subtitle:'Sildenafil Tablets 150mg',          mg:'150mg', brand:'Cenforce',  color:'from-[#145214] to-[#1B5E20]', img:'/images/products/cenforce150.jpg' },
  { id:'cenforce200',      name:'CENFORCE 200',           subtitle:'Sildenafil Tablets BP 200mg',       mg:'200mg', brand:'Cenforce',  color:'from-[#7C2D12] to-[#B45309]', tag:'High Dose', img:'/images/products/cenforce200.jpg' },
  { id:'cenforcesoft',     name:'CENFORCE SOFT-100',      subtitle:'Sildenafil Chewable Tablets 100mg', mg:'100mg', brand:'Cenforce',  color:'from-[#0D3D0D] to-[#145214]', popular:true, tag:'#1 Export', img:'/images/products/cenforcesoft100.jpg' },
  // Kamagra
  { id:'kamagra100',       name:'KAMAGRA 100',            subtitle:'Sildenafil Tablets 100mg',          mg:'100mg', brand:'Kamagra',   color:'from-[#D97706] to-[#F59E0B]', popular:true, tag:'Global Brand', img:'/images/products/kamagra100.jpg' },
  { id:'kamagraoral',      name:'KAMAGRA ORAL JELLY',     subtitle:'Sildenafil 100mg — 7 Flavours',     mg:'100mg', brand:'Kamagra',   color:'from-[#B45309] to-[#D97706]', img:'/images/products/kamagraoral.jpg' },
  { id:'kamagraefferv',    name:'KAMAGRA EFFERVESCENT',   subtitle:'Sildenafil 100mg Effervescent',     mg:'100mg', brand:'Kamagra',   color:'from-[#92400E] to-[#B45309]', img:'/images/products/kamagraefferv.jpg' },
  { id:'kamagrapolo',      name:'KAMAGRA POLO',           subtitle:'Sildenafil Chewable 100mg',         mg:'100mg', brand:'Kamagra',   color:'from-[#78350F] to-[#92400E]', img:'/images/products/kamagrapolo.jpg' },
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
      g.gain.exponentialRampToValueAtTime(0.06, c.currentTime+0.02);
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
const IcoCaret = () => <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>;

/* ─── Logo ───────────────────────────────────────────────────────────── */
const Logo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="url(#logoGrad)"/>
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1E3A5F"/>
        <stop offset="100%" stopColor="#0F2340"/>
      </linearGradient>
    </defs>
    <ellipse cx="20" cy="20" rx="9" ry="9" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none"/>
    <ellipse cx="20" cy="20" rx="5" ry="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>
    <line x1="11" y1="20" x2="29" y2="20" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    <rect x="18" y="13" width="4" height="14" rx="2" fill="white"/>
    <rect x="13" y="18" width="14" height="4" rx="2" fill="white"/>
    <path d="M26 10.5L31 10.5L31 15.5" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9"/>
    <line x1="26" y1="15.5" x2="31" y2="10.5" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"/>
  </svg>
);

/* ─── Splash ─────────────────────────────────────────────────────────── */
function Splash({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in'|'hold'|'out'>('in');
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 400);
    const t2 = setTimeout(() => setPhase('out'),  2200);
    const t3 = setTimeout(() => onDone(),          2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0F1E35]"
      style={{ opacity: phase==='out'?0:1, transition: phase==='out'?'opacity 0.7s ease':'none', pointerEvents: phase==='out'?'none':'all' }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"/>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-blue-400/8 blur-3xl"/>
      </div>
      <div style={{ transform: phase==='in'?'scale(0.85) translateY(12px)':'scale(1) translateY(0)', opacity: phase==='in'?0:1, transition:'transform 0.5s cubic-bezier(0.34,1.56,0.64,1),opacity 0.4s ease' }}
        className="relative flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <Logo size={52}/>
          <div>
            <div className="text-[26px] font-black text-white tracking-tight" style={{fontFamily:'"Plus Jakarta Sans",Inter,sans-serif'}}>TruePharma</div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-blue-300/70 font-semibold">Global Pharma Exports</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-[11px] text-blue-200 font-semibold border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"/>B2B Pharma Exports · Serving 25+ Countries
        </div>
        <div className="w-28 h-0.5 bg-white/10 rounded-full overflow-hidden mt-1">
          <div className="h-full bg-blue-400 rounded-full" style={{ width:phase==='hold'?'100%':'0%', transition:phase==='hold'?'width 1.6s ease':'none' }}/>
        </div>
      </div>
    </div>
  );
}

/* ─── Product Ticker (compact, dark, minimalistic) ───────────────────── */
function ProductTicker() {
  const doubled = [...PRODUCTS, ...PRODUCTS];
  return (
    <div className="bg-[#0F1E35] overflow-hidden py-1.5 relative select-none" style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0F1E35] to-transparent z-10 pointer-events-none"/>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0F1E35] to-transparent z-10 pointer-events-none"/>
      <div className="flex gap-0 w-max items-center" style={{animation:'tickerImg 80s linear infinite'}}
        onMouseEnter={e=>(e.currentTarget.style.animationPlayState='paused')}
        onMouseLeave={e=>(e.currentTarget.style.animationPlayState='running')}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-[10.5px] font-semibold text-white/70 whitespace-nowrap px-3 tracking-wide">{item.name}</span>
            <span className="text-white/20 text-[8px]">·</span>
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

  const allBrand     = activeFilter === 'All';
  const baseFiltered = allBrand ? PRODUCTS : PRODUCTS.filter(p => p.brand === activeFilter);
  const limit        = allBrand ? (showMore ? baseFiltered.length : ALL_INITIAL) : CAT_LIMIT;
  const displayed    = baseFiltered.slice(0, limit);
  const hasMore      = baseFiltered.length > limit;

  const handleSplashDone = () => {
    setSplash(false);
    setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior:'smooth' }), 200);
  };

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i+1) % HERO_IMAGES.length), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = enquiryOpen ? 'hidden' : '';
  }, [enquiryOpen]);

  const openEnquiry = (p?: Product) => { if(p) setSelectedProduct(p); setEnquiryOpen(true); };

  const buildMsg = () => {
    const prod = selectedProduct ? `${selectedProduct.name} (${selectedProduct.subtitle})` : 'General Export Enquiry';
    return `Hello TruePharma Export Team 👋,%0A%0AI am interested in bulk supply of:%0A📦 Product: ${prod}%0A🔢 Quantity: ${quantity}%0A%0A💬 ${msg || 'Please share your best export price, MOQ, lead time and full product catalogue.'}%0A%0A✉️ Sent via TruePharma Export Portal`;
  };
  const buildPlain = () => decodeURIComponent(buildMsg().replace(/%0A/g,'\n'));
  const doWA    = () => window.open(`https://wa.me/917622068016?text=${buildMsg()}`,'_blank');
  const doTG    = () => window.open(`https://t.me/AlphaVigor?text=${buildMsg()}`,'_blank');
  const doEmail = () => { window.location.href=`mailto:export@truepharma.co.in?subject=${encodeURIComponent(`Export Enquiry – ${selectedProduct?.name||'Pharma Products'} | Qty: ${quantity}`)}&body=${encodeURIComponent(buildPlain())}`; };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');
        *{font-family:Inter,sans-serif}
        .display{font-family:"Plus Jakarta Sans",Inter,sans-serif}
        ::-webkit-scrollbar{height:4px;width:4px}
        ::-webkit-scrollbar-thumb{background:#d1d9f0;border-radius:8px}
        .scrollbar-none::-webkit-scrollbar{display:none}
        .scrollbar-none{-ms-overflow-style:none;scrollbar-width:none}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(28px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.5);opacity:0}100%{transform:scale(1.5);opacity:0}}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes tickerImg{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes heroFadeIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      `}</style>

      {splash && <Splash onDone={handleSplashDone}/>}

      <div className="min-h-screen bg-white text-[#0A0A14] antialiased" style={{opacity:splash?0:1,transition:'opacity 0.4s ease'}}>

        {/* ── PRODUCT TICKER ───────────────────────────────────────────── */}
        <ProductTicker />

        {/* ── COUNTRIES BANNER (above navbar) ─────────────────────────── */}
        <div className="bg-[#1E3A5F] py-1.5 text-center" style={{borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
          <span className="text-[11px] font-semibold text-blue-200/90 tracking-wide">✈️ Serving 25+ Countries Worldwide &nbsp;·&nbsp; B2B Pharma Exports &nbsp;·&nbsp; 24 hr Response</span>
        </div>

        {/* ── NAVBAR ─────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-40 bg-white/97 backdrop-blur-md border-b border-slate-100" style={{boxShadow:'0 1px 0 #E8ECF5'}}>
          <div className="max-w-[1280px] mx-auto flex items-center justify-between px-5 md:px-8 h-[64px]">

            {/* Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Logo size={36}/>
              <div className="leading-tight">
                <div className="font-black text-[17px] display text-[#0F1E35] tracking-tight">TruePharma</div>
                <div className="text-[8.5px] tracking-[0.2em] uppercase text-slate-400 font-semibold -mt-0.5">Global Pharma Exports</div>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_BRANDS.map(brand => (
                <div key={brand.label} className="relative group">
                  <button className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-slate-600 hover:text-[#1E3A5F] hover:bg-slate-50 transition-all" onMouseEnter={playSound}>
                    {brand.label}<IcoCaret/>
                  </button>
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 min-w-[256px]">
                    <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(15,30,53,0.12)] border border-slate-100 p-1.5">
                      {brand.products.map(p => (
                        <div key={p.id} onClick={() => openEnquiry(p)} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer group/item transition-colors">
                          <div className="w-10 h-7 rounded-lg overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover"/>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-bold text-[#0F1E35] group-hover/item:text-[#1E3A5F] leading-none truncate">{p.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 truncate">{p.subtitle}</div>
                          </div>
                          {p.tag && <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">{p.tag}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <a href="#contact" className="px-3.5 py-2 rounded-lg text-[13px] font-semibold text-slate-600 hover:text-[#1E3A5F] hover:bg-slate-50 transition-all">Contact</a>
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={() => openEnquiry()} onMouseEnter={playSound} className="hidden md:inline-flex items-center gap-2 bg-[#1E3A5F] text-white rounded-xl px-4 py-2.5 text-[13px] font-bold hover:bg-[#0F2340] hover:shadow-[0_8px_24px_rgba(15,30,53,0.25)] transition-all">
                Get Export Quote →
              </button>
              <button onClick={() => setMobileMenu(v=>!v)} className="lg:hidden w-9 h-9 grid place-items-center rounded-lg bg-slate-100 text-[#1E3A5F]">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-0.5">
              {NAV_BRANDS.map(brand => (
                <details key={brand.label} className="group/m">
                  <summary className="flex items-center justify-between py-2.5 font-bold cursor-pointer list-none text-[#0F1E35] text-[14px]">
                    {brand.label}
                    <svg className="w-4 h-4 opacity-40 group-open/m:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </summary>
                  <div className="pl-3 pb-2 space-y-1">
                    {brand.products.map(p => (
                      <div key={p.id} onClick={() => { openEnquiry(p); setMobileMenu(false); }} className="py-1.5 text-[12px] text-slate-500 cursor-pointer hover:text-[#1E3A5F]">
                        {p.name} — {p.subtitle}
                      </div>
                    ))}
                  </div>
                </details>
              ))}
              <button onClick={() => { openEnquiry(); setMobileMenu(false); }} className="w-full mt-2 bg-[#1E3A5F] text-white rounded-xl py-3 font-bold text-[13px]">Get Export Quote →</button>
            </div>
          )}
        </header>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white">
          {/* Background */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1E3A5F]/4 blur-[80px] pointer-events-none"/>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-400/6 blur-[60px] pointer-events-none"/>

          <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-14 pb-0 md:pt-20">
            <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">

              {/* Left: text */}
              <div style={{animation:'heroFadeIn .6s ease both'}}>
                <h1 className="display text-[40px] md:text-[52px] font-[900] leading-[1.05] tracking-tight text-[#0F1E35]">
                  Trusted Global<br/>
                  <span className="text-[#1E3A5F]">Pharma</span>{' '}
                  <span className="relative">
                    Exports
                    <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" preserveAspectRatio="none"><path d="M0 5 Q50 0 100 5 Q150 0 200 5" stroke="#60A5FA" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
                  </span>
                </h1>

                <p className="mt-5 text-[15px] leading-7 text-slate-500 max-w-[440px]">
                  Your trusted B2B source for <span className="text-[#0F1E35] font-semibold">Sildenafil, Tadalafil & Vardenafil</span> formulations. Bulk supply, competitive pricing, global shipping.
                </p>

                {/* Feature pills */}
                <div className="mt-7 grid grid-cols-3 gap-2.5 max-w-[380px]">
                  {[
                    {i:'🌍', t:'25+ Countries'},
                    {i:'💊', t:'27 Products'},
                    {i:'💰', t:'Bulk Pricing'},
                  ].map(f=>(
                    <div key={f.t} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 hover:border-[#1E3A5F]/30 hover:bg-blue-50/50 transition-colors group">
                      <span className="text-[16px] shrink-0">{f.i}</span>
                      <span className="text-[11.5px] font-semibold text-slate-600 group-hover:text-[#1E3A5F] transition-colors">{f.t}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} onMouseEnter={playSound}
                    className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white rounded-xl px-6 py-3.5 text-[14px] font-bold shadow-[0_8px_24px_rgba(15,30,53,0.2)] hover:bg-[#0F2340] hover:shadow-[0_12px_32px_rgba(15,30,53,0.28)] hover:-translate-y-0.5 transition-all">
                    View Product Catalogue →
                  </button>
                  <button onClick={doWA} onMouseEnter={playSound}
                    className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-[#0F1E35] rounded-xl px-5 py-3.5 text-[14px] font-bold hover:border-[#25D366] hover:text-[#25D366] hover:-translate-y-0.5 transition-all">
                    <IcoWA/> WhatsApp
                  </button>
                </div>

                {/* Social proof row */}
                <div className="mt-7 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {['#1E3A5F','#2563EB','#0EA5E9','#6366F1','#8B5CF6'].map(c=>(
                      <div key={c} className="w-8 h-8 rounded-full border-2 border-white" style={{background:c}}/>
                    ))}
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#0F1E35]">Trusted by global distributors</div>
                    <div className="text-[11px] text-slate-400">24 hr response · Genuine products</div>
                  </div>
                </div>
              </div>

              {/* Right: hero image carousel */}
              <div className="relative" style={{animation:'heroFadeIn .7s .15s ease both'}}>
                <div className="relative rounded-[20px] overflow-hidden shadow-[0_24px_60px_rgba(15,30,53,0.14)] border border-slate-100" style={{height:420}}>
                  {HERO_IMAGES.map((src,i)=>(
                    <img key={src} src={src} alt="TruePharma products" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" style={{opacity:i===heroIdx?1:0}}/>
                  ))}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {HERO_IMAGES.map((_,i)=>(
                      <button key={i} onClick={()=>setHeroIdx(i)} className={`h-1.5 rounded-full transition-all ${i===heroIdx?'bg-white w-6':'bg-white/50 w-1.5'}`}/>
                    ))}
                  </div>
                </div>
                {/* Floating stat cards */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 grid place-items-center text-[20px]">🌍</div>
                  <div>
                    <div className="text-[18px] font-black text-[#0F1E35] leading-none">25+</div>
                    <div className="text-[10px] text-slate-400">Countries</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 grid place-items-center text-[20px]">💊</div>
                  <div>
                    <div className="text-[18px] font-black text-[#0F1E35] leading-none">27+</div>
                    <div className="text-[10px] text-slate-400">Products</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-14 mb-0 grid grid-cols-2 md:grid-cols-4 gap-0 border border-slate-200 rounded-2xl overflow-hidden divide-x divide-y divide-slate-200">
              {[
                {k:'27+',  v:'Export Products'},
                {k:'25+',  v:'Countries Served'},
                {k:'48 hr',v:'Order Dispatch'},
                {k:'24 hr',v:'Response Time'},
              ].map(s=>(
                <div key={s.k} className="flex flex-col items-center justify-center py-5 bg-white hover:bg-slate-50 transition-colors">
                  <div className="text-[26px] md:text-[30px] font-black display text-[#0F1E35]">{s.k}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────────────────── */}
        <section id="products" className="max-w-[1280px] mx-auto px-5 md:px-8 py-16">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1E3A5F] rounded-full px-3 py-1 text-[11px] font-bold mb-2 border border-blue-100">
                💊 Export Product Catalogue
              </div>
              <h2 className="display text-[26px] md:text-[32px] font-extrabold leading-tight text-[#0F1E35]">Men's Wellness Export Range</h2>
              <p className="mt-1.5 text-[13px] text-slate-400">Wholesale & bulk supply. Contact us for MOQ, pricing, and regulatory documentation.</p>
            </div>
            <a href="#" download onMouseEnter={playSound}
              className="hidden md:inline-flex shrink-0 items-center gap-2 border-2 border-[#1E3A5F] text-[#1E3A5F] rounded-xl px-5 py-2.5 text-[13px] font-bold hover:bg-[#1E3A5F] hover:text-white transition-all">
              <IcoDown/> Download Catalogue
            </a>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FILTER_BRANDS.map(f => (
              <button key={f} onClick={() => { setActiveFilter(f); setShowMore(false); }} onMouseEnter={playSound}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[12px] font-bold border-2 transition-all
                  ${activeFilter===f ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-[0_4px_14px_rgba(15,30,53,0.2)]' : 'bg-white border-slate-200 text-slate-500 hover:border-[#1E3A5F] hover:text-[#1E3A5F]'}`}>
                {f}
              </button>
            ))}
            <a href="#" download className="md:hidden ml-auto inline-flex items-center gap-1 bg-blue-50 text-[#1E3A5F] rounded-full px-3 py-1.5 text-[11px] font-bold">
              <IcoDown/> Catalogue
            </a>
          </div>

          {activeFilter !== 'All' && (
            <p className="mb-5 text-[12px] text-slate-400">
              Showing {Math.min(CAT_LIMIT, baseFiltered.length)} of {baseFiltered.length} {activeFilter} products
            </p>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {displayed.map(product => (
              <div key={product.id} onMouseEnter={playSound}
                className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_12px_40px_rgba(15,30,53,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col">

                {product.tag && (
                  <div className="absolute top-2.5 left-2.5 z-10 bg-[#0F1E35] text-white text-[9px] font-black px-2 py-0.5 rounded-full">{product.tag}</div>
                )}

                {/* Product image */}
                <div className="relative overflow-hidden bg-slate-50" style={{aspectRatio:'4/3'}}>
                  <img src={product.img} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"/>
                </div>

                {/* Card body */}
                <div className="p-3.5 flex flex-col gap-2.5 flex-1">
                  <div>
                    <div className="text-[12px] font-extrabold text-[#0F1E35] leading-snug">{product.name}</div>
                    <div className="text-[10.5px] text-slate-400 mt-0.5">{product.subtitle}</div>
                  </div>
                  <button onClick={() => openEnquiry(product)}
                    className="mt-auto w-full bg-slate-50 text-[#1E3A5F] border border-slate-200 rounded-xl py-2 text-[11.5px] font-bold hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] transition-all">
                    Get Export Price →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Less */}
          {allBrand && (
            <div className="flex justify-center mt-10">
              {hasMore ? (
                <button onClick={() => setShowMore(true)} onMouseEnter={playSound}
                  className="inline-flex items-center gap-2 border-2 border-[#1E3A5F] text-[#1E3A5F] rounded-xl px-7 py-3 text-[13px] font-bold hover:bg-[#1E3A5F] hover:text-white transition-all">
                  Show More Products ({baseFiltered.length - ALL_INITIAL} more)
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
              ) : showMore ? (
                <button onClick={() => { setShowMore(false); document.getElementById('products')?.scrollIntoView({behavior:'smooth'}); }}
                  className="inline-flex items-center gap-2 border border-slate-200 text-slate-500 rounded-xl px-7 py-3 text-[13px] font-bold hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all">
                  Show Less
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
                </button>
              ) : null}
            </div>
          )}
        </section>

        {/* ── WHY CHOOSE ───────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-y border-slate-100 py-14">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-[11px] font-bold text-slate-500 mb-3">
                🤝 Why Partner With Us
              </div>
              <h3 className="display text-[24px] md:text-[28px] font-extrabold text-[#0F1E35]">The Preferred Export Partner for Global Distributors</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {i:'✈️', t:'Global Export',     d:'Shipping to 25+ countries with full documentation'},
                {i:'💰', t:'Bulk Pricing',       d:'Competitive MOQ & tiered pricing for all order sizes'},
                {i:'🔬', t:'Genuine Molecules',  d:'100% authentic branded formulations — no counterfeits'},
                {i:'⚡', t:'Fast Dispatch',      d:'Orders processed within 48 hours of confirmation'},
                {i:'📋', t:'Regulatory Docs',    d:'COA, MSDS, product dossiers with every order'},
              ].map(c => (
                <div key={c.t} onMouseEnter={playSound}
                  className="bg-white border border-slate-100 rounded-2xl p-5 text-center hover:border-[#1E3A5F]/30 hover:shadow-[0_8px_28px_rgba(15,30,53,0.08)] hover:-translate-y-1 transition-all group">
                  <div className="w-11 h-11 mx-auto rounded-xl bg-blue-50 group-hover:bg-[#1E3A5F] grid place-items-center text-[22px] transition-colors mb-3">{c.i}</div>
                  <div className="text-[12.5px] font-bold text-[#0F1E35]">{c.t}</div>
                  <div className="mt-1 text-[10.5px] leading-[1.5] text-slate-400">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────── */}
        <section className="max-w-[1280px] mx-auto px-5 md:px-8 py-16 grid md:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1E3A5F] rounded-full px-3 py-1 text-[11px] font-bold mb-4 border border-blue-100">
              About TruePharma
            </div>
            <h3 className="display text-[24px] md:text-[30px] font-extrabold text-[#0F1E35] leading-tight">India's Premier Men's Wellness Export House</h3>
            <p className="mt-4 text-[13.5px] leading-6 text-slate-500">
              TruePharma is a pharmaceutical exporter specialising in men's sexual health and wellness formulations. We supply bulk quantities of Sildenafil, Tadalafil, and Vardenafil-based products to distributors, wholesalers, and healthcare importers across 25+ countries.
            </p>
            <p className="mt-3 text-[13.5px] leading-6 text-slate-500">
              Every shipment comes with a full Certificate of Analysis, regulatory dossier, and dedicated export support — so your customs clearance is seamless, every time.
            </p>
            <ul className="mt-6 space-y-3">
              {['Complete regulatory documentation (COA, MSDS)','Flexible MOQ — starting from 1,000 units','Discreet, secure international packaging','Dedicated export manager for every account','Fast international dispatch within 48 hrs'].map(li => (
                <li key={li} className="flex gap-3 text-[13px]">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-[#1E3A5F] grid place-items-center text-[10px] font-black shrink-0 mt-0.5 border border-blue-100">✔</span>
                  <span className="text-slate-600">{li}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-8">
              <button onClick={() => openEnquiry()} onMouseEnter={playSound}
                className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white rounded-xl px-5 py-3 text-[13px] font-bold hover:bg-[#0F2340] hover:shadow-[0_8px_24px_rgba(15,30,53,0.25)] transition-all">
                Request Product List →
              </button>
              <a href="#" download className="inline-flex items-center gap-2 border-2 border-slate-200 text-slate-600 rounded-xl px-4 py-3 text-[13px] font-bold hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all">
                <IcoDown/> Catalogue PDF
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(15,30,53,0.1)] border border-slate-100">
              <img src="/images/hero3.png" alt="TruePharma Export Products" className="w-full h-[320px] md:h-[400px] object-cover"/>
            </div>
            <div className="absolute -bottom-5 left-5 right-5 bg-white rounded-2xl border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)] grid grid-cols-3 divide-x divide-slate-100 p-4">
              {[{k:'🌍 25+',v:'Countries',bg:'#EFF6FF'},{k:'B2B',v:'Specialists',bg:'#F8FAFC'},{k:'48 hr',v:'Dispatch',bg:'#F0FDF4'}].map(b=>(
                <div key={b.k} className="flex gap-2.5 items-center justify-center px-2">
                  <div className="w-8 h-8 rounded-xl grid place-items-center text-[14px]" style={{background:b.bg}}>{b.k.includes('🌍')?'🌍':b.k.includes('B2B')?'💼':'⚡'}</div>
                  <div><div className="text-[12px] font-black leading-none text-[#0F1E35]">{b.k.replace('🌍 ','')}</div><div className="text-[9px] text-slate-400">{b.v}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────── */}
        <section id="contact" className="bg-slate-50 border-y border-slate-100 py-14">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-[11px] font-bold text-slate-500 mb-4">
                📬 Export Enquiries
              </div>
              <h3 className="display text-[24px] md:text-[28px] font-extrabold text-[#0F1E35]">Talk to Our Export Team</h3>
              <p className="mt-2 text-[13px] text-slate-400">Our dedicated export managers are available 6 days a week. We respond to all enquiries within 24 hours.</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {i:'📍', t:'Manufacturing & Export HQ', d:'G-5 & G-6, Industrial Estate\nGorwa, Vadodara – 390016\nGujarat, India'},
                  {i:'📞', t:'Export Hotline', d:'+91 76220 68016\n+91 98795 53225'},
                  {i:'✉️', t:'Export Email', d:'export@truepharma.co.in\ninfo@truepharma.co.in'},
                  {i:'🕒', t:'Business Hours', d:'Mon – Sat: 9:00 AM – 6:30 PM IST\nSunday: Closed'},
                ].map(c => (
                  <div key={c.t} className="bg-white border border-slate-100 rounded-xl p-4 flex gap-3 hover:border-[#1E3A5F]/30 hover:shadow-[0_4px_16px_rgba(15,30,53,0.06)] transition">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 grid place-items-center text-[16px] shrink-0">{c.i}</div>
                    <div>
                      <div className="text-[11.5px] font-bold text-[#0F1E35]">{c.t}</div>
                      <div className="text-[10.5px] text-slate-500 leading-4 mt-0.5 whitespace-pre-line">{c.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0F1E35] rounded-2xl p-8 flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5"/>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-500/10"/>
              <div className="relative flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 grid place-items-center text-[28px] mb-5">💊</div>
                <h4 className="display text-[22px] font-extrabold">Ready to Order?</h4>
                <p className="mt-2 text-[13px] text-white/70 max-w-[280px] leading-6">
                  Send us your product list and required quantities. We'll respond with pricing, lead time and documentation within 24 hours.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <button onClick={doWA} onMouseEnter={playSound}
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl px-5 py-3 text-[13px] font-bold shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:scale-[1.02] transition">
                    <IcoWA/> WhatsApp
                  </button>
                  <button onClick={doTG} onMouseEnter={playSound}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white rounded-xl px-5 py-3 text-[13px] font-bold hover:bg-white/20 hover:scale-[1.02] transition">
                    <IcoTG/> Telegram
                  </button>
                </div>
                <p className="mt-4 text-[10px] text-white/40">Average response time: under 30 minutes</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PAYMENTS ─────────────────────────────────────────────────── */}
        <section className="max-w-[1280px] mx-auto px-5 md:px-8 py-14">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1E3A5F] rounded-full px-3 py-1 text-[11px] font-bold mb-3 border border-blue-100">
              🔒 Secure Payments
            </div>
            <div className="display text-[22px] font-extrabold text-[#0F1E35]">We Accept International Payments</div>
            <p className="mt-1.5 text-[12.5px] text-slate-400">All transactions are 100% secure and confidential.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-[680px] mx-auto">
            {[
              {name:'PayPal',        icon:'🅿',  col:'#003087', bg:'#EFF6FF', note:'Business accounts'},
              {name:'USDT (TRC-20)', icon:'₮',  col:'#26A17B', bg:'#F0FDF4', note:'Tether stablecoin'},
              {name:'Bitcoin',       icon:'₿',  col:'#F7931A', bg:'#FFFBEB', note:'BTC accepted'},
              {name:'Bank Transfer', icon:'🏦', col:'#1E3A5F', bg:'#EFF6FF', note:'SWIFT / Wire'},
            ].map(p => (
              <div key={p.name} className="rounded-2xl border border-slate-100 px-6 py-5 flex flex-col items-center gap-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all min-w-[150px] bg-white">
                <span className="text-[30px]" style={{color:p.col}}>{p.icon}</span>
                <span className="text-[14px] font-black" style={{color:p.col}}>{p.name}</span>
                <span className="text-[9.5px] text-slate-400">{p.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <footer className="bg-[#0F1E35] text-slate-400">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8">
            {/* Main footer grid */}
            <div className="grid md:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 pt-12 pb-10">

              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Logo size={36}/>
                  <div>
                    <div className="font-black text-[17px] display leading-none text-white">TruePharma</div>
                    <div className="text-[9px] opacity-40 tracking-[0.22em] uppercase mt-0.5">Global Pharma Exports</div>
                  </div>
                </div>
                <p className="text-[12.5px] leading-[1.6] max-w-[260px]">
                  India's premier export house for men's wellness pharmaceuticals. Serving global distributors with genuine, high-quality formulations.
                </p>
                <div className="mt-5 flex gap-2">
                  {[
                    {href:'https://t.me/AlphaVigor', bg:'#229ED9', icon:<IcoTG/>, title:'Telegram'},
                    {href:'https://instagram.com', bg:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)', icon:<IcoIG/>, title:'Instagram'},
                    {href:'https://wa.me/917622068016', bg:'#25D366', icon:<IcoWA/>, title:'WhatsApp'},
                    {href:'mailto:export@truepharma.co.in', bg:'#1E3A5F', icon:<IcoMail/>, title:'Email'},
                  ].map(s=>(
                    <a key={s.title} href={s.href} target={s.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" title={s.title}
                      className="w-9 h-9 rounded-xl text-white grid place-items-center hover:scale-110 transition shadow-lg"
                      style={{background:s.bg}}>{s.icon}</a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <div className="text-white text-[12px] font-bold mb-4 uppercase tracking-wider">Quick Links</div>
                <ul className="space-y-2.5 text-[12.5px]">
                  {[['Products','#products'],['About Us','#'],['Contact','#contact'],['Download Catalogue','#'],['Wholesale Enquiry','#']].map(([l,h])=>(
                    <li key={l}>
                      <a href={h} className="hover:text-white transition flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400"/>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Products */}
              <div>
                <div className="text-white text-[12px] font-bold mb-4 uppercase tracking-wider">Top Products</div>
                <ul className="space-y-2.5 text-[12.5px]">
                  {PRODUCTS.filter(p=>p.popular).map(p=>(
                    <li key={p.id} onClick={()=>openEnquiry(p)} className="hover:text-white cursor-pointer transition flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400"/>
                      {p.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <div className="text-white text-[12px] font-bold mb-4 uppercase tracking-wider">Export Contact</div>
                <div className="space-y-3 text-[12.5px]">
                  <div className="flex gap-2.5 items-start">
                    <span className="shrink-0 text-blue-400 mt-0.5">📍</span>
                    <span>Gorwa Industrial Estate, Vadodara 390016, Gujarat, India</span>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="text-blue-400">📞</span>
                    <a href="tel:+917622068016" className="hover:text-white transition">+91 76220 68016</a>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="text-blue-400">✉️</span>
                    <a href="mailto:export@truepharma.co.in" className="hover:text-white transition break-all">export@truepharma.co.in</a>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="text-blue-400">🕒</span>
                    <span>Mon – Sat, 9 AM – 6:30 PM IST</span>
                  </div>
                </div>
                <button onClick={()=>openEnquiry()} onMouseEnter={playSound}
                  className="mt-5 w-full bg-blue-500 text-white rounded-xl py-2.5 text-[12px] font-bold inline-flex items-center justify-center gap-2 hover:bg-blue-600 transition">
                  Get Export Quote →
                </button>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px]">
              <div className="text-slate-500">© {new Date().getFullYear()} TruePharma. All Rights Reserved.</div>
              <div className="flex gap-5 text-slate-500">
                {['Privacy Policy','Terms & Conditions','Export Policy'].map(t=>(
                  <span key={t} className="cursor-pointer hover:text-white transition">{t}</span>
                ))}
              </div>
              <div className="text-slate-600 flex items-center gap-1">Made with <span className="text-blue-400 mx-0.5">❤</span> in India, for the world</div>
            </div>
          </div>
        </footer>

        {/* ── FLOATING BUTTONS ─────────────────────────────────────────── */}
        <div className="fixed bottom-[72px] right-4 z-50 flex flex-col items-center gap-1">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#25D366] animate-[pulse-ring_2.2s_ease-out_infinite]"/>
            <button onClick={doWA} className="relative w-12 h-12 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.5)] grid place-items-center hover:scale-110 active:scale-95 transition-all animate-[bob_2.5s_ease-in-out_infinite]" title="WhatsApp">
              <IcoWA/>
            </button>
          </div>
          <span className="text-[8px] font-black text-[#25D366] bg-white rounded-full px-2 py-0.5 shadow-sm border border-slate-100">WhatsApp</span>
        </div>
        <div className="fixed bottom-2 right-4 z-50 flex flex-col items-center gap-1">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#229ED9] animate-[pulse-ring_2.2s_ease-out_infinite_0.6s]"/>
            <button onClick={doTG} className="relative w-12 h-12 rounded-full bg-[#229ED9] text-white shadow-[0_8px_24px_rgba(34,158,217,0.5)] grid place-items-center hover:scale-110 active:scale-95 transition-all animate-[bob_2.8s_ease-in-out_infinite_0.6s]" title="Telegram">
              <IcoTG/>
            </button>
          </div>
          <span className="text-[8px] font-black text-[#229ED9] bg-white rounded-full px-2 py-0.5 shadow-sm border border-slate-100">Telegram</span>
        </div>

        {/* ── ENQUIRY MODAL ─────────────────────────────────────────────── */}
        {enquiryOpen && (
          <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="absolute inset-0 bg-[#0F1E35]/60 backdrop-blur-sm" onClick={()=>setEnquiryOpen(false)} style={{animation:'fadeIn .2s ease'}}/>
            <div className="relative w-full md:max-w-[520px] bg-white rounded-t-[24px] md:rounded-[24px] shadow-[0_32px_80px_rgba(0,0,0,0.3)] overflow-hidden" style={{animation:'slideUp .3s cubic-bezier(0.16,1,0.3,1)'}}>
              <div className="bg-[#0F1E35] p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Logo size={34}/>
                  <div>
                    <div className="font-black text-[15px] leading-tight">Request Export Price</div>
                    <div className="text-[10.5px] opacity-50 mt-0.5">Best price · Fast reply · Bulk supply</div>
                  </div>
                </div>
                <button onClick={()=>setEnquiryOpen(false)} className="w-8 h-8 rounded-xl bg-white/10 grid place-items-center hover:bg-white/20 text-[14px] transition">✕</button>
              </div>

              <div className="p-5 space-y-4 max-h-[78vh] overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_.7fr] gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Select Product</label>
                    <select value={selectedProduct?.id||''} onChange={e=>setSelectedProduct(PRODUCTS.find(p=>p.id===e.target.value)||null)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] font-medium outline-none focus:border-[#1E3A5F] transition">
                      <option value="">Choose product…</option>
                      {['Vidalista','Fildena','Vilitra','Cenforce','Kamagra'].map(brand=>(
                        <optgroup key={brand} label={`── ${brand} ──`}>
                          {PRODUCTS.filter(p=>p.brand===brand).map(p=><option key={p.id} value={p.id}>{p.name} – {p.subtitle}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Order Quantity</label>
                    <select value={quantity} onChange={e=>setQuantity(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] outline-none focus:border-[#1E3A5F] transition">
                      {['500 Units','1,000 Units','2,000 Units','5,000 Units','10,000+ Units','Custom Qty'].map(q=><option key={q}>{q}</option>)}
                    </select>
                  </div>
                </div>

                {selectedProduct && (
                  <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <div className="w-14 h-9 rounded-lg overflow-hidden shrink-0 border border-blue-100">
                      <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-black text-[#0F1E35]">{selectedProduct.name}</div>
                      <div className="text-[10px] text-slate-500">{selectedProduct.subtitle} · {quantity}</div>
                    </div>
                    <div className="text-[10px] px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-bold shrink-0">✅ In Stock</div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold text-slate-600">Message / Requirements</label>
                  <textarea value={msg} onChange={e=>setMsg(e.target.value)}
                    placeholder="e.g. Need CIF pricing for export to UK, share product dossier and COA. Also interested in Fildena range…"
                    rows={3} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-[12px] outline-none focus:border-[#1E3A5F] resize-none transition"/>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button onClick={doWA} className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white rounded-xl py-3 text-[12px] font-bold hover:scale-[1.02] active:scale-[0.98] transition">
                    <IcoWA/> WhatsApp
                  </button>
                  <button onClick={doTG} className="inline-flex items-center justify-center gap-1.5 bg-[#229ED9] text-white rounded-xl py-3 text-[12px] font-bold hover:scale-[1.02] active:scale-[0.98] transition">
                    <IcoTG/> Telegram
                  </button>
                  <button onClick={doEmail} className="inline-flex items-center justify-center gap-1.5 bg-[#1E3A5F] text-white rounded-xl py-3 text-[12px] font-bold hover:scale-[1.02] active:scale-[0.98] transition">
                    <IcoMail/> Email
                  </button>
                </div>
                <p className="text-center text-[10px] text-slate-400">🔒 Confidential · Reply within 30 min · Genuine products</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
