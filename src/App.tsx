import { useState, useRef, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  subtitle: string;
  mg: string;
  category: string;
  desc: string;
  color: string;
  accent: string;
  popular?: boolean;
  image?: string;
};

const PRODUCTS: Product[] = [
  { id: 'vidalista10', name: 'VIDALISTA® 10', subtitle: 'Tadalafil Tablets IP 10mg', mg: '10mg', category: 'Erectile Dysfunction', desc: 'Long-lasting performance for a better life.', color: 'from-[#4D2A16] to-[#8B5A2B]', accent: 'bg-[#6F3E1F]', popular: true },
  { id: 'fildena100', name: 'FILDENA® 100', subtitle: 'Sildenafil Citrate 100mg', mg: '100mg', category: 'Erectile Dysfunction', desc: 'Fast acting & reliable solution.', color: 'from-[#F5F0FF] to-[#E8E0FF]', accent: 'bg-[#6C2EB5]' },
  { id: 'vidalista20', name: 'VIDALISTA® 20', subtitle: 'Tadalafil Tablets IP 20mg', mg: '20mg', category: 'Erectile Dysfunction', desc: 'Stronger support for greater confidence.', color: 'from-[#4D2A16] to-[#8B5A2B]', accent: 'bg-[#6F3E1F]' },
  { id: 'fildena120', name: 'FILDENA® STRONG 120', subtitle: 'Sildenafil 120mg', mg: '120mg', category: 'Erectile Dysfunction', desc: 'Complete support for lasting moments.', color: 'from-[#C81E1E] to-[#8B0000]', accent: 'bg-[#A41D1D]' },
  { id: 'supervidalista', name: 'SUPER VIDALISTA', subtitle: 'Tadalafil + Dapoxetine', mg: 'Tadalafil', category: 'Erectile Dysfunction', desc: 'Dual action formula for better satisfaction.', color: 'from-[#F8F8F8] to-[#EDEDED]', accent: 'bg-black' },
  { id: 'vilitra20', name: 'VILITRA 20', subtitle: 'Vardenafil 20mg', mg: '20mg', category: 'Erectile Dysfunction', desc: 'Clinically proven Vardenafil excellence.', color: 'from-[#D4AF37] to-[#B8962E]', accent: 'bg-[#8B731B]' },
  { id: 'ceforce100', name: 'CEFORCE 100', subtitle: 'Sildenafil Tablets 100mg', mg: '100mg', category: 'Erectile Dysfunction', desc: 'Trusted quality at affordable pricing.', color: 'from-[#E8F5E9] to-[#C8E6C9]', accent: 'bg-[#2E7D32]' },
  { id: 'kamagra100', name: 'KAMAGRA 100', subtitle: 'Sildenafil Jelly/Tablets', mg: '100mg', category: 'Erectile Dysfunction', desc: 'Popular choice worldwide for performance.', color: 'from-[#FFF8E1] to-[#FFECB3]', accent: 'bg-[#F57F17]' },
];

const MINI_PRODUCTS = [
  { name: 'Vidalista 10', sub: 'Tadalafil 10mg', color: 'bg-[#4D2A16]' },
  { name: 'Fildena 100', sub: 'Sildenafil 100mg', color: 'bg-[#6C2EB5]' },
  { name: 'Vidalista CT', sub: 'Tadalafil CT 20mg', color: 'bg-[#8B5A2B]' },
  { name: 'Fildena Strong 120', sub: 'Sildenafil 120mg', color: 'bg-[#C81E1E]' },
  { name: 'Vilitra 20', sub: 'Vardenafil 20mg', color: 'bg-[#D4AF37]' },
  { name: 'Super Vidalista', sub: 'Tadalafil + Dapoxetine', color: 'bg-black' },
];

const FILTERS = ['All','Erectile Dysfunction','Women’s Health','Cardiovascular','Anti Diabetic','Antibiotics','Gastrointestinal','Other'] as const;

function useHoverSound(){
  const audioCtx = useRef<AudioContext| null>(null);
  const play = () => {
    try{
      if(!audioCtx.current) audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtx.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime+0.15);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime+0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.2);
      osc.start(); osc.stop(ctx.currentTime+0.21);
    }catch{}
  };
  return play;
}

export default function App(){
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product| null>(null);
  const [quantity, setQuantity] = useState('100 Boxes');
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });
  const [mobileMenu, setMobileMenu] = useState(false);
  const playSound = useHoverSound();

  const filtered = activeFilter==='All' ? PRODUCTS : PRODUCTS.filter(p=> p.category===activeFilter || activeFilter==='Erectile Dysfunction' && p.category==='Erectile Dysfunction');

  const openEnquiry = (product?: Product) => {
    if(product) setSelectedProduct(product);
    setEnquiryOpen(true);
  };

  const buildMessage = () => {
    const prod = selectedProduct ? `${selectedProduct.name} (${selectedProduct.subtitle})` : 'General Enquiry';
    return `Hello AlphaVigor / TruePharma Team 👋,%0A%0AI am interested in:%0A📦 Product: ${prod}%0A🔢 Quantity: ${quantity}%0A%0A👤 Name: ${form.name}%0A📧 Email: ${form.email}%0A📞 Phone: ${form.phone}%0A%0A💬 Message: ${form.msg || 'Please share best price, shipping and catalogue.'}%0A%0A Sent from TruePharma Website ✨`;
  };

  const buildPlain = () => decodeURIComponent(buildMessage().replace(/%0A/g, '\n'));

  const handleWhatsapp = () => {
    const msg = buildMessage();
    window.open(`https://wa.me/917622068016?text=${msg}`, '_blank');
  };
  const handleTelegram = () => {
    const msg = buildMessage();
    window.open(`https://t.me/share/url?url=https://alphavigor.in&text=${msg}`, '_blank');
  };
  const handleEmail = () => {
    const subject = `Enquiry for ${selectedProduct?.name || 'Pharma Products'} - Qty: ${quantity}`;
    const body = buildPlain();
    window.location.href = `mailto:info@truepharma.co.in,export@truepharma.co.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Prevent scroll when modal open
  useEffect(()=>{ document.body.style.overflow = enquiryOpen ? 'hidden' : 'auto'; },[enquiryOpen]);

  return (
    <div className="min-h-screen bg-[#f6f8ff] text-[#0f204a] font-[Inter,system-ui,sans-serif] antialiased selection:bg-[#0d3b9c] selection:text-white">
      {/* Custom font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
      *{font-family:Inter,sans-serif} .display{font-family:"Plus Jakarta Sans",Inter,sans-serif}
      ::-webkit-scrollbar{height:6px;width:6px} ::-webkit-scrollbar-thumb{background:#c1cee8;border-radius:10px}
      @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes float2{0%,100%{transform:translateY(0) rotate(3deg)}50%{transform:translateY(-14px) rotate(-2deg)}}
      @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
      `}</style>

      {/* Top Dark Bar */}
      <div className="relative z-50 bg-[#0A194E] text-white text-[11px] md:text-[12px] overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 px-4 md:px-6 py-2.5">
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1">
              <span className="text-[#FFB020]">✦</span> Moving Catalogue: Explore Our Complete Product Range
              <span className="ml-1">→</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/80">
            <span className="w-5 h-5 rounded-full bg-white/15 grid place-items-center">🛡️</span> Trusted by 1000+ Healthcare Professionals Worldwide
          </div>
          <div className="md:hidden w-2" />
        </div>
        {/* subtle aurora */}
        <div className="pointer-events-none absolute -top-10 -left-20 w-[300px] h-[80px] bg-blue-500/20 blur-[30px] rounded-full" />
      </div>

      {/* Mini Product Ticker Strip */}
      <div className="sticky top-0 z-40 -mt-1 px-2 md:px-4">
        <div className="max-w-[1440px] mx-auto bg-white rounded-[14px] shadow-[0_8px_30px_rgba(15,32,74,0.08)] border border-[#e6ebf7] overflow-hidden flex items-center">
          <button className="hidden md:grid w-8 h-8 ml-1 shrink-0 place-items-center rounded-full bg-[#f1f5ff] hover:bg-[#0d3b9c] hover:text-white transition"><span>‹</span></button>
          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-6 md:gap-8 py-2.5 px-3 animate-[ticker_40s_linear_infinite] hover:[animation-play-state:paused] w-max">
              {[...MINI_PRODUCTS, ...MINI_PRODUCTS].map((p,i)=>(
                <div key={i} className="flex items-center gap-2.5 min-w-max group cursor-pointer" onMouseEnter={playSound} onClick={()=>openEnquiry(PRODUCTS[i%PRODUCTS.length])}>
                  <div className={`w-9 h-7 rounded-[4px] ${p.color} shadow-sm grid place-items-center text-[8px] text-white font-bold uppercase tracking-wider`}>BOX</div>
                  <div className="leading-tight">
                    <div className="text-[11px] font-semibold text-[#0f204a] group-hover:text-[#0d3b9c] transition">{p.name}</div>
                    <div className="text-[10px] text-[#6b7a9f]">{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="hidden md:grid w-8 h-8 mr-1 shrink-0 place-items-center rounded-full bg-[#f1f5ff] hover:bg-[#0d3b9c] hover:text-white transition"><span>›</span></button>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-[58px] md:top-[54px] z-30 backdrop-blur-xl bg-white/80 border-b border-[#eaf0ff]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-6 h-[64px]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0d3b9c] via-[#2d82ff] to-[#20e3b2] grid place-items-center shadow-md">
              <span className="text-white font-black text-[14px]">✚</span>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight text-[16px] display">TruePharma</div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#7a8ab0] font-semibold -mt-1">Care. Commitment. Cure.</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium">
            {['Home','About Us','Products','Services','Manufacturing','Quality','R&D','News','Contact Us'].map(item=>(
              <div key={item} className="relative group cursor-pointer" onMouseEnter={playSound}>
                <span className={`flex items-center gap-1 py-1.5 ${item==='Home' ? 'text-[#0d3b9c] font-bold border-b-2 border-[#0d3b9c]' : 'text-[#3a4a71] hover:text-[#0d3b9c]'}`}>
                  {item} {item==='Products' && <span className="text-[10px]">▼</span>}
                </span>
                {item==='Products' && (
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
                    <div className="bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-[#eef2ff] p-2 min-w-[220px]">
                      {PRODUCTS.slice(0,6).map(p=><div key={p.id} onClick={()=>openEnquiry(p)} className="px-3 py-2 rounded-lg hover:bg-[#f3f6ff] text-[12px] cursor-pointer">{p.name}</div>)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button className="hidden md:flex items-center gap-1.5 rounded-full border border-[#dbe4ff] px-3 py-1.5 text-[12px] font-semibold hover:bg-[#f3f6ff] transition"><span>🌐</span> EN <span className="text-[10px]">▼</span></button>
            <button onClick={()=>openEnquiry()} onMouseEnter={playSound} className="hidden md:inline-flex items-center gap-2 bg-[#0d3b9c] text-white rounded-full px-4 py-2 text-[12px] font-bold shadow-[0_8px_20px_rgba(13,59,156,0.35)] hover:shadow-[0_12px_28px_rgba(13,59,156,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all">Enquire Now <span>→</span></button>
            <button onClick={()=>setMobileMenu(v=>!v)} className="lg:hidden w-9 h-9 grid place-items-center rounded-full bg-[#f1f5ff]">☰</button>
          </div>
        </div>
        {mobileMenu && (
          <div className="lg:hidden border-t border-[#eaf0ff] bg-white px-4 py-4 space-y-3 text-[14px]">
            {['Home','About Us','Products','Services','Manufacturing','Quality','R&D','News','Contact Us'].map(it=> <div key={it} className="py-1 font-medium">{it}</div>)}
            <button onClick={()=>openEnquiry()} className="w-full mt-2 bg-[#0d3b9c] text-white rounded-full py-3 font-bold">Enquire Now →</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef4ff] via-[#f7f9ff] to-[#dff0ff]">
        {/* decorative blobs */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#c6deff] rounded-full blur-[80px] opacity-60" />
        <div className="absolute top-40 left-10 w-[60px] h-[60px] rounded-full bg-white/70 shadow-xl rotate-12 grid place-items-center text-xl">💊</div>
        <div className="absolute bottom-40 right-[45%] w-5 h-5 rounded-full bg-blue-200 opacity-80" />

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-14 grid lg:grid-cols-[1.1fr_1.2fr] gap-8 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white rounded-full border border-[#e0e8ff] px-3 py-1.5 text-[10px] font-semibold text-[#0d3b9c] shadow-sm">
              <span className="w-4 h-4 rounded-full bg-[#e8f0ff] grid place-items-center text-[10px]">✔️</span> Trusted by Healthcare Professionals Worldwide
            </div>
            <h1 className="display mt-4 text-[32px] md:text-[44px] font-[800] leading-[1.05] tracking-tight">
              Innovating Healthcare,<br/>
              <span className="bg-gradient-to-r from-[#0d3b9c] to-[#2e9db0] bg-clip-text text-transparent">Improving Lives</span>
              <span className="ml-2 inline-flex w-8 h-8 rounded-full border border-[#aad4ff] items-center justify-center text-[18px] text-[#2e9db0]">♡</span>
            </h1>
            <p className="mt-4 text-[13px] md:text-[14px] leading-6 text-[#5a6a90] max-w-[480px]">TruePharma is a global pharmaceutical company dedicated to delivering high-quality medicines that create a healthier world. Partnered with <strong>AlphaVigor</strong> for premium ED & wellness portfolio 🌍💙</p>

            <div className="mt-6 flex gap-3">
              <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} onMouseEnter={playSound} className="inline-flex items-center gap-2 bg-[#0d3b9c] text-white rounded-full px-5 py-2.5 text-[12px] font-bold shadow-[0_10px_24px_rgba(13,59,156,0.35)] hover:translate-y-[-2px] transition-all">Explore Products <span>→</span></button>
              <button onClick={()=>openEnquiry()} onMouseEnter={playSound} className="inline-flex items-center gap-2 bg-white border border-[#cdd9f5] rounded-full px-5 py-2.5 text-[12px] font-bold hover:bg-[#f6f8ff] transition">About TruePharma <span className="w-4 h-4 rounded-full bg-[#e8f0ff] grid place-items-center text-[10px]">ⓘ</span></button>
            </div>
          </div>

          {/* Hero Product Podium */}
          <div className="relative lg:h-[420px] flex items-center justify-center">
            <div className="absolute left-1/2 top-[58%] -translate-x-1/2 w-[78%] h-[72px] bg-gradient-to-b from-white to-[#c2d8ff] rounded-[50%] blur-[1px] shadow-[0_20px_40px_rgba(100,150,255,0.35)]" />
            {/* Floating products */}
            <div className="relative grid grid-cols-3 gap-3 md:gap-4 items-end place-items-center">
              {/* Row */}
              <div className="col-span-3 flex gap-4 justify-center items-end translate-y-4">
                <div className="animate-[float_4s_ease-in-out_infinite] bg-gradient-to-br from-[#6b3d1f] to-[#a66a3a] rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.25)] w-[110px] md:w-[150px] h-[64px] md:h-[86px] p-2 text-white relative hover:scale-105 hover:rotate-1 transition-transform cursor-pointer" onMouseEnter={playSound} onClick={()=>openEnquiry(PRODUCTS[0])}>
                  <div className="text-[11px] font-black leading-none">VIDALISTA® 10</div>
                  <div className="text-[7px] opacity-80">TADALAFIL 10MG</div>
                  <div className="absolute right-1.5 bottom-1 text-[16px]">🐆</div>
                </div>
                <div className="animate-[float2_4.5s_ease-in-out_infinite] bg-white rounded-lg shadow-xl w-[110px] md:w-[150px] h-[54px] md:h-[72px] p-2 border border-[#eef] relative hover:scale-105 transition cursor-pointer" onMouseEnter={playSound} onClick={()=>openEnquiry(PRODUCTS[1])}>
                  <div className="text-[10px] font-bold text-[#4b2995]">FILDENA® 50</div>
                  <div className="text-[6px] text-[#7a6aab]">SILDENAFIL 50MG</div>
                </div>
                <div className="animate-[float_5s_ease-in-out_infinite] bg-gradient-to-br from-[#7a341f] to-[#c86a3a] rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.25)] w-[110px] md:w-[150px] h-[64px] md:h-[86px] p-2 text-white relative hover:scale-105 transition cursor-pointer" onMouseEnter={playSound} onClick={()=>openEnquiry(PRODUCTS[2])}>
                  <div className="text-[11px] font-black">VIDALISTA CT</div>
                  <div className="text-[7px] opacity-80">20MG</div>
                  <div className="absolute right-1.5 bottom-1 text-[14px]">🐆</div>
                </div>
              </div>

              <div className="col-span-3 flex gap-3 justify-center -mt-2">
                <div className="animate-[float2_3.8s_ease-in-out_infinite] bg-gradient-to-br from-[#a81b1b] to-[#ff3b3b] rounded-lg shadow-[0_14px_32px_rgba(0,0,0,0.25)] w-[140px] md:w-[190px] h-[66px] md:h-[90px] p-2.5 text-white relative hover:scale-105 transition cursor-pointer" onMouseEnter={playSound} onClick={()=>openEnquiry(PRODUCTS[3])}>
                  <div className="flex items-center gap-1"><span className="text-[12px] font-black">FILDENA®</span><span className="text-[9px] bg-white text-[#a81b1b] px-1 rounded font-bold">STRONG 120</span></div>
                  <div className="text-[7px]">SILDENAFIL 120MG</div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[14px]">❤️</div>
                </div>
                <div className="animate-[float_4.2s_ease-in-out_infinite] bg-white rounded-lg shadow-xl w-[150px] md:w-[200px] h-[64px] md:h-[86px] p-2.5 border border-[#ffe] flex flex-col justify-center hover:scale-105 transition cursor-pointer" onMouseEnter={playSound} onClick={()=>openEnquiry(PRODUCTS[4])}>
                  <div className="text-[11px] font-black text-black leading-tight">SUPER VIDALISTA</div>
                  <div className="text-[6px] text-[#666]">TADALAFIL + DAPOXETINE</div>
                  <div className="text-[9px] mt-1">🐆 Professional</div>
                </div>
              </div>

              <div className="col-span-3 flex justify-center gap-4">
                <div className="w-[90px] h-[28px] bg-white rounded-full shadow flex gap-1.5 p-1.5 justify-center">
                  {[...Array(7)].map((_,i)=> <div key={i} className={`w-2.5 h-2.5 rounded-full ${i<3? 'bg-red-500': i<5? 'bg-gray-300':'bg-black'}`} />)}
                </div>
                <div className="w-[90px] h-[28px] bg-white rounded-full shadow flex gap-1.5 p-1.5 justify-center">
                  {[...Array(5)].map((_,i)=> <div key={i} className="w-3 h-3 rounded-full bg-gray-200 border" />)}
                </div>
                <div className="w-[110px] h-[28px] bg-white rounded-full shadow flex gap-1 p-1.5 justify-center">
                  {[...Array(6)].map((_,i)=> <div key={i} className={`w-2.5 h-2.5 rounded-full ${i%2?'bg-red-500':'bg-black'}`} />)}
                </div>
                <div className="w-[90px] h-[28px] bg-white rounded-full shadow flex gap-1 p-1.5 justify-center">
                  {[...Array(6)].map((_,i)=> <div key={i} className={`w-2 h-2 rounded-full ${i<2?'bg-gray-800':'bg-black'}`} />)}
                </div>
              </div>
            </div>

            {/* Glow capsule */}
            <div className="absolute -right-2 md:right-10 top-10 w-12 h-7 rounded-full bg-gradient-to-r from-white to-[#7fc8ff] shadow-lg rotate-12 animate-[float2_6s_ease-in-out_infinite] grid place-items-center text-[10px]">💊</div>
          </div>
        </div>

        {/* Category Strip */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 pb-6">
          <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
            <div className="bg-white rounded-[12px] border border-[#e6edff] shadow-[0_6px_20px_rgba(0,0,0,0.04)] p-3 flex flex-col items-center justify-center gap-2 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer" onMouseEnter={playSound}>
              <div className="w-9 h-9 rounded-full bg-[#fff4cc] grid place-items-center text-[18px]">🏆</div>
              <div className="text-center leading-tight"><div className="text-[11px] font-bold">Featured</div><div className="text-[10px] text-[#7a8ab0]">Top Selling Products</div></div>
            </div>
            {[
              { title:'Vidalista', sub:'Tadalafil Tablets', icon:'🐆', col:'from-[#4D2A16] to-[#8B5A2B]' },
              { title:'Fildena', sub:'Sildenafil Tablets', icon:'💜', col:'from-[#ede6ff] to-[#d7c8ff]' },
              { title:'Vilitra', sub:'Vardenafil Tablets', icon:'🟡', col:'from-[#fff3c4] to-[#ffe690]' },
              { title:'Ceforce', sub:'Sildenafil Tablets', icon:'💚', col:'from-[#e5f6e6] to-[#bdeabf]' },
              { title:'Kamagra', sub:'Sildenafil Jelly/Tablets', icon:'🧃', col:'from-[#e0f7e0] to-[#c8ecc8]' },
            ].map(c=>(
              <div key={c.title} onMouseEnter={playSound} className="group bg-white rounded-[12px] border border-[#e6edff] shadow-sm p-3 flex flex-col items-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                <div className={`w-[68px] h-[38px] rounded-[6px] bg-gradient-to-br ${c.col} shadow grid place-items-center text-[10px] font-bold`}>{c.title}</div>
                <div className="mt-2 text-center"><div className="text-[11px] font-bold">{c.title}</div><div className="text-[9px] text-[#7a8ab0]">{c.sub}</div></div>
              </div>
            ))}
            <div className="hidden md:flex items-center justify-center">
              <button className="w-8 h-8 rounded-full bg-white border border-[#dbe4ff] grid place-items-center hover:bg-[#0d3b9c] hover:text-white transition">›</button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-[1440px] mx-auto px-2 md:px-6 pb-2">
          <div className="bg-[#0d3b9c] rounded-[12px] text-white grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
            {[
              { k:'15+', v:'Years of Excellence', icon:'🦾' },
              { k:'1200+', v:'Quality Products', icon:'🏭' },
              { k:'50+', v:'Countries Served', icon:'🌍' },
              { k:'100%', v:'Quality Assurance', icon:'🏅' },
              { k:'24/7', v:'Customer Support', icon:'🎧' },
            ].map(s=>(
              <div key={s.k} className="flex items-center gap-3 px-4 py-3.5">
                <div className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-[16px]">{s.icon}</div>
                <div><div className="text-[16px] font-extrabold leading-none">{s.k}</div><div className="text-[10px] opacity-80 mt-1">{s.v}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Quality Medicines */}
      <section id="products" className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
        <div className="flex items-end justify-between">
          <div className="text-center w-full md:text-left">
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">Our Products</div>
            <h2 className="display text-[22px] md:text-[26px] font-extrabold mt-1">Premium Quality Medicines</h2>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 bg-[#eef3ff] border border-[#dbe4ff] rounded-full px-4 py-1.5 text-[11px] font-bold hover:bg-white transition">View All Products <span>→</span></button>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setActiveFilter(f)} onMouseEnter={playSound} className={`whitespace-nowrap inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold border transition
              ${activeFilter===f ? 'bg-[#0d3b9c] text-white border-[#0d3b9c] shadow-[0_6px_16px_rgba(13,59,156,0.3)]' : 'bg-white border-[#e2e9f7] text-[#5a6a90] hover:bg-[#f5f7ff]'}`}>
              <span className="text-[12px]">{f==='All' ? '🌈' : f==='Erectile Dysfunction' ? '💙' : f==='Women’s Health' ? '🌸' : '🩺'}</span>{f}
            </button>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-5 gap-4">
          {filtered.slice(0,5).map(product=>(
            <div key={product.id} onMouseEnter={playSound} className="group relative bg-white rounded-[16px] border border-[#e8edf8] shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-3 flex flex-col hover:shadow-[0_16px_40px_rgba(13,59,156,0.12)] hover:-translate-y-1.5 transition-all duration-300">
              {product.popular && <div className="absolute top-2.5 right-2.5 bg-[#e8ecff] text-[#0d3b9c] text-[9px] font-bold px-2 py-0.5 rounded-full border">Popular</div>}
              <div className="h-[110px] rounded-[10px] bg-[#fafbff] border border-[#f0f3ff] grid place-items-center relative overflow-hidden">
                <div className={`w-[92px] h-[56px] rounded-[6px] bg-gradient-to-br ${product.color} shadow-lg grid place-items-center text-white font-black text-[10px] text-center leading-tight p-1`}>
                  {product.name.split(' ')[0]}<br/>{product.mg}
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-all duration-[800ms]" />
              </div>
              <div className="mt-3">
                <div className="text-[11px] font-extrabold tracking-wide">{product.name}</div>
                <div className="text-[10px] text-[#7481a8]">{product.subtitle}</div>
                <div className="mt-2 flex gap-1.5">
                  <span className="text-[8px] px-2 py-0.5 rounded-full bg-[#eef3ff] border border-[#dde7ff] text-[#5a6a90]">{product.category}</span>
                  <span className="text-[8px] px-2 py-0.5 rounded-full bg-[#f6f8ff] border text-[#5a6a90]">{product.mg}</span>
                </div>
                <div className="mt-2 text-[11px] leading-4 text-[#6b7a9f] min-h-[32px]">{product.desc}</div>
                <button onClick={()=>openEnquiry(product)} className="mt-3 w-full bg-[#0d3b9c] text-white rounded-full py-2 text-[11px] font-bold inline-flex items-center justify-center gap-1.5 hover:bg-[#0a2f7e] transition">View Details <span>→</span></button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 md:hidden flex justify-center"><button className="text-[12px] font-bold text-[#0d3b9c]">View All Products →</button></div>
      </section>

      {/* Why Choose */}
      <section className="bg-white border-y border-[#edf2ff] py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">Why Choose TruePharma</div>
            <h3 className="display text-[20px] md:text-[22px] font-extrabold mt-1">Quality You Can Trust, Care You Deserve</h3>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              { t:'High Quality', d:'International quality standards', i:'🎯' },
              { t:'Innovation', d:'Continuous research & development', i:'🌟' },
              { t:'Global Reach', d:'50+ countries worldwide', i:'🌐' },
              { t:'Patient Care', d:'Committed to better healthcare', i:'❤️‍🩹' },
              { t:'Ethical Practices', d:'Transparency & integrity', i:'🤝' },
              { t:'Timely Delivery', d:'On-time delivery every time', i:'🚚' },
            ].map(c=>(
              <div key={c.t} onMouseEnter={playSound} className="bg-[#fbfcff] border border-[#eef2ff] rounded-[12px] p-4 text-center hover:shadow-[0_10px_24px_rgba(13,59,156,0.08)] hover:-translate-y-1 transition-all group">
                <div className="w-9 h-9 mx-auto rounded-full bg-[#eef3ff] group-hover:bg-[#0d3b9c] group-hover:text-white grid place-items-center text-[18px] transition">{c.i}</div>
                <div className="mt-2 text-[12px] font-bold">{c.t}</div>
                <div className="mt-1 text-[10px] leading-4 text-[#7a8ab0]">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 grid md:grid-cols-[1.1fr_1.4fr_0.8fr] gap-6">
        <div>
          <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">About TruePharma</div>
          <h3 className="display text-[20px] md:text-[22px] font-extrabold leading-tight mt-1">Your Trusted Partner <br/> in Healthcare</h3>
          <p className="mt-3 text-[11px] leading-5 text-[#6b7a9f]">TruePharma is a fast-growing pharmaceutical company committed to improving lives through high-quality, affordable and reliable medicines.</p>
          <ul className="mt-4 space-y-2">
            {[
              'WHO-GMP certified manufacturing',
              'Advanced R&D and quality control',
              'Affordable pricing for everyone',
              'Timely delivery across the globe',
            ].map(li=>(
              <li key={li} className="flex gap-2 text-[11px]"><span className="w-4 h-4 rounded-full bg-[#e6fbe6] text-[#1a9a1a] grid place-items-center text-[10px]">✔</span><span className="text-[#3a4a71]">{li}</span></li>
            ))}
          </ul>
          <button onClick={()=>openEnquiry()} onMouseEnter={playSound} className="mt-5 inline-flex items-center gap-2 bg-[#0d3b9c] text-white rounded-full px-4 py-2 text-[11px] font-bold hover:bg-[#0a2f7e] transition">Learn More About Us <span>→</span></button>
        </div>

        <div className="relative">
          <img src="https://images.pexels.com/photos/4031417/pexels-photo-4031417.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=420&w=700" alt="lab" className="w-full h-[260px] md:h-[320px] object-cover rounded-[16px] shadow-[0_16px_40px_rgba(0,0,0,0.12)]" />
          <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-xl grid place-items-center text-[#0d3b9c] hover:scale-110 transition">▶</button>
          <div className="absolute -bottom-4 left-2 right-2 bg-white rounded-[12px] border border-[#eef2ff] shadow-[0_12px_28px_rgba(0,0,0,0.12)] grid grid-cols-3 divide-x divide-[#eef2ff] p-2">
            {[
              { k:'WHO-GMP', v:'Certified', i:'🛡️' },
              { k:'Advanced', v:'Technology', i:'🔬' },
              { k:'Quality', v:'Assurance', i:'🌐' },
            ].map(b=>(
              <div key={b.k} className="flex gap-2 items-center px-2 py-1">
                <div className="w-7 h-7 rounded-full bg-[#eef3ff] grid place-items-center text-[12px]">{b.i}</div>
                <div><div className="text-[10px] font-bold leading-none">{b.k}</div><div className="text-[9px] text-[#7a8ab0]">{b.v}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f4f7ff] rounded-[16px] border border-[#e6ebff] p-4 flex flex-col gap-4">
          {[
            { k:'15+', v:'Years of Experience', icon:'🦾' },
            { k:'1200+', v:'Quality Products', icon:'🏭' },
            { k:'50+', v:'Countries Worldwide', icon:'🌍' },
          ].map(s=>(
            <div key={s.k} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-[#dde7ff] grid place-items-center">{s.icon}</div>
              <div><div className="font-extrabold text-[14px] leading-none">{s.k}</div><div className="text-[10px] text-[#6b7a9f]">{s.v}</div></div>
            </div>
          ))}
          <button onMouseEnter={playSound} className="mt-2 w-full bg-[#0d3b9c] text-white rounded-[10px] py-3 text-[11px] font-bold inline-flex items-center justify-center gap-2 hover:bg-[#0a2f7e] transition"><span>⬇️</span> Download Catalogue</button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white border-y border-[#edf2ff] py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid md:grid-cols-[1.1fr_1.3fr_0.7fr] gap-8">
          <div>
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">Get In Touch</div>
            <h3 className="display text-[20px] md:text-[22px] font-extrabold mt-1">We’re Here to Help You</h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#fbfcff] border border-[#eef2ff] rounded-[10px] p-3 flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#eef3ff] grid place-items-center text-[12px] text-[#0d3b9c]">📍</div>
                <div><div className="text-[11px] font-bold">Our Location</div><div className="text-[10px] text-[#6b7a9f] leading-4 mt-0.5">G-5 & G-6, Industrial Estate, Gorwa, Vadodara - 390016, Gujarat, India</div></div>
              </div>
              <div className="bg-[#fbfcff] border border-[#eef2ff] rounded-[10px] p-3 flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#eef3ff] grid place-items-center text-[12px]">📞</div>
                <div><div className="text-[11px] font-bold">Call Us</div><div className="text-[10px] text-[#6b7a9f] mt-0.5">+91 76220 68016<br/>+91 98795 53225</div></div>
              </div>
              <div className="bg-[#fbfcff] border border-[#eef2ff] rounded-[10px] p-3 flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#eef3ff] grid place-items-center text-[12px]">✉️</div>
                <div><div className="text-[11px] font-bold">Email Us</div><div className="text-[10px] text-[#6b7a9f] mt-0.5">info@truepharma.co.in<br/>export@truepharma.co.in</div></div>
              </div>
              <div className="bg-[#fbfcff] border border-[#eef2ff] rounded-[10px] p-3 flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#eef3ff] grid place-items-center text-[12px]">🕒</div>
                <div><div className="text-[11px] font-bold">Working Hours</div><div className="text-[10px] text-[#6b7a9f] mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM<br/>Sunday: Closed</div></div>
              </div>
            </div>
          </div>

          <div className="bg-[#fbfdff] border border-[#eef2ff] rounded-[14px] p-3 md:p-4">
            <div className="grid grid-cols-2 gap-2">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your Name" className="rounded-[8px] border border-[#e6ebf7] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#0d3b9c]" />
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Your Email" className="rounded-[8px] border border-[#e6ebf7] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#0d3b9c]" />
              <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Your Phone" className="rounded-[8px] border border-[#e6ebf7] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#0d3b9c]" />
              <input value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Subject" className="rounded-[8px] border border-[#e6ebf7] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#0d3b9c]" />
            </div>
            <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Your Message" rows={3} className="mt-2 w-full rounded-[8px] border border-[#e6ebf7] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#0d3b9c] resize-none" />
            <button onClick={()=>openEnquiry()} onMouseEnter={playSound} className="mt-3 w-full bg-[#0d3b9c] text-white rounded-[10px] py-3 text-[12px] font-bold inline-flex items-center justify-center gap-2 hover:bg-[#0a2f7e] transition">Send Message <span>→</span></button>
          </div>

          <div className="bg-gradient-to-br from-[#eef4ff] to-[#f7f9ff] rounded-[14px] border border-[#dbe6ff] p-5 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-white border border-[#dbe6ff] grid place-items-center text-[24px] shadow-sm">🎧</div>
            <div className="mt-3 text-[13px] font-bold">Need Immediate Help?</div>
            <div className="mt-1 text-[11px] text-[#6b7a9f]">Chat with our support team on WhatsApp</div>
            <button onClick={()=>openEnquiry()} onMouseEnter={playSound} className="mt-4 bg-[#25D366] text-white rounded-full px-4 py-2 text-[11px] font-bold inline-flex items-center gap-2 shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:scale-[1.02] transition"><span>💬</span> Chat on WhatsApp <span>→</span></button>
          </div>
        </div>
      </section>

      {/* Payments */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <div className="text-center">
          <div className="text-[10px] tracking-[0.2em] font-bold text-[#0d3b9c] uppercase">We Accept</div>
          <div className="display text-[18px] font-extrabold mt-1">Secure & Easy Payments</div>
        </div>
        <div className="mt-5 grid grid-cols-4 md:grid-cols-8 gap-2">
          {[
            { name:'VISA', col:'text-[#1434CB] font-black italic' },
            { name:'mastercard', col:'text-black' },
            { name:'RuPay', col:'text-[#0d3b9c] font-bold italic' },
            { name:'UPI', col:'font-black' },
            { name:'Paytm', col:'text-[#00BAF2] font-bold' },
            { name:'G Pay', col:'text-[#5F6368]' },
            { name:'PhonePe', col:'text-[#5F259F] font-bold' },
            { name:'Bank Transfer', col:'text-[#0d3b9c]' },
          ].map(p=>(
            <div key={p.name} className="bg-white border border-[#eef2ff] rounded-[10px] h-[42px] grid place-items-center shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={`text-[13px] ${p.col}`}>{p.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#08133a] text-[#a8b2cf] pt-10 pb-5">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid md:grid-cols-[1.2fr_0.7fr_0.8fr_1fr_0.8fr_1.2fr] gap-8">
          <div>
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-300 grid place-items-center">✚</div>
              <div><div className="font-bold text-[14px] leading-none">TruePharma</div><div className="text-[8px] opacity-60 tracking-[0.2em] uppercase">Care. Commitment. Cure.</div></div>
            </div>
            <p className="mt-3 text-[11px] leading-5">A global pharmaceutical company dedicated to delivering high-quality medicines for a healthier world.</p>
            <div className="mt-4 flex gap-2">
              {[
                {c:'bg-[#1877F2]', i:'f'},
                {c:'bg-[#0A66C2]', i:'in'},
                {c:'bg-[#E4405F]', i:'ig'},
                {c:'bg-[#FF0000]', i:'▶'},
              ].map(s=> <div key={s.i} className={`w-7 h-7 rounded-full ${s.c} text-white grid place-items-center text-[11px] font-bold`}>{s.i}</div>)}
            </div>
          </div>

          <div>
            <div className="text-white text-[12px] font-bold">Quick Links</div>
            <ul className="mt-3 space-y-1.5 text-[11px]">{['Home','About Us','Products','Services','Manufacturing','Quality','R&D','News','Contact Us'].map(l=><li key={l} className="hover:text-white cursor-pointer"> {l}</li>)}</ul>
          </div>
          <div>
            <div className="text-white text-[12px] font-bold">Our Products</div>
            <ul className="mt-3 space-y-1.5 text-[11px]">{PRODUCTS.slice(0,7).map(p=><li key={p.id} className="hover:text-white cursor-pointer">{p.name}</li>)}<li className="text-[#7ea0ff]">View All Products</li></ul>
          </div>
          <div>
            <div className="text-white text-[12px] font-bold">Our Services</div>
            <ul className="mt-3 space-y-1.5 text-[11px]">{['Contract Manufacturing','Third Party Manufacturing','Export & Global Supply','Private Labeling','Regulatory Support','Packaging Solutions','Logistics & Delivery'].map(l=><li key={l} className="hover:text-white cursor-pointer">{l}</li>)}</ul>
          </div>
          <div>
            <div className="text-white text-[12px] font-bold">Resources</div>
            <ul className="mt-3 space-y-1.5 text-[11px]">{['Quality Assurance','News / Blog','Careers','Download Catalogue','FAQ'].map(l=><li key={l} className="hover:text-white cursor-pointer">{l}</li>)}</ul>
          </div>

          <div>
            <div className="text-white text-[12px] font-bold">Newsletter</div>
            <div className="mt-3 text-[11px]">Subscribe for latest updates</div>
            <div className="mt-3 flex">
              <input placeholder="Enter your email" className="flex-1 bg-white text-[#08133a] rounded-l-[8px] px-3 py-2 text-[11px] outline-none" />
              <button className="bg-[#0d3b9c] text-white rounded-r-[8px] px-3 grid place-items-center">→</button>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-8 border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px]">
          <div>© 2024 TruePharma. All Rights Reserved.</div>
          <div className="flex gap-4"><span>Privacy Policy</span><span>Terms & Conditions</span><span>Sitemap</span></div>
          <div className="flex items-center gap-1">Designed with <span className="text-red-400">❤</span> for Better Health</div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <button onClick={()=>openEnquiry()} className="fixed bottom-4 right-4 w-11 h-11 rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] grid place-items-center text-[20px] hover:scale-110 transition z-40">💬</button>

      {/* Enquiry Modal */}
      {enquiryOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-[#0a194e]/60 backdrop-blur-[6px] animate-[fadeIn_0.2s_ease]" onClick={()=>setEnquiryOpen(false)} />
          <div className="relative w-full md:max-w-[560px] bg-white rounded-t-[18px] md:rounded-[18px] shadow-[0_24px_80px_rgba(0,0,0,0.35)] border border-white overflow-hidden animate-[slideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="bg-gradient-to-r from-[#0d3b9c] to-[#1e63ff] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 grid place-items-center text-[18px]">💊</div>
                <div><div className="font-bold text-[14px] leading-tight">Enquire Now – AlphaVigor ✨</div><div className="text-[11px] opacity-80">Get best price • 24/7 support • WHO-GMP Quality</div></div>
              </div>
              <button onClick={()=>setEnquiryOpen(false)} className="w-8 h-8 rounded-full bg-white/15 grid place-items-center hover:bg-white/25">✕</button>
            </div>

            <div className="p-4 space-y-3 max-h-[78vh] overflow-auto">
              {/* Product selector */}
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#3a4a71]">Selected Product 🎯</label>
                  <select value={selectedProduct?.id || ''} onChange={e=> setSelectedProduct(PRODUCTS.find(p=>p.id===e.target.value)||null)} className="mt-1 w-full rounded-[10px] border border-[#dde6f7] bg-[#fbfcff] px-3 py-2.5 text-[12px] font-medium outline-none focus:border-[#0d3b9c]">
                    <option value="">Choose product</option>
                    {PRODUCTS.map(p=> <option key={p.id} value={p.id}>{p.name} – {p.subtitle}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#3a4a71]">Quantity 📦</label>
                  <select value={quantity} onChange={e=>setQuantity(e.target.value)} className="mt-1 w-full rounded-[10px] border border-[#dde6f7] bg-[#fbfcff] px-3 py-2.5 text-[12px] outline-none">
                    {['50 Boxes','100 Boxes','200 Boxes','500 Boxes','1000 Boxes','Custom Qty'].map(q=> <option key={q}>{q}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="👤 Your Name" className="rounded-[10px] border border-[#dde6f7] px-3 py-2.5 text-[12px] outline-none focus:border-[#0d3b9c]" />
                <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="📧 Email" className="rounded-[10px] border border-[#dde6f7] px-3 py-2.5 text-[12px] outline-none focus:border-[#0d3b9c]" />
                <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="📞 Phone / WhatsApp" className="rounded-[10px] border border-[#dde6f7] px-3 py-2.5 text-[12px] outline-none focus:border-[#0d3b9c]" />
              </div>

              <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="💬 Message – e.g. Need best price for export to USA, share catalogue..." rows={3} className="w-full rounded-[10px] border border-[#dde6f7] px-3 py-2.5 text-[12px] outline-none focus:border-[#0d3b9c] resize-none" />

              {selectedProduct && (
                <div className="flex items-center gap-3 bg-[#f6f8ff] border border-[#e6ebff] rounded-[10px] p-2.5">
                  <div className={`w-14 h-9 rounded-[6px] bg-gradient-to-br ${selectedProduct.color} grid place-items-center text-white text-[9px] font-black`}>{selectedProduct.mg}</div>
                  <div className="leading-tight"><div className="text-[12px] font-bold">{selectedProduct.name}</div><div className="text-[10px] text-[#6b7a9f]">{selectedProduct.subtitle} • {quantity}</div></div>
                  <div className="ml-auto text-[10px] px-2 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] font-bold">✅ In Stock</div>
                </div>
              )}

              <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                <button onClick={handleWhatsapp} className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3 text-[12px] font-bold shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:scale-[1.02] active:scale-[0.98] transition"><span>🟢</span> Send WhatsApp</button>
                <button onClick={handleTelegram} className="inline-flex items-center justify-center gap-2 bg-[#229ED9] text-white rounded-full py-3 text-[12px] font-bold shadow-[0_8px_20px_rgba(34,158,217,0.35)] hover:scale-[1.02] active:scale-[0.98] transition"><span>✈️</span> Send Telegram</button>
                <button onClick={handleEmail} className="inline-flex items-center justify-center gap-2 bg-[#0d3b9c] text-white rounded-full py-3 text-[12px] font-bold shadow-[0_8px_20px_rgba(13,59,156,0.35)] hover:scale-[1.02] active:scale-[0.98] transition"><span>📧</span> Send Email</button>
              </div>

              <div className="text-center text-[10px] text-[#8aa0c8] pt-1">🔒 Your enquiry is secure • We reply within 30 mins • Trusted by 1000+ healthcare pros</div>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for keyframes */}
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(22px);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>
    </div>
  );
}
