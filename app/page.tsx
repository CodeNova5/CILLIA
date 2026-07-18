"use client";
import React, { useRef } from "react";
import {
  Search, User, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight,
  Truck, ShieldCheck, RotateCcw, Headphones, ArrowRight, Sparkles, Leaf, Award, Menu, X
} from "lucide-react";
import { FaSquareInstagram, FaSquareFacebook, FaSquareYoutube } from "react-icons/fa6";

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS                                                      */
/*  bg:        #FBF7F3 (warm ivory)                                    */
/*  surface:   #F7EFEA                                                 */
/*  blush:     #F3D8DA                                                */
/*  rose:      #C9727C  (primary accent / CTA)                        */
/*  rose-dark: #A85661                                                 */
/*  ink:       #211D1B                                                 */
/*  ink-soft:  #6B6260                                                 */
/*  sage:      #9FAE95  (clean-beauty tag accent)                     */
/*  gold:      #B8935F  (rating stars / detail accent)                */
/*  display font: "Fraunces" (serif, editorial personality)            */
/*  body font:    "Inter"                                              */
/*                                                                      */
/*  RESTRUCTURE NOTES                                                  */
/*  - Consolidated three overlapping "trust" sections (marquee grid +  */
/*    icon strip + value-prop grid) into one "Why Louvette" section    */
/*    that leads with the value props and folds the four service      */
/*    guarantees in as a footer strip of the same card.                */
/*  - Section rhythm now runs on one spacing scale (space-y-24/28 on   */
/*    the page shell) instead of ad hoc mt-16/pt-14 per section.       */
/*  - Introduced shared Card/Button/Badge primitives (shadcn pattern)  */
/*    so every card in the page shares real elevation & radius rules   */
/*    instead of one-off div soup.                                    */
/*  - Section order now tells a shopping story: discover (hero) ->     */
/*    browse (categories) -> shop (best sellers) -> trust -> deals     */
/*    (promotions) -> learn (guides) -> social proof (testimonials) -> */
/*    brand credibility (marquee) -> stay in touch (newsletter).       */
/* ------------------------------------------------------------------ */

const FONT_LINK = "Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700";

const TONES = {
  blush: "bg-[#F3D8DA]",
  sage: "bg-[#E4E9DF]",
  sand: "bg-[#EFE3D3]",
  sky: "bg-[#DCE6E8]",
  ink: "bg-[#3A332F]",
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const DATA = {
  navigation: {
    announcement: [
      "FREE SHIPPING ON ORDERS OVER $50",
      "EXCLUSIVE OFFERS FOR BEAUTY LOVERS",
      "SIGN UP & GET 10% OFF",
    ],
    mainNav: ["New In", "Makeup", "Skincare", "Haircare", "Fragrance", "Accessories", "Tools", "Brands"],
  },
  hero: {
    main: {
      badge: "New Season, New You",
      title: "Unleash\nYour Beauty",
      body: "Discover must-have beauty, haircare, makeup & accessories curated for you.",
      bgImage: "/hero.png",
      tone: "blush",
      ctas: [
        { label: "Shop New Arrivals", link: "#" },
        { label: "Explore Collections", link: "#" },
      ],
    },
    sideCards: [
      {
        id: 1,
        title: "Skincare\nEssentials",
        body: "Glow starts with great skincare.",
        cta: "Shop Skincare",
        link: "#",
        bgImage: "/skincare-hero.png",
        tone: "sky",
      },
      {
        id: 2,
        title: "Haircare\nFor Every You",
        body: "Stronger, shinier, healthier hair.",
        cta: "Shop Haircare",
        link: "#",
        bgImage: "/haircare-hero.png",
        placeholderLabel: "Haircare products + brush",
        tone: "sand",
      },
    ],
  },
  categories: [
    { id: 1, name: "Makeup", tone: "blush", img: "/makeup.png" },
    { id: 2, name: "Skincare", tone: "sky", img: "/skincare.png" },
    { id: 3, name: "Haircare", tone: "sand", img: "/haircare.png" },
    { id: 4, name: "Fragrance", tone: "blush", img: "/fragrance.png" },
    { id: 6, name: "Accessories", tone: "blush", img: "/accessories.png" },
  ],
  products: [
    { id: 1, name: "Hydrating Glow Face Serum", price: 24.99, rating: 4.5, reviews: 128, tone: "blush" },
    { id: 2, name: "Velvet Matte Lipstick", price: 14.99, rating: 4.5, reviews: 96, tone: "sand", tag: "Best Seller" },
    { id: 3, name: "Volume & Curl Mascara", price: 16.99, rating: 4, reviews: 73, tone: "ink" },
    { id: 4, name: "Nourishing Hair Shampoo", price: 19.99, rating: 4.5, reviews: 54, tone: "sky" },
    { id: 5, name: "4 Piece Brush Set", price: 18.99, rating: 4.5, reviews: 112, tone: "blush" },
    { id: 6, name: "Fragrance Eau de Parfum", price: 29.99, rating: 4.5, reviews: 88, tone: "sand" },
  ],
  whyChooseUs: [
    { id: 1, icon: "Leaf", title: "Clean Formulas", body: "Cruelty-free, dermatologist-tested ingredients you can trust on your skin." },
    { id: 2, icon: "Award", title: "Curated by Experts", body: "Every product is vetted by our in-house beauty team before it reaches you." },
    { id: 3, icon: "Sparkles", title: "Personalized Picks", body: "Recommendations tailored to your skin type, tone, and routine." },
    { id: 4, icon: "Heart", title: "Loved by Thousands", body: "Over 50,000 five-star reviews from a community that keeps coming back." },
  ],
  trustBar: [
    { id: 1, icon: "Truck", title: "Free Shipping", body: "On orders over $50" },
    { id: 2, icon: "ShieldCheck", title: "100% Authentic", body: "Genuine products only" },
    { id: 3, icon: "RotateCcw", title: "Easy Returns", body: "30-day return policy" },
    { id: 4, icon: "Headphones", title: "Support 24/7", body: "We're here for you" },
  ],
  promotions: [
    { id: 1, title: "Flawless Look Every Day", body: "Makeup that enhances your natural beauty.", cta: "Shop Makeup", tone: "sky" },
    { id: 2, title: "Beauty Accessories", body: "The perfect finishing touch to your look.", cta: "Shop Accessories", tone: "blush" },
    { id: 3, title: "Treat Yourself Sale", body: "Up to 30% off on beauty favorites.", cta: "Shop Sale", tone: "sand", badge: "30%" },
  ],
  guides: [
    { id: 1, tag: "Skincare 101", title: "How to layer actives without irritating your skin", tone: "sky", read: "6 min read" },
    { id: 2, tag: "Makeup", title: "The 5-minute everyday face for busy mornings", tone: "blush", read: "4 min read" },
    { id: 3, tag: "Haircare", title: "Finding the right routine for your hair porosity", tone: "sand", read: "7 min read" },
  ],
  testimonials: [
    { id: 1, name: "Priya M.", role: "Verified Buyer", quote: "My skin has never looked this even. The glow serum is a genuine repeat-purchase for me.", rating: 5 },
    { id: 2, name: "Alina K.", role: "Verified Buyer", quote: "Fast shipping, beautifully packaged, and the lipstick shade range is unmatched.", rating: 5 },
    { id: 3, name: "Devon R.", role: "Verified Buyer", quote: "Finally a haircare line that doesn't weigh my hair down. Shampoo smells incredible too.", rating: 4 },
  ],
  trustedBrands: ["DERMALOGICA", "GLOSSIER", "THE ORDINARY", "FENTY BEAUTY", "OLAPLEX", "TATCHA", "REFY", "DRUNK ELEPHANT"],
  socialLinks: ["Model portrait", "Makeup palette flatlay", "Perfume + petals", "Model close-up", "Skincare set"],
  footer: {
    columns: [
      { title: "Shop", links: ["Makeup", "Skincare", "Haircare", "Fragrance", "Accessories", "Sale"] },
      { title: "Customer Service", links: ["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "FAQs", "Track Your Order"] },
      { title: "About Us", links: ["Our Story", "Ingredients", "Sustainability", "Blog", "Careers"] },
      { title: "My Account", links: ["Sign In / Register", "My Orders", "Wishlist", "Account Settings"] },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  SHARED PRIMITIVES (shadcn-style: Card, Button, Badge)              */
/* ------------------------------------------------------------------ */

function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`relative rounded-[10px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(33,29,27,0.04)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function Button({ variant = "solid", size = "md", className = "", children, ...props }) {
  const base = "inline-flex items-center justify-center gap-1.5 font-medium uppercase tracking-wide transition-colors rounded-full whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85661]";
  const sizes = {
    sm: "text-[11px] px-4 py-2",
    md: "text-[12px] px-6 py-3.5",
    icon: "w-9 h-9 !p-0 rounded-full",
  };
  const variants = {
    solid: "bg-[#C9727C] hover:bg-[#A85661] text-white",
    outline: "border border-[#211D1B]/25 hover:border-[#211D1B] text-[#211D1B]",
    ghost: "border border-black/15 hover:border-[#C9727C] hover:text-[#C9727C] text-[#211D1B]",
    dark: "bg-[#211D1B] hover:bg-black text-white",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Badge({ tone = "rose", className = "", children }) {
  const tones = {
    rose: "bg-[#C9727C] text-white",
    ink: "bg-[#211D1B] text-white",
    outline: "border border-[#A85661]/40 text-[#A85661] bg-transparent",
  };
  return (
    <span className={`inline-flex items-center text-[9px] uppercase tracking-wide px-2 py-1 rounded-full font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

function Eyebrow({ children, className = "" }) {
  return (
    <span className={`text-[11px] tracking-[0.2em] uppercase text-[#A85661] font-semibold ${className}`}>
      {children}
    </span>
  );
}

// To:
function SectionHeading({ eyebrow, title, cta = false, ctaLabel = "View All" }) {
return (
    <div className="flex items-end justify-between mb-7 gap-4">
      <div>
        {eyebrow && <Eyebrow className="block mb-1.5">{eyebrow}</Eyebrow>}
        <h2 className="font-serif text-[26px] md:text-[30px] text-[#211D1B] leading-tight">{title}</h2>
      </div>
      {cta && (
        <a href="#" className="shrink-0 text-[12px] uppercase tracking-wide text-[#C9727C] font-semibold hidden sm:flex items-center gap-1 hover:gap-1.5 transition-all">
          {ctaLabel} <ArrowRight size={13} />
        </a>
      )}
    </div>
  );
}

function Placeholder({ label, className = "", tone = "blush" }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${TONES[tone]} ${className}`}>
      <span className="text-[11px] tracking-[0.15em] uppercase text-black/35 font-medium px-3 text-center">
        {label}
      </span>
    </div>
  );
}

function Stars({ rating = 4.5 }) {
  return (
    <div className="flex items-center gap-[2px]" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={i <= Math.round(rating) ? "fill-[#B8935F] text-[#B8935F]" : "fill-[#E9E2D8] text-[#E9E2D8]"}
        />
      ))}
    </div>
  );
}

/* ---------------------------- NAV --------------------------------- */

function AnnouncementBar() {
  return (
    <div className="bg-[#C9727C] text-white text-[12px] tracking-wide">
      <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-10 py-2.5 px-6">
        {DATA.navigation.announcement.map((t, i) => (
          <span key={i} className="hidden sm:inline whitespace-nowrap">{t}</span>
        ))}
        <span className="sm:hidden">{DATA.navigation.announcement[0]}</span>
      </div>
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <header className="bg-[#FBF7F3]/95 backdrop-blur sticky top-0 z-40 border-b border-black/5">
      <div className="max-w-[1280px] mx-auto px-6 pt-5 pb-4 flex items-center gap-4 md:gap-8">
        <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="font-serif text-[24px] md:text-[26px] tracking-tight text-[#211D1B] shrink-0">Louvette</div>
        <div className="flex-1 max-w-[520px] hidden md:flex items-center bg-white border border-black/10 rounded-full px-4 py-2.5 focus-within:border-[#C9727C] transition-colors">
          <input
            placeholder="Search for products, brands and more…"
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-black/40"
          />
          <Search size={16} className="text-black/40" />
        </div>
        <div className="flex items-center gap-5 md:gap-6 ml-auto shrink-0 text-[#211D1B]">
          <button className="hidden sm:flex flex-col items-center gap-0.5 group">
            <User size={19} strokeWidth={1.5} className="group-hover:text-[#C9727C] transition-colors" />
            <span className="text-[10px] leading-tight text-black/60 group-hover:text-[#C9727C]">Account</span>
          </button>
          <button className="hidden sm:flex flex-col items-center gap-0.5 group">
            <Heart size={19} strokeWidth={1.5} className="group-hover:text-[#C9727C] transition-colors" />
            <span className="text-[10px] leading-tight text-black/60 group-hover:text-[#C9727C]">Wishlist</span>
          </button>
          <button className="relative flex flex-col items-center gap-0.5 group">
            <ShoppingBag size={19} strokeWidth={1.5} className="group-hover:text-[#C9727C] transition-colors" />
            <span className="absolute -top-1.5 -right-2 bg-[#C9727C] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            <span className="text-[10px] leading-tight text-black/60 group-hover:text-[#C9727C]">Cart</span>
          </button>
        </div>
      </div>
      <nav className="max-w-[1280px] mx-auto px-6 pb-3.5 hidden md:flex items-center gap-8 overflow-x-auto no-scrollbar">
        {DATA.navigation.mainNav.map((l) => (
          <a key={l} href="#" className="text-[12px] tracking-[0.08em] uppercase text-[#211D1B]/75 hover:text-[#C9727C] whitespace-nowrap transition-colors">
            {l}
          </a>
        ))}
        <a href="#" className="text-[12px] tracking-[0.08em] uppercase text-[#C9727C] font-semibold whitespace-nowrap ml-auto">Sale</a>
      </nav>
      {mobileOpen && (
        <nav className="md:hidden border-t border-black/5 px-6 py-4 flex flex-col gap-3.5 bg-[#FBF7F3]">
          <div className="flex items-center bg-white border border-black/10 rounded-full px-4 py-2.5 mb-1">
            <input placeholder="Search…" className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-black/40" />
            <Search size={16} className="text-black/40" />
          </div>
          {[...DATA.navigation.mainNav, "Sale"].map((l) => (
            <a key={l} href="#" className="text-[13px] uppercase tracking-wide text-[#211D1B]/80">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ---------------------------- HERO --------------------------------- */

function Hero() {
  const mainHero = DATA.hero.main;
  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-6 grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-4">
      <div className={`relative rounded-[10px] overflow-hidden ${TONES[mainHero.tone]} min-h-[420px] lg:min-h-[560px] flex items-end`}>
        {mainHero.bgImage && (
          <img src={mainHero.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="relative z-10 p-8 md:p-12 max-w-[480px]">
          <Eyebrow>{mainHero.badge}</Eyebrow>
          <h1 className="font-serif text-[42px] md:text-[56px] leading-[1.02] mt-3 text-[#211D1B] whitespace-pre-line">
            {mainHero.title}
          </h1>
          <p className="text-[14px] text-[#211D1B]/70 mt-4 max-w-[380px] leading-relaxed">
            {mainHero.body}
          </p>
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            {mainHero.ctas.map((cta, index) => (
              <a
                key={index}
                href={cta.link}
                className={`inline-flex items-center justify-center gap-1.5 font-medium uppercase tracking-wide transition-colors rounded-full whitespace-nowrap text-[12px] px-6 py-3.5 ${
                  index === 0 ? "bg-[#C9727C] hover:bg-[#A85661] text-white" : "border border-[#211D1B]/25 hover:border-[#211D1B] text-[#211D1B]"
                }`}
              >
                {cta.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-8" aria-hidden="true">
            <span className="w-5 h-1.5 rounded-full bg-[#A85661]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#A85661]/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#A85661]/30" />
          </div>
        </div>
      </div>

      <div className="grid grid-rows-2 gap-4">
        {DATA.hero.sideCards.map((card) => (
          <div
            key={card.id}
            className={`relative rounded-[10px] overflow-hidden ${TONES[card.tone]} p-7 flex flex-col justify-between min-h-[270px]`}
          >
            {card.bgImage ? (
              <img src={card.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
            ) : card.placeholderLabel ? (
              <Placeholder label={card.placeholderLabel} className="absolute inset-0" tone={card.tone} />
            ) : null}
            <div className="relative z-10">
              <h3 className="font-serif text-[24px] leading-tight text-[#211D1B] whitespace-pre-line">{card.title}</h3>
              <p className="text-[13px] text-[#211D1B]/65 mt-2 max-w-[190px]">{card.body}</p>
            </div>
            <a href={card.link} className="relative z-10 text-[12px] uppercase tracking-wide font-semibold text-[#211D1B] flex items-center gap-1.5 group w-fit">
              {card.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------ CATEGORIES ---------------------------- */

function CategoryCircles() {
  return (
    <section className="max-w-[1280px] mx-auto px-6">
      <SectionHeading title="Shop by Category" cta eyebrow={undefined} />
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-4 gap-y-8">
        {DATA.categories.map((c) => (
          <a href="#" key={c.id} className="flex flex-col items-center gap-3 group">
            <div className={`w-[76px] h-[76px] md:w-[92px] md:h-[92px] rounded-full flex items-center justify-center transition-transform group-hover:-translate-y-1 ${TONES[c.tone]}`}>
              <img src={c.img} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            </div>
            <span className="text-[12px] text-[#211D1B]/80 text-center">{c.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- BEST SELLERS ---------------------------- */

function ProductCard({ p }) {
  return (
    <Card className="group shrink-0 w-[220px] md:w-auto border-none shadow-none bg-transparent">
      <div className="relative rounded-[10px] overflow-hidden bg-[#F7EFEA] aspect-[4/5] mb-3">
        <Placeholder label={p.name} className="absolute inset-0" tone={p.tone} />
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Add to wishlist">
          <Heart size={14} />
        </button>
        {p.tag && <Badge tone="ink" className="absolute top-3 left-3">{p.tag}</Badge>}
      </div>
      <h4 className="text-[13px] text-[#211D1B] leading-snug">{p.name}</h4>
      <div className="flex items-center gap-1.5 mt-1.5">
        <Stars rating={p.rating} />
        <span className="text-[11px] text-black/40">({p.reviews})</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[14px] font-medium text-[#211D1B]">${p.price.toFixed(2)}</span>
        <Button variant="ghost" size="sm" className="!px-3 !py-1.5">
          <ShoppingBag size={11} /> Add
        </Button>
      </div>
    </Card>
  );
}

function BestSellers() {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 250, behavior: "smooth" });
  };
  return (
    <section className="max-w-[1280px] mx-auto px-6">
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          <Eyebrow className="block mb-1.5">Shop The Edit</Eyebrow>
          <h2 className="font-serif text-[26px] md:text-[30px] text-[#211D1B]">Best Sellers</h2>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="text-[12px] uppercase tracking-wide text-[#C9727C] font-semibold hidden sm:flex items-center gap-1">View All <ArrowRight size={13} /></a>
          <Button variant="ghost" size="icon" onClick={() => scroll(-1)} aria-label="Scroll left"><ChevronLeft size={16} /></Button>
          <Button variant="ghost" size="icon" onClick={() => scroll(1)} aria-label="Scroll right"><ChevronRight size={16} /></Button>
        </div>
      </div>
      <div ref={scrollRef} className="flex md:grid md:grid-cols-6 gap-5 overflow-x-auto md:overflow-visible no-scrollbar pb-2">
        {DATA.products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

/* --------------------------- WHY LOUVETTE (consolidated trust) --------------------------- */
/* Merges the former WhyChooseUs value props + TrustBar service strip into a single card so */
/* trust is stated once, with reasons first and logistics as supporting detail beneath.       */

function WhyLouvette() {
  const iconMap = { Leaf, Award, Sparkles, Heart, Truck, ShieldCheck, RotateCcw, Headphones };
  return (
    <section className="bg-[#F7EFEA]">
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-[560px] mb-12">
          <Eyebrow className="block mb-2">Why Louvette</Eyebrow>
          <h2 className="font-serif text-[28px] md:text-[32px] text-[#211D1B] leading-tight">A beauty edit you can actually trust</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {DATA.whyChooseUs.map(({ icon: iconName, title, body }) => {
            const Icon = iconMap[iconName];
            return (
              <div key={title}>
                <div className="w-12 h-12 rounded-full bg-[#F3D8DA] flex items-center justify-center mb-4">
                  <Icon size={19} className="text-[#A85661]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[17px] text-[#211D1B] mb-1.5">{title}</h3>
                <p className="text-[13px] text-[#211D1B]/60 leading-relaxed">{body}</p>
              </div>
            );
          })}
        </div>
        <Card className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-6 md:px-8 md:py-7 bg-white/70">
          {DATA.trustBar.map(({ icon: iconName, title, body }) => {
            const Icon = iconMap[iconName];
            return (
              <div key={title} className="flex items-center gap-3">
                <Icon size={20} className="text-[#A85661] shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="text-[12.5px] font-medium text-[#211D1B] leading-tight">{title}</div>
                  <div className="text-[11px] text-black/50 leading-tight">{body}</div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </section>
  );
}

/* ------------------------- PROMOTIONS -------------------------------- */

function PromoTrio() {
  return (
    <section className="max-w-[1280px] mx-auto px-6">
      <SectionHeading eyebrow="Limited Time" title="Deals & Promotions" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DATA.promotions.map((p) => (
          <div key={p.id} className="relative rounded-[10px] overflow-hidden min-h-[280px] flex flex-col justify-between p-7">
            <Placeholder label={p.title} className="absolute inset-0" tone={p.tone} />
            {p.badge && (
              <div className="relative z-10 self-end w-[64px] h-[64px] rounded-full bg-[#C9727C] text-white flex flex-col items-center justify-center text-center leading-tight">
                <span className="text-[13px] font-serif">{p.badge}</span>
                <span className="text-[8px] tracking-wide">OFF</span>
              </div>
            )}
            <div className="relative z-10 mt-auto">
              <h3 className="font-serif text-[24px] leading-tight text-[#211D1B] max-w-[220px]">{p.title}</h3>
              <p className="text-[13px] text-[#211D1B]/65 mt-2 max-w-[220px]">{p.body}</p>
              <a href="#" className="text-[12px] uppercase tracking-wide font-semibold text-[#211D1B] flex items-center gap-1.5 mt-4 group w-fit">
                {p.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- GUIDES --------------------------------- */

function BeautyGuides() {
  return (
    <section className="max-w-[1280px] mx-auto px-6">
      <SectionHeading eyebrow="Journal" title="Beauty Guides & Edits" cta ctaLabel="Read More" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {DATA.guides.map((g) => (
          <a href="#" key={g.id} className="group block">
            <div className="relative rounded-[10px] overflow-hidden aspect-[4/3] mb-4">
              <Placeholder label={`${g.tag} article image`} className="absolute inset-0 group-hover:scale-105 transition-transform duration-500" tone={g.tone} />
            </div>
            <Eyebrow>{g.tag}</Eyebrow>
            <h3 className="font-serif text-[19px] leading-snug text-[#211D1B] mt-1.5 group-hover:text-[#C9727C] transition-colors">{g.title}</h3>
            <span className="text-[12px] text-black/40 mt-1.5 block">{g.read}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS -------------------------------- */

function Testimonials() {
  return (
    <section className="bg-[#211D1B]">
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
        <div className="flex items-center justify-between mb-10 gap-4 flex-wrap">
          <h2 className="font-serif text-[28px] md:text-[30px] text-white">What Our Customers Say</h2>
          <div className="flex items-center gap-2 text-white/70 text-[13px]">
            <Stars rating={4.8} /> <span>4.8 average · 12,400 reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DATA.testimonials.map((r) => (
            <div key={r.id} className="bg-white/[0.06] border border-white/10 rounded-[10px] p-6">
              <Stars rating={r.rating} />
              <p className="text-[14px] text-white/85 leading-relaxed mt-4 mb-5">"{r.quote}"</p>
              <div>
                <div className="text-[13px] text-white font-medium">{r.name}</div>
                <div className="text-[11px] text-white/40">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TRUSTED BY (brand marquee) --------------------------- */

function TrustedBy() {
  return (
    <section className="border-y border-black/5 bg-[#FBF7F3] py-8 overflow-hidden">
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-black/35 mb-5">Trusted by the brands you love</p>
      <div className="flex gap-16 whitespace-nowrap animate-[marquee_28s_linear_infinite] w-max motion-reduce:animate-none">
        {[...DATA.trustedBrands, ...DATA.trustedBrands].map((b, i) => (
          <span key={i} className="font-serif text-[20px] text-black/25 tracking-wide">{b}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

/* -------------------------------- NEWSLETTER + SOCIAL ------------------- */

function NewsletterSocial() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-4">
      <div className="bg-[#F3D8DA] rounded-[10px] p-8 flex flex-col justify-center">
        <Eyebrow>Beauty In Your Inbox</Eyebrow>
        <h3 className="font-serif text-[22px] md:text-[24px] text-[#211D1B] mt-2 mb-4 max-w-[320px] leading-snug">
          Sign up for exclusive offers, new arrivals and beauty tips.
        </h3>
        <form className="flex gap-2 max-w-[380px]" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            aria-label="Email address"
            className="flex-1 bg-white rounded-full px-4 py-3 text-[13px] outline-none focus:ring-2 focus:ring-[#A85661]/40"
          />
          <Button type="submit" variant="solid" size="sm" className="!py-0 !px-5">Subscribe</Button>
        </form>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-[19px] md:text-[20px] text-[#211D1B]">Follow Our Beauty Journey</h3>
          <div className="flex gap-2.5 text-[#211D1B]/60">
            <a href="#" aria-label="Instagram" className="hover:text-[#C9727C] transition-colors"><FaSquareInstagram size={16} /></a>
            <a href="#" aria-label="Facebook" className="hover:text-[#C9727C] transition-colors"><FaSquareFacebook size={16} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-[#C9727C] transition-colors"><FaSquareYoutube size={16} /></a>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 h-[calc(100%-40px)]">
          {DATA.socialLinks.map((s, i) => (
            <div key={i} className="relative rounded-[10px] overflow-hidden min-h-[140px]">
              <Placeholder label={s} className="absolute inset-0" tone={["blush", "sand", "blush", "sky", "sage"][i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER -------------------------------- */

function Footer() {
  return (
    <footer className="bg-[#211D1B] text-white mt-24">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-[22px] mb-3">Louvette</div>
            <p className="text-[12px] text-white/50 leading-relaxed mb-4">Beauty essentials curated with care, for every routine and every glow.</p>
            <div className="flex gap-3 text-white/60">
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><FaSquareInstagram size={16} /></a>
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><FaSquareFacebook size={16} /></a>
              <a href="#" aria-label="YouTube" className="hover:text-white transition-colors"><FaSquareYoutube size={16} /></a>
            </div>
          </div>
          {DATA.footer.columns.map((c) => (
            <div key={c.title}>
              <h4 className="text-[12px] uppercase tracking-wide text-white/40 mb-4">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-[13px] text-white/75 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-[12px] text-white/40">
          <span>© 2026 Louvette. All Rights Reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- PAGE ---------------------------------- */
/* Story order: discover (hero) -> browse (categories) -> shop (best sellers) */
/* -> trust (why louvette, consolidated) -> deals (promo) -> learn (guides)   */
/* -> social proof (testimonials) -> brand credibility (marquee) -> stay in   */
/* touch (newsletter/social) -> footer.                                       */

export default function BeautyHome() {
  return (
    <div className="min-h-screen bg-[#FBF7F3] font-sans text-[#211D1B]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .font-serif { font-family: 'Fraunces', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href={`https://fonts.googleapis.com/css2?family=${FONT_LINK}&display=swap`} rel="stylesheet" />

      <AnnouncementBar />
      <Header />

      <main className="flex flex-col gap-16 md:gap-20 pt-6 pb-16 md:pb-20">
        <Hero />
        <CategoryCircles />
        <BestSellers />
        <WhyLouvette />
        <PromoTrio />
        <BeautyGuides />
        <Testimonials />
        <TrustedBy />
        <NewsletterSocial />
      </main>

      <Footer />
    </div>
  );
}
