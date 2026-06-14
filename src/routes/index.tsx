import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, X, ChevronDown, Sparkles, Star,
  Utensils, Coffee, Cake, ChefHat, Truck, Globe, Calendar, MessageCircle,
  MapPin, Image as ImageIcon, Search, Smartphone, BarChart3, Shield, Mail,
  TrendingUp, Users, Clock, Award, Zap, Layers, Palette, Code2, Rocket, LifeBuoy,
  Phone, Instagram, Linkedin, Twitter,
} from "lucide-react";

import heroDevices from "@/assets/hero-devices.jpg";
import caseRestaurant from "@/assets/case-restaurant.jpg";
import amigos from "@/assets/amigos.png";
import hunchmate from "@/assets/hunchmate.png";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webora — Designed to Be Discovered" },
      {
        name: "description",
        content:
          "We design premium restaurant websites that increase reservations, improve trust, and grow revenue. Trusted by restaurants, cafés, bakeries & cloud kitchens.",
      },
      { property: "og:title", content: "Maison Studio — Premium Restaurant Websites" },
      {
        property: "og:description",
        content: "Restaurant websites engineered to turn visitors into customers.",
      },
    ],
  }),
  component: Landing,
});

/* ------------------------------ helpers ------------------------------ */

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-1 w-1 rounded-full bg-gold animate-glow" />
      {children}
    </div>
  );
}

function GoldButton({
  children, as = "a", href = "#contact", variant = "primary", className = "",
}: { children: React.ReactNode; as?: "a" | "button"; href?: string; variant?: "primary" | "ghost"; className?: string }) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-500 overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-gold-gradient text-black shadow-gold hover:scale-[1.03]"
      : "glass text-foreground hover:bg-white/10";
  const Cmp: any = as;
  return (
    <Cmp href={href} className={`${base} ${styles} ${className}`}>
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      )}
    </Cmp>
  );
}

/* ------------------------------- NAV --------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-luxe" : ""
        }`}>
          <a href="#" className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
              <span className="font-display text-black text-lg leading-none">W</span>
            </div>
            <span className="font-display text-lg tracking-tight">Webora<span className="text-gold">.</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {[
              ["Services", "#services"],
              ["Work", "#work"],
              ["Process", "#process"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
            ].map(([l, h]) => (
              <a key={l} href={h} className="hover:text-foreground transition-colors">{l}</a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gold-gradient text-black px-5 py-2 text-sm font-medium hover:scale-105 transition-transform"
          >
            Book a Call <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

/* -------------------------------- HERO ------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  return (
    <section
      ref={ref}
      onMouseMove={e => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) / 30);
        my.set((e.clientY - r.top - r.height / 2) / 30);
      }}
      className="relative min-h-screen w-full overflow-hidden hero-bg pt-32"
    >
      {/* ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[120px]" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-6 pt-10">
        <Reveal delay={0.1}>
          <h1 className="mt-8 text-center text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] font-light tracking-tight">
            We build restaurant <br className="hidden sm:block" />
            websites that turn{" "}
            <span className="italic text-gold-gradient font-normal">visitors</span>
            <br />
            into <span className="shimmer-text font-normal">customers</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base sm:text-lg text-muted-foreground leading-relaxed">
            Premium restaurant websites designed to increase reservations, improve customer
            trust, and grow your business — without lifting a finger.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <GoldButton href="#contact">Book a Free Consultation</GoldButton>
            <GoldButton href="#work" variant="ghost">View Our Work</GoldButton>
          </div>
        </Reveal>

        {/* hero visual */}
        <Reveal delay={0.4}>
          <motion.div
            style={{ x: sx, y: sy }}
            className="relative mx-auto mt-20 max-w-5xl"
          >
            <div className="absolute -inset-10 bg-gold/10 blur-3xl rounded-full" />
            <div className="relative animate-float rounded-3xl overflow-hidden shadow-luxe glass">
              <img
                src={heroDevices}
                alt="Restaurant website on laptop and mobile devices"
                width={1536}
                height={1280}
                className="w-full h-auto"
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
            </div>
          </motion.div>
        </Reveal>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-gold animate-bounce">
        <span className="uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------ TRUST BAR ---------------------------- */

const TRUST_STATS = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 85, suffix: "+", label: "Businesses Served" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
  { value: 21, suffix: " days", label: "Avg. Delivery" },
];
const CATEGORIES = [
  { icon: Utensils, label: "Restaurants" },
  { icon: Coffee, label: "Cafés" },
  { icon: Cake, label: "Bakeries" },
  { icon: ChefHat, label: "Fine Dining" },
  { icon: Truck, label: "Cloud Kitchens" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Coffee, label: "Cafés" },
  { icon: Cake, label: "Bakeries" },
  { icon: ChefHat, label: "Fine Dining" },
  { icon: Truck, label: "Cloud Kitchens" },
];

function TrustBar() {
  return (
    <section className="relative py-24 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-16 animate-marquee">
            {CATEGORIES.concat(CATEGORIES).map((c, i) => (
              <div key={i} className="flex items-center gap-3 text-muted-foreground whitespace-nowrap">
                <c.icon className="h-5 w-5 text-gold" />
                <span className="font-display text-2xl">{c.label}</span>
                <span className="text-gold/40">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PROBLEM ------------------------------ */

const PROBLEMS = [
  {
    icon: Globe,
    title: "No online presence",
    desc: "Customers search Google before they ever visit. If you're invisible, your competition wins the seat.",
  },
  {
    icon: Calendar,
    title: "Lost reservations",
    desc: "Phone tag and missed calls cost real revenue. A 24/7 booking system never sleeps.",
  },
  {
    icon: Palette,
    title: "Outdated branding",
    desc: "An ugly website silently tells diners your kitchen might be too. First impressions are everything.",
  },
  {
    icon: Users,
    title: "Poor customer experience",
    desc: "Slow load, broken menus, unclear info — diners bounce in seconds and rarely come back.",
  },
];

function Problem() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag>The Problem</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-3xl leading-[1.05]">
            Why restaurants <span className="italic text-gold-gradient">lose customers</span> online.
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROBLEMS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group relative h-full rounded-2xl glass p-7 transition-all duration-500 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-luxe">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl glass flex items-center justify-center">
                    <p.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mt-6 text-xl font-display">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="mt-6 text-xs uppercase tracking-[0.2em] text-gold/70">0{i + 1}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- WHY WEBSITE --------------------------- */

const WHY = [
  { stat: "+42%", title: "More Reservations", desc: "Online booking captures the diners who would never call. Always-on, always converting.", icon: Calendar },
  { stat: "3.2x", title: "Stronger Brand Image", desc: "A premium website signals a premium experience — and lets you charge accordingly.", icon: Award },
  { stat: "+58%", title: "Higher Revenue", desc: "Direct bookings replace delivery-app dependency and protect your margins.", icon: TrendingUp },
];

function WhyWebsite() {
  return (
    <section className="relative py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag>Why It Matters</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-4xl leading-[1.05]">
            Your website should be your <span className="italic text-gold-gradient">best salesperson.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {WHY.map((w, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative h-full rounded-3xl p-8 glass overflow-hidden hover:-translate-y-1 transition-all duration-500">
                <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/20 transition-colors" />
                <w.icon className="h-7 w-7 text-gold" />
                <div className="mt-8 text-6xl md:text-7xl font-display font-light text-gold-gradient">{w.stat}</div>
                <h3 className="mt-6 text-2xl font-display">{w.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- COMPARISON ------------------------------ */

const COMPARE = [
  ["Reservations", "Phone calls only, lost after hours", "24/7 online booking & confirmations"],
  ["Visibility", "Buried beyond page 3 of Google", "SEO-optimised, found instantly"],
  ["Branding", "Generic, indistinguishable", "Distinct identity worth remembering"],
  ["Customer Trust", "Doubt before they even arrive", "Confidence before they walk in"],
  ["Revenue", "Capped by walk-ins & word of mouth", "Compound growth from organic traffic"],
];

function Comparison() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag>The Difference</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-4xl leading-[1.05]">
            Without a website vs. <span className="italic text-gold-gradient">with one done right.</span>
          </h2>
        </Reveal>

        <div className="mt-16 rounded-3xl glass overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] gap-px bg-border">
            <div className="bg-background p-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Category</div>
            <div className="bg-background p-6 flex items-center gap-2">
              <X className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">Without Website</span>
            </div>
            <div className="bg-background p-6 flex items-center gap-2">
              <Check className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">With Professional Website</span>
            </div>
            {COMPARE.flatMap(([c, no, yes], i) => [
              <div key={`c-${i}`} className="bg-background/60 p-6 font-display text-lg">{c}</div>,
              <div key={`n-${i}`} className="bg-background/60 p-6 text-sm text-muted-foreground">{no}</div>,
              <div key={`y-${i}`} className="bg-background/60 p-6 text-sm">{yes}</div>,
            ])}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SERVICES ------------------------------ */

const FEATURES = [
  { icon: Smartphone, t: "Responsive Website", d: "Flawless on every screen." },
  { icon: Utensils, t: "Digital Menu", d: "Live updates, no reprints." },
  { icon: Calendar, t: "Online Reservations", d: "Booked while you sleep." },
  { icon: MessageCircle, t: "WhatsApp Integration", d: "One tap to order." },
  { icon: MapPin, t: "Google Maps", d: "Directions from anywhere." },
  { icon: Star, t: "Customer Reviews", d: "Social proof, front & center." },
  { icon: Search, t: "SEO Optimization", d: "Found when it matters." },
  { icon: ImageIcon, t: "Gallery", d: "Plates that sell themselves." },
  { icon: Mail, t: "Contact Forms", d: "Inquiries straight to inbox." },
  { icon: Instagram, t: "Social Integration", d: "Your feed, beautifully." },
  { icon: BarChart3, t: "Analytics Dashboard", d: "Know what works." },
  { icon: Shield, t: "Admin Panel", d: "Control without code." },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sy = useSpring(ry, { stiffness: 200, damping: 20 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={e => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx.set(-py * 10);
        ry.set(px * 10);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag>Services & Features</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-3xl leading-[1.05]">
            Everything your restaurant <span className="italic text-gold-gradient">needs</span>. Nothing it doesn't.
          </h2>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <TiltCard className="h-full">
                <div className="group h-full rounded-2xl glass p-6 transition-all duration-300 hover:bg-white/[0.07]">
                  <div className="h-11 w-11 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
                    <f.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mt-5 text-base font-medium">{f.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- LIVE DEMO ------------------------------ */

function LiveDemo() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag>Live Showcase</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-4xl leading-[1.05]">
            Experience a restaurant website, <span className="italic text-gold-gradient">on every device.</span>
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full" />
          <div className="relative grid lg:grid-cols-[2fr_1fr] gap-8 items-end">
            {/* Desktop mockup */}
            <Reveal>
              <div className="rounded-2xl glass-strong shadow-luxe overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
                  <span className="h-3 w-3 rounded-full bg-white/20" />
                  <span className="h-3 w-3 rounded-full bg-white/20" />
                  <span className="h-3 w-3 rounded-full bg-white/20" />
                  <span className="ml-4 text-xs text-muted-foreground">maison-fine-dining.com</span>
                </div>
                <div className="relative aspect-[16/10]">
                  <img src={caseRestaurant} alt="Restaurant demo" className="absolute inset-0 h-full w-full object-cover" width={1280} height={896} loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-xs uppercase tracking-[0.3em] text-gold">Tasting menu · Reserved seating</div>
                    <h3 className="mt-3 font-display text-3xl md:text-5xl">Maison Lumière</h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md">An eight-course narrative of seasonal European cuisine.</p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-gradient text-black px-5 py-2 text-sm font-medium">
                      Reserve a Table <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Mobile mockup */}
            <Reveal delay={0.15}>
              <div className="mx-auto w-[260px] rounded-[2.5rem] glass-strong shadow-luxe p-2 animate-float">
                <div className="rounded-[2rem] overflow-hidden bg-background">
                  <div className="relative aspect-[9/19]">
                    <img src={caseRestaurant} alt="" className="absolute inset-0 h-full w-full object-cover" width={400} height={800} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-black" />
                    <div className="absolute bottom-6 left-4 right-4">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Today, 7:30 PM</div>
                      <div className="mt-1 font-display text-lg">2 guests · Window</div>
                      <button className="mt-3 w-full rounded-full bg-gold-gradient text-black text-xs font-medium py-2.5">
                        Confirm Reservation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CASE STUDY ---------------------------- */

const CASE_STEPS = [
  { label: "Problem", title: "Empty Tuesday nights.", desc: "Bistro Marais had a loyal weekend crowd, but mid-week tables sat empty and walk-ins were drying up." },
  { label: "Solution", title: "A premium digital home.", desc: "We rebuilt their identity, launched online reservations, and ran targeted SEO for their neighbourhood." },
  { label: "Features", title: "Reservations · SEO · Menu.", desc: "Live availability, locale-aware schema, photographer-grade gallery, and a one-tap WhatsApp concierge." },
  { label: "Results", title: "+42% reservations in 90 days.", desc: "Mid-week covers doubled, average ticket grew 18%, and they cancelled two delivery app subscriptions." },
];

function CaseStudy() {
  return (
    <section className="relative py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag>Case Study</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-4xl leading-[1.05]">
            How a restaurant <span className="italic text-gold-gradient">increased reservations by 42%.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden glass shadow-luxe">
              <img src={caseRestaurant} alt="Bistro Marais interior" className="w-full h-auto" width={1280} height={896} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gold">Bistro Marais · Paris</div>
                  <div className="font-display text-2xl mt-1">90-day transformation</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[["+42%", "Bookings"], ["+18%", "Avg Ticket"], ["3.2x", "Direct Traffic"]].map(([s, l]) => (
                    <div key={l} className="glass-strong rounded-xl px-3 py-2">
                      <div className="text-sm font-display text-gold">{s}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
            <div className="space-y-10">
              {CASE_STEPS.map((s, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="pl-12 relative">
                    <div className="absolute left-0 top-1 h-7 w-7 rounded-full bg-gold-gradient flex items-center justify-center text-black text-xs font-medium shadow-gold">
                      {i + 1}
                    </div>
                    <div className="text-xs uppercase tracking-[0.25em] text-gold/80">{s.label}</div>
                    <h3 className="mt-2 font-display text-2xl">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- PORTFOLIO ----------------------------- */

const PROJECTS = [
  { img: amigos, name: "Amigos Solar", cat: "Renewable Energy", desc: "Solar energy solutions website showcasing products and services.", link: "https://amigosrenewable.in/" },
  { img: hunchmate, name: "Hunchmate", cat: "SaaS Platform", desc: "Innovative platform connecting teams and optimizing workflows.", link: "https://www.hunchmate.com/" },
];

function Portfolio() {
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <SectionTag>Selected Work</SectionTag>
              <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-3xl leading-[1.05]">
                Recent projects <span className="italic text-gold-gradient">we're proud of.</span>
              </h2>
            </div>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
              Full archive <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-6 justify-center flex-wrap">
            {PROJECTS.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="group block w-[420px] shrink-0">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass">
                    <img
                      src={p.img}
                      alt={p.name}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full glass-strong px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                      {p.cat}
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-2xl">{p.name}</h3>
                        <ArrowUpRight className="h-5 w-5 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{p.desc}</p>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PROCESS ------------------------------ */

const PROCESS = [
  { icon: Phone, t: "Discovery Call", d: "Goals, audience, brand voice." },
  { icon: Search, t: "Research & Planning", d: "Market, competitors, sitemap." },
  { icon: Palette, t: "UI/UX Design", d: "Identity, prototypes, motion." },
  { icon: Code2, t: "Development", d: "Performance-first build." },
  { icon: Shield, t: "Testing", d: "Cross-device, real users." },
  { icon: Rocket, t: "Launch", d: "Deploy, SEO, analytics." },
  { icon: LifeBuoy, t: "Support", d: "Ongoing care & growth." },
];

function Process() {
  return (
    <section id="process" className="relative py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag>Our Process</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-3xl leading-[1.05]">
            From idea to <span className="italic text-gold-gradient">launch</span>, in seven deliberate steps.
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent hidden md:block" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {PROCESS.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative text-center">
                  <div className="mx-auto h-14 w-14 rounded-full glass-strong flex items-center justify-center relative z-10">
                    <p.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gold/70">Step 0{i + 1}</div>
                  <h3 className="mt-3 font-display text-lg">{p.t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ ROI CALC ----------------------------- */

function ROI() {
  const [visitors, setVisitors] = useState(2500);
  const [avgTicket, setAvgTicket] = useState(45);
  const [conversion, setConversion] = useState(4);

  const reservations = Math.round((visitors * conversion) / 100);
  const newRevenue = reservations * avgTicket;
  const yearly = newRevenue * 12;

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag>ROI Calculator</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-3xl leading-[1.05]">
            See what a website is <span className="italic text-gold-gradient">actually worth</span> to you.
          </h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-[1fr_1fr] gap-10 items-stretch">
          <Reveal>
            <div className="rounded-3xl glass p-8 md:p-10 space-y-8">
              {[
                { label: "Monthly website visitors", value: visitors, min: 500, max: 20000, step: 100, setter: setVisitors, suffix: "" },
                { label: "Average ticket size (₹)", value: avgTicket, min: 10, max: 200, step: 5, setter: setAvgTicket, suffix: "₹" },
                { label: "Reservation conversion rate", value: conversion, min: 1, max: 15, step: 1, setter: setConversion, suffix: "%" },
              ].map((f, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm text-muted-foreground">{f.label}</label>
                    <span className="font-display text-2xl text-gold">
                      {f.suffix === "₹" ? "₹" : ""}{f.value.toLocaleString()}{f.suffix === "%" ? "%" : ""}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={f.min} max={f.max} step={f.step}
                    value={f.value}
                    onChange={e => f.setter(Number(e.target.value))}
                    className="mt-3 w-full accent-[var(--gold)] h-1 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full rounded-3xl bg-gold-gradient text-black p-8 md:p-10 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_60%)]" />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.3em] opacity-70">Projected impact</div>
                <div className="mt-8 space-y-6">
                  <div>
                    <div className="text-sm opacity-70">Monthly reservations</div>
                    <div className="font-display text-5xl md:text-6xl">{reservations.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-70">New revenue / month</div>
                    <div className="font-display text-5xl md:text-6xl">₹{newRevenue.toLocaleString()}</div>
                  </div>
                  <div className="pt-6 border-t border-black/20">
                    <div className="text-sm opacity-70">Yearly upside</div>
                    <div className="font-display text-6xl md:text-7xl">₹{yearly.toLocaleString()}</div>
                  </div>
                </div>
                <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-black/90 transition-colors">
                  Capture this opportunity <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PRICING ------------------------------ */

const PLANS = [
  {
    tier: "Standard",
    name: "Starter Website",
    price: "₹9,999",
    desc: "For new restaurants ready to claim their corner of the internet.",
    features: ["Up to 5 pages", "Mobile responsive", "Contact form", "WhatsApp integration", "Basic SEO setup"],
    highlight: false,
  },
  {
    tier: "Gold",
    name: "Business Website",
    price: "₹17,999",
    desc: "Our most popular package — for restaurants ready to grow.",
    features: ["Up to 10 pages", "Online reservations", "Full SEO setup", "Google Analytics", "Premium design", "1 round of revisions"],
    highlight: true,
    badge: "Most Popular",
  },
  {
    tier: "Premium",
    name: "Premium Package",
    price: "₹29,999",
    desc: "A full-stack digital presence, end-to-end.",
    features: ["Unlimited pages", "Advanced booking system", "Custom admin dashboard", "Integrations (POS, CRM)", "Priority support", "Quarterly performance review"],
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag>Pricing</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light max-w-3xl leading-[1.05]">
            Simple, transparent <span className="italic text-gold-gradient">pricing.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`relative h-full rounded-3xl p-8 flex flex-col ${
                p.highlight
                  ? "bg-gradient-to-b from-gold/15 to-transparent border border-gold/30 shadow-gold scale-[1.02] md:-translate-y-3"
                  : "glass"
              }`}>
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient text-black text-xs font-medium px-4 py-1 shadow-gold">
                    {p.badge}
                  </div>
                )}
                <div className="text-xs uppercase tracking-[0.3em] text-gold">{p.tier}</div>
                <h3 className="mt-4 font-display text-3xl">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="font-display text-5xl">{p.price}</span>
                  <span className="text-xs text-muted-foreground">one-time</span>
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                    p.highlight
                      ? "bg-gold-gradient text-black hover:scale-105"
                      : "glass hover:bg-white/10"
                  }`}
                >
                  Choose {p.tier} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FAQ ------------------------------- */

const FAQS = [
  { q: "How long does development take?", a: "Most websites launch in 3–5 weeks, depending on the package and how quickly we receive your content. Our Platinum builds typically run 6–8 weeks." },
  { q: "Can I update my menu myself?", a: "Yes. Every site ships with an admin panel so you can update menu items, prices, hours, and photos without touching code." },
  { q: "Do you provide hosting?", a: "We deploy on edge infrastructure with global CDN included for the first year. After that, hosting is a transparent flat fee — no surprises." },
  { q: "Will the website work on mobile?", a: "Beautifully. We design mobile-first because more than 70% of restaurant searches happen on a phone." },
  { q: "Can customers reserve tables online?", a: "Yes — from Gold and above. Real-time availability, confirmations, reminders, and waitlist management included." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32 bg-surface/30">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionTag>FAQ</SectionTag>
          <h2 className="mt-6 text-4xl md:text-6xl font-light leading-[1.05]">
            Questions, <span className="italic text-gold-gradient">answered.</span>
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-border rounded-3xl glass overflow-hidden">
          {FAQS.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 px-6 py-6 text-left hover:bg-white/[0.03] transition-colors"
              >
                <span className="font-display text-lg md:text-xl">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gold shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed max-w-2xl">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- FINAL CTA ------------------------------ */

function FinalCTA() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gold/15 blur-[160px] animate-glow" />
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <SectionTag>Let's Build</SectionTag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.95]">
            Ready to grow your <br />
            <span className="italic text-gold-gradient">restaurant online?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
            Let's build a website that helps your restaurant attract more customers — and protects your margins for years.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <GoldButton href="mailto:abcsynergytech@gmail.com">Schedule Consultation</GoldButton>
            <GoldButton href="https://wa.me/919014943227" variant="ghost">Contact on WhatsApp</GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- FOOTER ----------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
                <span className="font-display text-black text-lg leading-none">W</span>
              </div>
              <span className="font-display text-xl">Webora<span className="text-gold">.</span></span>
            </div>
            <p className="mt-5 text-sm text-muted-foreground max-w-xs">
              A boutique digital studio crafting premium websites designed to be discovered.
            </p>
          </div>
          {[
            { t: "Navigation", l: [["Services", "#services"], ["Work", "#work"], ["Process", "#process"], ["Pricing", "#pricing"]] },
            { t: "Services", l: [["Restaurants", "#"], ["Cafés", "#"], ["Bakeries", "#"], ["Cloud Kitchens", "#"]] },
            { t: "Contact", l: [["abcsynergytech@gmail.com", "mailto:abcsynergytech@gmail.com"], ["WhatsApp", "https://wa.me/919014943227"], ["Book a call", "#contact"]] },
          ].map((col, i) => (
            <div key={i}>
              <div className="text-xs uppercase tracking-[0.25em] text-gold/80">{col.t}</div>
              <ul className="mt-5 space-y-3">
                {col.l.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Webora. Designed to be discovered.</span>
          <span>Designed & built in-house · No templates.</span>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------- PAGE ------------------------------- */

function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <TrustBar />
      <Problem />
      <WhyWebsite />
      <Comparison />
      <Services />
      <LiveDemo />
      <CaseStudy />
      <Portfolio />
      <Process />
      <ROI />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
