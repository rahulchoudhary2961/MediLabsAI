import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe,
  Lock,
  Menu,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const routes = {
  home: "/",
  solutions: "/solutions",
  careAreas: "/care-areas",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  termsOfUse: "/terms-of-use",
} as const;

const impacts = [
  { title: "Reduce surgery cancellations by up to 40%", value: "40%" },
  { title: "Add three strategic cases per OR per month", value: "+3" },
  { title: "Reduce excess days by 15-30%", value: "15-30%" },
  { title: "Increase staff productivity by 50%", value: "50%" },
];

const careSlides = [
  {
    eyebrow: "SURGICAL SERVICES",
    title: "Don't just grow. Drive the right growth.",
    body:
      "To truly grow your surgical program, your growth goals must work in concert with your operations. That's where Medsyra's Surgical Growth and Perioperative Care Coordination solutions come in.",
    image: "/mirror-assets/surgical-services-1.png",
  },
  {
    eyebrow: "LEADERSHIP",
    title: "Empowering your care teams to focus on patients",
    body:
      "Medsyra helps tackle the below-license administrative processes that create drag for frontline staff. AI teammates reduce burnout, surface interventions, and help teams act sooner.",
    image: "/mirror-assets/Leadership-1024x900.png",
  },
  {
    eyebrow: "INPATIENT CARE",
    title: "Streamline patient flow and increase capacity",
    body:
      "Seamlessly embedded into your workflow, Medsyra supports aggressive but achievable discharge expectations, coordinates ancillary resources, and closes gaps to get patients home sooner.",
    image: "/mirror-assets/Inpatient-care.png",
  },
];

const clientSpotlight = {
  client: "Aspen Medical",
  address: "Deakin, Australian Capital Territory",
  headline: "Unlocking capacity and reducing length of stay through AI-driven orchestration",
  teaser:
    "Aspen Medical partnered with Medsyra to move beyond manual EHR constraints and establish a proactive system of action for patient flow.",
  overview:
    "Aspen Medical is a globally recognized healthcare partner based in Deakin, Australian Capital Territory. Seeking to meet the growing demand for care services, Aspen Medical partnered with Medsyra to move beyond manual workflow constraints and establish a proactive system of action for patient flow.",
  challenge:
    "Aspen Medical identified that relying solely on the EHR for case management led to inefficient processes and long lengths of stay. The team needed a way to proactively identify discharge barriers and align multidisciplinary care teams without adding to administrative burden.",
  solution:
    "Aspen Medical implemented the Medsyra Inpatient Solution, integrating it directly into Epic to automate discharge planning and sequence key care steps.",
  features: [
    "Early Discharge Planning intelligence uses machine learning models trained on local provider notes to help teams set aggressive but achievable discharge dates.",
    "QCard is a Smart on FHIR application embedded within the patient list navigator to optimize care team alignment during daily rounds.",
    "Automated Milestone Coordination detects care plan gaps and prompts providers for high-priority orders.",
    "Flow Prioritization uses machine learning to determine the optimal sequence of orders for ancillary teams and free up capacity faster.",
  ],
  impact: [
    "8,554 excess days saved",
    "$3.32 million in annualized savings",
    "23 daily beds of additional capacity created",
    "10-20% reduction in ED boarding",
    "3,500 additional patient capacity created through automated flow prioritization",
  ],
  quote:
    "With Medsyra Inpatient Solution we've reduced the length of stay for patients significantly, resulting not only in significant financial savings but also increased access to care.",
  attribution: "Scott Estep, System Vice President, Nursing Operations & Capacity Management",
  insights: [
    "93% of patients now receive early discharge plans.",
    "Ancillary teams complete 85% of high-priority orders on time.",
    "The results were achieved in less than six months after launch.",
  ],
} as const;

const resources = [
  {
    type: "PRESS RELEASE",
    title: "Drive the next wave of healthcare innovation with operational AI",
    copy: "Allow health systems to co-develop AI operational assistants at unmatched velocity.",
    image: "/mirror-assets/AdobeStock_321233603-1-1.png",
    cta: "Learn more",
  },
  {
    type: "WHITE PAPER",
    title: "How healthcare CIOs are shaping AI's role in patient care and operations",
    copy:
      "A closer look at how CIOs, CMIOs, and IT leaders are thinking about AI in healthcare and what it takes to operationalize it well.",
    image: "/mirror-assets/Featured-Img_9-Blog.jpg",
    cta: "Read now",
  },
  {
    type: "EBOOK",
    title: "Is it time to invest in an AI platform?",
    copy:
      "Know when it makes strategic sense to invest in an AI platform that goes above and beyond what your EHR can offer.",
    image: "/mirror-assets/Featured-Img_13-Blog.jpg",
    cta: "Read now",
  },
  {
    type: "BLOG",
    title: "Operational AI for hospital throughput",
    copy:
      "See how Medsyra combines workflow automation, smarter prioritization, and embedded assistants to support hospital operations.",
    image: "/mirror-assets/Featured-Img_15-Blog.jpg",
    cta: "Read now",
  },
  {
    type: "BLOG",
    title: "How to maximize OR utilization with AI",
    copy:
      "Explore three common challenges to optimizing OR utilization and how machine learning models can help teams improve throughput.",
    image: "/mirror-assets/Featured-Img_6-Blog-1.png",
    cta: "Read now",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

type SectionHeadingProps = {
  label: string;
  title: string;
  body: string;
  theme?: "light" | "dark";
};

function SectionHeading({ label, title, body, theme = "light" }: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <motion.div {...fadeUp} className="max-w-4xl">
      <div className={`inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] ${
        isDark
          ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-300"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}>
        {label}
      </div>
      <h2 className={`mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight md:text-6xl ${isDark ? "text-white" : "text-[#08110e]"}`}>
        {title}
      </h2>
      <p className={`mt-5 text-lg leading-8 ${isDark ? "text-zinc-300" : "text-[#2e2944]"}`}>
        {body}
      </p>
    </motion.div>
  );
}

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isHomePage = location.pathname === routes.home;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(location.pathname);
      return;
    }

    const sections = ["home", "solutions", "care-areas", "contact"];
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) {
        return null;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-35% 0px -45% 0px",
          threshold: 0.15,
        },
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [isHomePage, location.pathname]);

  const links = [
    { label: "Home", href: routes.home, sectionId: "home" },
    { label: "Solutions", href: routes.solutions, sectionId: "solutions" },
    { label: "Care Areas", href: routes.careAreas, sectionId: "care-areas" },
    { label: "Contact", href: routes.contact, sectionId: "contact" },
  ];

  const isLinkActive = (href: string, sectionId: string) => {
    if (isHomePage) {
      return activeSection === sectionId;
    }

    return location.pathname === href;
  };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#030806]/92 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="border-b border-emerald-400/10 bg-[#082017] px-4 py-2 text-center text-xs font-medium text-emerald-200">
        New research: how CIOs are operationalizing AI across health systems in 2026
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to={routes.home} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-2xl text-white">Medsyra</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-300 ${isLinkActive(link.href, link.sectionId) ? "text-emerald-300" : "text-zinc-300"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to={routes.contact} className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#02110b] transition-colors hover:bg-emerald-400">
            Request demo
          </Link>
        </div>

        <button onClick={() => setOpen((value) => !value)} className="text-white md:hidden" aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#030806] md:hidden"
          >
            <div className="flex flex-col gap-5 px-5 py-6">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-base font-medium ${isLinkActive(link.href, link.sectionId) ? "text-emerald-300" : "text-zinc-200"}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to={routes.contact} onClick={() => setOpen(false)} className="rounded-full bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-[#02110b]">
                Request demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
      className="relative"
    >
      <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-emerald-500/18 blur-3xl" />
      <div className="absolute -right-8 bottom-10 h-36 w-36 rounded-full bg-emerald-300/12 blur-3xl" />
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#08110e] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between border-b border-white/8 bg-[#0b1512] px-5 py-4">
          <div className="font-[family-name:var(--font-display)] text-2xl text-white">Medsyra</div>
          <div className="flex w-[68%] items-center gap-2">
            <div className="h-4 flex-1 rounded-full bg-white/12" />
            <div className="flex-[2] rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-700">Tonsillectomy</div>
            <div className="h-10 w-24 rounded-xl bg-white/12" />
          </div>
        </div>
        <div className="grid min-h-[34rem] grid-cols-[4.5rem_1fr]">
          <div className="flex flex-col items-center gap-7 border-r border-white/8 bg-[#0a1411] py-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold ${index === 2 ? "bg-emerald-400 text-[#05110b]" : "bg-white/10 text-zinc-400"}`}>
                {index + 1}
              </div>
            ))}
          </div>
          <div className="bg-[#f3f5f4] p-5 text-[#193128]">
            <div className="text-center text-2xl font-semibold">Available time for Dr. Wiley</div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.8fr]">
              <div className="rounded-[1.2rem] bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-zinc-700">Preferences</div>
                <div className="mt-4 space-y-3">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded bg-emerald-400/80" />
                      <div className="h-2.5 flex-1 rounded-full bg-zinc-200" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[1.2rem] bg-white shadow-sm">
                  <div className="rounded-t-[1.2rem] bg-zinc-100 px-5 py-3 text-sm font-semibold">Block Time</div>
                  <div className="space-y-4 px-5 py-5">
                    {[
                      ["Monday, 02.03.25", "HOPD 3", "12:30 - 15:00"],
                      ["Wednesday, 02.26.25", "ASC 4", "11:15 - 15:00"],
                    ].map(([date, location, time]) => (
                      <div key={date} className="grid grid-cols-3 items-center gap-3 text-xs text-zinc-600">
                        <div>{date}</div>
                        <div>{location}</div>
                        <div className="justify-self-end rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-[#072017]">{time}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.2rem] bg-white shadow-sm">
                  <div className="rounded-t-[1.2rem] bg-zinc-100 px-5 py-3 text-sm font-semibold">Open Time</div>
                  <div className="space-y-4 px-5 py-5">
                    {[
                      ["Monday, 02.03.25", "DV 3", "13:30 - 18:30"],
                      ["Monday, 02.03.25", "Main 1", "11:30 - 18:30"],
                    ].map(([date, location, time]) => (
                      <div key={`${date}-${location}`} className="grid grid-cols-3 items-center gap-3 text-xs text-zinc-600">
                        <div>{date}</div>
                        <div>{location}</div>
                        <div className="justify-self-end rounded-lg bg-emerald-300 px-4 py-2 font-semibold text-[#072017]">{time}</div>
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <div className="rounded-lg bg-[#0f8f6d] px-5 py-2 text-sm font-semibold text-white">Next Step</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="relative -mt-8 ml-3 max-w-[23rem] rounded-[1.3rem] border border-emerald-500 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
            >
              <div className="rounded-t-[1.2rem] bg-[linear-gradient(135deg,#10b981,#065f46)] px-5 py-4 text-base font-semibold text-white">
                Medsyra Capacity Assistant prioritized availability at ASC/HOPD
              </div>
              <div className="space-y-4 px-5 py-4 text-[#14352b]">
                {[
                  ["ASC 1", "13:30 - 17:00"],
                  ["ASC 2", "14:00 - 17:00"],
                ].map(([label, time]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <div className="font-semibold">{label}</div>
                    <div className="rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold">{time}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#030806] pt-30 md:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_15%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_85%_22%,rgba(6,95,70,0.18),transparent_24%),linear-gradient(180deg,#04110b_0%,#030806_55%,#020403_100%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-22 pt-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">
            Automate hospital operations with AI teammates
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
            Secure the margins to achieve your mission of delivering quality care to patients with the power of AI.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to={routes.solutions} className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#02110b] transition-colors hover:bg-emerald-400">
              Meet Medsyra
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to={routes.contact} className="inline-flex items-center justify-center rounded-full border border-white/14 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-emerald-400/50 hover:text-emerald-300">
              Request demo
            </Link>
          </div>
        </motion.div>

        <HeroMockup />
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="bg-[#020504] py-20 md:py-24">
      <motion.div {...fadeUp} className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-white md:text-6xl">Impact across care settings</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {impacts.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-white/8 bg-[#08110e] p-7">
              <div className="text-sm uppercase tracking-[0.18em] text-zinc-400">{item.title}</div>
              <div className="mt-6 text-5xl font-semibold tracking-tight text-emerald-300">{item.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SolutionsIntro() {
  return (
    <section className="bg-white py-18 md:py-22">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          label="Solutions"
          title="Secure your margins to achieve your mission of delivering excellent care"
          body="Built to empower your care teams, Medsyra does more than recommend tasks. It takes immediate action on below-license administrative work so staff can focus on delivering the very best patient care."
        />
      </div>
    </section>
  );
}

function SurgicalGrowthVisual() {
  const [step, setStep] = useState(0);

  const rows = [
    "Robotic Optimization",
    "Site of Care Optimization",
    "Strategic Service Line Growth",
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStep((current) => (current + 1) % 8);
    }, 760);

    return () => window.clearInterval(interval);
  }, []);

  const displayStep = Math.min(step, 5);
  const activeRow = Math.floor(displayStep / 2);
  const enabled = rows.map((_, index) => displayStep >= index * 2 + 1);
  const cursorPoints = [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: -2, y: 68 },
    { x: 4, y: 68 },
    { x: -2, y: 136 },
    { x: 4, y: 136 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative w-full overflow-hidden rounded-[2rem] border border-emerald-100 bg-[linear-gradient(180deg,#f7fbf8_0%,#eef8f2_100%)] p-6 shadow-[0_25px_70px_rgba(6,78,59,0.12)]"
    >
      <div className="grid min-h-[34rem] gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.6rem] border border-emerald-100 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
          <div className="rounded-[1.3rem] bg-[linear-gradient(135deg,#064e3b,#10b981_56%,#047857)] px-6 py-5 text-2xl font-semibold text-white">
            Medsyra Strategic Control Panel
          </div>
          <div className="mt-6 grid gap-4">
            {rows.map((label, index) => (
              <motion.div
                key={label}
                animate={{
                  opacity: enabled[index] ? 1 : 0.58,
                  x: activeRow === index ? 0 : -2,
                  scale: activeRow === index ? 1.02 : 1,
                }}
                transition={{ duration: 0.22 }}
                className="relative flex min-h-[6.25rem] items-center gap-3 rounded-[1.2rem] border border-emerald-100 bg-[#f7fbf8] px-4 py-4 text-[15px] leading-6 text-emerald-700"
              >
                <div className={`relative h-6 w-12 rounded-full transition-colors ${enabled[index] ? "bg-[#14b8a6]" : "bg-zinc-200"}`}>
                  <motion.div
                    animate={{ x: enabled[index] ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 360, damping: 22 }}
                    className="absolute top-1 h-4 w-4 rounded-full bg-white shadow"
                  />
                </div>
                <span className="max-w-[11.5rem] font-medium">{label}</span>
                {activeRow === index && displayStep % 2 === 1 ? (
                  <motion.span
                    initial={{ scale: 0.7, opacity: 0.45 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    transition={{ duration: 0.42 }}
                    className="absolute left-2 top-0 h-6 w-6 rounded-full border border-[#14b8a6]"
                  />
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
          <div className="grid gap-4 rounded-[1.6rem] border border-emerald-100 bg-[#08110e] p-5 text-white">
            <div className="overflow-hidden rounded-[1.3rem] border border-white/8">
              <img src="/mirror-assets/surgical-services-1.png" alt="Surgical growth visual" className="aspect-[16/10] w-full object-cover" />
            </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Blocks released", value: "14" },
              { label: "Cases routed", value: "38" },
              { label: "Robotic hours", value: "92%" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.1rem] border border-white/8 bg-white/5 p-4">
                <div className="text-[9px] uppercase tracking-[0.14em] text-emerald-300">{item.label}</div>
                <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="rounded-[1.3rem] border border-white/8 bg-white/5 p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">Current sequence</div>
            <div className="mt-4 space-y-3">
              {["Find time", "Release block", "Match case", "Fill white space"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 text-[12px] text-zinc-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">{index + 1}</div>
                  <span className="leading-5">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PATProgramVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative w-full rounded-[2rem] bg-[linear-gradient(180deg,#eef9f5_0%,#f8fcfa_100%)] p-6 shadow-[0_25px_70px_rgba(6,78,59,0.12)]"
    >
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.6rem] border border-emerald-100 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
          <div className="overflow-hidden rounded-[1.35rem] border border-emerald-100 bg-[#07100d]">
            <img src="/mirror-assets/Leadership-1024x900.png" alt="PAT program visual" className="aspect-[16/10] w-full object-cover" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Patients reached", value: "96" },
              { label: "Records reviewed", value: "58" },
              { label: "Tasks resolved", value: "24" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-zinc-100 bg-[#fbfdfc] p-4">
                <div className="text-[10px] uppercase tracking-[0.16em] text-emerald-700">{item.label}</div>
                <div className="mt-2 text-2xl font-semibold text-[#08110e]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-emerald-100 bg-[#08110e] p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">PAT Workflow</div>
          <div className="mt-5 space-y-4">
            {[
              "AI Patient Concierge reaches patients through voice, text, and email to gather intake information and answer questions.",
              "Intelligent Document Management processes faxed, scanned, or emailed records to reduce manual data entry.",
              "PAT Assist and workflow support help nurses prioritize worklists, summarize charts, and keep preparation moving.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-[13px] leading-6 text-zinc-200">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 overflow-hidden rounded-[1.35rem] border border-white/8">
            <img src="/mirror-assets/Featured-Img_9-Blog.jpg" alt="PAT workflow visual" className="aspect-[16/10] w-full object-cover" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InpatientCapacityVisual() {
  const activeBar = 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="rounded-[2rem] bg-white p-5 shadow-[0_25px_70px_rgba(6,78,59,0.12)]"
    >
      <div className="overflow-hidden rounded-[1.6rem] border border-emerald-100 bg-white shadow-sm">
        <div className="grid min-h-[29rem] grid-cols-[3.6rem_1fr]">
          <div className="bg-[#064e3b] px-2 py-4 text-white">
            <div className="mb-6 flex justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-white" />
              <div className="ml-1.5 h-2.5 w-2.5 rounded-full bg-white" />
              <div className="ml-1.5 h-2.5 w-2.5 rounded-full bg-white" />
            </div>
            <div className="space-y-5 pt-2">
              {["H", "C", "D", "U", "O", "R"].map((icon, index) => (
                <div key={index} className={`mx-auto flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold ${index === 3 ? "bg-white text-[#064e3b]" : "text-white"}`}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div className="border-l border-[#047857]">
            <div className="bg-[#064e3b] px-8 py-3 text-4xl font-semibold text-white">Medsyra</div>
            <div className="space-y-3 bg-white p-4">
              <div className="text-sm font-medium text-zinc-500">Today's Plan</div>

              <div className="grid grid-cols-[1fr_1fr_1.1fr] gap-3">
                <div className="rounded-lg border border-zinc-200 p-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-400">All Planned Discharges</div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] text-zinc-500">All Planned D/Cs Today</div>
                      <div className="text-4xl font-semibold text-zinc-800">124</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#14b8a6]">Successful D/Cs (all)</div>
                      <div className="text-4xl font-semibold text-[#14b8a6]">33</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-200 p-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-400">All Planned D/Cs Today</div>
                  <div className="mt-4 flex h-[4.7rem] items-center justify-between">
                    {["#ef4444", "#047857", "#14b8a6", "#facc15"].map((color) => (
                      <div key={color} className="flex-1 px-1">
                        <div className="h-3 rounded-full" style={{ backgroundColor: color }} />
                        <div className="mt-2 h-1.5 rounded-full bg-zinc-200" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-200 p-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-400">Patient Barriers - Still In Hospital</div>
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-6 rounded-full bg-zinc-200" />
                        <div className="h-2.5 rounded-full bg-emerald-300" style={{ width: `${80 - index * 6}px` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_1fr] gap-3">
                <div className="rounded-lg border border-zinc-200 p-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-400">Planned AM Discharges</div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] text-zinc-500">All Planned D/Cs Today</div>
                      <div className="text-4xl font-semibold text-zinc-800">96</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#14b8a6]">Successful AM D/Cs</div>
                      <div className="text-4xl font-semibold text-[#14b8a6]">57</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-200 p-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-400">Planned AM D/Cs Today</div>
                  <div className="mt-4 flex h-[4.7rem] items-center justify-between">
                    {["#ef4444", "#047857", "#14b8a6", "#facc15"].map((color) => (
                      <div key={color} className="flex-1 px-1">
                        <div className="h-3 rounded-full" style={{ backgroundColor: color }} />
                        <div className="mt-2 h-1.5 rounded-full bg-zinc-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200 p-4">
                <div className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.1em] text-[#047857]">
                  Remaining Planned D/Cs Today - Status by Unit
                </div>
                <div className="flex h-[8.5rem] items-end justify-between gap-3">
                  {[88, 62, 61, 76, 61, 51, 44, 46, 20, 16, 8, 8].map((height, index) => (
                    <motion.div
                      key={index}
                      animate={{ opacity: activeBar === index ? 1 : 0.85, scaleY: activeBar === index ? 1.08 : 1 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-1 flex-col justify-end"
                    >
                      <div className={`w-full rounded-t-sm ${index < 6 ? "bg-[#064e3b]" : "bg-[#14a3ad]"}`} style={{ height: `${height}px` }} />
                      <div className={`w-full ${index === 0 || index === 1 || index === 2 || index === 7 || index === 11 ? "bg-emerald-300" : "bg-transparent"}`} style={{ height: index === 0 ? "22px" : index === 1 ? "14px" : index === 2 ? "6px" : index === 7 ? "8px" : index === 11 ? "6px" : "0px" }} />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-12">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#047857]" />
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200 p-3">
                <div className="mb-3 h-2 rounded-full bg-emerald-400" />
                <div className="grid grid-cols-9 gap-x-5 gap-y-4">
                  {Array.from({ length: 45 }).map((_, index) => (
                    <div key={index} className="space-y-3">
                      <div className="h-1.5 w-full rounded-full bg-zinc-200" />
                      <div className="h-1.5 w-[80%] rounded-full bg-zinc-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type SolutionFeatureProps = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  stat: string;
  statLabel: string;
  image?: string;
  reverse?: boolean;
  children?: React.ReactNode;
};

function SolutionFeature({ eyebrow, title, body, points, stat, statLabel, image, reverse = false, children }: SolutionFeatureProps) {
  return (
    <section className="bg-white pb-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:items-start">
        <motion.div {...fadeUp} className={reverse ? "lg:order-2" : ""}>
          <div className="text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-emerald-700">
            {eyebrow}
          </div>
          <h2 className="mt-6 max-w-[11ch] font-[family-name:var(--font-display)] text-[2.85rem] leading-[0.98] tracking-[-0.04em] text-[#08110e] md:text-[3.55rem]">{title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#2e2944]">{body}</p>
          <div className="mt-8 rounded-[1.6rem] border border-emerald-100 bg-[#f6fbf8] p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-700">Proven impact</div>
            <div className="mt-3 flex items-end gap-3">
              <div className="shrink-0 whitespace-nowrap font-[family-name:var(--font-display)] text-5xl leading-none text-[#08110e]">{stat}</div>
              <div className="max-w-[16rem] pb-1 text-sm leading-6 text-zinc-600">{statLabel}</div>
            </div>
          </div>
          <div className="mt-8 grid gap-4">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-4 rounded-[1.35rem] border border-emerald-100 bg-[#f8fcfa] p-6 text-[#17342b]">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-lg leading-8">{point}</p>
              </div>
            ))}
          </div>
          <Link to={routes.contact} className="mt-10 inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10b981,#059669_55%,#047857)] px-8 py-5 text-lg font-semibold text-white shadow-[0_20px_50px_rgba(16,185,129,0.24)] transition-transform duration-300 hover:-translate-y-0.5">
            Learn more
          </Link>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className={`w-full ${reverse ? "lg:order-1" : ""}`}>
          {children ?? (
            <div className="w-full rounded-[2rem] border border-emerald-100 bg-[#f5faf7] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
              <img src={image} alt={title} className="w-full rounded-[1.6rem]" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions">
      <div className="bg-white pb-8 pt-2">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-4 lg:grid-cols-5">
            {[
              "Inpatient Capacity",
              "Surgical Growth",
              "Perioperative Care",
              "Care Gap + Coding",
              "Architecture",
            ].map((label, index) => (
              <div key={label} className="rounded-[1.25rem] border border-emerald-100 bg-[#f5faf7] px-4 py-4 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-800">
                {index + 1}. {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <SolutionFeature
        eyebrow="Inpatient Capacity Solution"
        title="Reduce LOS and excess days from admission onward"
        body="This suite focuses on reducing length of stay and excess days by automating discharge planning the moment a patient is admitted."
        stat="24/7"
        statLabel="capacity intelligence working continuously across labs, vitals, orders, notes, and care plans."
        points={[
          "Discharge Planning Assistant auto-populates estimated discharge dates and dispositions into the EHR early in the stay.",
          "Flow Prioritization Assistant sequences ancillary orders so discharge-critical work moves ahead of bottlenecks.",
          "Care Gap Assistant and Case Manager Assistant help close barriers and summarize the last 24 hours for disposition planning.",
        ]}
      >
        <InpatientCapacityVisual />
      </SolutionFeature>

      <SolutionFeature
        eyebrow="Surgical Growth & Robotics Optimization"
        title="Increase strategic surgical volume and maximize robotics utilization"
        body="This suite is designed to grow surgical volume while making it easier to release, reassign, and fill OR time with the right cases."
        stat="5"
        statLabel="tools working together to find time, release blocks, and push the right cases forward."
        points={[
          "TimeFinder gives surgeons a mobile-friendly, EHR-agnostic way to view and request OR time quickly.",
          "Block Release Assistant predicts unused blocks and nudges release before time is lost.",
          "Available Time Outreach and Robotics Optimizer fill white space with strategic and robotic cases.",
        ]}
      >
        <SurgicalGrowthVisual />
      </SolutionFeature>

      <SolutionFeature
        eyebrow="Perioperative Care Coordination"
        title="Reduce cancellations with automated pre-admission testing support"
        body="This solution automates the PAT process so teams can gather information, prioritize work, and prepare patients without adding administrative burden."
        stat="60%"
        statLabel="reduction in manual data entry through intelligent document management."
        points={[
          "AI Patient Concierge reaches patients through voice, text, and email to gather intake information and answer questions.",
          "Intelligent Document Management processes faxed, scanned, or emailed records to reduce manual data entry.",
          "PAT Assist, workflow support, and continuous risk determination keep nurses focused on the right work at the right time.",
        ]}
        reverse
      >
        <PATProgramVisual />
      </SolutionFeature>

      <SolutionFeature
        eyebrow="Care Gap and Coding Automation Suite"
        title="Identify complex conditions and support accurate reimbursement"
        body="This suite focuses on real-time identification of care gaps and conditions so teams can improve care quality and financial capture."
        stat="MCC/CC"
        statLabel="capture supported with better documentation and real-time clinical visibility."
        points={[
          "Condition Detection Assistant finds risks for malnutrition, AKI, sepsis, delirium, and congestive heart failure.",
          "Care Gap Assistant pre-populates orders and prompts sign-off within the natural EHR workflow.",
          "Coding and Documentation Assistant supports accurate clinical complexity documentation and denial reduction.",
        ]}
      >
        <div className="rounded-[2rem] border border-emerald-100 bg-[#f6fbf8] p-6 shadow-[0_25px_70px_rgba(6,78,59,0.12)]">
          <div className="grid min-h-[28rem] gap-5 rounded-[1.6rem] border border-white bg-white p-5 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[1.4rem] border border-emerald-100 bg-[#07100d]">
                <img src="/mirror-assets/Featured-Img_6-Blog-1.png" alt="Care gap workflow visual" className="aspect-[16/10] w-full object-cover" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-emerald-100 bg-[#fbfdfc] p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-700">Detected gaps</div>
                  <div className="mt-2 text-3xl font-semibold text-[#08110e]">18</div>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-[#fbfdfc] p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-700">Orders queued</div>
                  <div className="mt-2 text-3xl font-semibold text-[#08110e]">42</div>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-[#fbfdfc] p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-700">Risk level</div>
                  <div className="mt-3 h-2 rounded-full bg-zinc-200">
                    <div className="h-2 w-[68%] rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-zinc-100 bg-[#08110e] p-6 text-white">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">Care Gap Workflow</div>
              <div className="mt-5 space-y-4">
                {[
                  "Real-time condition detection from structured and unstructured data.",
                  "Order pre-population for missing consults and workup.",
                  "Impact visibility for response rates, revenue gains, and audit support.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-sm leading-7 text-zinc-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SolutionFeature>

      <SolutionFeature
        eyebrow="Technical Architecture Requirements"
        title="Deploy assistants inside and outside the EHR"
        body="The platform is designed to feel native in Epic or Cerner while also working across independent clinics and web-based systems."
        stat="EHR"
        statLabel="embedding, leadership controls, and analytics in one operational platform."
        points={[
          "EHR embedding via MPages or Smart on FHIR so the experience feels native to the care team.",
          "A Strategic Control Panel for deploying assistants, fine-tuning logic, and aligning with health system goals.",
          "An Insights Suite and EHR-agnostic connectivity for executive monitoring and broader integration coverage.",
        ]}
        reverse
      >
        <div className="rounded-[2rem] border border-emerald-100 bg-[#06110d] p-6 shadow-[0_25px_70px_rgba(6,78,59,0.12)]">
          <div className="rounded-[1.6rem] border border-white/8 bg-[#07100d] p-6 text-white">
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-300">Architecture</div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-300">
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">Embedded EHR workflows</div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">Leadership control panel</div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">Executive insights and connectivity</div>
            </div>
          </div>
        </div>
      </SolutionFeature>
    </section>
  );
}

function HomeSolutionsPreview() {
  const items = [
    {
      title: "Inpatient Capacity",
      copy: "Automate discharge planning from admission, surface barriers sooner, and help teams move patients through the stay with less manual follow-up.",
      image: "/mirror-assets/Inpatient-care.png",
    },
    {
      title: "Surgical Growth",
      copy: "Find OR time faster, predict unused blocks, and direct strategic cases into the openings that support growth and robotics utilization.",
      image: "/mirror-assets/surgical-services-1.png",
    },
    {
      title: "Perioperative Care",
      copy: "Support PAT teams with outreach, document handling, and risk detection so patients are better prepared before surgery day arrives.",
      image: "/mirror-assets/Leadership-1024x900.png",
    },
    {
      title: "Care Gap + Coding",
      copy: "Detect conditions early, pre-populate useful actions, and improve documentation so quality and reimbursement signals are captured cleanly.",
      image: "/mirror-assets/Featured-Img_15-Blog.jpg",
    },
    {
      title: "Architecture",
      copy: "Embed inside the EHR while connecting leadership controls, real-time insights, and broader integrations across systems.",
      image: "/mirror-assets/AdobeStock_321233603-1-1.png",
    },
  ];

  return (
    <section className="bg-[#020504] py-18 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="rounded-[1.5rem] border border-white/8 bg-[#08110e] p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-300">Solutions</div>
            <h3 className="mt-4 max-w-[11ch] font-[family-name:var(--font-display)] text-3xl leading-[0.98] text-white md:text-4xl">
              Five operational solution areas
            </h3>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              The home page now shows the full portfolio horizontally instead of stacking one long column.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {items.map((item, index) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#08110e]"
              >
                <div className="grid h-full gap-0 md:grid-cols-[0.9fr_1.1fr] md:items-stretch">
                  <img src={item.image} alt={item.title} className="min-h-[14rem] w-full object-cover" />
                  <div className="flex flex-col justify-center space-y-3 p-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-300">{item.title}</div>
                    <p className="text-base leading-8 text-zinc-300">{item.copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareAreas() {
  const [active, setActive] = useState(0);
  const slide = careSlides[active];

  return (
    <section id="care-areas" className="bg-[#03100b] py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          label="Care Areas"
          title="Supporting care teams across hospital settings"
          body="Discover why frontline staff, providers, and hospital leaders trust our AI teammates with their most important initiatives."
          theme="dark"
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {careSlides.map((item, index) => (
            <button
              key={item.eyebrow}
              onClick={() => setActive(index)}
              className={`rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition-all ${active === index ? "bg-emerald-400 text-[#04100a]" : "border border-white/12 text-zinc-300 hover:border-emerald-400/50"}`}
            >
              {item.eyebrow}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="rounded-[2rem] border border-white/8 bg-[#07100d] p-8">
              <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-300">{slide.eyebrow}</div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight">{slide.title}</h3>
              <p className="mt-5 text-lg leading-8 text-zinc-300">{slide.body}</p>
              <Link to={routes.contact} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-[2rem] border border-white/8 bg-white/4 p-5">
              <motion.img
                key={slide.image}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                src={slide.image}
                alt={slide.title}
                className="w-full rounded-[1.6rem]"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ClientSpotlight() {
  const [open, setOpen] = useState(false);
  const featurePreview = clientSpotlight.features.slice(0, 2);
  const impactPreview = clientSpotlight.impact.slice(0, 3);

  return (
    <section className="bg-white py-20 font-[family-name:var(--font-display)] md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="overflow-hidden rounded-[2rem] bg-[#3b0a78] text-white shadow-[0_24px_70px_rgba(59,10,120,0.28)]">
          <div className="grid gap-10 p-8 md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="relative">
              <div className="mb-6 flex items-center gap-4">
                <img src="/aspenMedical.png" alt="Aspen Medical" className="h-12 w-auto" />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-200">Client Spotlight</div>
                  <div className="mt-1 text-sm font-medium text-violet-100">{clientSpotlight.address}</div>
                </div>
              </div>
              <h3 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-[0.98] md:text-6xl">
                {clientSpotlight.headline}
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-8 text-violet-100 md:text-lg">
                {clientSpotlight.teaser}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {featurePreview.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm leading-none text-violet-50"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <div className="grid gap-3 sm:grid-cols-2 lg:w-full">
                {impactPreview.map((item) => (
                  <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-4 text-base font-semibold leading-tight text-violet-50">
                    {item}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-[#42e6d0] px-7 py-4 text-base font-semibold text-[#2c0071] transition-colors hover:bg-[#6af0df]"
              >
                Read more
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white p-6 text-[#08110e] shadow-[0_30px_90px_rgba(0,0,0,0.4)] md:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <img src="/aspenMedical.png" alt="Aspen Medical" className="h-12 w-auto" />
                  <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.28em] text-violet-700">Client Spotlight</div>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">{clientSpotlight.address}</div>
                  <h3 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-3xl leading-tight md:text-5xl">
                    {clientSpotlight.headline}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-zinc-200 p-2 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-800"
                  aria-label="Close spotlight"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                <div className="space-y-6">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">Overview</div>
                    <p className="mt-3 text-base leading-8 text-zinc-700">{clientSpotlight.overview}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">The Challenge</div>
                    <p className="mt-3 text-base leading-8 text-zinc-700">{clientSpotlight.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">The Solution</div>
                    <p className="mt-3 text-base leading-8 text-zinc-700">{clientSpotlight.solution}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">Features Used</div>
                    <div className="mt-4 space-y-3">
                      {clientSpotlight.features.map((item) => (
                        <div key={item} className="rounded-[1rem] border border-violet-100 bg-violet-50 px-4 py-3 text-sm leading-7 text-zinc-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[1.5rem] bg-[#f6f0ff] p-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">Proven Impact</div>
                    <div className="mt-4 space-y-3">
                      {clientSpotlight.impact.map((item) => (
                        <div key={item} className="rounded-[1rem] bg-white px-4 py-3 text-base font-semibold leading-tight text-zinc-700 shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-[#08110e] p-6 text-white">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">Voice of the Client</div>
                    <p className="mt-4 text-lg leading-8 text-zinc-100">{clientSpotlight.quote}</p>
                    <div className="mt-5 text-sm font-semibold text-emerald-300">{clientSpotlight.attribution}</div>
                  </div>

                  <div className="rounded-[1.5rem] border border-violet-100 bg-white p-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">Strategic Insights</div>
                    <div className="mt-4 space-y-3">
                      {clientSpotlight.insights.map((item) => (
                        <div key={item} className="rounded-[1rem] bg-zinc-50 px-4 py-3 text-sm leading-7 text-zinc-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ClientSpotlightInline() {
  const [open, setOpen] = useState(false);
  const impactPreview = clientSpotlight.impact.slice(0, 3);

  return (
    <section className="bg-[#fbfbfc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white text-[#0f1720] shadow-[0_20px_50px_rgba(15,23,32,0.08)]">
          <div className="p-8 md:p-10">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <img src="/aspenMedical.png" alt="Aspen Medical" className="h-12 w-auto shrink-0" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.34em] text-violet-700">Client Spotlight</div>
                  <div className="mt-1 text-sm font-medium tracking-[0.18em] text-slate-500">{clientSpotlight.address}</div>
                </div>
              </div>

              <h3 className="max-w-6xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-[#0d1412] md:text-6xl lg:text-[4.35rem]">
                {clientSpotlight.headline}
              </h3>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="max-w-3xl text-lg leading-9 text-slate-700">
                  {clientSpotlight.teaser}
                </p>

                <div className="mt-8 space-y-4">
                  {clientSpotlight.features.slice(0, 3).map((item) => (
                    <div key={item} className="flex items-start gap-3 text-base leading-8 text-slate-700 md:text-lg">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#42e6d0]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <div className="grid gap-3 sm:grid-cols-2 lg:w-full">
                  {impactPreview.map((item) => (
                    <div key={item} className="rounded-[1.25rem] border border-violet-100 bg-[#f6f0ff] px-4 py-5 text-lg font-semibold leading-snug text-[#1b2230] shadow-[0_6px_18px_rgba(109,40,217,0.08)]">
                      {item}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen((current) => !current)}
                  className="inline-flex items-center justify-center rounded-full bg-[#42e6d0] px-7 py-4 text-base font-semibold text-[#2c0071] transition-colors hover:bg-[#6af0df]"
                >
                  {open ? "Read less" : "Read more"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-6 rounded-[2rem] border border-slate-100 bg-white p-6 text-[#0f1720] shadow-[0_20px_50px_rgba(15,23,32,0.08)] md:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.34em] text-violet-700">Client Spotlight</div>
                  <div className="mt-4 text-sm font-medium tracking-[0.18em] text-slate-500">{clientSpotlight.address}</div>
                  <h3 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0d1412] md:text-5xl">
                    {clientSpotlight.headline}
                  </h3>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                <div className="space-y-6">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">Overview</div>
                    <p className="mt-3 text-base leading-9 text-slate-700">{clientSpotlight.overview}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">The Challenge</div>
                    <p className="mt-3 text-base leading-9 text-slate-700">{clientSpotlight.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">The Solution</div>
                    <p className="mt-3 text-base leading-9 text-slate-700">{clientSpotlight.solution}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">Features Used</div>
                    <div className="mt-4 grid gap-3">
                      {clientSpotlight.features.map((item) => (
                        <div key={item} className="rounded-[1rem] border border-violet-100 bg-[#faf7ff] px-4 py-4 text-sm leading-7 text-slate-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[1.5rem] bg-[#f6f0ff] p-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">Proven Impact</div>
                    <div className="mt-4 grid gap-3">
                      {clientSpotlight.impact.map((item) => (
                        <div key={item} className="rounded-[1rem] bg-white px-4 py-4 text-base font-semibold leading-snug text-[#1b2230] shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-[#0f1720] p-6 text-white">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">Voice of the Client</div>
                    <p className="mt-4 text-lg leading-9 text-zinc-100">{clientSpotlight.quote}</p>
                    <div className="mt-5 text-sm font-semibold text-emerald-300">{clientSpotlight.attribution}</div>
                  </div>

                  <div className="rounded-[1.5rem] border border-violet-100 bg-white p-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">Strategic Insights</div>
                    <div className="mt-4 space-y-3">
                      {clientSpotlight.insights.map((item) => (
                        <div key={item} className="rounded-[1rem] bg-zinc-50 px-4 py-3 text-sm leading-7 text-slate-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Explore() {
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
        return;
      }

      if (window.innerWidth >= 768) {
        setCardsPerView(2);
        return;
      }

      setCardsPerView(1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, resources.length - cardsPerView);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 4200);
    return () => window.clearInterval(interval);
  }, [maxIndex]);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  return (
    <section id="explore" className="relative overflow-hidden bg-white py-20 md:py-24">
      <div
        aria-hidden="true"
        className="absolute left-6 top-10 hidden gap-2 md:flex"
      >
        {[48, 72, 58, 84, 42].map((height, barIndex) => (
          <span
            key={barIndex}
            className="w-2 rounded-full bg-[linear-gradient(180deg,#dbeafe,#86efac)]"
            style={{ height }}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute right-10 top-16 hidden gap-2 lg:flex"
      >
        {[60, 38, 74, 52].map((height, barIndex) => (
          <span
            key={barIndex}
            className="w-2 rounded-full bg-[linear-gradient(180deg,#bfdbfe,#6ee7b7)]"
            style={{ height }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          label="Explore"
          title="More insights, updates & results"
          body="Browse the latest thinking, product updates, and operational perspectives shaping Medsyra's approach to healthcare automation."
        />

        <div className="relative mt-10 px-12 md:px-16">
          <button
            onClick={() => setIndex((current) => (current <= 0 ? maxIndex : current - 1))}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-emerald-200 bg-white p-3 text-zinc-600 transition-colors hover:border-emerald-400 hover:text-emerald-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIndex((current) => (current >= maxIndex ? 0 : current + 1))}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-emerald-200 bg-white p-3 text-zinc-600 transition-colors hover:border-emerald-400 hover:text-emerald-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="overflow-hidden">
          <motion.div
            animate={{ x: `calc(-${index} * (100% / ${cardsPerView}))` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex"
          >
            {resources.map((item) => (
              <div key={item.title} className="w-full shrink-0 px-3 first:pl-0 last:pr-0 md:w-1/2 lg:w-1/3">
                <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-emerald-100 bg-[#f6fbf8]">
                  <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                  <div className="flex min-h-[25rem] flex-1 flex-col p-7">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">{item.type}</div>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight text-[#08110e]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-zinc-600">{item.copy}</p>
                    <Link to={routes.contact} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      {item.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setIndex(dotIndex)}
              className={`h-2.5 rounded-full transition-all ${dotIndex === index ? "w-8 bg-emerald-500" : "w-2.5 bg-emerald-200"}`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to={routes.contact} className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 transition-colors hover:border-emerald-400 hover:text-emerald-800">
            View more resources
          </Link>
        </div>
      </div>
    </section>
  );
}

function SecurityBand() {
  const items = [
    {
      icon: Lock,
      title: "Protected data access",
      copy: "Role-aware product experiences support controlled access to operational and patient-adjacent data.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy-conscious workflows",
      copy: "Automation in hospital environments depends on privacy, auditability, and staff trust being built into the workflow.",
    },
    {
      icon: Globe,
      title: "Deployment-ready foundation",
      copy: "Structured for rollout across service lines, operational teams, and broader health system leadership groups.",
    },
  ];

  return (
    <section className="bg-[#04100b] py-20">
      <motion.div {...fadeUp} className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="rounded-[1.75rem] border border-white/8 bg-[#08110e] p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{copy}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError("");

    if (!serviceId || !templateId || !publicKey) {
      setFormState("error");
      setFormError("Contact form is not configured yet. Add the EmailJS Vite environment variables to enable submission.");
      return;
    }

    setFormState("submitting");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          message: formData.message,
        },
        publicKey,
      );
      setFormState("success");
      setFormData({ name: "", email: "", phone: "", organization: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormState("error");
      setFormError("Message could not be sent. Check your EmailJS service, template, public key, and allowed origin settings.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: name === "phone" ? value.replace(/\D/g, "") : value }));
  };

  return (
    <section id="contact" className="bg-[#010302] py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.24),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_24%),linear-gradient(180deg,#08110e_0%,#040907_100%)] p-7 md:p-10">
          <img
            src="/mirror-assets/Frame-90.png"
            alt=""
            className="pointer-events-none absolute -left-6 bottom-6 hidden w-28 opacity-85 md:block"
          />
          <img
            src="/mirror-assets/Frame-89.png"
            alt=""
            className="pointer-events-none absolute -right-6 top-6 hidden w-36 opacity-85 md:block"
          />

          <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div {...fadeUp}>
              <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-300">Let's go</div>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight md:text-5xl">
                World-class healthcare operations are just a conversation away
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-300">
                Discuss patient flow, discharge coordination, surgery readiness, capacity visibility, or administrative burden across your hospital operations.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  [Building2, "Office", "Bhubaneswar, Odisha, India"],
                  [Users, "Consultation", "Demos, workflow reviews, and operational planning conversations."],
                  [TrendingUp, "Focus areas", "Surgery growth, inpatient capacity, throughput, and care operations automation."],
                ].map(([Icon, title, copy]) => (
                  <div key={title as string} className="flex items-start gap-4 rounded-[1.5rem] border border-white/8 bg-white/4 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                      {React.createElement(Icon as typeof Building2, { className: "h-5 w-5" })}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{title as string}</div>
                      <div className="text-sm text-zinc-400">{copy as string}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="rounded-[2rem] border border-white/8 bg-black/20 p-7 md:p-8">
              {formState === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-[#04100a]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl text-white">Message sent</h3>
                  <p className="mt-3 max-w-md text-zinc-300">Thank you for reaching out. We'll get back to you shortly.</p>
                  <button onClick={() => setFormState("idle")} className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formState === "error" && (
                    <div className="rounded-[1.25rem] border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                      {formError || "Something went wrong. Please try again later or email us directly."}
                    </div>
                  )}
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">Full name</span>
                      <input required name="name" type="text" value={formData.name} onChange={handleChange} autoComplete="name" placeholder="Your name" className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition-colors focus:border-emerald-400" />
                    </label>
                    <label className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">Email address</span>
                      <input required name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" placeholder="name@hospital.com" className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition-colors focus:border-emerald-400" />
                    </label>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">Phone number</span>
                      <input name="phone" type="tel" value={formData.phone} onChange={handleChange} inputMode="numeric" pattern="[0-9]*" autoComplete="tel" maxLength={15} placeholder="Contact number" className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition-colors focus:border-emerald-400" />
                    </label>
                    <label className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">Organization</span>
                      <input name="organization" type="text" value={formData.organization} onChange={handleChange} autoComplete="organization" placeholder="Organization name" className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition-colors focus:border-emerald-400" />
                    </label>
                  </div>
                  <label className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">Message</span>
                    <textarea required name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us where your team is losing time or facing operational bottlenecks..." className="w-full resize-none rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition-colors focus:border-emerald-400" />
                  </label>
                  <button disabled={formState === "submitting"} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#02110b] transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70">
                    {formState === "submitting" ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-[#02110b]" /> : <>Schedule a demo <ChevronRight className="h-4 w-4" /></>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#010302] px-5 py-12 text-white md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link to={routes.home} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/12 text-emerald-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="font-[family-name:var(--font-display)] text-2xl">Medsyra</div>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
            AI teammates for hospital operations for care teams that need smoother patient flow, stronger visibility, and faster action.
          </p>
        </div>
        <div className="space-y-2 text-sm text-zinc-400">
          <div>rahul@medsyra.com</div>
          <div>+91 (79) 7841-2095</div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>&copy; 2026 Medsyra. All rights reserved.</span>
            <Link to={routes.privacyPolicy} className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-emerald-300">
              Privacy Policy
            </Link>
            <span>and</span>
            <Link to={routes.termsOfUse} className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-emerald-300">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LegalPage({ title, updated, body }: { title: string; updated: string; body: string }) {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title={title}
        body={`Last updated: ${updated}`}
        accent="#10b981"
      />
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-4xl rounded-[1.5rem] border border-white/8 bg-white/4 p-6 text-sm leading-7 text-zinc-200 md:p-8">
          <pre className="whitespace-pre-wrap font-sans">{body}</pre>
        </div>
      </section>
    </main>
  );
}

const privacyPolicyText = `Last updated: July 2026
This notice describes how Personal Data about you may be used and disclosed and how you can obtain access to this information. Please review it carefully.

INTRODUCTION
We at Medsyra, Inc. value your privacy and are committed to keeping your personal data confidential. We use your data collected on the Medsyra website solely in the context of providing the website and providing all relevant content to website users.

Privacy Policy Applicability
This Privacy Policy applies to personal data that Medsyra collects from Users of the Medsyra Site. The term "Personal Data" includes any information that can be used on its own or with other information in combination to identify or contact one of our Users.

We believe that privacy and transparency about the use of your Personal Data are of utmost importance. Therefore, our privacy practices are intended to comply with all applicable federal and state laws related to privacy. Additionally, in this Privacy Policy, we provide you detailed information about our collection, use, maintenance, and disclosure of your Personal Data. The Privacy Policy explains what kind of information we collect, when and how we might use your Personal Data, how we protect Personal Data, and your rights regarding your Personal Data.

For additional information related to how we use and disclose your Personal Data please contact us at privacy@medsyra.com.

Agreement to Privacy Policy Terms
BY ACCESSING AND/OR USING THE SITE, YOU ARE ACKNOWLEDGING THAT YOU HAVE READ AND AGREE TO THE TERMS OF THIS PRIVACY POLICY. IF YOU DO NOT AGREE, YOU MUST IMMEDIATELY CEASE USING THE SITE.

Privacy Policy Updates
Please note that we occasionally update this Privacy Policy, and it is your responsibility to stay up to date with any amended versions. Any revisions to the Privacy Policy will be posted on the Medsyra Site. Any changes to this Privacy Policy will be effective immediately upon posting a new version of the Privacy Policy on our Site. We will change the "Last Updated" date above and the changes will apply to all Personal Data that we maintain, use, and disclose. If you continue to use the Site following such posting, you are agreeing to those changes.

Personal Data Deletion
If at any point you no longer agree to the use and disclosure of Personal Data, as described in this Privacy Policy, discontinue all further use of the Site and send a deletion request to privacy@medsyra.com.

Questions or Concerns
If you have any questions or concerns after reading this Privacy Policy, please do not hesitate to contact us at privacy@medsyra.com.

COLLECTION AND USE OF PERSONAL DATA
We collect demographic data, support data, and technology data from users. We use this information to provide the Site, fulfill our obligations under the Terms of Use, communicate with you about our services, maintain and improve our operations, and protect our rights and the security of the Site.

Medsyra may share Personal Data with business partners and vendors, advisors, third parties in connection with business transfers, and government or law enforcement authorities where required by law.

USER RIGHTS
As a user of Medsyra's Site, you have certain rights relating to your Personal Data. These rights may include the right to access, erase, restrict, object, transfer, receive, and rectify personal data, subject to local privacy laws.

PROTECTION OF PERSONAL DATA
Medsyra understands the importance of data confidentiality and security. We use a combination of reasonable physical, technical, and administrative security controls to maintain the security and integrity of your Personal Data.

ADVERTISING, MARKETING, AND TRACKING
Medsyra may use your Personal Data to contact you with newsletters, marketing, or promotion materials and other information that may be of interest to you. You may opt out of receiving marketing materials at any time.

CONTACT US
If you have questions regarding this Privacy Policy, you may contact us at privacy@medsyra.com.`;

const termsOfUseText = `Terms of Use
Effective: August 2024
Last Updated: August 2024

These Terms are a legal contract between you and Medsyra. Medsyra is the creator of the Site and provides information about the company and its services through the Site. These Terms govern your use of the Site and apply to the individuals accessing the Site and any organizations for whom they act as agents or employees.

BY USING THE SITE, YOU ARE CONSENTING TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE THE SITE.

ARBITRATION NOTICE: except for certain disputes described in the dispute resolution section, you agree that disputes between you and Medsyra will be resolved by binding, individual arbitration and you waive your right to participate in a class action lawsuit or class-wide arbitration.

WHO OWNS THE SITE AND PERSONAL DATA?
Medsyra and its licensors own the Site, including all content and functionality you access through the Site. Subject to your compliance with these Terms, Medsyra grants you a limited, revocable license to use the Site.

WHAT ARE YOU NOT ALLOWED TO DO WITH THE SITE?
You may use the Site only for lawful purposes and in accordance with these Terms. You shall not provide false information, harvest information from the Site, impair the Site, violate applicable law, or attempt to reverse-engineer the Site.

THIRD-PARTY SITES AND SERVICES
If you access third-party services through the Site, you may be subject to additional terms and privacy policies. Medsyra is not responsible for those third-party services.

WARRANTY DISCLAIMERS AND LIMITATION OF LIABILITY
The Site is provided "as is" without warranty of any kind. To the maximum extent permitted by law, Medsyra will not be liable for incidental, special, exemplary, or consequential damages arising out of your use of the Site.

INDEMNIFICATION
You agree to indemnify, defend, and hold harmless Medsyra and its representatives from any liability, loss, claim, suit, damage, and expense arising out of or in any way connected with your access to or use of the Site, your violation of these Terms, or any negligent or wrongful conduct by you.

GENERAL CONTRACT TERMS
These Terms, the Privacy Policy, and any other terms incorporated by reference constitute the entire agreement between Medsyra and you regarding the Site. The Terms are governed by the laws of the State of Delaware.

Contacting Medsyra.
Please feel free to contact us if you have any questions about these Terms and/or any other documents referenced in these Terms. You may contact us at privacy@medsyra.com.`;

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

function SiteLayout() {
  return (
    <div className="min-h-screen bg-[#030806] text-white selection:bg-emerald-400 selection:text-[#04100a]">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
};

function PageHero({ eyebrow, title, body, accent }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#020705] pt-30 md:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_28%),linear-gradient(180deg,#04110b_0%,#020705_100%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pb-20">
        <div className="max-w-4xl rounded-[2.2rem] border border-white/8 bg-white/4 p-8 backdrop-blur-sm md:p-10">
          <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-300">{eyebrow}</div>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            {body}
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-black/20 px-4 py-2 text-sm text-zinc-200">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
            Medsyra route experience
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <ImpactSection />
      <SolutionsIntro />
      <HomeSolutionsPreview />
      <CareAreas />
      <ClientSpotlightInline />
      <Explore />
      <SecurityBand />
      <ContactForm />
    </main>
  );
}

function SolutionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Solutions"
        title="Operational AI solutions built around hospital outcomes"
        body="Explore the Medsyra product portfolio for surgical growth, perioperative coordination, and inpatient capacity management."
        accent="#10b981"
      />
      <SolutionsIntro />
      <Solutions />
      <SecurityBand />
    </main>
  );
}

function CareAreasPage() {
  return (
    <main>
      <PageHero
        eyebrow="Care Areas"
        title="Designed for the teams carrying care delivery forward"
        body="See how Medsyra supports surgical services, inpatient operations, and hospital leadership with workflow-aware automation."
        accent="#14b8a6"
      />
      <CareAreas />
      <Explore />
    </main>
  );
}

function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Start the operational conversation"
        body="Connect with Medsyra to review bottlenecks, discuss deployment priorities, and plan the right automation roadmap for your team."
        accent="#34d399"
      />
      <ContactForm />
    </main>
  );
}

function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" updated="July 2026" body={privacyPolicyText} />;
}

function TermsOfUsePage() {
  return <LegalPage title="Terms of Use" updated="August 2024" body={termsOfUseText} />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.solutions} element={<SolutionsPage />} />
        <Route path={routes.careAreas} element={<CareAreasPage />} />
        <Route path={routes.contact} element={<ContactPage />} />
        <Route path={routes.privacyPolicy} element={<PrivacyPolicyPage />} />
        <Route path={routes.termsOfUse} element={<TermsOfUsePage />} />
      </Route>
    </Routes>
  );
}
