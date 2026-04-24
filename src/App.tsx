/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Activity,
  ArrowRight,
  BellRing,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
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
import healthcareWorkingImages from "../src/assets/working-doctor.jpg";
import hospitalImage from "../src/assets/national-cancer-institute-hospital.jpg";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const productCards = [
  {
    name: "MedSyra",
    label: "Care Operations Platform",
    description:
      "Runs appointments, billing, records, follow-ups, and daily operational workflows in one connected system.",
    highlights: [
      "Appointments, billing, and reminders",
      "Medical records and operational dashboards",
      "Built for small to mid-sized clinics",
    ],
    icon: <ClipboardList className="w-6 h-6" />,
  },
  {
    name: "MediScope",
    label: "AI Operational Assistant",
    description:
      "Turns operational signals into a short, prioritized action list so teams know what needs attention next.",
    highlights: [
      "Missed follow-up prompts",
      "Inventory expiry and timing alerts",
      "Action-first clinic recommendations",
    ],
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    name: "ClinicIQ",
    label: "Operational Intelligence and Monitoring",
    description:
      "Surfaces unusual drops and spikes in patient flow, revenue, and medicine movement before teams have to dig through reports.",
    highlights: [
      "Daily and weekly trend visibility",
      "Automatic anomaly detection",
      "Critical operational alerts",
    ],
    icon: <BellRing className="w-6 h-6" />,
  },
];

const impactPoints = [
  "Reduce manual coordination across daily healthcare workflows",
  "Surface follow-up gaps, delays, and operational risk earlier",
  "Help frontline teams spend more time on patient-facing work",
  "Give leaders clearer visibility into performance and bottlenecks",
];

const platformPillars = [
  {
    title: "Built for Daily Healthcare Operations",
    desc: "The platform is designed for real front-desk, billing, pharmacy, and management work, not just presentation dashboards.",
    icon: <Stethoscope className="w-6 h-6" />,
  },
  {
    title: "Practical Workflow Coverage",
    desc: "Appointments, records, follow-ups, stock awareness, and operational alerts are covered in a way teams can actually use every day.",
    icon: <Activity className="w-6 h-6" />,
  },
  {
    title: "Action Over Reports",
    desc: "Instead of making teams search through reports, the system helps them act faster on follow-ups, exceptions, and workflow bottlenecks.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: "Secure by Design",
    desc: "Role-based access, cloud-ready deployment, and privacy-conscious workflows support clinics, pharmacies, and hospitals handling sensitive data.",
    icon: <Lock className="w-6 h-6" />,
  },
];

const useCases = [
  "Clinics managing appointments, billing, patient records, and follow-ups",
  "Pharmacies tracking medicine movement, expiry risk, and daily operations",
  "Hospitals needing clearer operational visibility across teams and branches",
  "Healthcare businesses replacing spreadsheets, registers, and manual follow-up work",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Platform", href: "#platform" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-800 bg-zinc-950/90 py-3 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            MediLabs<span className="text-emerald-500">AI</span>
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-500"
          >
            Book a Demo
          </a>
        </div>

        <button className="text-zinc-400 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-zinc-800 bg-zinc-900 md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-zinc-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-center font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-zinc-950 pb-20 pt-32 md:pb-32 md:pt-48">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-emerald-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-block rounded-full border border-emerald-800/50 bg-emerald-950/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              AI Operations Software for Healthcare Teams
            </span>
            <h1 className="mb-8 text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
              AI teammates for
              <span className="block text-emerald-500">
                clinics, pharmacies, and hospitals.
              </span>
            </h1>
            <p className="mb-10 max-w-3xl text-xl leading-relaxed text-zinc-400">
              MediLabsAI helps healthcare organizations automate repetitive
              operational work, surface issues earlier, and keep frontline teams
              focused on patients instead of manual coordination.
            </p>

            <div className="mb-12 flex flex-col gap-4 sm:flex-row">
              <a
                href="#products"
                className="group flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-900/30 transition-all hover:bg-emerald-500"
              >
                Explore the Products
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-zinc-500"
              >
                Schedule a Consultation
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {productCards.map((product) => (
                <div
                  key={product.name}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-500">
                    {product.icon}
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    {product.name}
                  </div>
                  <div className="mt-2 text-sm text-zinc-300">{product.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {impactPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-300"
                >
                  {point}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="border-y border-zinc-900 bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Built for healthcare teams that need to
              <br />
              <span className="text-emerald-500">
                reduce admin burden and act faster
              </span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-zinc-400">
              Healthcare organizations lose time and money when appointments,
              billing, stock movement, follow-ups, and daily performance are
              managed across paper registers, spreadsheets, and disconnected
              tools. MediLabsAI brings those workflows into focused products
              designed to automate coordination and improve operational clarity.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-zinc-400">
              Whether you run a clinic, a pharmacy operation, or a hospital team,
              the goal stays the same: reduce missed work, improve visibility,
              respond early to issues, and help staff work at the top of their
              role instead of chasing scattered information.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-1 text-2xl font-bold text-emerald-500">Less Manual Work</div>
                <div className="text-sm text-zinc-500">
                  Reduce repetitive coordination across appointments, billing, and follow-ups.
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-1 text-2xl font-bold text-emerald-500">Earlier Intervention</div>
                <div className="text-sm text-zinc-500">
                  Spot issues earlier and act before they affect patients or revenue.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
              <img
                src={healthcareWorkingImages}
                alt="Healthcare operations team"
                className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-zinc-700 bg-zinc-900/80 p-6 backdrop-blur-md">
                <div className="mb-3 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/20">
                    <ShieldCheck className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="font-bold text-white">Built for Frontline Workflows</div>
                </div>
                <p className="text-sm text-zinc-400">
                  Designed for teams handling patient flow, medicine movement,
                  billing pressure, follow-ups, and everyday operational risk.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  return (
    <section id="products" className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Solutions built around real operational bottlenecks
          </h2>
          <p className="text-lg text-zinc-400">
            Each solution is designed to reduce admin burden, improve visibility,
            and help healthcare teams take action faster.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {productCards.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-all hover:border-emerald-500/50"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-500">
                {product.icon}
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-emerald-500">
                {product.name}
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">{product.label}</h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                {product.description}
              </p>
              <div className="border-t border-zinc-800 pt-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Key Points
                </div>
                <ul className="space-y-3">
                  {product.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Platform = () => {
  return (
    <section id="platform" className="bg-zinc-900/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900">
          <div className="grid items-center lg:grid-cols-2">
            <div className="p-8 md:p-16">
              <span className="mb-6 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-500">
                From Insight to Action
              </span>
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Go beyond dashboards and orchestrate daily operations
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-zinc-400">
                MedSyra helps teams run core workflows, MediScope highlights what
                needs attention next, and ClinicIQ catches unusual changes in
                operational numbers early. Together they help healthcare teams
                move from fragmented reporting to a more responsive system of action.
              </p>

              <ul className="mb-10 space-y-4">
                {[
                  "Centralize appointments, billing, records, and follow-ups",
                  "Give staff prioritized action prompts instead of passive reports",
                  "Detect unusual drops and spikes before they become larger problems",
                  "Support clinics, pharmacies, and hospitals with one connected operating layer",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="flex w-fit items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-zinc-950 transition-all hover:bg-emerald-500 hover:text-white"
              >
                Request a Demo
                <ChevronRight className="h-5 w-5" />
              </a>
            </div>

            <div className="relative min-h-[400px] h-full bg-zinc-800">
              <img
                src={hospitalImage}
                alt="Healthcare platform overview"
                className="absolute inset-0 h-full w-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 hidden bg-gradient-to-r from-zinc-900 to-transparent lg:block"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                      Healthcare Operations Layer
                    </span>
                  </div>
                  <div className="space-y-4">
                    {[
                      ["MedSyra", "Core workflow management"],
                      ["MediScope", "Priority-based action guidance"],
                      ["ClinicIQ", "Operational trend monitoring"],
                    ].map(([name, desc]) => (
                      <div
                        key={name}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4"
                      >
                        <div className="text-sm font-semibold text-white">{name}</div>
                        <div className="mt-1 text-xs text-zinc-500">{desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-6">
                    <span className="text-xs font-mono text-zinc-500">Less admin burden</span>
                    <span className="text-xs font-mono text-zinc-500">More actionability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Built for healthcare leaders under operational pressure
            </h2>
            <p className="mb-8 text-lg text-zinc-400">
              Healthcare operations break down when teams rely on disconnected
              tools, delayed reports, and manual tracking. This approach focuses
              on day-to-day usefulness, not just software features.
            </p>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-600/10 p-6">
              <p className="font-medium italic text-emerald-400">
                "Reduce the busywork, surface the right issues, and help teams
                stay focused on care delivery."
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
            {platformPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <div className="mb-4 text-emerald-500">{pillar.icon}</div>
                <h3 className="mb-3 text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  return (
    <section className="border-y border-zinc-900 bg-zinc-900/20 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Who this stack is for</h2>
          <p className="text-zinc-400">
            Built for healthcare organizations that need fewer delays, less manual chasing, and more operational control.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center transition-colors hover:bg-zinc-800"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-500">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Security = () => {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
              Secure, reliable, and designed for healthcare environments
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-500">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-white">Protected data access</h3>
                  <p className="text-sm text-zinc-400">
                    Healthcare teams still need role-aware access and disciplined handling of operational and patient information.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-500">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-white">Privacy-conscious workflows</h3>
                  <p className="text-sm text-zinc-400">
                    Operational automation only works when privacy, auditability, and staff trust are built into the workflow.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-500">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-white">Deployment-ready foundation</h3>
                  <p className="text-sm text-zinc-400">
                    The platform is structured for practical rollout in clinics, pharmacies, and larger healthcare operations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 p-12">
            <div className="absolute right-0 top-0 p-8 opacity-10">
              <ShieldCheck className="h-64 w-64 text-emerald-500" />
            </div>
            <div className="relative z-10">
              <h3 className="mb-6 text-2xl font-bold text-white">Operational Trust Layer</h3>
              <p className="mb-8 leading-relaxed text-zinc-400">
                Clinics, pharmacies, and hospitals need software they can trust
                with everyday operations. The platform is built to support
                controlled access, cleaner workflows, and reliable visibility.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-mono text-zinc-400">
                  MedSyra: workflow control
                </span>
                <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-mono text-zinc-400">
                  MediScope: action guidance
                </span>
                <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-mono text-zinc-400">
                  ClinicIQ: monitoring
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "") : value;

    setFormData({
      ...formData,
      [name]: nextValue,
    });
  };

  return (
    <section id="contact" className="border-t border-zinc-900 bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Explore what MediLabsAI can automate for your team
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-zinc-400">
              Use the form if you want to improve appointment handling, billing,
              follow-ups, stock visibility, or operational monitoring for your
              clinic, pharmacy, hospital, or healthcare business.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-500">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-white">Office</div>
                  <div className="text-sm text-zinc-500">Bhubaneswar, Odisha, India</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-500">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-white">Consultation</div>
                  <div className="text-sm text-zinc-500">Available for demos, onboarding discussions, and workflow reviews</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 md:p-10">
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Message Sent</h3>
                <p className="text-zinc-400">
                  Thank you for reaching out. We&apos;ll get back to you shortly.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 font-bold text-emerald-500 hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formState === "error" && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                    {formError || "Something went wrong. Please try again later or email us directly."}
                  </div>
                )}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Full Name
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Email Address
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="Email Address"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="tel"
                      maxLength={15}
                      placeholder="Your Contact Number"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Organization
                    </label>
                    <input
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      autoComplete="organization"
                      placeholder="Organization Name"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us where your team is losing time or facing operational bottlenecks..."
                    className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <button
                  disabled={formState === "submitting"}
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 font-bold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-zinc-800"
                >
                  {formState === "submitting" ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  ) : (
                    <>
                      Send Message
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-emerald-600 py-24">
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
        <Activity className="h-full w-full text-white" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl">
          Put AI to work across healthcare operations
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl text-emerald-100">
          Reduce admin burden, improve visibility, and give your teams a more
          actionable operating system across clinics, pharmacies, and hospitals.
        </p>
        <a
          href="#contact"
          className="rounded-full bg-white px-10 py-5 text-xl font-bold text-emerald-600 shadow-2xl transition-all hover:bg-zinc-950 hover:text-white"
        >
          Schedule a Consultation
        </a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                MediLabs<span className="text-emerald-500">AI</span>
              </span>
            </div>
            <p className="mb-8 max-w-sm text-zinc-500">
              Healthcare software for clinics, pharmacies, hospitals, and care
              teams that need smoother daily operations.
            </p>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:text-emerald-500">
                <Globe className="h-5 w-5" />
              </div>
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:text-emerald-500">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-6 font-bold text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-zinc-500 transition-colors hover:text-emerald-500">
                  About
                </a>
              </li>
              <li>
                <a href="#products" className="text-zinc-500 transition-colors hover:text-emerald-500">
                  Products
                </a>
              </li>
              <li>
                <a href="#platform" className="text-zinc-500 transition-colors hover:text-emerald-500">
                  Platform
                </a>
              </li>
              <li>
                <a href="#contact" className="text-zinc-500 transition-colors hover:text-emerald-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 font-bold text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="text-zinc-500">Bhubaneswar, India</li>
              <li className="text-zinc-500">medilabsai.health@gmail.com</li>
              <li className="text-zinc-500">+91 (79) 7841-2095</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 md:flex-row">
          <p className="text-sm text-zinc-600">© 2026 MediLabsAI. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Platform />
        <WhyChooseUs />
        <UseCases />
        <Security />
        <ContactForm />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
