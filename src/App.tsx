/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useId, useMemo, useRef } from 'react';
import { 
  ArrowUpRight, 
  Plus, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Twitter,
  Sparkles,
  Shield,
  Clock,
  Check,
  Star
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = useId();
  const mobileMenuCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Give the animation a moment, then move focus inside.
      window.setTimeout(() => mobileMenuCloseBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 lg:px-12 py-6 flex justify-between items-center ${
        isScrolled ? 'bg-primary/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent'
      }`}
    >
      <button
        type="button"
        className="flex items-center gap-3 group cursor-pointer text-left"
        onClick={() => scrollToId('top')}
        aria-label="Go to top"
      >
        <div className="relative inline-block">
          {/* Base width is driven by logo2 so no layout shift during fade. */}
          <img
            src="/images/logo2.png"
            alt="Yes It's Clean Services LLC logo"
            aria-hidden={!isScrolled}
            className={`h-10 w-auto object-contain scale-110 origin-left transition-opacity duration-300 group-hover:rotate-3 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            decoding="async"
          />
          <img
            src="/images/logo1.png"
            alt="Yes It's Clean Services LLC logo"
            aria-hidden={isScrolled}
            className={`absolute left-0 top-0 h-10 w-auto object-contain scale-110 origin-left transition-opacity duration-300 group-hover:rotate-3 ${
              isScrolled ? 'opacity-0' : 'opacity-100'
            }`}
            loading="eager"
            decoding="async"
          />
        </div>
        
      </button>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-12">
        <div className="flex gap-10 font-display font-medium uppercase text-[11px] tracking-[0.2em] text-white/70">
          <a href="#top" className="hover:text-accent transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
          </a>
          <a href="#services" className="hover:text-accent transition-colors relative group">
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
          </a>
          <a href="#gallery" className="hover:text-accent transition-colors relative group">
            Gallery
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
          </a>
          <a href="#reviews" className="hover:text-accent transition-colors relative group">
            Reviews
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
          </a>
          <a href="#faq" className="hover:text-accent transition-colors relative group">
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
          </a>
          <a href="#about" className="hover:text-accent transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-accent transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
          </a>
        </div>
        <a href="#contact" className="bg-white text-primary px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-lg shadow-black/10">
          Book Now
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-white p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-controls={mobileMenuId}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`w-full h-[2px] bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-full h-[2px] bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-[2px] bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : '100%' }}
        id={mobileMenuId}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed inset-0 bg-primary z-[60] flex flex-col items-center justify-center gap-8 md:hidden min-h-screen"
        style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
      >
        <button 
          className="absolute top-8 right-8 text-white text-4xl"
          onClick={() => setIsMobileMenuOpen(false)}
          ref={mobileMenuCloseBtnRef}
          aria-label="Close menu"
        >
          &times;
        </button>
        <button type="button" onClick={() => { setIsMobileMenuOpen(false); scrollToId('top'); }} className="text-3xl font-display font-bold text-white uppercase tracking-widest">Home</button>
        <button type="button" onClick={() => { setIsMobileMenuOpen(false); scrollToId('services'); }} className="text-3xl font-display font-bold text-white uppercase tracking-widest">Services</button>
        <button type="button" onClick={() => { setIsMobileMenuOpen(false); scrollToId('gallery'); }} className="text-3xl font-display font-bold text-white uppercase tracking-widest">Gallery</button>
        <button type="button" onClick={() => { setIsMobileMenuOpen(false); scrollToId('reviews'); }} className="text-3xl font-display font-bold text-white uppercase tracking-widest">Reviews</button>
        <button type="button" onClick={() => { setIsMobileMenuOpen(false); scrollToId('faq'); }} className="text-3xl font-display font-bold text-white uppercase tracking-widest">FAQ</button>
        <button type="button" onClick={() => { setIsMobileMenuOpen(false); scrollToId('about'); }} className="text-3xl font-display font-bold text-white uppercase tracking-widest">About</button>
        <button type="button" onClick={() => { setIsMobileMenuOpen(false); scrollToId('contact'); }} className="text-3xl font-display font-bold text-white uppercase tracking-widest">Contact</button>
        <button type="button" onClick={() => { setIsMobileMenuOpen(false); scrollToId('contact'); }} className="mt-8 bg-accent text-white px-12 py-4 rounded-full text-lg font-bold uppercase tracking-widest">
          Book Now
        </button>
      </motion.div>
    </nav>
  );
};

const Hero = ({ onPrimaryCta }: { onPrimaryCta: () => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const titleWordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="min-h-screen relative flex flex-col justify-end px-6 pt-32 lg:pt-40 pb-12 lg:pb-24 overflow-hidden bg-primary">
      {/* Animated Background Image Side */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-1/2 lg:h-full z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.4, x: "10%" }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200" 
            alt="Professional Cleaning Service" 
            className="w-full h-full object-cover grayscale brightness-75 lg:brightness-100 ios-scroll-fix ios-no-filter"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://picsum.photos/seed/cleaning/1200/800";
            }}
          />
        </motion.div>
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          className="absolute inset-0 bg-accent z-10 mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent lg:bg-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="overflow-hidden">
            <p className="text-accent font-display font-medium uppercase tracking-[0.4em] text-xs sm:text-sm mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-accent"></span>
              Professional Care / Est. 2016
            </p>
          </motion.div>

          <div className="mb-10 lg:mb-16 max-w-[90%] lg:max-w-[50%]">
            <h1 className="text-white font-display text-huge font-bold leading-[0.85]">
              <div className="overflow-hidden">
                <motion.span 
                  variants={titleWordVariants}
                  className="inline-block"
                >
                  YES IT'S
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  variants={titleWordVariants}
                  className="inline-block text-accent"
                >
                  CLEAN.
                </motion.span>
              </div>
            </h1>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div variants={itemVariants}>
              <p className="text-white/60 text-lg lg:text-3xl max-w-xl leading-tight font-light mb-12">
                We don't just clean spaces. We restore clarity, health, and peace of mind to your environment.
              </p>

              <motion.div variants={itemVariants} className="flex items-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-accent text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors group relative"
                  onClick={onPrimaryCta}
                  aria-label="Start project - go to contact form"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-white/20 rounded-full scale-110"
                  />
                  <ArrowUpRight className="group-hover:rotate-45 transition-transform" size={32} />
                </motion.button>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl lg:text-2xl">Start Project</span>
                  <span className="text-white/40 text-xs lg:text-sm uppercase tracking-[0.2em]">Free Estimate</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Animated Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <p className="vertical-text text-white/5 font-display text-[15rem] font-bold select-none">
          CLEAN
        </p>
      </motion.div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "100px" }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute right-12 bottom-0 w-[1px] bg-white/20 hidden lg:block"
      />
    </section>
  );
};

const ServiceSection = ({ onViewAll }: { onViewAll: () => void }) => {
  const services = [
    { 
      id: '01', 
      title: 'Residential', 
      desc: 'Deep home restoration and maintenance for luxury living spaces.',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: '02', 
      title: 'Commercial', 
      desc: 'High-performance office environments that boost productivity and health.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: '03', 
      title: 'Specialized', 
      desc: 'Medical and industrial grade hygiene for sensitive environments.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="services" className="bg-bg pt-24 lg:pt-48 pb-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-32 gap-12">
          <div className="relative">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-accent font-display font-bold text-sm uppercase tracking-[0.5em] mb-4 block"
            >
              Our Expertise
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] text-primary">
              SYSTEMATIC <br /> 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HYGIENE.</span>
            </h2>

          </div>
          <div className="max-w-md">
            <p className="text-primary/60 text-lg lg:text-xl leading-relaxed font-light mb-8">
              We combine industrial-grade technology with meticulous human attention to create environments that breathe.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary">
                <Clock size={18} />
              </div>
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary">
                <Shield size={18} />
              </div>
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary">
                <Sparkles size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((s) => (
            <div
              key={s.id}
              className="group relative overflow-hidden border border-primary/10 bg-white rounded-2xl p-0 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-primary/10 ios-scroll-fix"
              style={{ willChange: 'transform' }}
            >
              {/* Always-visible service image */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-bg">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover block ios-scroll-fix"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10 p-6 sm:p-7 lg:p-8 flex flex-col h-full">
                <div className="flex items-center justify-start gap-6">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase leading-none tracking-tighter text-primary group-hover:text-accent transition-colors duration-300 break-words">
                    {s.title}
                  </h3>
                </div>

                <p className="mt-4 text-primary/40 group-hover:text-primary/70 transition-colors text-sm sm:text-base leading-relaxed flex-1">
                  {s.desc}
                </p>

                {/* Mobile Arrow */}
                <div className="lg:hidden mt-auto pt-6 text-accent">
                  <ArrowRight />
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 lg:mt-16 flex flex-col lg:flex-row items-center justify-between gap-8 border-t border-primary/10 pt-10"
        >
          <p className="text-primary/60 font-medium uppercase tracking-widest text-xs">
            Trusted by 500+ clients nationwide
          </p>
          <button type="button" onClick={onViewAll} className="flex items-center gap-4 text-primary font-bold uppercase tracking-widest group">
            View All Services 
            <span className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const projects = [
    {
      title: 'Kitchen Deep Clean',
      before:
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1200',
      after:
        'https://images.unsplash.com/photo-1564540586988-aa4e5b6e6a72?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Bathroom Restoration',
      before:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
      after:
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Living Room Reset',
      before:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200',
      after:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Office Refresh',
      before:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
      after:
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Bedroom Detailing',
      before:
        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&q=80&w=1200',
      after:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Laundry Room Reset',
      before:
        'https://picsum.photos/seed/yesitsclean-laundry-before/1200/900',
      after:
        'https://picsum.photos/seed/yesitsclean-laundry-after/1200/900',
    },
  ];

  return (
    <section id="gallery" className="bg-bg py-24 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-14 lg:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-accent font-display font-bold text-sm uppercase tracking-[0.5em] mb-4 block"
            >
              Before / After
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] text-primary">
              REAL RESULTS. <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">REAL CLEAN.</span>
            </h2>
          </div>
          <p className="max-w-xl text-primary/60 text-lg lg:text-xl font-light leading-relaxed">
            A quick look at what “meticulous” actually means. Each project is handled with a checklist-based system and
            detailed finish work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all"
            >
              <div className="px-7 pt-7 pb-6 sm:px-8">
                <p className="text-[10px] uppercase tracking-[0.35em] text-primary/45">Project</p>
                <h3 className="mt-2 font-display font-bold uppercase tracking-widest text-primary text-lg sm:text-xl">
                  {p.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/10">
                <div className="relative bg-white">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-primary/85 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white">
                    Before
                  </span>
                  <img
                    src={p.before}
                    alt={`${p.title} before cleaning`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://picsum.photos/seed/before-clean/1200/900';
                    }}
                    className="h-64 w-full object-cover grayscale sm:h-72 lg:h-80 ios-scroll-fix ios-no-filter"
                  />
                </div>
                <div className="relative bg-white">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-accent/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white">
                    After
                  </span>
                  <img
                    src={p.after}
                    alt={`${p.title} after cleaning`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://picsum.photos/seed/after-clean/1200/900';
                    }}
                    className="h-64 w-full object-cover sm:h-72 lg:h-80 ios-scroll-fix"
                  />
                </div>
              </div>

              <div className="px-7 py-6 sm:px-8 flex items-center justify-between gap-6">
                <p className="text-primary/55 text-xs sm:text-sm uppercase tracking-[0.25em]">
                  Detail-driven finish
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-widest group/button text-xs sm:text-sm cursor-pointer"
                >
                  Get a quote
                  <span className="w-10 h-10 rounded-full shrink-0 border border-primary flex items-center justify-center group-hover/button:bg-primary group-hover/button:text-white transition-colors">
                    <ArrowRight size={18} />
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 lg:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-primary/10 pt-10"
        >
          <p className="text-primary/60 font-medium uppercase tracking-widest text-xs text-center sm:text-left">
            Want your space to look like this?
          </p>
          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="inline-flex items-center gap-4 text-primary font-bold uppercase tracking-widest group"
          >
            Start with a free estimate
            <span className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  type Review = {
    name: string;
    role: string;
    quote: string;
    rating: number;
  };

  const initialReviews: Review[] = [
    {
      name: 'A. Rivera',
      role: 'Residential Client',
      quote:
        'Absolutely spotless. The team was punctual, respectful, and the finish looked like a five-star hotel.',
      rating: 5,
    },
    {
      name: 'J. Santos',
      role: 'Operations Manager',
      quote:
        'Our office air feels fresher and the restrooms stay consistently clean. Great process and communication.',
      rating: 5,
    },
    {
      name: 'M. Cruz',
      role: 'Homeowner',
      quote:
        'Fast, detailed, and thorough. Every corner looked brand new, and the place felt healthier right away.',
      rating: 5,
    },
    {
      name: 'R. Tan',
      role: 'Facility Supervisor',
      quote:
        'Professional crew with excellent consistency. The checklist approach shows—our turnover time improved a lot.',
      rating: 5,
    },
  ];

  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const initialsFor = (name: string) => {
    const cleaned = name.replace(/[^a-zA-Z.\s]/g, '').trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    const raw = parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}` : `${cleaned[0] ?? 'Y'}${cleaned[1] ?? 'C'}`;
    return raw.replace(/\./g, '').toUpperCase();
  };

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    const clamped = Math.max(0, Math.min(idx, children.length - 1));
    children[clamped]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  const scrollByCards = (delta: number) => {
    scrollToIndex(activeIndex + delta);
  };

  useEffect(() => {
    const reviewsEndpoint = import.meta.env.VITE_REVIEWS_ENDPOINT as string | undefined;
    if (!reviewsEndpoint) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(reviewsEndpoint);
        if (!res.ok) return;
        const data = await res.json();

        if (!Array.isArray(data)) return;
        const normalized: Review[] = data
          .map((r) => ({
            name: String(r?.name ?? ''),
            role: String(r?.role ?? ''),
            quote: String(r?.quote ?? ''),
            rating: Number(r?.rating ?? 0),
          }))
          .filter((r) => r.name && r.role && r.quote && r.rating >= 1 && r.rating <= 5);

        if (!cancelled && normalized.length > 0) setReviews(normalized);
      } catch {
        // Keep initialReviews as fallback if fetch fails.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setActiveIndex((idx) => Math.min(idx, Math.max(0, reviews.length - 1)));
  }, [reviews.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      if (children.length === 0) return;
      const trackLeft = track.getBoundingClientRect().left;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < children.length; i++) {
        const left = children[i].getBoundingClientRect().left;
        const dist = Math.abs(left - trackLeft);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      setActiveIndex(bestIdx);
    };

    let raf = 0;
    const onScrollRaf = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };

    track.addEventListener('scroll', onScrollRaf, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScrollRaf);
    };
  }, []);

  return (
    <section id="reviews" className="bg-white py-24 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-14 lg:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-accent font-display font-bold text-sm uppercase tracking-[0.5em] mb-4 block"
            >
              Client Feedback
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] text-primary">
              TRUSTED. <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">PROVEN.</span>
            </h2>
          </div>
          <p className="max-w-xl text-primary/60 text-lg lg:text-xl font-light leading-relaxed">
            Social proof matters. Here’s what clients say after we restore their space to a higher standard.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:flex items-center justify-end gap-3 mb-6">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              className="w-12 h-12 rounded-full border border-primary/15 hover:border-accent/40 hover:text-accent transition-colors flex items-center justify-center"
              aria-label="Previous review"
            >
              <ArrowRight className="rotate-180" size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              className="w-12 h-12 rounded-full border border-primary/15 hover:border-accent/40 hover:text-accent transition-colors flex items-center justify-center"
              aria-label="Next review"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <style>{`#reviews ._hideScrollbar::-webkit-scrollbar{display:none}`}</style>

          <div
            ref={trackRef}
            className="_hideScrollbar flex gap-8 overflow-x-auto pb-6 -mx-6 px-6 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]"
            style={{ WebkitOverflowScrolling: 'touch' }}
            aria-label="Reviews carousel"
          >
            {reviews.map((r, i) => (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="snap-start shrink-0 w-[85%] sm:w-[70%] md:w-[48%] lg:w-[32%] group relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-b from-white to-bg p-8 lg:p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 flex flex-col min-h-[360px]"
              >
              {/* Accent glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-accent/20 blur-3xl opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(var(--color-accent-rgb),0.18),transparent_55%)] opacity-60" />

              {/* Big quote mark */}
              <div aria-hidden="true" className="pointer-events-none absolute -top-2 right-6 text-[8rem] leading-none text-primary/5 font-display select-none">
                “
              </div>

              <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold tracking-tight">
                      {initialsFor(r.name)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-accent border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-primary uppercase tracking-widest text-sm">
                      {r.name}
                    </p>
                    <p className="text-primary/50 text-xs uppercase tracking-[0.25em] mt-2">
                      {r.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 sm:gap-1 w-full justify-end sm:w-auto">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      aria-hidden="true"
                      className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${idx < r.rating ? 'text-accent' : 'text-primary/20'}`}
                      fill={idx < r.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="sr-only">{r.rating} out of 5 stars</span>
                </div>
              </div>

              <p
                className="relative mt-7 text-primary/70 text-lg leading-relaxed font-light flex-1"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {r.quote}
              </p>

              <div className="relative mt-10 pt-6 border-t border-primary/10 flex items-center justify-between">
                <p className="text-primary/50 text-xs uppercase tracking-[0.25em]">
                  Verified client
                </p>
                <div className="h-[1px] flex-1 mx-4 bg-primary/10" />
                <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium">
                  Premium Service
                </p>
              </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                idx === activeIndex ? 'w-10 bg-accent' : 'w-2.5 bg-primary/15 hover:bg-primary/25'
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 lg:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-primary/10 pt-10"
        >
          <p className="text-primary/60 font-medium uppercase tracking-widest text-xs text-center sm:text-left">
            Average rating: 5.0 / 5.0 • Verified client feedback
          </p>
          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="inline-flex items-center gap-4 text-primary font-bold uppercase tracking-widest group"
          >
            Request a Quote
            <span className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      id: 'areas',
      q: 'Do you serve Boston and nearby areas?',
      a: 'Yes. We focus on Boston, MA and nearby communities. If you’re outside our usual area, send us a message and we’ll confirm availability.',
    },
    {
      id: 'supplies',
      q: 'Do you bring supplies and equipment?',
      a: 'We come prepared with professional cleaning tools and eco-conscious options. If you have preferred products or special requirements, tell us during booking.',
    },
    {
      id: 'deep-clean',
      q: 'What’s included in a deep clean?',
      a: 'A checklist-based approach that targets detail areas like kitchens, bathrooms, high-touch surfaces, visible dust, and thorough surface finishing—so the results look and feel refreshed.',
    },
    {
      id: 'timeline',
      q: 'How long will the cleaning take?',
      a: 'It depends on the size and condition of your space. After your message, we’ll recommend an estimated timeframe based on what you need.',
    },
    {
      id: 'recurring',
      q: 'Can I schedule recurring cleaning?',
      a: 'Yes. Weekly, bi-weekly, or monthly maintenance is available. We’ll help you set a plan that fits your routine.',
    },
    {
      id: 'changes',
      q: 'What if I need to reschedule or make changes?',
      a: 'Just let us know as early as possible. We’ll do our best to accommodate updates based on our schedule.',
    },
  ];

  const [openId, setOpenId] = useState<string>(() => faqs[0]?.id ?? '');

  return (
    <section id="faq" className="bg-bg py-24 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-14 lg:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-accent font-display font-bold text-sm uppercase tracking-[0.5em] mb-4 block"
            >
              FAQ
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] text-primary">
              Questions? <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Answers.</span>
            </h2>
          </div>

          <p className="max-w-xl text-primary/60 text-lg lg:text-xl font-light leading-relaxed">
            Quick answers about our process and deep cleaning—so you can book with confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((item) => {
              const isOpen = item.id === openId;
              const panelId = `faq-panel-${item.id}`;
              return (
                <div key={item.id} className="rounded-3xl border border-primary/10 bg-white overflow-hidden">
                  <button
                    type="button"
                    className="w-full text-left px-6 sm:px-8 py-6 flex items-start justify-between gap-6 cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId((prev) => (prev === item.id ? '' : item.id))}
                  >
                    <span className="font-display font-bold text-primary text-lg sm:text-xl leading-snug">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 w-10 h-10 rounded-full border border-primary/15 flex items-center justify-center text-accent flex-shrink-0"
                    >
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-label={item.q}
                    className={`px-6 sm:px-8 pb-6 transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-primary/70 font-light leading-relaxed">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl border border-primary/10 bg-white p-7 sm:p-8 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.35em] text-primary/45 font-medium mb-5">
                Ready when you are
              </p>
              <p className="text-primary font-display font-bold text-2xl sm:text-3xl leading-tight">
                Tell us what you need—get a free estimate.
              </p>
              <p className="mt-4 text-primary/60 font-light leading-relaxed">
                We’ll respond quickly with next steps and an estimated plan for your cleaning.
              </p>
              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="mt-7 inline-flex items-center gap-4 bg-accent text-white px-7 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-lg shadow-black/10 cursor-pointer"
              >
                Start with a free estimate
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-primary text-white p-7 sm:p-8 overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-accent/20 blur-3xl" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/70 font-medium mb-5 relative">
                What you can expect
              </p>
              <div className="space-y-4 relative">
                <div className="flex items-start gap-3">
                  <Check className="mt-1 text-accent" size={18} />
                  <p className="font-light leading-relaxed">A systematic checklist for consistent results.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-1 text-accent" size={18} />
                  <p className="font-light leading-relaxed">Careful attention to detail areas people notice.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-1 text-accent" size={18} />
                  <p className="font-light leading-relaxed">Clear communication from first message to completion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="bg-about py-24 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <motion.div 
              initial={{ rotate: -5 }}
              whileInView={{ rotate: 0 }}
              className="aspect-square bg-white p-4 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800" 
                alt="Detail" 
                className="w-full h-full object-cover grayscale ios-scroll-fix ios-no-filter"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-accent p-8 flex flex-col justify-end text-white hidden md:flex">
              <Sparkles size={48} className="mb-4" />
              <p className="font-bold text-2xl leading-tight">Meticulous by Design.</p>
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-4xl sm:text-5xl font-display font-bold leading-none uppercase">
              The Standard of <span className="text-accent">Excellence</span> in Hygiene.
            </h2>
            <div className="space-y-6 text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
              <p>
                Founded on the principle that cleanliness is the foundation of health, YES IT'S CLEAN has redefined the industry standard for over a decade.
              </p>
              <p>
                Our team consists of certified specialists who understand the science of sanitation, not just the aesthetics of a tidy room.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/10">
              <div>
                <p className="text-4xl font-bold font-display">100%</p>
                <p className="text-xs uppercase tracking-widest text-gray-400">Eco Friendly</p>
              </div>
              <div>
                <p className="text-4xl font-bold font-display">2.5k+</p>
                <p className="text-xs uppercase tracking-widest text-gray-400">Spaces Restored</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string; // honeypot
};

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

function validateContactForm(values: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  if (!email) errors.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email.';
  if (!message) errors.message = 'Please tell us how we can help.';

  // Basic bot signal: filled honeypot
  if (values.company && values.company.trim().length > 0) errors.company = 'Spam detected.';

  return errors;
}

const ContactSection = ({ onReadyForFocus }: { onReadyForFocus: (focusName: () => void) => void }) => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [values, setValues] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    onReadyForFocus(() => nameInputRef.current?.focus());
  }, [onReadyForFocus]);

  const canSubmit = status !== 'submitting';

  const onChange = (key: keyof ContactFormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (submitError) setSubmitError(null);
    if (status === 'success') setStatus('idle');
    if (errors[key]) {
      const nextErrors = { ...errors };
      delete nextErrors[key];
      setErrors(nextErrors);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    setSubmitError(null);

    const leadsEndpoint = import.meta.env.VITE_LEADS_ENDPOINT as string | undefined;

    // If you haven't wired your backend yet, keep the current demo behavior.
    if (!leadsEndpoint) {
      await new Promise((r) => setTimeout(r, 700));
      setStatus('success');
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
    };

    try {
      const res = await fetch(leadsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed (${res.status})`);
      }

      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="bg-surface text-primary py-24 lg:py-48">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-display font-bold tracking-tighter mb-8 lg:mb-12">
              LET'S <br /> TALK.
            </h2>
            <div className="space-y-6 lg:space-y-8">
              <div className="group cursor-pointer">
                <p className="text-primary/40 uppercase tracking-widest text-[10px] sm:text-xs mb-2">Email</p>
                <a
                  href="mailto:Yesitscleanservices@gmail.com"
                  className="block text-lg sm:text-2xl lg:text-3xl font-display font-medium group-hover:text-accent transition-colors leading-tight"
                >
                  Yesitscleanservices<wbr />@gmail.com
                </a>
              </div>
              <div className="group cursor-pointer">
                <p className="text-primary/40 uppercase tracking-widest text-[10px] sm:text-xs mb-2">Phone</p>
                <a
                  href="tel:+16035128936"
                  className="block text-lg sm:text-2xl lg:text-3xl font-display font-medium group-hover:text-accent transition-colors"
                >
                  603 512-8936
                </a>
              </div>
              <div className="group">
                <p className="text-primary/40 uppercase tracking-widest text-[10px] sm:text-xs mb-2">Location</p>
                <p className="text-base sm:text-xl lg:text-2xl font-display font-medium">
                  123 Clean Street, Suite 400<br />
                  Boston, MA 02110
                </p>
              </div>
            </div>

            {/* Mobile: map should appear right below Location details */}
            <div className="lg:hidden mt-10">
              <div className="w-full h-56 sm:h-64 overflow-hidden rounded-2xl shadow-lg border border-primary/10">
                <iframe
                  title="Yes It's Clean Location"
                  src="https://www.google.com/maps?q=123+Clean+Street,+Suite+400,+Boston,+MA+02110&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between mt-12 lg:mt-0 lg:col-span-7">
            <div className="space-y-12">
              <p className="text-xl lg:text-2xl text-primary/60 font-light leading-snug">
                Whether it's a one-time deep clean or a long-term maintenance partnership, we're ready to elevate your space.
              </p>
              <form className="space-y-8" onSubmit={onSubmit} noValidate>
                {/* Honeypot */}
                <label className="sr-only" htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={onChange('company')}
                  className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
                  aria-hidden="true"
                />

                <label className="sr-only" htmlFor="name">Name</label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  placeholder="NAME" 
                  ref={nameInputRef}
                  value={values.name}
                  onChange={onChange('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="w-full bg-transparent border-b border-primary/20 py-4 outline-none focus:border-accent transition-colors font-display text-base sm:text-lg lg:text-xl"
                />
                {errors.name ? <p id="name-error" className="text-sm text-red-600 -mt-6">{errors.name}</p> : null}

                <label className="sr-only" htmlFor="email">Email</label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="EMAIL" 
                  value={values.email}
                  onChange={onChange('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full bg-transparent border-b border-primary/20 py-4 outline-none focus:border-accent transition-colors font-display text-base sm:text-lg lg:text-xl"
                />
                {errors.email ? <p id="email-error" className="text-sm text-red-600 -mt-6">{errors.email}</p> : null}

                <label className="sr-only" htmlFor="phone">Phone number</label>
                <input 
                  id="phone"
                  name="phone"
                  type="tel" 
                  placeholder="PHONE NUMBER" 
                  value={values.phone}
                  onChange={onChange('phone')}
                  className="w-full bg-transparent border-b border-primary/20 py-4 outline-none focus:border-accent transition-colors font-display text-base sm:text-lg lg:text-xl"
                />
                <label className="sr-only" htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="HOW CAN WE HELP?"
                  rows={4}
                  value={values.message}
                  onChange={onChange('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="w-full bg-transparent border-b border-primary/20 py-4 outline-none focus:border-accent transition-colors font-display text-base sm:text-lg lg:text-xl resize-none"
                />
                {errors.message ? <p id="message-error" className="text-sm text-red-600 -mt-6">{errors.message}</p> : null}

                {status === 'success' ? (
                  <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800">
                    <span className="mt-[2px]"><Check size={18} /></span>
                    <div>
                      <p className="font-bold">Inquiry sent.</p>
                      <p className="text-sm text-emerald-900/70">We’ll get back to you within 24 hours.</p>
                    </div>
                  </div>
                ) : null}

                {submitError ? (
                  <p role="alert" className="text-sm text-red-600 -mt-4">
                    {submitError}
                  </p>
                ) : null}

                <button type="submit" disabled={!canSubmit} className="flex items-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="text-xl lg:text-2xl font-display font-bold uppercase">
                    {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                  </span>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                  </div>
                </button>
              </form>
            </div>

          </div>

          <div className="lg:col-span-12 mt-2 sm:mt-4 lg:mt-0 hidden lg:block">
            <div className="w-full h-56 sm:h-64 lg:h-80 overflow-hidden rounded-2xl shadow-lg border border-primary/10">
              <iframe
                title="Yes It's Clean Location"
                src="https://www.google.com/maps?q=123+Clean+Street,+Suite+400,+Boston,+MA+02110&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-surface text-primary py-8 lg:py-12 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-primary/70">
          <button type="button" onClick={() => scrollToId('services')} className="hover:text-accent transition-colors">Services</button>
          <button type="button" onClick={() => scrollToId('reviews')} className="hover:text-accent transition-colors">Reviews</button>
          <button type="button" onClick={() => scrollToId('faq')} className="hover:text-accent transition-colors">FAQ</button>
          <button type="button" onClick={() => scrollToId('about')} className="hover:text-accent transition-colors">About</button>
          <button type="button" onClick={() => scrollToId('contact')} className="hover:text-accent transition-colors">Contact</button>
          <a href="#" className="hover:text-accent transition-colors">Privacy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms</a>
        </div>
        <div className="flex items-center gap-4 text-primary/70">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram size={18} /></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook size={18} /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-accent transition-colors"><Twitter size={18} /></a>
        </div>
        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em]">© 2026 YES IT'S CLEAN SERVICES</p>
      
      </div>
    </footer>
  );
};

export default function App() {
  const contactFocusRef = useRef<null | (() => void)>(null);
  const onPrimaryCta = () => {
    scrollToId('contact');
    window.setTimeout(() => contactFocusRef.current?.(), 300);
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    name: "Yes It's Clean",
    email: 'Yesitscleanservices@gmail.com',
    telephone: '+16035128936',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Clean Street, Suite 400',
      addressLocality: 'Boston',
      addressRegion: 'MA',
      postalCode: '02110',
      addressCountry: 'US',
    },
    serviceType: [
      'Residential cleaning',
      'Commercial cleaning',
      'Eco-friendly hygiene',
      'Detail-driven deep cleaning',
    ],
  } as const;

  return (
    <div id="top" className="font-sans selection:bg-accent selection:text-white">
      <style>{`
        /* iOS Safari: reduce image flicker during scroll + transforms */
        @supports (-webkit-touch-callout: none) {
          .ios-scroll-fix {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          img.ios-no-filter {
            filter: none !important;
            -webkit-filter: none !important;
          }
        }
      `}</style>
      <script
        type="application/ld+json"
        // JSON-LD: used by search engines to understand business data.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero onPrimaryCta={onPrimaryCta} />
        <ServiceSection onViewAll={() => scrollToId('services')} />
        <GallerySection />
        <ReviewsSection />
        <FAQSection />
        <AboutSection />
        <ContactSection onReadyForFocus={(focusName) => { contactFocusRef.current = focusName; }} />
      </main>
      <Footer />
    </div>
  );
}
