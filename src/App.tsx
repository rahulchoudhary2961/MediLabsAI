import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link, NavLink, Outlet, Route, Routes, useLocation } from "react-router-dom";
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
    title: "Medsyra earns 92.5 in KLAS ratings",
    copy:
      "Delivering real results in capacity management, Medsyra continues to earn strong customer ratings and industry recognition for transforming hospital operations.",
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

const solutionHighlights = [
  {
    label: "Surgical Growth",
    value: "36%",
    description: "Robotics growth unlocked with strategy tied directly to OR execution.",
  },
  {
    label: "Perioperative Coordination",
    value: "40%",
    description: "Fewer surgery cancellations through earlier patient readiness and admin follow-through.",
  },
  {
    label: "Inpatient Capacity",
    value: "15-30%",
    description: "Excess-day reduction driven by discharge planning that starts sooner and moves faster.",
  },
];


const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: routes.home },
    { label: "Solutions", href: routes.solutions },
    { label: "Care Areas", href: routes.careAreas },
    { label: "Contact", href: routes.contact },
  ];

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
            <NavLink key={link.label} to={link.href} className={({ isActive }) => `text-sm font-medium transition-colors hover:text-emerald-300 ${isActive ? "text-emerald-300" : "text-zinc-300"}`}>
              {link.label}
            </NavLink>
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
                <NavLink key={link.label} to={link.href} onClick={() => setOpen(false)} className="text-base font-medium text-zinc-200">
                  {link.label}
                </NavLink>
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
    <section className="relative overflow-hidden bg-[#030806] pt-30 md:pt-36">
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
      <motion.div {...fadeUp} className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-[1.08rem] font-bold uppercase tracking-[0.22em] text-emerald-600">Solutions</div>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#08110e] md:text-6xl">
          Secure your margins to achieve your mission of delivering excellent care
        </h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#2e2944]">
          Built to empower your care teams, Medsyra does more than recommend tasks. It takes immediate action on below-license administrative work so staff can focus on delivering the very best patient care.
        </p>
      </motion.div>
    </section>
  );
}

function SurgicalGrowthVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStep((current) => (current + 1) % 6);
    }, 850);

    return () => window.clearInterval(interval);
  }, []);

  const rows = [
    "Robotic Optimization",
    "Site of Care Optimization",
    "Strategic Service Line Growth",
  ];
  const activeRow = Math.floor(step / 2);
  const enabled = rows.map((_, index) => step >= index * 2 + 1);
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
      className="relative rounded-[2rem] bg-white p-8 shadow-[0_25px_70px_rgba(6,78,59,0.12)]"
    >
      <div className="rounded-[1.4rem] border border-emerald-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
        <div className="rounded-t-[1.4rem] bg-[linear-gradient(135deg,#064e3b,#10b981_56%,#047857)] px-6 py-5 text-2xl font-semibold text-white">
          Medsyra Strategic Control Panel
        </div>
        <div className="space-y-8 px-6 py-6">
          {rows.map((label, index) => (
            <motion.div
              key={label}
              animate={{ opacity: enabled[index] ? 1 : 0.58, x: activeRow === index ? 0 : -2 }}
              transition={{ duration: 0.22 }}
              className="relative flex items-center gap-4 text-xl text-emerald-700"
            >
              <div className={`relative h-6 w-12 rounded-full transition-colors ${enabled[index] ? "bg-[#14b8a6]" : "bg-zinc-200"}`}>
                <motion.div
                  animate={{ x: enabled[index] ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 360, damping: 22 }}
                  className="absolute top-1 h-4 w-4 rounded-full bg-white shadow"
                />
              </div>
              <span className="font-medium">{label}</span>
              {activeRow === index && step % 2 === 1 ? (
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
      <motion.div
        animate={{
          x: cursorPoints[step].x,
          y: cursorPoints[step].y,
          scale: step % 2 === 1 ? 0.94 : 1,
        }}
        transition={{ duration: 0.36, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[4.55rem] top-[9.05rem] z-10 text-zinc-900"
      >
        <svg width="12" height="15" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2.5V25.5L9.6 18.8L14.2 29L19.1 27L14.4 16.9L23 16L3 2.5Z" fill="white" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function PATProgramVisual() {
  const [messageStep, setMessageStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageStep((current) => (current + 1) % 3);
    }, 1800);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative rounded-[2rem] bg-[#eef9f5] p-6 shadow-[0_25px_70px_rgba(6,78,59,0.12)]"
    >
      <div className="relative overflow-hidden rounded-[1.7rem] border border-emerald-100 bg-white">
        <div className="absolute inset-x-0 top-0 h-5 bg-[#065f46]" />
        <div className="grid min-h-[34rem] grid-cols-[8rem_1.15fr_1fr] gap-0 pt-5">
          <div className="bg-[#064e3b] text-white">
            <div className="px-6 py-4 text-3xl font-semibold">Medsyra</div>
            <div className="space-y-1 px-0 py-2 text-sm">
              {["Today", "Patients", "Messages", "Document Requests"].map((item, index) => (
                <div key={item} className={`px-6 py-3 ${index === 0 ? "bg-[linear-gradient(90deg,#10b981,#047857)]" : ""}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="border-r border-zinc-200 bg-white">
            <div className="px-5 py-5">
              <div className="text-xs text-zinc-500">Danny Miller</div>
              <div className="mt-1 text-4xl font-semibold text-[#065f46]">PAT Call</div>
              <div className="mt-4 inline-flex rounded-lg border border-zinc-400 px-3 py-1.5 text-xs text-zinc-600">Transcript</div>
            </div>
            <div className="border-t border-zinc-100 px-5 py-4">
              <div className="text-[2rem] font-semibold text-zinc-800">Transcript</div>
              <div className="mt-5 space-y-4">
                {Array.from({ length: 6 }).map((_, index) => {
                  const isYou = index % 2 === 1;
                  return (
                    <div key={index} className="space-y-2">
                      <div className={`text-sm font-semibold ${isYou ? "text-emerald-500" : "text-zinc-600"}`}>{isYou ? "You" : "Patient"}</div>
                      <div className={`space-y-2 ${isYou ? "pl-6" : ""}`}>
                        <div className="h-1.5 w-full rounded-full bg-zinc-200" />
                        <div className="h-1.5 w-[86%] rounded-full bg-zinc-200" />
                        <div className="h-1.5 w-[74%] rounded-full bg-zinc-200" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative bg-[#fbfaf8]">
            <div className="grid h-full grid-cols-[1fr_13rem] gap-4 px-4 py-14">
              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 text-xl font-semibold text-zinc-700">Interview Highlights</div>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-zinc-100 p-3">
                      <div className="text-sm font-semibold text-emerald-600">Ask about allergies</div>
                      <div className="mt-2 h-1.5 w-24 rounded-full bg-zinc-200" />
                    </div>
                    <div className="rounded-xl border border-zinc-100 p-3">
                      <div className="text-sm font-semibold text-emerald-600">Danny drinks alcohol</div>
                      <div className="mt-2 h-1.5 w-20 rounded-full bg-zinc-200" />
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 text-xl font-semibold text-zinc-700">Medication Instructions</div>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="rounded-xl border border-zinc-100 p-3">
                        <div className="h-1.5 w-28 rounded-full bg-zinc-200" />
                        <div className="mt-2 h-1.5 w-20 rounded-full bg-zinc-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="mx-auto h-[21rem] w-[13rem] rounded-[1.2rem] border-[6px] border-zinc-300 bg-white p-3 shadow-sm">
                  <div className="text-[11px] font-semibold text-zinc-600">Request documents</div>
                  <div className="mt-3 space-y-2">
                    {["Lisa Brown", "Dr. Perry Smith", "Abigail Health", "(555)-234-2233", "(555)-888-5641"].map((item) => (
                      <div key={item} className="rounded-md border border-zinc-200 px-2 py-2 text-[10px] text-zinc-500">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-[10px] font-semibold text-zinc-500">Documents Needed</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["Hospital Records", "Imaging", "PCP Awards", "Cardiac", "Pulmonary and PFTs", "History & Physical", "Discharge Summary", "ER Record", "OP Reports"].map((tag, index) => (
                      <div key={tag} className={`rounded px-1.5 py-1 text-[8px] ${index === 0 ? "bg-emerald-400 text-[#04100a]" : "bg-zinc-100 text-zinc-600"}`}>
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <div className="rounded-md bg-[#047857] px-3 py-2 text-[10px] font-semibold text-white">Preview</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute left-[32%] top-8 z-20 w-[15.5rem] overflow-hidden rounded-[2.1rem] border-[5px] border-[#10b981] bg-white shadow-[0_18px_50px_rgba(6,78,59,0.18)]"
            >
              <div className="rounded-[1.7rem] bg-white">
                <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3d8c8] text-xs font-semibold text-[#7c2d12]">Q</div>
                    <div>
                      <div className="text-[11px] font-medium text-zinc-700">Quin</div>
                      <div className="text-[10px] text-zinc-500">Memorial Health</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    <div className="h-3 w-5 rounded-full border border-sky-400" />
                  </div>
                </div>
                <div className="space-y-4 px-4 pb-22 pt-4 text-sm leading-7 text-zinc-700">
                  <div className="max-w-[12.75rem] rounded-[1rem] bg-zinc-100 px-4 py-3">
                    Hi Danny, I'm Quin, the digital assistant from Medsyra helping your nurses prepare for your upcoming surgery.
                  </div>
                  <motion.div
                    key={messageStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="ml-auto max-w-[11rem] rounded-[1rem] bg-emerald-50 px-4 py-3 text-[#047857]"
                  >
                    {[
                      "Tomorrow morning works best for me.",
                      "Can you text the medication instructions too?",
                      "I may need to reschedule if my ride changes.",
                    ][messageStep]}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
              transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
              className="absolute right-5 top-[10.6rem] z-30 w-[11.5rem] rounded-[1.2rem] border border-[#047857] bg-white shadow-[0_12px_30px_rgba(6,78,59,0.18)]"
            >
              <div className="rounded-t-[1.2rem] bg-[#065f46] px-4 py-3 text-sm font-semibold text-white">Document Requests</div>
              <div className="space-y-4 p-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0ea5a8] text-white">✓</div>
                    <div className="flex-1 space-y-2">
                      <div className="h-1.5 w-full rounded-full bg-zinc-200" />
                      <div className="h-1.5 w-[70%] rounded-full bg-zinc-200" />
                    </div>
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

function InpatientCapacityVisual() {
  const [activeBar, setActiveBar] = useState(3);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveBar((current) => (current + 1) % 10);
    }, 900);
    return () => window.clearInterval(interval);
  }, []);

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
      <div className={`mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:items-center ${reverse ? "lg:grid-cols-[1.18fr_0.82fr]" : "lg:grid-cols-[0.82fr_1.18fr]"}`}>
        <motion.div {...fadeUp} className={reverse ? "lg:order-2" : ""}>
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            {eyebrow}
          </div>
          <h2 className="mt-6 font-[family-name:var(--font-display)] text-[3.5rem] leading-[1.02] tracking-[-0.04em] text-[#08110e] md:text-[4.4rem]">{title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#2e2944]">{body}</p>
          <div className="mt-8 rounded-[1.6rem] border border-emerald-100 bg-[#f6fbf8] p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-700">Proven impact</div>
            <div className="mt-3 flex items-end gap-3">
              <div className="shrink-0 whitespace-nowrap font-[family-name:var(--font-display)] text-5xl leading-none text-[#08110e]">{stat}</div>
              <div className="max-w-[16rem] pb-1 text-sm leading-6 text-zinc-600">{statLabel}</div>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3 text-[#17342b]">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-base leading-7">{point}</p>
              </div>
            ))}
          </div>
          <Link to={routes.contact} className="mt-10 inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10b981,#059669_55%,#047857)] px-8 py-5 text-lg font-semibold text-white shadow-[0_20px_50px_rgba(16,185,129,0.24)] transition-transform duration-300 hover:-translate-y-0.5">
            Learn more
          </Link>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className={reverse ? "lg:order-1" : ""}>
          {children ?? (
            <div className="rounded-[2rem] border border-emerald-100 bg-[#f5faf7] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
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
      <div className="bg-white pb-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:px-8 lg:grid-cols-3">
          {solutionHighlights.map((item) => (
            <motion.div
              key={item.label}
              {...fadeUp}
              className="rounded-[1.75rem] border border-emerald-100 bg-[linear-gradient(180deg,#fbfffd_0%,#f2fbf6_100%)] p-6 shadow-[0_16px_40px_rgba(6,78,59,0.08)]"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-700">{item.label}</div>
              <div className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none text-[#08110e]">{item.value}</div>
              <p className="mt-4 text-sm leading-7 text-zinc-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <SolutionFeature
        eyebrow="Surgical Growth"
        title="Power strategic surgical growth"
        body="So much more than just a scheduling tool, our Surgical Growth Solution harmonizes your growth strategy to your day-to-day operations, helping fill ORs with the cases that matter most."
        stat="36%"
        statLabel="robotics growth supported through better strategic case placement."
        points={[
          "Match surgeon access, site-of-care rules, and block utilization to the growth opportunities that matter most.",
          "Surface underused capacity fast enough for service-line leaders to act before demand slips away.",
          "Turn strategic growth plans into operational workflows instead of leaving them trapped in reporting decks.",
        ]}
      >
        <SurgicalGrowthVisual />
      </SolutionFeature>

      <SolutionFeature
        eyebrow="Perioperative Care Coordination"
        title="Supercharge your PAT program"
        body="Powered by our AI Operational Assistants, our Perioperative Care Coordination Solution gives every pre-admission testing team member their own admin who can effortlessly complete administrative tasks to optimize more patients for surgery and reduce surgery cancellations by up to 40%."
        stat="40%"
        statLabel="fewer surgery cancellations when readiness work is completed earlier."
        points={[
          "Automate patient outreach, prep reminders, and documentation follow-up without adding inbox work for nurses.",
          "Identify missing labs, records, and readiness gaps before they become day-of-surgery surprises.",
          "Keep PAT teams focused on clinical judgment while AI handles repetitive coordination work.",
        ]}
        reverse
      >
        <PATProgramVisual />
      </SolutionFeature>

      <SolutionFeature
        eyebrow="Inpatient Capacity"
        title="Reduce excess days"
        body="Our Inpatient Capacity Solution enables early, accurate discharge planning without adding burden to care teams, helping reduce LOS, increase capacity, and improve patient care."
        stat="15-30%"
        statLabel="excess-day reduction through earlier, better-coordinated discharge planning."
        points={[
          "Create a clearer daily plan for barriers, ownership, and discharge timing across units.",
          "Improve visibility into which patients can move today and which blockers need intervention first.",
          "Open capacity faster by coordinating throughput decisions before delays compound across the hospital.",
        ]}
      >
        <InpatientCapacityVisual />
      </SolutionFeature>
    </section>
  );
}

function CareAreas() {
  const [active, setActive] = useState(0);
  const slide = careSlides[active];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % careSlides.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="care-areas" className="bg-[#03100b] py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="max-w-4xl">
          <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-300">Care areas</div>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight md:text-6xl">
            Supporting care teams across hospital settings
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Discover why frontline staff, providers, and hospital leaders trust our AI teammates with their most important initiatives.
          </p>
        </motion.div>

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
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute left-6 top-10 hidden gap-2 md:flex"
      >
        {[48, 72, 58, 84, 42].map((height, barIndex) => (
          <span
            key={barIndex}
            className="w-2 rounded-full bg-[linear-gradient(180deg,#dbeafe,#86efac)]"
            style={{ height }}
          />
        ))}
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 10, 0], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 5.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
        className="absolute right-10 top-16 hidden gap-2 lg:flex"
      >
        {[60, 38, 74, 52].map((height, barIndex) => (
          <span
            key={barIndex}
            className="w-2 rounded-full bg-[linear-gradient(180deg,#bfdbfe,#6ee7b7)]"
            style={{ height }}
          />
        ))}
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp}>
          <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-600">Explore</div>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#08110e] md:text-5xl">
            More insights, updates & results
          </h2>
        </motion.div>

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
                <article className="h-full overflow-hidden rounded-[2rem] border border-emerald-100 bg-[#f6fbf8]">
                  <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                  <div className="p-7">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">{item.type}</div>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight text-[#08110e]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-zinc-600">{item.copy}</p>
                    <Link to={routes.contact} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
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
          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            src="/mirror-assets/Frame-90.png"
            alt=""
            className="pointer-events-none absolute -left-6 bottom-6 hidden w-28 opacity-85 md:block"
          />
          <motion.img
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
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
            Hospital operations software for care teams that need smoother patient flow, stronger visibility, and faster action.
          </p>
        </div>
        <div className="space-y-2 text-sm text-zinc-400">
          <div>rahul@Medsyra.com</div>
          <div>+91 (79) 7841-2095</div>
          <div>&copy; 2026 Medsyra. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

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

function HomePage() {
  return (
    <main>
      <Hero />
      <ImpactSection />
      <SolutionsIntro />
      <Solutions />
      <CareAreas />
      <Explore />
      <SecurityBand />
      <ContactForm />
    </main>
  );
}

function SolutionsPage() {
  return (
    <main className="pt-30 md:pt-36">
      <SolutionsIntro />
      <Solutions />
      <SecurityBand />
    </main>
  );
}

function CareAreasPage() {
  return (
    <main className="pt-30 md:pt-36">
      <CareAreas />
      <Explore />
    </main>
  );
}

function ContactPage() {
  return (
    <main className="pt-30 md:pt-36">
      <ContactForm />
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.solutions} element={<SolutionsPage />} />
        <Route path={routes.careAreas} element={<CareAreasPage />} />
        <Route path={routes.contact} element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
