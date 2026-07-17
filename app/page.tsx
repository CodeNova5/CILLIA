"use client";
import React, { useState, useRef } from "react";
import {
  Search, User, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight,
  Truck, ShieldCheck, RotateCcw, Headphones, ArrowRight, Sparkles, Mail, Quote, Leaf, Award, Play
} from "lucide-react";

import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS                                                      */
/*  bg:        #FBF7F3 (warm ivory)                                    */
/*  surface:   #F7EFEA                                                 */
/*  blush:     #F3D8DA                                                */
/*  blush-lt:  #FBEDEE                                                 */
/*  rose:      #C9727C  (primary accent / CTA)                        */
/*  rose-dark: #A85661                                                 */
/*  ink:       #211D1B                                                 */
/*  ink-soft:  #6B6260                                                 */
/*  sage:      #9FAE95  (clean-beauty tag accent)                     */
/*  gold:      #B8935F  (rating stars / detail accent)                */
/*  display font: "Fraunces" (serif, has real editorial personality)   */
/*  body font:    "Inter"                                              */
/* ------------------------------------------------------------------ */

const FONT_LINK = "Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700";

/* ------------------------------------------------------------------ */
/*  DATA STRUCTURE - Ready for Database Integration                   */
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
        { label: "Explore Collections", link: "#" }
      ]
    },
    sideCards: [
      {
        id: 1,
        title: "Skincare\nEssentials",
        body: "Glow starts with great skincare.",
        cta: "Shop Skincare",
        link: "#",
        bgImage: "/skincare-hero.png", // Leave empty to use placeholder tone, or add image URL
        tone: "sky"
      },
      {
        id: 2,
        title: "Haircare\nFor Every You",
        body: "Stronger, shinier, healthier hair.",
        cta: "Shop Haircare",
        link: "#",
        bgImage: "/haircare-hero.png", // Use image or let layout default to placeholder
        placeholderLabel: "Haircare products + brush",
        tone: "sand"
      }
    ]
  },
  categories: [
    { id: 1, name: "Makeup", tone: "blush", img: "/makeup.png" },
    { id: 2, name: "Skincare", tone: "sky", img: "/skincare.png" },
    { id: 3, name: "Haircare", tone: "sand", img: "/haircare.png" },
    { id: 4, name: "Fragrance", tone: "blush", img: "/fragrance.png" },
    { id: 6, name: "Accessories", tone: "blush", img: "/accessories.png" },
  ],
  promotions: [
    { id: 1, title: "Flawless Look Every Day", body: "Makeup that enhances your natural beauty.", img: "/makeup-promo.png", cta: "Shop Makeup", tone: "sky" },
    { id: 2, title: "Beauty Accessories", body: "The perfect finishing touch to your look.", img: "/accessories-promo.png", cta: "Shop Accessories", tone: "blush" },
    { id: 3, title: "Treat Yourself Sale", body: "Up to 30% off on beauty favorites.", img: "/sale-promo.png", cta: "Shop Sale", tone: "sand", badge: "UP TO 30% OFF" },
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
  trustBar: [
    { id: 1, icon: "Truck", title: "Free Shipping", body: "On orders over $50" },
    { id: 2, icon: "ShieldCheck", title: "100% Authentic", body: "Genuine products only" },
    { id: 3, icon: "RotateCcw", title: "Easy Returns", body: "30-day return policy" },
    { id: 4, icon: "Headphones", title: "Support 24/7", body: "We're here for you" },
  ],
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

function Placeholder({ label, className = "", tone = "blush" }) {
  const tones = {
    blush: "bg-[#F3D8DA]",
    sage: "bg-[#E4E9DF]",
    sand: "bg-[#EFE3D3]",
    sky: "bg-[#DCE6E8]",
    ink: "bg-[#3A332F]",
  };
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${tones[tone]} ${className}`}
    >
      <span className="text-[11px] tracking-[0.15em] uppercase text-black/35 font-medium px-3 text-center">
        {label}
      </span>
    </div>
  );
}

function Stars({ rating = 4.5 }) {
  return (
    <div className="flex items-center gap-[2px]">
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
  return (
    <header className="bg-[#FBF7F3] sticky top-0 z-40 border-b border-black/5">
      <div className="max-w-[1280px] mx-auto px-6 pt-5 pb-4 flex items-center gap-8">
        <div className="font-serif text-[26px] tracking-tight text-[#211D1B] shrink-0">Louvette</div>
        <div className="flex-1 max-w-[520px] hidden md:flex items-center bg-white border border-black/10 rounded-full px-4 py-2.5">
          <input
            placeholder="Search for products, brands and more…"
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-black/40"
          />
          <Search size={16} className="text-black/40" />
        </div>
        <div className="flex items-center gap-6 ml-auto shrink-0 text-[#211D1B]">
          <button className="hidden sm:flex flex-col items-center gap-0.5 group">
            <User size={19} strokeWidth={1.5} />
            <span className="text-[10px] leading-tight text-black/60 group-hover:text-[#C9727C]">Account</span>
          </button>
          <button className="hidden sm:flex flex-col items-center gap-0.5 group">
            <Heart size={19} strokeWidth={1.5} />
            <span className="text-[10px] leading-tight text-black/60 group-hover:text-[#C9727C]">Wishlist</span>
          </button>
          <button className="relative flex flex-col items-center gap-0.5 group">
            <ShoppingBag size={19} strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-2 bg-[#C9727C] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            <span className="text-[10px] leading-tight text-black/60 group-hover:text-[#C9727C]">Cart</span>
          </button>
        </div>
      </div>
      <nav className="max-w-[1280px] mx-auto px-6 pb-3.5 flex items-center gap-8 overflow-x-auto no-scrollbar">
        {DATA.navigation.mainNav.map((l) => (
          <a key={l} href="#" className="text-[12px] tracking-[0.08em] uppercase text-[#211D1B]/75 hover:text-[#C9727C] whitespace-nowrap transition-colors">
            {l}
          </a>
        ))}
        <a href="#" className="text-[12px] tracking-[0.08em] uppercase text-[#C9727C] font-semibold whitespace-nowrap ml-auto">Sale</a>
      </nav>
    </header>
  );
}

/* ---------------------------- HERO --------------------------------- */

function Hero() {
  const mainHero = DATA.hero.main;
  const tones = {
    blush: "bg-[#F3D8DA]",
    sage: "bg-[#E4E9DF]",
    sand: "bg-[#EFE3D3]",
    sky: "bg-[#DCE6E8]",
  };

  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-6 grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-4">
      {/* Main Banner */}
      <div className={`relative rounded-[6px] overflow-hidden ${tones[mainHero.tone] || 'bg-[#F3D8DA]'} min-h-[420px] lg:min-h-[560px] flex items-end`}>
        {mainHero.bgImage && (
          <img src={mainHero.bgImage} alt={mainHero.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="relative z-10 p-8 md:p-12 max-w-[480px]">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85661] font-semibold">{mainHero.badge}</span>
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
                className={`text-[12px] tracking-wide uppercase font-medium px-6 py-3.5 rounded-full transition-colors ${
                  index === 0 
                    ? "bg-[#C9727C] hover:bg-[#A85661] text-white" 
                    : "border border-[#211D1B]/25 hover:border-[#211D1B] text-[#211D1B]"
                }`}
              >
                {cta.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-8">
            <span className="w-5 h-1.5 rounded-full bg-[#A85661]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#A85661]/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#A85661]/30" />
          </div>
        </div>
      </div>

      {/* Side Promotion Cards */}
      <div className="grid grid-rows-2 gap-4">
        {DATA.hero.sideCards.map((card) => (
          <div 
            key={card.id} 
            className={`relative rounded-[6px] overflow-hidden ${tones[card.tone] || 'bg-[#DCE6E8]'} p-7 flex flex-col justify-between min-h-[270px]`}
          >
            {card.bgImage ? (
              <img src={card.bgImage} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : card.placeholderLabel ? (
              <Placeholder label={card.placeholderLabel} className="absolute inset-0" tone={card.tone} />
            ) : null}

            <div className="relative z-10">
              <h3 className="font-serif text-[24px] leading-tight text-[#211D1B] whitespace-pre-line">
                {card.title}
              </h3>
              <p className="text-[13px] text-[#211D1B]/65 mt-2 max-w-[190px]">
                {card.body}
              </p>
            </div>
            <a href={card.link} className="relative z-10 text-[12px] uppercase tracking-wide font-semibold text-[#211D1B] flex items-center gap-1.5 group">
              {card.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------ CATEGORY WHEEL ---------------------------- */

function CategoryCircles() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-14">
      <div className="flex items-center justify-between mb-7">
        <h2 className="font-serif text-[26px] text-[#211D1B]">Shop by Category</h2>
        <a href="#" className="text-[12px] uppercase tracking-wide text-[#C9727C] font-semibold flex items-center gap-1">View All <ArrowRight size={13} /></a>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-4 gap-y-8">
        {DATA.categories.map((c) => (
          <a href="#" key={c.id} className="flex flex-col items-center gap-3 group">
            <div className={`w-[76px] h-[76px] md:w-[92px] md:h-[92px] rounded-full flex items-center justify-center transition-transform group-hover:-translate-y-1 ${
              c.tone === "blush" ? "bg-[#F3D8DA]" : c.tone === "sky" ? "bg-[#DCE6E8]" : c.tone === "sand" ? "bg-[#EFE3D3]" : "bg-[#E4E9DF]"
            }`}>
              <img src={c.img} alt={c.name} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            </div>
            <span className="text-[12px] text-[#211D1B]/80 text-center">{c.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------- PROMO TRIO -------------------------------- */

function PromoTrio() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
      {DATA.promotions.map((p) => (
        <div key={p.id} className="relative rounded-[6px] overflow-hidden min-h-[280px] flex flex-col justify-between p-7">
          <Placeholder label={p.title} className="absolute inset-0" tone={p.tone} />
          {p.badge && (
            <div className="relative z-10 self-end w-[64px] h-[64px] rounded-full bg-[#C9727C] text-white flex flex-col items-center justify-center text-center leading-tight">
              <span className="text-[13px] font-serif">30%</span>
              <span className="text-[8px] tracking-wide">OFF</span>
            </div>
          )}
          <div className="relative z-10 mt-auto">
            <h3 className="font-serif text-[24px] leading-tight text-[#211D1B] max-w-[220px]">{p.title}</h3>
            <p className="text-[13px] text-[#211D1B]/65 mt-2 max-w-[220px]">{p.body}</p>
            <a href="#" className="text-[12px] uppercase tracking-wide font-semibold text-[#211D1B] flex items-center gap-1.5 mt-4 group">
              {p.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

/* --------------------------- BEST SELLERS ---------------------------- */

function ProductCard({ p }) {
  return (
    <div className="group shrink-0 w-[220px] md:w-auto">
      <div className="relative rounded-[6px] overflow-hidden bg-[#F7EFEA] aspect-[4/5] mb-3">
        <Placeholder label={p.name} className="absolute inset-0" tone={p.tone} />
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={14} />
        </button>
        {p.tag && (
          <span className="absolute top-3 left-3 bg-[#211D1B] text-white text-[9px] uppercase tracking-wide px-2 py-1 rounded-full">{p.tag}</span>
        )}
      </div>
      <h4 className="text-[13px] text-[#211D1B] leading-snug">{p.name}</h4>
      <div className="flex items-center gap-1.5 mt-1.5">
        <Stars rating={p.rating} />
        <span className="text-[11px] text-black/40">({p.reviews})</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[14px] font-medium text-[#211D1B]">${p.price.toFixed(2)}</span>
        <button className="text-[10px] uppercase tracking-wide border border-black/15 hover:border-[#C9727C] hover:text-[#C9727C] rounded-full px-3 py-1.5 flex items-center gap-1.5 transition-colors">
          <ShoppingBag size={11} /> Add
        </button>
      </div>
    </div>
  );
}

function BestSellers() {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 250, behavior: "smooth" });
  };
  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-[26px] text-[#211D1B]">Best Sellers</h2>
        <div className="flex items-center gap-3">
          <a href="#" className="text-[12px] uppercase tracking-wide text-[#C9727C] font-semibold hidden sm:flex items-center gap-1">View All <ArrowRight size={13} /></a>
          <button onClick={() => scroll(-1)} className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:border-[#C9727C] hover:text-[#C9727C]"><ChevronLeft size={16} /></button>
          <button onClick={() => scroll(1)} className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:border-[#C9727C] hover:text-[#C9727C]"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div ref={scrollRef} className="flex md:grid md:grid-cols-6 gap-5 overflow-x-auto md:overflow-visible no-scrollbar pb-2">
        {DATA.products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

/* --------------------------- WHY CHOOSE US --------------------------- */

function WhyChooseUs() {
  const iconMap = { Leaf, Award, Sparkles, Heart };
  return (
    <section className="bg-[#F7EFEA] mt-16">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="max-w-[560px] mb-12">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85661] font-semibold">Why Louvette</span>
          <h2 className="font-serif text-[30px] mt-2 text-[#211D1B]">A beauty edit you can actually trust</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
}

/* ----------------------------- GUIDES --------------------------------- */

function BeautyGuides() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-16">
      <div className="flex items-center justify-between mb-7">
        <div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85661] font-semibold">Journal</span>
          <h2 className="font-serif text-[26px] text-[#211D1B] mt-1">Beauty Guides &amp; Edits</h2>
        </div>
        <a href="#" className="text-[12px] uppercase tracking-wide text-[#C9727C] font-semibold hidden sm:flex items-center gap-1">Read More <ArrowRight size={13} /></a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {DATA.guides.map((g) => (
          <a href="#" key={g.id} className="group block">
            <div className="relative rounded-[6px] overflow-hidden aspect-[4/3] mb-4">
              <Placeholder label={g.tag + " article image"} className="absolute inset-0 group-hover:scale-105 transition-transform duration-500" tone={g.tone} />
            </div>
            <span className="text-[11px] uppercase tracking-wide text-[#A85661] font-semibold">{g.tag}</span>
            <h3 className="font-serif text-[19px] leading-snug text-[#211D1B] mt-1.5 group-hover:text-[#C9727C] transition-colors">{g.title}</h3>
            <span className="text-[12px] text-black/40 mt-1.5 block">{g.read}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ REVIEWS -------------------------------- */

function Testimonials() {
  return (
    <section className="bg-[#211D1B] mt-16">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-[30px] text-white">What Our Customers Say</h2>
          <div className="hidden sm:flex items-center gap-2 text-white/70 text-[13px]">
            <Stars rating={4.8} /> <span>4.8 average · 12,400 reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DATA.testimonials.map((r) => (
            <div key={r.id} className="bg-white/[0.06] border border-white/10 rounded-[6px] p-6">
              <Quote size={22} className="text-[#C9727C] mb-4" />
              <p className="text-[14px] text-white/85 leading-relaxed mb-5">{r.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] text-white font-medium">{r.name}</div>
                  <div className="text-[11px] text-white/40">{r.role}</div>
                </div>
                <Stars rating={r.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TRUSTED BY STRIP --------------------------- */

function TrustedBy() {
  return (
    <section className="border-y border-black/5 bg-[#FBF7F3] py-8 overflow-hidden">
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-black/35 mb-5">Trusted by the brands you love</p>
      <div className="flex gap-16 whitespace-nowrap animate-[marquee_28s_linear_infinite] w-max">
        {[...DATA.trustedBrands, ...DATA.trustedBrands].map((b, i) => (
          <span key={i} className="font-serif text-[20px] text-black/25 tracking-wide">{b}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

/* ------------------------------- TRUST BAR ------------------------------ */

function TrustBar() {
  const iconMap = { Truck, ShieldCheck, RotateCcw, Headphones };
  return (
    <section className="max-w-[1280px] mx-auto px-6 mt-16">
      <div className="bg-[#F3D8DA]/50 rounded-[6px] grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-8">
        {DATA.trustBar.map(({ icon: iconName, title, body }) => {
          const Icon = iconMap[iconName];
          return (
          <div key={title} className="flex items-center gap-3">
            <Icon size={22} className="text-[#A85661] shrink-0" strokeWidth={1.5} />
            <div>
              <div className="text-[13px] font-medium text-[#211D1B]">{title}</div>
              <div className="text-[11px] text-black/50">{body}</div>
            </div>
          </div>
        );
        })}
      </div>
    </section>
  );
}

/* -------------------------------- NEWSLETTER + SOCIAL ------------------- */

function NewsletterSocial() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-4">
      <div className="bg-[#F3D8DA] rounded-[6px] p-8 flex flex-col justify-center">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#A85661] font-semibold">Beauty In Your Inbox</span>
        <h3 className="font-serif text-[24px] text-[#211D1B] mt-2 mb-4 max-w-[320px]">Sign up for exclusive offers, new arrivals and beauty tips.</h3>
        <div className="flex gap-2 max-w-[380px]">
          <input placeholder="Enter your email address" className="flex-1 bg-white rounded-full px-4 py-3 text-[13px] outline-none" />
          <button className="bg-[#C9727C] hover:bg-[#A85661] text-white text-[12px] uppercase tracking-wide font-medium px-5 rounded-full transition-colors whitespace-nowrap">Subscribe</button>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-[20px] text-[#211D1B]">Follow Our Beauty Journey</h3>
          <div className="flex gap-2 text-[#211D1B]/60">
            <FaSquareInstagram size={16} /> <FaSquareFacebook size={16} /> <FaSquareYoutube size={16} />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 h-[calc(100%-40px)]">
          {DATA.socialLinks.map((s, i) => (
            <div key={i} className="relative rounded-[6px] overflow-hidden min-h-[140px]">
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
    <footer className="bg-[#211D1B] text-white mt-20">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-[22px] mb-3">Louvette</div>
            <p className="text-[12px] text-white/50 leading-relaxed mb-4">Beauty essentials curated with care, for every routine and every glow.</p>
            <div className="flex gap-3 text-white/60">
              <FaSquareInstagram size={16} /> <FaSquareFacebook size={16} /> <FaSquareYoutube size={16} />
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
      <Hero />
      <CategoryCircles />
      <PromoTrio />
      <BestSellers />
      <WhyChooseUs />
      <BeautyGuides />
      <Testimonials />
      <TrustedBy />
      <TrustBar />
      <NewsletterSocial />
      <Footer />
    </div>
  );
}