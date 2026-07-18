"use client";
import React, { useState, useRef } from "react";
import {
  Search, User, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight,
  Truck, ShieldCheck, RotateCcw, Headphones, ArrowRight, Sparkles, Mail, Quote, Leaf, Award, ArrowUpRight, Menu, X
} from "lucide-react";

import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";

const FONT_LINK = "Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700";

const DATA = {
  navigation: {
    announcement: [
      "FREE SHIPPING ON ORDERS OVER $50",
      "SIGN UP & GET 10% OFF YOUR FIRST ORDER",
      "NEW ARRIVALS DROPPING WEEKLY",
    ],
    mainNav: ["New In", "Makeup", "Skincare", "Haircare", "Fragrance", "Accessories", "Brands"],
  },
  hero: {
    badge: "New Season, New You",
    title: "Unleash Your Beauty",
    subtitle: "Discover your most radiant self with our curated edit of premium beauty essentials.",
    bgImage: "/hero.png",
    cta: { label: "Shop New Arrivals", link: "#" },
    secondaryCta: { label: "Explore Collections", link: "#" },
  },
  collections: [
    {
      id: 1,
      title: "Skincare\nEssentials",
      subtitle: "Glow from within",
      description: "Cleanse, treat, and moisturize with formulas that love your skin back.",
      cta: "Shop Skincare",
      link: "#",
      image: "/skincare-hero.png",
      tone: "sky",
    },
    {
      id: 2,
      title: "Haircare\nFor Every You",
      subtitle: "Strong, shiny, healthy",
      description: "From nourishing shampoos to leave-in treatments — your hair deserves the best.",
      cta: "Shop Haircare",
      link: "#",
      image: "/haircare-hero.png",
      tone: "sand",
    },
    {
      id: 3,
      title: "Makeup\nMust-Haves",
      subtitle: "Express yourself",
      description: "Bold lips, flawless bases, and eyes that captivate — create your signature look.",
      cta: "Shop Makeup",
      link: "#",
      image: "/makeup-hero.png",
      tone: "blush",
    },
    {
      id: 4,
      title: "Accessories\n& More",
      subtitle: "The finishing touch",
      description: "Brushes, bags, tools, and treasures to complete your beauty ritual.",
      cta: "Shop Accessories",
      link: "#",
      image: "/accessories-promo.png",
      tone: "sage",
    },
  ],
  products: [
    { id: 1, name: "Hydrating Glow Face Serum", price: 24.99, rating: 4.5, reviews: 128, image: "/skincare.png", tone: "blush" },
    { id: 2, name: "Velvet Matte Lipstick", price: 14.99, rating: 4.5, reviews: 96, image: "/makeup.png", tone: "sand", tag: "Best Seller" },
    { id: 3, name: "Volume & Curl Mascara", price: 16.99, rating: 4, reviews: 73, image: "/Gemini_Generated_Image_v2o02rv2o02rv2o0.png", tone: "ink" },
    { id: 4, name: "Nourishing Hair Shampoo", price: 19.99, rating: 4.5, reviews: 54, image: "/haircare.png", tone: "sky" },
    { id: 5, name: "4 Piece Brush Set", price: 18.99, rating: 4.5, reviews: 112, image: "/Gemini_Generated_Image_mrza28mrza28mrza.png", tone: "blush" },
    { id: 6, name: "Fragrance Eau de Parfum", price: 29.99, rating: 4.5, reviews: 88, image: "/fragrance.png", tone: "sand" },
  ],
  whyChooseUs: [
    { id: 1, icon: "Leaf", title: "Clean Formulas", body: "Cruelty-free, dermatologist-tested ingredients you can trust." },
    { id: 2, icon: "Award", title: "Curated by Experts", body: "Every product vetted by our in-house beauty team." },
    { id: 3, icon: "Sparkles", title: "Personalized Picks", body: "Recommendations tailored to your unique beauty needs." },
    { id: 4, icon: "Heart", title: "Loved by Thousands", body: "Over 50,000 five-star reviews from our community." },
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#FBF7F3]/95 backdrop-blur-md sticky top-0 z-40 border-b border-black/5">
      <div className="max-w-[1280px] mx-auto px-6 pt-5 pb-4 flex items-center gap-4">
        {/* Hamburger — mobile only */}
        <button
          className="md:hidden shrink-0"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="font-serif text-[26px] tracking-tight text-[#211D1B] shrink-0">Louvette</div>

        {/* Desktop search */}
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

      {/* Desktop nav */}
      <nav className="max-w-[1280px] mx-auto px-6 pb-3.5 hidden md:flex items-center gap-8 overflow-x-auto no-scrollbar">
        {DATA.navigation.mainNav.map((l) => (
          <a key={l} href="#" className="text-[12px] tracking-[0.08em] uppercase text-[#211D1B]/75 hover:text-[#C9727C] whitespace-nowrap transition-colors">
            {l}
          </a>
        ))}
        <a href="#" className="text-[12px] tracking-[0.08em] uppercase text-[#C9727C] font-semibold whitespace-nowrap ml-auto">Sale</a>
      </nav>

      {/* Mobile slide-out menu */}
      <div
        className={`md:hidden fixed inset-0 top-0 bg-[#FBF7F3] z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Spacer to clear the sticky header */}
        <div className="h-[112px]" />
        <div className="flex flex-col flex-1 overflow-y-auto px-6 pb-8">
          {/* Mobile search */}
          <div className="flex items-center bg-white border border-black/10 rounded-full px-4 py-3 mb-6 focus-within:border-[#C9727C] transition-colors">
            <input
              placeholder="Search…"
              className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-black/40"
            />
            <Search size={16} className="text-black/40" />
          </div>

          {/* Mobile nav links */}
          <div className="flex flex-col gap-1">
            {[...DATA.navigation.mainNav, "Sale"].map((l, i) => {
              const isSale = l === "Sale";
              return (
                <a
                  key={l}
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3.5 rounded-[10px] text-[14px] uppercase tracking-wide transition-all ${
                    isSale
                      ? "bg-[#C9727C] text-white font-semibold mt-2"
                      : "text-[#211D1B]/80 hover:bg-black/5 hover:text-[#C9727C]"
                  }`}
                >
                  {l}
                </a>
              );
            })}
          </div>

          {/* Mobile account links */}
          <div className="mt-auto pt-8 border-t border-black/5">
            <div className="flex items-center gap-6 justify-center text-[13px] text-black/60">
              <button className="flex flex-col items-center gap-1" onClick={() => setMobileOpen(false)}>
                <User size={18} strokeWidth={1.5} className="text-[#C9727C]" />
                <span>Account</span>
              </button>
              <button className="flex flex-col items-center gap-1" onClick={() => setMobileOpen(false)}>
                <Heart size={18} strokeWidth={1.5} className="text-[#C9727C]" />
                <span>Wishlist</span>
              </button>
              <button className="flex flex-col items-center gap-1" onClick={() => setMobileOpen(false)}>
                <ShoppingBag size={18} strokeWidth={1.5} className="text-[#C9727C]" />
                <span>Cart (0)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}

/* ---------------------------- HERO (FULL-WIDTH) --------------------------- */

function Hero() {
  const hero = DATA.hero;
  return (
    <section className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center bg-[#F3D8DA] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#C9727C]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#A85661]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/20 blur-3xl" />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, #211D1B 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full py-20 md:py-0">
        <div className="max-w-[700px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9727C]" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85661] font-semibold">
              {hero.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-[56px] md:text-[80px] lg:text-[96px] leading-[0.92] text-[#211D1B] -ml-[3px]">
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] md:text-[17px] text-[#211D1B]/65 mt-5 max-w-[480px] leading-relaxed">
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 mt-8 flex-wrap">
            <a
              href={hero.cta.link}
              className="group inline-flex items-center gap-2 bg-[#C9727C] hover:bg-[#A85661] text-white text-[13px] uppercase tracking-wide font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#C9727C]/25"
            >
              {hero.cta.label}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={hero.secondaryCta.link}
              className="group inline-flex items-center gap-2 border-2 border-[#211D1B]/20 hover:border-[#211D1B]/50 text-[#211D1B] text-[13px] uppercase tracking-wide font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              {hero.secondaryCta.label}
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-10 mt-12 pt-8 border-t border-[#211D1B]/10">
            <div>
              <div className="font-serif text-[28px] text-[#211D1B]">12K+</div>
              <div className="text-[11px] uppercase tracking-wide text-black/50 mt-0.5">Products</div>
            </div>
            <div>
              <div className="font-serif text-[28px] text-[#211D1B]">50K+</div>
              <div className="text-[11px] uppercase tracking-wide text-black/50 mt-0.5">5★ Reviews</div>
            </div>
            <div>
              <div className="font-serif text-[28px] text-[#211D1B]">98%</div>
              <div className="text-[11px] uppercase tracking-wide text-black/50 mt-0.5">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FBF7F3] to-transparent" />
    </section>
  );
}

/* ------------------------ COLLECTIONS (4 BEAUTIFUL CARDS) ------------------- */

function CollectionCard({ collection, index }) {
  const tones = {
    sky: "bg-[#DCE6E8]",
    sand: "bg-[#EFE3D3]",
    blush: "bg-[#F3D8DA]",
    sage: "bg-[#E4E9DF]",
  };

  return (
    <a
      href={collection.link}
      className={`group relative rounded-[16px] overflow-hidden min-h-[400px] md:min-h-[460px] flex flex-col justify-between p-8 md:p-10 ${tones[collection.tone]} transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1`}
    >
      {/* Background image */}
      <img
        src={collection.image}
        alt={collection.title.replace('\n', ' ')}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
      />
      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Decorative circle */}
      <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-white/10 transition-all duration-500 group-hover:scale-125 group-hover:bg-white/20" />
      <div className="absolute -bottom-20 -left-20 w-[150px] h-[150px] rounded-full bg-black/[0.08]" />

      <div className="relative z-10">
        <span className="font-serif text-[48px] text-white/10 leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#F3D8DA] font-semibold mb-2 block">
          {collection.subtitle}
        </span>

        <h3 className="font-serif text-[32px] md:text-[38px] leading-[1.05] text-white whitespace-pre-line mb-3 drop-shadow-sm">
          {collection.title}
        </h3>

        <p className="text-[13px] md:text-[14px] text-white/70 leading-relaxed max-w-[300px] mb-5 drop-shadow-sm">
          {collection.description}
        </p>

        <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wide font-semibold text-white group-hover:text-[#F3D8DA] transition-colors">
          {collection.cta}
          <span className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#C9727C] group-hover:text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </span>
      </div>
    </a>
  );
}

function Collections() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-20 md:pt-28">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85661] font-semibold">Curated Collections</span>
          <h2 className="font-serif text-[32px] md:text-[40px] text-[#211D1B] mt-2 leading-tight">
            Discover by <span className="italic">category</span>
          </h2>
        </div>
        <a href="#" className="hidden md:flex items-center gap-2 text-[12px] uppercase tracking-wide text-[#C9727C] font-semibold hover:gap-3 transition-all shrink-0">
          View All <ArrowRight size={13} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DATA.collections.map((c, i) => (
          <CollectionCard key={c.id} collection={c} index={i} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------- BEST SELLERS ---------------------------- */

function ProductCard({ p }) {
  return (
    <div className="group shrink-0 w-[220px] md:w-auto">
      <div className="relative rounded-[12px] overflow-hidden bg-[#F7EFEA] aspect-[4/5] mb-3">
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <Placeholder label={p.name} className="absolute inset-0" tone={p.tone} />
        )}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10" aria-label="Add to wishlist">
          <Heart size={14} />
        </button>
        {p.tag && (
          <span className="absolute top-3 left-3 bg-[#211D1B]/80 backdrop-blur-sm text-white text-[9px] uppercase tracking-wide px-3 py-1.5 rounded-full font-medium z-10">{p.tag}</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h4 className="text-[13px] text-[#211D1B] leading-snug font-medium">{p.name}</h4>
      <div className="flex items-center gap-1.5 mt-1.5">
        <Stars rating={p.rating} />
        <span className="text-[11px] text-black/40">({p.reviews})</span>
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-[15px] font-semibold text-[#211D1B]">${p.price.toFixed(2)}</span>
        <button className="text-[10px] uppercase tracking-wide font-medium border border-black/15 hover:border-[#C9727C] hover:text-[#C9727C] hover:bg-[#C9727C]/5 rounded-full px-4 py-1.5 flex items-center gap-1.5 transition-all duration-300">
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
    <section className="max-w-[1280px] mx-auto px-6 pt-20 md:pt-28">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85661] font-semibold">Shop The Edit</span>
          <h2 className="font-serif text-[32px] md:text-[40px] text-[#211D1B] mt-2 leading-tight">Best Sellers</h2>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="text-[12px] uppercase tracking-wide text-[#C9727C] font-semibold hidden sm:flex items-center gap-1 hover:gap-2 transition-all">View All <ArrowRight size={13} /></a>
          <button onClick={() => scroll(-1)} className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:border-[#C9727C] hover:text-[#C9727C] hover:bg-[#C9727C]/5 transition-all duration-300"><ChevronLeft size={16} /></button>
          <button onClick={() => scroll(1)} className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:border-[#C9727C] hover:text-[#C9727C] hover:bg-[#C9727C]/5 transition-all duration-300"><ChevronRight size={16} /></button>
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
    <section className="bg-[#F7EFEA] mt-20 md:mt-28">
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-[560px] mb-14">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85661] font-semibold">Why Louvette</span>
          <h2 className="font-serif text-[32px] md:text-[40px] mt-2 text-[#211D1B] leading-tight">A beauty edit you can actually trust</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {DATA.whyChooseUs.map(({ icon: iconName, title, body }) => {
            const Icon = iconMap[iconName];
            return (
            <div key={title}>
              <div className="w-14 h-14 rounded-2xl bg-[#F3D8DA] flex items-center justify-center mb-5 transition-transform hover:scale-105 duration-300">
                <Icon size={22} className="text-[#A85661]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[19px] text-[#211D1B] mb-2">{title}</h3>
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
    <section className="max-w-[1280px] mx-auto px-6 pt-20 md:pt-28">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85661] font-semibold">Journal</span>
          <h2 className="font-serif text-[32px] md:text-[40px] text-[#211D1B] mt-2 leading-tight">Beauty Guides &amp; Edits</h2>
        </div>
        <a href="#" className="text-[12px] uppercase tracking-wide text-[#C9727C] font-semibold hidden sm:flex items-center gap-1 hover:gap-2 transition-all">Read More <ArrowRight size={13} /></a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DATA.guides.map((g) => (
          <a href="#" key={g.id} className="group block">
            <div className="relative rounded-[12px] overflow-hidden aspect-[4/3] mb-5">
              <Placeholder label={g.tag + " article image"} className="absolute inset-0 group-hover:scale-105 transition-transform duration-700" tone={g.tone} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="text-[11px] uppercase tracking-wide text-[#A85661] font-semibold">{g.tag}</span>
            <h3 className="font-serif text-[20px] leading-snug text-[#211D1B] mt-1.5 group-hover:text-[#C9727C] transition-colors">{g.title}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[12px] text-black/40">{g.read}</span>
              <span className="text-[12px] text-[#C9727C] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Read <ArrowRight size={12} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ REVIEWS -------------------------------- */

function Testimonials() {
  return (
    <section className="bg-[#211D1B] mt-20 md:mt-28">
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#C9727C] font-semibold">Social Proof</span>
            <h2 className="font-serif text-[32px] md:text-[40px] text-white mt-2 leading-tight">What Our Customers Say</h2>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-[13px] shrink-0">
            <Stars rating={4.8} /> <span>4.8 average · 12,400+ reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DATA.testimonials.map((r) => (
            <div key={r.id} className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-[12px] p-7 hover:bg-white/[0.09] transition-colors duration-300">
              <Quote size={24} className="text-[#C9727C] mb-5" />
              <p className="text-[14px] text-white/85 leading-relaxed mb-6 italic">&ldquo;{r.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] text-white font-medium">{r.name}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">{r.role}</div>
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
    <section className="border-y border-black/5 bg-[#FBF7F3] py-10 overflow-hidden">
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-black/35 mb-6">Trusted by the brands you love</p>
      <div className="flex gap-16 whitespace-nowrap animate-[marquee_28s_linear_infinite] w-max">
        {[...DATA.trustedBrands, ...DATA.trustedBrands].map((b, i) => (
          <span key={i} className="font-serif text-[22px] text-black/25 tracking-wide hover:text-black/40 transition-colors">{b}</span>
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
    <section className="max-w-[1280px] mx-auto px-6 -mt-10 relative z-10">
      <div className="bg-white shadow-[0_4px_20px_-8px_rgba(33,29,27,0.08)] rounded-[12px] grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-8 border border-black/5">
        {DATA.trustBar.map(({ icon: iconName, title, body }) => {
          const Icon = iconMap[iconName];
          return (
          <div key={title} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#F3D8DA]/70 flex items-center justify-center group-hover:bg-[#F3D8DA] transition-colors shrink-0">
              <Icon size={18} className="text-[#A85661]" strokeWidth={1.5} />
            </div>
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
    <section className="max-w-[1280px] mx-auto px-6 mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6">
      <div className="bg-[#F3D8DA] rounded-[16px] p-8 md:p-10 flex flex-col justify-center min-h-[280px]">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#A85661] font-semibold">Beauty In Your Inbox</span>
        <h3 className="font-serif text-[26px] md:text-[30px] text-[#211D1B] mt-3 mb-5 leading-tight max-w-[360px]">Sign up for exclusive offers &amp; beauty tips.</h3>
        <div className="flex gap-2 max-w-[400px]">
          <input placeholder="Enter your email" className="flex-1 bg-white rounded-full px-5 py-3.5 text-[13px] outline-none focus:ring-2 focus:ring-[#C9727C]/30 transition-all placeholder:text-black/30" />
          <button className="bg-[#C9727C] hover:bg-[#A85661] text-white text-[12px] uppercase tracking-wide font-semibold px-6 rounded-full transition-all duration-300 whitespace-nowrap hover:shadow-lg hover:shadow-[#C9727C]/25">
            <Mail size={16} className="md:hidden" />
            <span className="hidden md:inline">Subscribe</span>
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-[22px] text-[#211D1B]">Follow Our Journey</h3>
          <div className="flex gap-3 text-[#211D1B]/50">
            <FaSquareInstagram size={18} className="hover:text-[#C9727C] transition-colors cursor-pointer" />
            <FaSquareFacebook size={18} className="hover:text-[#C9727C] transition-colors cursor-pointer" />
            <FaSquareYoutube size={18} className="hover:text-[#C9727C] transition-colors cursor-pointer" />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 h-[calc(100%-44px)] min-h-[180px]">
          {DATA.socialLinks.map((s, i) => (
            <div key={i} className="relative rounded-[10px] overflow-hidden min-h-[140px] group cursor-pointer">
              <Placeholder label={s} className="absolute inset-0 group-hover:scale-105 transition-transform duration-500" tone={["blush", "sand", "blush", "sky", "sage"][i]} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
    <footer className="bg-[#211D1B] text-white mt-20 md:mt-28">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-14 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-[24px] mb-4 text-white">Louvette</div>
            <p className="text-[12px] text-white/45 leading-relaxed mb-5 max-w-[220px]">Beauty essentials curated with care, for every routine and every glow.</p>
            <div className="flex gap-3 text-white/40">
              <FaSquareInstagram size={18} className="hover:text-white transition-colors cursor-pointer" />
              <FaSquareFacebook size={18} className="hover:text-white transition-colors cursor-pointer" />
              <FaSquareYoutube size={18} className="hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          {DATA.footer.columns.map((c) => (
            <div key={c.title}>
              <h4 className="text-[11px] uppercase tracking-wide text-white/40 mb-5 font-semibold">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-[13px] text-white/65 hover:text-white transition-colors duration-200">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-[12px] text-white/35">
          <span>© 2026 Louvette. All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
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
      <Collections />
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