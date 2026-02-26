/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser";
import {
  Stethoscope,
  Mic,
  ShieldCheck,
  Cloud,
  Database,
  Users,
  Activity,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  ArrowRight,
  Globe,
  Lock,
  Zap,
  Hospital,
  Building2,
  Microscope,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
import healthcareWorkingImages from "../src/assets/working-doctor.jpg";
import hospitalImage from "../src/assets/national-cancer-institute-hospital.jpg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">MediLabs<span className="text-emerald-500">AI</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">
              {link.name}
            </a>
          ))}
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-emerald-900/20">
            <a href="#contact">
              Schedule a Consultation
            </a>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
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
              <button className="bg-emerald-600 text-white px-5 py-3 rounded-xl text-center font-semibold">
                <a href="#contact">
                  Schedule a Consultation
                </a>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-zinc-950">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              Healthcare Technology Specialists
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
              Precision AI for <span className="text-emerald-500">Modern Clinical</span> Excellence.
            </h1>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl">
              We build secure, AI-powered documentation systems and custom software solutions designed for Indian healthcare providers, from independent clinics to multi-specialty hospitals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/30 group">
                <a href="#contact">
                  Schedule a Consultation
                </a>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-zinc-700 hover:border-zinc-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2">
                View Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bridging the Gap Between <br />
              <span className="text-emerald-500">Medicine and Technology</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              MediLabs AI specializes in developing high-performance technology for the healthcare sector. We understand that medical organizations require more than just "software"—they need reliable, secure, and intuitive tools that enhance patient care without adding administrative burden.
            </p>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Our expertise lies at the intersection of AI, cloud infrastructure, and data security. We focus specifically on small to mid-sized healthcare organizations, providing them with the same level of technological sophistication typically reserved for large corporate hospital chains.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-emerald-500 font-bold text-2xl mb-1">AI-First</div>
                <div className="text-zinc-500 text-sm">Intelligent automation for clinical workflows.</div>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-emerald-500 font-bold text-2xl mb-1">Secure</div>
                <div className="text-zinc-500 text-sm">Privacy-first architecture for medical data.</div>
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
            <div className="aspect-square rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 relative">
              <img
  src={healthcareWorkingImages}
  alt="Healthcare Technology"
  className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="text-emerald-500 w-6 h-6" />
                  </div>
                  <div className="font-bold text-white">Compliance Guaranteed</div>
                </div>
                <p className="text-zinc-400 text-sm">Our systems are built to meet international and local data protection standards for healthcare information.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "AI Clinical Documentation",
      desc: "Automated transcription and structuring of patient encounters into clinical notes.",
      benefit: "Reduces physician burnout and documentation time by up to 60%.",
      icon: <Mic className="w-6 h-6" />
    },
    {
      title: "Multilingual Voice-to-Text",
      desc: "Voice recognition optimized for Indian accents and regional languages.",
      benefit: "Enables natural patient interaction in local languages with accurate English summaries.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Insurance-Optimized Systems",
      desc: "Documentation workflows designed to meet TPA and insurance claim requirements.",
      benefit: "Accelerates claim approvals and reduces rejection rates due to documentation errors.",
      icon: <CheckCircle2 className="w-6 h-6" />
    },
    {
      title: "Custom EMR Development",
      desc: "Bespoke modules for Electronic Medical Records tailored to your specialty.",
      benefit: "Provides a workflow that matches your clinical practice exactly, not a generic template.",
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "Healthcare SaaS Solutions",
      desc: "Scalable software-as-a-service platforms for healthcare startups.",
      benefit: "Rapidly deployable solutions that scale as your patient base grows.",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      title: "Secure Cloud Infrastructure",
      desc: "Managed hosting and data storage specifically for medical institutions.",
      benefit: "Eliminates the need for expensive on-site servers while ensuring 99.9% uptime.",
      icon: <Cloud className="w-6 h-6" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Core Services</h2>
          <p className="text-zinc-400 text-lg">
            We provide end-to-end technology solutions designed to solve the specific operational challenges faced by Indian healthcare providers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-600/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">{service.desc}</p>
              <div className="pt-6 border-t border-zinc-800">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2 block">Business Benefit</span>
                <p className="text-zinc-300 text-sm italic">"{service.benefit}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedSolution = () => {
  return (
    <section id="solutions" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-8 md:p-16">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
                Featured Solution
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                AI Clinical Documentation System
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Our flagship solution transforms the way doctors document patient visits. Using advanced ambient AI, it captures multilingual conversations and generates structured medical records in real-time.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Multilingual voice-to-text (Hindi, English, Regional dialects)",
                  "Automatic generation of structured discharge summaries",
                  "Insurance-optimized coding and documentation",
                  "Automated patient follow-up reminders via WhatsApp/SMS"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="bg-white text-zinc-950 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2">
                <a href="#contact">
                  Request a Demo
                </a>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative h-full min-h-[400px] bg-zinc-800">
              <img
                src={hospitalImage}
                alt="AI Medical Documentation"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-transparent lg:block hidden"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-700 p-6 rounded-2xl w-full max-w-md shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Live Processing...</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-3/4 bg-zinc-800 rounded"></div>
                    <div className="h-2 w-full bg-zinc-800 rounded"></div>
                    <div className="h-2 w-5/6 bg-zinc-800 rounded"></div>
                    <div className="h-2 w-2/3 bg-emerald-500/30 rounded"></div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-between items-center">
                    <span className="text-xs text-zinc-500 font-mono">Accuracy: 98.4%</span>
                    <span className="text-xs text-zinc-500 font-mono">Latency: 120ms</span>
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
  const reasons = [
    {
      title: "Healthcare Domain Focus",
      desc: "We don't build generic software. Our team understands medical terminology, clinical workflows, and the nuances of Indian healthcare operations.",
      icon: <Hospital className="w-6 h-6" />
    },
    {
      title: "Secure Architecture",
      desc: "Built with a security-first mindset. We implement end-to-end encryption and strict access controls to protect sensitive patient data.",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "Multilingual AI Expertise",
      desc: "Our AI models are specifically trained on Indian accents and medical contexts, ensuring high accuracy even in noisy clinical environments.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Scalable Cloud Systems",
      desc: "Whether you're a single clinic or a hospital network, our cloud infrastructure scales seamlessly without compromising performance.",
      icon: <Database className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Partner With Us?</h2>
            <p className="text-zinc-400 text-lg mb-8">
              We take a practical, implementation-driven approach to healthcare technology. We don't just deliver code; we deliver operational efficiency.
            </p>
            <div className="p-6 rounded-2xl bg-emerald-600/10 border border-emerald-500/20">
              <p className="text-emerald-400 font-medium italic">
                "Our goal is to make technology invisible, so doctors can focus entirely on their patients."
              </p>
            </div>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
            {reasons.map((reason, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-emerald-500 mb-4">{reason.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Industries = () => {
  const industries = [
    { name: "Small Clinics", icon: <Building2 />, desc: "Streamlining solo and group practices." },
    { name: "Diagnostic Centers", icon: <Microscope />, desc: "Automating reporting and data management." },
    { name: "Hospitals", icon: <Hospital />, desc: "Full-scale digital transformation solutions." },
    { name: "Healthcare Startups", icon: <Rocket />, desc: "Building the next generation of health-tech." }
  ];

  return (
    <section className="py-24 bg-zinc-900/20 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Industries We Serve</h2>
          <p className="text-zinc-400">Tailored solutions for every scale of healthcare delivery.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <div key={i} className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center hover:bg-zinc-800 transition-colors">
              <div className="w-12 h-12 bg-emerald-600/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4">
                {ind.icon}
              </div>
              <h3 className="text-white font-bold mb-2">{ind.name}</h3>
              <p className="text-zinc-500 text-xs">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Security = () => {
  return (
    <section id="security" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Security & Compliance</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-500">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Advanced Data Encryption</h3>
                  <p className="text-zinc-400 text-sm">All data is encrypted at rest and in transit using industry-standard AES-256 and TLS 1.3 protocols.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-500">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Secure Cloud Hosting</h3>
                  <p className="text-zinc-400 text-sm">We utilize Tier-4 data centers with multi-region redundancy to ensure your data is always available and protected.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-500">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Controlled Data Access</h3>
                  <p className="text-zinc-400 text-sm">Granular role-based access controls (RBAC) ensure that only authorized personnel can view sensitive medical information.</p>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="p-12 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="w-64 h-64 text-emerald-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6">Privacy-First Approach</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                We believe that medical privacy is a fundamental right. Our systems are designed to minimize data exposure and provide full audit trails for every interaction with patient records.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono">HIPAA Compliant Ready</span>
                <span className="px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono">GDPR Aligned</span>
                <span className="px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono">ISO 27001 Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CaseStudy = () => {
  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Products</h2>
          <p className="text-zinc-400">Real-world impact of our technology solutions.</p>
        </div>
        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-zinc-900 border border-zinc-800">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-emerald-500 font-bold text-4xl mb-2">40%</div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-8">Time Saved</div>
              <div className="space-y-4">
                <div className="text-white font-bold">Client:</div>
                <div className="text-zinc-400 text-sm">Multi-specialty Clinic, Bangalore</div>
                <div className="text-white font-bold">Solution:</div>
                <div className="text-zinc-400 text-sm">AI Clinical Documentation & EMR Integration</div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-white mb-6">Automating Discharge Summaries</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                The client was struggling with a 2-hour delay in patient discharges due to manual summary preparation. We implemented our AI Documentation solution that captures doctor-patient rounds and automatically generates a draft discharge summary.
              </p>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                The result was a 40% reduction in documentation time and significantly higher patient satisfaction scores due to faster discharge processes.
              </p>
              <button className="text-emerald-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Read Full Case Study <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });


  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
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
        publicKey
      );

      setFormState("success");
      setFormData({ name: "", email: "", phone: "", organization: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormState("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Have a specific project in mind or want to learn more about our AI solutions? Fill out the form, and our healthcare technology experts will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-500">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-bold">Office</div>
                  <div className="text-zinc-500 text-sm">Bhubaneswar, Odisha, India</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-500">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-bold">Consultation</div>
                  <div className="text-zinc-500 text-sm">Available for on-site visits across India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-10 rounded-[2rem]">
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-zinc-400">Thank you for reaching out. We'll be in touch shortly.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-emerald-500 font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formState === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    Something went wrong. Please try again later or email us directly.
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email-Id"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Contact Number"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Organization</label>
                    <input
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Organization Name"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Message</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  disabled={formState === 'submitting'}
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 cursor-pointer disabled:bg-zinc-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {formState === 'submitting' ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Message
                      <ChevronRight className="w-5 h-5" />
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
    <section className="py-24 bg-emerald-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <Activity className="w-full h-full text-white" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Modernize Your Practice?</h2>
        <p className="text-emerald-100 text-xl mb-12 max-w-2xl mx-auto">
          Join the growing number of healthcare providers using MediLabs AI to improve efficiency and patient outcomes.
        </p>
        <button className="bg-white text-emerald-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-zinc-950 hover:text-white transition-all shadow-2xl">
          <a href="#contact">
            Schedule a Consultation
          </a>
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
                <Stethoscope className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">MediLabs<span className="text-emerald-500">AI</span></span>
            </div>
            <p className="text-zinc-500 max-w-sm mb-8">
              Empowering healthcare providers with intelligent, secure, and practical technology solutions.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 cursor-pointer transition-colors">
                <Globe className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 cursor-pointer transition-colors">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-zinc-500 hover:text-emerald-500 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-zinc-500 hover:text-emerald-500 transition-colors">Services</a></li>
              <li><a href="#solutions" className="text-zinc-500 hover:text-emerald-500 transition-colors">Solutions</a></li>
              <li><a href="#contact" className="text-zinc-500 hover:text-emerald-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-zinc-500">Bhubaneswar, India</li>
              <li className="text-zinc-500">medilabsai.health@gmail.com</li>
              <li className="text-zinc-500">+91 (79) 7841-2095</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">© 2025 MediLabsAI. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-zinc-600 text-xs hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="text-zinc-600 text-xs hover:text-zinc-400">Terms of Service</a>
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
        <Services />
        <FeaturedSolution />
        <WhyChooseUs />
        <Industries />
        <Security />
        <CaseStudy />
        <ContactForm />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
