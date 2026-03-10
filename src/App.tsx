import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  ChevronRight,
  Wrench,
  Zap,
  ShieldCheck,
  Gauge,
  Truck,
  Settings,
  Menu,
  X,
  ArrowRight,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const BRAND = {
  name: "No Way Man Diesel LLC",
  address: "19760 Rye Creek Road, Novinger,MO 63559",
  phone: "(660) 216-5453",
  email: "sales@nowaymandiesel.com",
  hours: "Monday – Friday: 8AM – 5PM (Saturday – Sunday: Closed)",
  facebook: "https://www.facebook.com/people/No-Way-Man-Diesel-LLC/100035953075932/",
  mapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15989.090023980767!2d-92.6731452!3d40.2415076!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87e81361adb348e3%3A0xef9599d8a35a6fda!2sNo%20Way%20Man%20Diesel%2C%20LLC!5e1!3m2!1sen!2sus!4v1772833388705!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
};

// --- Components ---

const Header = ({ activePage, setPage, cartCount }: { activePage: string, setPage: (p: string) => void, cartCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'shop', label: 'Shop' },
    { id: 'megatron', label: 'Megatron' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const serviceLinks = [
    { id: 'engine-performance', label: 'Engine & Performance' },
    { id: 'transmission-clutch', label: 'Transmission & Clutch' },
    { id: 'drivetrain-suspension', label: 'Drivetrain & Suspension' },
    { id: 'general-mechanical', label: 'General Mechanical Work' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-matte-black/95 py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
          <div className="w-10 h-10 bg-torque-red flex items-center justify-center font-black text-xl italic">NW</div>
          <span className="font-display font-bold text-xl tracking-tighter hidden sm:block">NO WAY MAN <span className="text-torque-red">DIESEL</span></span>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <div key={link.id} className="relative group/nav">
              <button
                onClick={() => link.hasDropdown ? setPage('services') : setPage(link.id)}
                className={`uppercase text-sm font-bold tracking-widest transition-colors flex items-center gap-1 ${activePage === link.id || (link.hasDropdown && (activePage.startsWith('service') || serviceLinks.some(s => s.id === activePage))) ? 'text-torque-red' : 'hover:text-torque-red'}`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform duration-300" />}
              </button>

              {link.hasDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 z-50">
                  <div className="bg-gunmetal border border-white/10 p-4 min-w-[240px] shadow-2xl">
                    <div className="grid grid-cols-1 gap-2">
                      {serviceLinks.map(s => (
                        <button
                          key={s.id}
                          onClick={() => setPage(s.id)}
                          className={`text-left text-xs uppercase font-bold tracking-[0.2em] p-3 hover:bg-torque-red hover:text-white transition-colors border-b border-white/5 last:border-0 ${activePage === s.id ? 'text-torque-red' : 'text-gray-400'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('toggle-cart'))}>
            <ShoppingCart className="text-white group-hover:text-torque-red transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-torque-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-matte-black animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </div>
          <button onClick={() => setPage('shop')} className="btn-primary text-xs px-6 py-2">Shop Parts</button>
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-gunmetal p-6 lg:hidden border-t border-white/10"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <div key={link.id}>
                  <button
                    onClick={() => { setPage(link.id); if (!link.hasDropdown) setIsMenuOpen(false); }}
                    className="w-full text-left uppercase font-bold tracking-widest py-3 border-b border-white/5 flex justify-between items-center"
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={14} />}
                  </button>
                  {link.hasDropdown && (
                    <div className="pl-4 mt-2 mb-4 space-y-2 border-l border-torque-red ml-2">
                      {serviceLinks.map(s => (
                        <button
                          key={s.id}
                          onClick={() => { setPage(s.id); setIsMenuOpen(false); }}
                          className={`block w-full text-left uppercase text-[10px] font-bold tracking-widest py-2 ${activePage === s.id ? 'text-torque-red' : 'text-gray-400'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 font-mono font-bold text-torque-red py-2">
                <Phone size={16} /> {BRAND.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = ({ setPage }: { setPage: (p: string) => void }) => (
  <footer className="bg-matte-black border-t border-white/10 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-torque-red flex items-center justify-center font-black text-xl italic">NW</div>
          <span className="font-display font-bold text-2xl tracking-tighter">NO WAY MAN <span className="text-torque-red">DIESEL</span></span>
        </div>
        <p className="text-gray-400 mb-8 max-w-sm">
          Missouri's premier destination for heavy-duty diesel repair, performance tuning, and competition-ready builds. We don't just fix trucks; we engineer reliability.
        </p>
        <div className="flex gap-4">
          <a href={BRAND.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 bg-gunmetal flex items-center justify-center hover:bg-torque-red transition-colors">
            <Facebook size={20} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><button onClick={() => setPage('home')} className="hover:text-torque-red">Home</button></li>
            <li><button onClick={() => setPage('services')} className="hover:text-torque-red">Services</button></li>
            <li><button onClick={() => setPage('megatron')} className="hover:text-torque-red">Megatron Legacy</button></li>
            <li><button onClick={() => setPage('about')} className="hover:text-torque-red">Our Story</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact Info</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex gap-3"><MapPin size={16} className="text-torque-red shrink-0" /> {BRAND.address}</li>
            <li className="flex gap-3"><Phone size={16} className="text-torque-red shrink-0" /> {BRAND.phone}</li>
            <li className="flex gap-3"><Mail size={16} className="text-torque-red shrink-0" /> {BRAND.email}</li>
            <li className="flex gap-3"><Clock size={16} className="text-torque-red shrink-0" /> {BRAND.hours}</li>
          </ul>
        </div>
      </div>

      <div className="h-64 bg-gunmetal relative overflow-hidden border border-white/10">
        <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: BRAND.mapIframe }} />
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
      <p>© {new Date().getFullYear()} NO WAY MAN DIESEL LLC. ALL RIGHTS RESERVED.</p>
      <p>PRECISION TUNING. BRUTAL POWER.</p>
    </div>
  </footer>
);

const StickySidebarForm = () => (
  <div className="sticky top-32 bg-gunmetal p-8 border border-white/10 shadow-2xl">
    <h3 className="text-xl font-bold mb-2 uppercase italic">Request An Estimate</h3>
    <p className="text-gray-400 text-xs mb-6 uppercase tracking-widest">Get a response within 24 hours</p>
    <form className="space-y-4">
      <input type="text" placeholder="FULL NAME" className="w-full bg-matte-black border border-white/10 p-3 text-sm focus:border-torque-red outline-none" />
      <input type="tel" placeholder="PHONE NUMBER" className="w-full bg-matte-black border border-white/10 p-3 text-sm focus:border-torque-red outline-none" />
      <select className="w-full bg-matte-black border border-white/10 p-3 text-sm focus:border-torque-red outline-none text-gray-400">
        <option>SELECT SERVICE</option>
        <option>ENGINE & PERFORMANCE</option>
        <option>TRANSMISSION & CLUTCH</option>
        <option>DRIVETRAIN & SUSPENSION</option>
        <option>GENERAL MECHANICAL</option>
      </select>
      <textarea placeholder="DESCRIBE SYMPTOMS" rows={3} className="w-full bg-matte-black border border-white/10 p-3 text-sm focus:border-torque-red outline-none"></textarea>
      <button type="submit" className="btn-primary w-full">Send Request</button>
    </form>
  </div>
);

// --- Page Views ---

const HomePage = ({ setPage }: { setPage: (p: string) => void }) => (
  <div className="animate-in fade-in duration-700">
    {/* Hero Section */}
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/Truckcrushingit.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-matte-black via-matte-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
          className="max-w-4xl"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-torque-red" />
            <span className="uppercase tracking-[0.3em] text-torque-red font-bold text-sm">Novinger, Missouri</span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] italic tracking-tight"
          >
            <span className="text-torque-red">PRECISION</span> TUNING.<br />
            BRUTAL <span className="text-torque-red">POWER.</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed"
          >
            High-end diesel repair, performance tuning, and custom builds for those who demand absolute mechanical authority. We don't just fix trucks—we bulletproof them.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 }
            }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={() => setPage('shop')} className="btn-primary flex items-center gap-3 group text-lg px-8">
              Shop Diesel Parts <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href={`tel:${BRAND.phone}`} className="btn-secondary flex items-center gap-3 text-lg px-8">
              <Phone size={18} /> {BRAND.phone}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* The Big 3 UI */}
    <section className="py-24 bg-gunmetal relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-40 relative z-20">
          {[
            {
              title: "CUMMINS",
              desc: "From 12V mechanical beasts to the latest 6.7L common rail systems. We handle head gaskets, fuel systems, and full performance builds.",
              icon: <Zap className="text-torque-red" />
            },
            {
              title: "DURAMAX",
              desc: "Solving CP4 failures, Allison transmission issues, and injector problems. Clinical diagnostics for LB7 to L5P platforms.",
              icon: <ShieldCheck className="text-torque-red" />
            },
            {
              title: "POWERSTROKE",
              desc: "The ultimate bulletproofing destination. 6.0L and 6.4L recovery, plus 6.7L performance optimization and maintenance.",
              icon: <Wrench className="text-torque-red" />
            }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-matte-black p-10 border-b-4 border-torque-red shadow-2xl group hover:-translate-y-2 transition-transform"
            >
              <div className="mb-6">{card.icon}</div>
              <h3 className="text-3xl font-black mb-4 italic">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{card.desc}</p>
              <button onClick={() => setPage('engine-performance')} className="text-torque-red font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn More <ChevronRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Core Services Grid */}
    <section className="py-32 bg-matte-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black italic mb-4">CORE CAPABILITIES</h2>
          <div className="h-1 w-20 bg-torque-red mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {[
            { id: 'engine-performance', title: "Engine & Performance", desc: "From clinical rebuilds to precision tuning. We optimize your diesel heartbeat for maximum authority.", icon: <Zap size={32} /> },
            { id: 'transmission-clutch', title: "Transmission & Clutch", desc: "Builds that survive massive torque. Upgraded converters, billet shafts, and heavy-duty manual clutches.", icon: <Settings size={32} /> },
            { id: 'drivetrain-suspension', title: "Drivetrain & Suspension", desc: "Axle rebuilds, custom lift kits, and steering precision. We engineer stability into every frame.", icon: <ShieldCheck size={32} /> },
            { id: 'general-mechanical', title: "General Mechanical", desc: "OEM-level diagnostics, preventative maintenance, and custom fabrication for competition needs.", icon: <Wrench size={32} /> },
          ].map((service, i) => (
            <div
              key={service.title}
              onClick={() => setPage(service.id)}
              className="bg-matte-black p-12 hover:bg-gunmetal transition-colors group cursor-pointer"
            >
              <div className="text-torque-red mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h4 className="text-xl font-bold mb-4 uppercase italic">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Megatron Teaser */}
    <section
      className="py-48 relative overflow-hidden bg-matte-black bg-left bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(rgba(18, 18, 18, 0.2), rgba(18, 18, 18, 0.2)), url('/Decepticon%20Logo.png')",
        backgroundSize: '67%',
        backgroundPosition: '-5% center'
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black italic mb-6">WE RACE WHAT WE BUILD.</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Our competition pulling truck, "Megatron," isn't just for show. It's our R&D lab for extreme diesel performance.
        </p>
        <button
          onClick={() => setPage('megatron')}
          className="px-10 py-4 bg-gradient-to-r from-[#4b0082] to-[#a855f7] hover:brightness-110 text-white font-bold uppercase tracking-widest transition-all duration-300 inline-block"
        >
          Explore The Legacy
        </button>
      </div>
    </section>

    {/* Trust Bar */}
    <section className="py-20 bg-gunmetal border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          "Dealer-Level Diagnostics",
          "Decades of Diesel Experience",
          "Novinger's Trusted Fleet Partner",
          "Competition-Proven Engineering"
        ].map((text, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-torque-red/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="text-torque-red" size={24} />
            </div>
            <span className="font-bold uppercase tracking-widest text-sm leading-tight">{text}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const ServicesHub = () => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2">
        <h1 className="text-5xl font-black italic mb-8">FULL SERVICE CAPABILITIES</h1>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          At No Way Man Diesel, we believe in "Doing it right the first time." Our philosophy is simple: clinical precision in every bolt turned, every diagnostic run, and every custom build.
        </p>

        <div className="space-y-20">
          {[
            {
              title: "ENGINE & PERFORMANCE",
              items: ["Full Rebuilds", "Head Gaskets", "Custom Tuning", "Turbocharge Upgrades", "Fuel System Precision"]
            },
            {
              title: "TRANSMISSION & CLUTCH",
              items: ["Allison Performance", "Dual Disc Clutches", "Valve Body Upgrades", "Billet Shafts", "TCM Tuning"]
            },
            {
              title: "DRIVETRAIN & SUSPENSION",
              items: ["Axle & Diff Rebuilds", "Suspension Lift/Level", "Traction Bars", "Steering Upgrades", "Driveline Balancing"]
            },
            {
              title: "GENERAL MECHANICAL",
              items: ["Precision Diagnostics", "Preventative Maintenance", "System Flushes", "Electrical Repair", "Custom Fabrication"]
            }
          ].map(cat => (
            <div key={cat.title}>
              <h3 className="text-2xl font-black italic text-torque-red mb-6 border-b border-torque-red/20 pb-2">{cat.title}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-300 font-bold uppercase tracking-widest text-sm">
                    <ChevronRight size={16} className="text-torque-red" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <StickySidebarForm />
      </div>
    </div>
  </div>
);

const EnginePerformancePage = () => (
  <div className="pt-32 pb-24 animate-in slide-in-from-bottom-10 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
        <div>
          <h1 className="text-5xl md:text-6xl font-black italic mb-8 leading-tight">
            ENGINE & <span className="text-torque-red">PERFORMANCE</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed italic">
            Clinical precision for the heart of your truck. From factory restores to track-proven power.
          </p>
          <div className="flex gap-4">
            <div className="bg-gunmetal p-6 border-l-4 border-torque-red grow">
              <h4 className="font-bold uppercase mb-2">Bulletproofing</h4>
              <p className="text-xs text-gray-500 italic">ARP studs, high-grade gaskets, precision machining.</p>
            </div>
            <div className="bg-gunmetal p-6 border-l-4 border-torque-red grow">
              <h4 className="font-bold uppercase mb-2">Custom Tuning</h4>
              <p className="text-xs text-gray-500 italic">SOTF capability, TCM mapping, dyno-proven maps.</p>
            </div>
          </div>
        </div>
        <div className="bg-gunmetal p-1 aspect-video border border-white/10 overflow-hidden">
          <img src="/Truck%20images/Engine.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Engine Rebuild" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold uppercase italic text-white">The Clinical Rebuild Process</h3>
          <p className="leading-relaxed">
            At No Way Man Diesel, we understand that a diesel engine is more than just a power source—it's the heart of your operation, whether that's hauling heavy equipment across Missouri or competing on the national pulling circuit. Our clinical engine rebuild process is exhaustive, beginning with a complete teardown to the bare block. We hot-tank every component and perform precision machining to tolerances that often exceed OEM specifications. By utilizing high-grade components like ARP studs, Mahle pistons, and genuine seals, we ensure that every engine we touch is prepared for a lifetime of heavy-duty service or extreme performance output.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold uppercase italic text-white">Performance Tuning Authority</h3>
          <p className="leading-relaxed">
            Beyond mechanical rebuilds, we offer cutting-edge performance tuning that wakes up your truck's true potential. We specialize in custom EFI Live and EZ LYNK tuning, optimized specifically for your platform—be it Cummins, Powerstroke, or Duramax. Our tuning philosophy balances raw power with drivability and safety, managing EGTs and fuel delivery to ensure maximum efficiency whether you're at the track or towing a 20,000lb trailer through the hills. From mild street tunes to full competition maps that have been proven by our own track-tested legacy, we provide the mechanical authority your truck deserves.
          </p>
        </div>
      </div>
      <div className="mt-16 text-center">
        <a href={`tel:${BRAND.phone}`} className="btn-primary inline-flex items-center gap-3">
          <Phone size={18} /> Call For Engine Quote
        </a>
      </div>
    </div>
  </div>
);

const TransmissionClutchPage = () => (
  <div className="pt-32 pb-24 animate-in slide-in-from-bottom-10 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black italic mb-4">TRANSMISSION & CLUTCH</h1>
        <p className="text-gray-400 uppercase tracking-widest text-sm font-bold mb-8">Built to handle Missouri's toughest torque loads.</p>
        <div className="max-w-4xl mx-auto aspect-video bg-gunmetal border border-white/5 overflow-hidden">
          <img src="/Truck%20images/Gear%20box.png" className="w-full h-full object-cover opacity-80" alt="Gear Box" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 mb-16">
        <div className="bg-gunmetal p-10 border-l-4 border-torque-red">
          <h3 className="text-2xl font-bold uppercase italic text-white mb-6">Heavy-Duty Transmissions</h3>
          <p className="leading-relaxed">
            Nothing kills a diesel truck faster than a blown transmission, especially when subjected to the massive torque of a modern performance build. At No Way Man Diesel, we specialize in building transmissions that don't just survive—they thrive under pressure. Our build process for Allison, 68RFE, and Aisin units involves reinforcing every weak point in the factory design. We utilize billet input and output shafts, upgraded valve bodies, and high-energy clutch materials to ensure crisp shifting and reliable power transfer. Every transmission is built in a clean-room environment where precision is the only standard.
          </p>
        </div>
        <div className="bg-gunmetal p-10 border-l-4 border-torque-red">
          <h3 className="text-2xl font-bold uppercase italic text-white mb-6">Precision Clutch Engineering</h3>
          <p className="leading-relaxed">
            For the manual heavy-haulers, we offer precision clutch engineering that bridges the gap between factory smooth and competition strong. We specialize in dual-disc and triple-disc clutch installations that can handle the aggressive torque curves of tuned diesel engines without sacrificing pedal feel. Whether you're looking for a Stock Plus rebuild for daily reliability or a Stage 3 competition unit capable of handling 800+ horsepower, our team has the technical expertise to deliver a drivetrain that will never let you down on the job site or the Fairgrounds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { title: "Allison Builds", desc: "Stage 1 to full competition builds for Duramax platforms." },
          { title: "Dual Disc Clutches", desc: "Premium clutch installs for manual heavy haulers." },
          { title: "Valve Bodies", desc: "Upgraded 68RFE and Aisin components for better shifting." },
        ].map(item => (
          <div key={item.title} className="bg-matte-black p-8 border border-white/5">
            <h3 className="text-lg font-bold mb-2 uppercase italic text-torque-red">{item.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <a href={`tel:${BRAND.phone}`} className="btn-primary inline-flex items-center gap-3">
          <Phone size={18} /> Call For Transmission Quote
        </a>
      </div>
    </div>
  </div>
);

const DrivetrainSuspensionPage = () => (
  <div className="pt-32 pb-24 animate-in slide-in-from-bottom-10 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-black italic mb-4">DRIVETRAIN & SUSPENSION</h1>
          <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">From the axle to the frame, we engineer stability.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase italic border-l-4 border-torque-red pl-6">Axle & Differential Precision</h3>
            <p className="text-gray-400 leading-relaxed">
              A powerful engine is useless if you can't get that power to the ground or maintain control of your vehicle. Our drivetrain services extend from the transfer case to the wheels, specializing in full differential rebuilds and re-gearing. Whether you're looking to optimize your truck for larger tires or restoring the longevity of a high-mileage work horse, we provide precision setup with high-strength ring and pinion sets. We also address driveline vibrations with professional balancing, ensuring that your truck runs smoothly at highway speeds and under heavy load conditions.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase italic border-l-4 border-torque-red pl-6">Suspension Stability Engineering</h3>
            <p className="text-gray-400 leading-relaxed">
              Suspension stability is a critical safety factor for any heavy-duty truck. At No Way Man Diesel, we engineer stability from the frame down, offering steering upgrades to eliminate 'death wobble' and custom lift or level kits that maintain proper geometry. We install high-strength traction bars for pulling trucks and reinforce chassis components for maximum durability. Our goal is to ensure that your truck's handling is as sharp as its performance, providing a confident driving experience whether you're navigating Missouri's toughest terrains or hauling a full load on the interstate.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-gunmetal h-80 border border-white/10 overflow-hidden relative">
            <img src="/Truck%20images/Suspention.png" className="w-full h-full object-cover opacity-60" alt="Suspension Work" />
            <div className="absolute inset-0 p-8 flex flex-end items-end">
              <h4 className="text-4xl font-black italic leading-none">BUILT FOR<br />STABILITY.</h4>
            </div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gunmetal p-8 border border-white/5">
            {['Differential Re-gearing', 'Traction Bar Installs', 'Custom Lift & Level Kits', 'Driveline Balancing', 'Steering Upgrades', 'Chassis Reinforcement'].map(item => (
              <li key={item} className="flex items-center gap-3 font-bold uppercase text-[10px] tracking-widest text-gray-300">
                <ChevronRight size={14} className="text-torque-red" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center">
        <a href={`tel:${BRAND.phone}`} className="btn-primary inline-flex items-center gap-3">
          <Phone size={18} /> Schedule Drivetrain Service
        </a>
      </div>
    </div>
  </div>
);

const GeneralMechanicalPage = () => (
  <div className="pt-32 pb-24 animate-in slide-in-from-bottom-10 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
        <div>
          <h1 className="text-5xl font-black italic mb-8">GENERAL MECHANICAL WORK</h1>
          <div className="space-y-8 text-gray-400">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold uppercase italic text-white flex items-center gap-3">
                <div className="w-8 h-1 bg-torque-red" /> Diagnostic & Electrical Accuracy
              </h3>
              <p className="leading-relaxed">
                Modern diesel diagnostics require more than just a simple code reader. At No Way Man Diesel, we utilize OEM-level diagnostic software for all major platforms, allowing us to pinpoint the 'ghosts in the machine' that generic scanners often miss. Our technicians perform exhaustive electrical system analysis, fuel system health checks, and turbocharger calibration to identify root causes before they become catastrophic failures. We believe in engineering solutions, not just swapping parts, ensuring that your truck returns to the road with a clean bill of health and optimized system performance.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-matte-black aspect-video relative overflow-hidden flex items-center justify-center border border-white/5">
          <img src="/Truck%20images/Truck%20underbelly.png" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Truck Underbelly" />
          <div className="relative z-10 text-center p-12">
            <h4 className="text-4xl font-black italic mb-4">DIAGNOSTIC<br />AUTHORITY.</h4>
            <a href={`tel:${BRAND.phone}`} className="btn-primary inline-flex items-center gap-3">
              <Phone size={18} /> Call For Help
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 bg-gunmetal p-12 border border-white/10 shadow-2xl">
          <h3 className="text-2xl font-bold uppercase italic text-white mb-6">Maintenance & Custom Fabrication</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            Our general mechanical services also include fleet-grade preventative maintenance and custom fabrication for unique performance needs. We offer platform-specific system flushes, high-efficiency oil and fuel filtering, and 50-point safety inspections to protect your investment. When the aftermarket falls short, our in-house fabrication team steps in, utilizing precision TIG and MIG welding to create high-strength components such as custom mounting brackets and reinforced cooling layouts. From routine oil changes to one-off competition solutions, we provide the comprehensive mechanical care that defines No Way Man Diesel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Diagnostics", desc: "OEM software scans for all major platforms." },
              { title: "Maintenance", desc: "Precision oil, fuel, and cooling services." },
              { title: "Fabrication", desc: "Custom metalwork and competition solutions." },
              { title: "Electrical", desc: "Wiring harness repair and module programming." },
            ].map(item => (
              <div key={item.title} className="bg-matte-black p-4 border border-white/5">
                <h4 className="font-bold uppercase italic text-[10px] text-torque-red mb-1">{item.title}</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MegatronPage = () => (
  <div className="pt-32 pb-24 animate-in fade-in duration-1000">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-7xl md:text-9xl font-black italic mb-4 text-torque-red">MEGATRON</h1>
        <p className="uppercase tracking-[0.5em] text-gray-500 font-bold">The Authority of the Track</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div className="space-y-8">
          <h2 className="text-4xl font-black italic">THE SPEC SHEET</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "ENGINE", val: "6.7L Cummins Base" },
              { label: "TURBO", val: "Compound S400/S500" },
              { label: "HP", val: "1,800+ (Estimated)" },
              { label: "FUEL", val: "Triple CP3 Pumps" },
              { label: "CHASSIS", val: "Custom 4-Link" },
              { label: "TIRES", val: "Cut Pulling Tires" },
            ].map(spec => (
              <div key={spec.label} className="bg-gunmetal p-4 border-l-2 border-torque-red">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">{spec.label}</span>
                <span className="font-bold uppercase tracking-widest">{spec.val}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 leading-relaxed">
            Megatron was born from a simple question: "How far can we push it?" This truck is the culmination of thousands of hours of fabrication, tuning, and track-side adjustments. It serves as our primary testing ground for the high-performance parts we install in our customers' trucks. When we say a part is "competition-proven," it's because Megatron survived the pull with it.
          </p>
        </div>
        <div className="w-full aspect-[16/9] bg-gunmetal border border-white/10 overflow-hidden shadow-2xl">
          <img
            src="/Megatron-2025.jpg"
            alt="Megatron 2025"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  </div>
);

const ReviewsPage = () => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-black italic mb-4">CUSTOMER REVIEWS</h1>
          <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">Real feedback from Missouri's diesel community.</p>
        </div>
        <div className="flex items-center gap-2 bg-gunmetal px-6 py-3 border border-white/5">
          <div className="flex text-torque-red">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <span className="font-bold text-xl font-mono">5.0</span>
          <span className="text-gray-500 text-xs uppercase font-bold ml-2">Average Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { name: "William Sweet G Craig", truck: "6 years ago", content: "Great place to have truck worked on for a fair price an everything is in working order done right an tested", location: "Verified Review" },
          { name: "actionjaxon08", truck: "6 years ago", content: "A wonderful place to have work on your truck fair and honest pricing and a knowledgeable service team!", location: "Verified Review" },
          { name: "Andy Phillips", truck: "12/31/21", content: "Jason is awesome!!! Great guy and knows his stuff! Highly recommend for all your repairs, the man has a pulling truck, and wins, so he can get your pickup in shape, trust me!!! Thanks again for getting me going again!!!", location: "Verified Review" },
          { name: "Casey Ann", truck: "9/18/2020", content: "Great diesel mechanic, knows his stuff. Down to earth and super friendly as well.", location: "Verified Review" },
          { name: "Jack Thompson", truck: "9/7/2020", content: "Jason is very helpful and attentive. And very knowledgeable. And his rates are very competitive.", location: "Verified Review" },
          { name: "Gus Allen", truck: "9/30/2016", content: "Great service and great people! Fast and great work!", location: "Verified Review" },
        ].map((rev, i) => (
          <div key={i} className="bg-gunmetal p-10 border border-white/5 relative">
            <div className="flex text-torque-red mb-6">
              {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
            </div>
            <p className="text-lg italic text-gray-300 mb-8 leading-relaxed">"{rev.content}"</p>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold uppercase tracking-widest text-sm">{rev.name}</h4>
                <p className="text-gray-500 text-[10px] uppercase font-bold font-mono">{rev.truck}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-600 uppercase font-bold">{rev.location}</span>
                <div className="flex items-center gap-1 text-green-500 text-[10px] uppercase font-bold mt-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full" /> Verified Customer
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div>
          <h1 className="text-5xl font-black italic mb-8">OUR STORY</h1>
          <p className="text-gray-400 leading-relaxed mb-6">
            Founded in the heart of Novinger, Missouri, No Way Man Diesel LLC began with a single bay and a relentless obsession with diesel performance. Our roots are deep in the Missouri soil, and our reputation was built one truck at a time. We didn't want to be just another repair shop; we wanted to be the facility that people traveled across state lines to visit.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Today, we are a premier destination for fleet owners who can't afford downtime and enthusiasts who won't settle for second place. Our team is comprised of specialists who live and breathe diesel. We don't just work here; we pull, we race, and we haul. That real-world experience is what sets us apart. When you bring your truck to No Way Man Diesel, you're getting more than a repair—you're getting a legacy of mechanical excellence.
          </p>
        </div>
        <div className="relative w-full aspect-video bg-gunmetal border border-white/10 overflow-hidden shadow-2xl lg:mt-0 mt-8">
          <img
            src="/Shop-Inside-View.jpg"
            alt="No Way Man Diesel Shop View"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-matte-black p-6">
            <h3 className="text-xl font-bold italic uppercase tracking-widest text-white">Clinical Shop Environment</h3>
          </div>
        </div>
      </div>

      <div className="py-24 border-y border-white/5 bg-gunmetal/30 -mx-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black italic mb-12 text-center text-torque-red">WHY TRUST US?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold italic uppercase text-white border-l-4 border-torque-red pl-4">Decades of Expertise</h3>
              <p className="text-gray-400 leading-relaxed">
                We don't just fix trucks; we understand the engineering behind them. With over 20 years of hands-on diesel experience, our team has seen every evolution of the Cummins, Powerstroke, and Duramax platforms.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold italic uppercase text-white border-l-4 border-torque-red pl-4">Specialized Knowledge</h3>
              <p className="text-gray-400 leading-relaxed">
                Generic repair shops use generic scanners. We invest in OEM-level diagnostics and specialized tooling to ensure clinical accuracy in every diagnostic and repair we perform.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold italic uppercase text-white border-l-4 border-torque-red pl-4">Customer-First Approach</h3>
              <p className="text-gray-400 leading-relaxed">
                We believe in transparency. You'll receive clear explanations of every issue and a detailed plan for the fix. No surprises, no shortcuts—just mechanical authority.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold italic uppercase text-white border-l-4 border-torque-red pl-4">Competition Proven</h3>
              <p className="text-gray-400 leading-relaxed">
                The same techniques and parts we use on our own competition pulling trucks go into your daily driver or work horse. If it survives the track, it will survive your commute.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-black italic">A LEGACY OF PERFORMANCE</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Whether you're hauling cattle across Missouri or building a 1,000HP street machine, our promise remains the same: Precision Tuning. Brutal Power. We aren't just building trucks; we're building relationships based on trust and mechanical excellence.
          </p>
          <div className="pt-8">
            <div className="h-px w-24 bg-torque-red mx-auto mb-8" />
            <p className="font-mono text-sm tracking-[0.3em] text-gray-500 uppercase">Est. 2018 | Novinger, MO</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-black italic mb-8">GET IN TOUCH</h1>
          <div className="space-y-8 mb-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-torque-red flex items-center justify-center shrink-0"><MapPin /></div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Location</h4>
                <p className="text-gray-400">{BRAND.address}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-torque-red flex items-center justify-center shrink-0"><Phone /></div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Phone</h4>
                <p className="text-gray-400">{BRAND.phone}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-torque-red flex items-center justify-center shrink-0"><Clock /></div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Hours</h4>
                <p className="text-gray-400">{BRAND.hours}</p>
              </div>
            </div>
          </div>
          <div className="h-80 bg-gunmetal border border-white/10 overflow-hidden">
            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: BRAND.mapIframe }} />
          </div>
        </div>

        <div className="bg-gunmetal p-12 border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-black italic mb-8">BOOK SHOP TIME</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">First Name</label>
              <input type="text" className="w-full bg-matte-black border border-white/10 p-4 outline-none focus:border-torque-red" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Last Name</label>
              <input type="text" className="w-full bg-matte-black border border-white/10 p-4 outline-none focus:border-torque-red" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone</label>
              <input type="tel" className="w-full bg-matte-black border border-white/10 p-4 outline-none focus:border-torque-red" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</label>
              <input type="email" className="w-full bg-matte-black border border-white/10 p-4 outline-none focus:border-torque-red" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Truck Year</label>
              <input type="text" className="w-full bg-matte-black border border-white/10 p-4 outline-none focus:border-torque-red" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Make / Model</label>
              <input type="text" className="w-full bg-matte-black border border-white/10 p-4 outline-none focus:border-torque-red" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Engine Type</label>
              <select className="w-full bg-matte-black border border-white/10 p-4 outline-none focus:border-torque-red text-gray-400">
                <option>Select Engine</option>
                <option>Cummins 5.9L / 6.7L</option>
                <option>Duramax LB7-L5P</option>
                <option>Powerstroke 6.0L / 6.4L / 6.7L</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Symptoms / Modifications Needed</label>
              <textarea rows={4} className="w-full bg-matte-black border border-white/10 p-4 outline-none focus:border-torque-red"></textarea>
            </div>
            <button className="btn-primary md:col-span-2 py-5 text-lg">Submit Booking Request</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- Shop Related ---

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  desc: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Stage 2 Performance Turbo", price: 1899.99, category: "Performance", image: "https://picsum.photos/seed/turbo/600/600", desc: "Optimized for 6.7L Cummins. Improved spool time." },
  { id: 2, name: "Bulletproof Head Stud Kit", price: 649.00, category: "Hardware", image: "https://picsum.photos/seed/studs/600/600", desc: "Premium ARP components for maximum cylinder pressure." },
  { id: 3, name: "High-Flow Injector Set", price: 2450.00, category: "Fuel", image: "https://picsum.photos/seed/injectors/600/600", desc: "30% over stock, competition grade precision." },
  { id: 4, name: "Triple Tunnel Intake", price: 425.00, category: "Performance", image: "https://picsum.photos/seed/intake/600/600", desc: "Cold air delivery for Duramax platforms." },
  { id: 5, name: "Megatron Signature Tee", price: 34.99, category: "Apparel", image: "https://picsum.photos/seed/shirt/600/600", desc: "Heavyweight cotton with Megatron track graphics." },
  { id: 6, name: "Diesel Additive 6-Pack", price: 89.95, category: "Maintenance", image: "https://picsum.photos/seed/additive/600/600", desc: "Missouri winter formula anti-gel protection." },
];

const ShopPage = ({ addToCart }: { addToCart: (p: Product) => void }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  const filteredItems = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-5xl font-black italic mb-4">THE PARTS COUNTER</h1>
            <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">Performance hardware. Track proven reliability.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 uppercase text-xs font-bold tracking-widest transition-all ${activeCategory === cat ? 'bg-torque-red text-white' : 'bg-gunmetal text-gray-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(product => (
            <div key={product.id} className="bg-gunmetal border border-white/5 group overflow-hidden">
              <div className="h-64 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-matte-black/80 px-4 py-2 font-mono font-bold text-torque-red">
                  ${product.price.toLocaleString()}
                </div>
              </div>
              <div className="p-8">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 block">{product.category}</span>
                <h3 className="text-xl font-bold mb-3 uppercase italic">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{product.desc}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-transparent border-2 border-white hover:bg-torque-red hover:border-torque-red transition-all py-3 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeItem
}: {
  isOpen: boolean,
  onClose: () => void,
  cart: (Product & { qty: number })[],
  updateQuantity: (id: number, delta: number) => void,
  removeItem: (id: number) => void
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-matte-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-gunmetal z-[101] p-10 flex flex-col shadow-2xl border-l border-white/10"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black italic">YOUR CART</h2>
              <button onClick={onClose} className="hover:text-torque-red"><X size={32} /></button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-6 pb-10">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart size={64} className="mx-auto text-gray-700 mb-6" />
                  <p className="text-gray-500 uppercase font-bold tracking-widest">Cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-white/5 pb-6">
                    <img src={item.image} className="w-20 h-20 object-cover border border-white/10" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold uppercase text-sm">{item.name}</h4>
                        <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-torque-red"><Trash2 size={16} /></button>
                      </div>
                      <p className="text-torque-red font-mono text-xs mb-4">${item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/10 px-2 py-1 gap-4">
                          <button onClick={() => updateQuantity(item.id, -1)} disabled={item.qty <= 1} className="disabled:opacity-20"><Minus size={14} /></button>
                          <span className="text-xs font-bold font-mono">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-10">
                <div className="flex justify-between items-end mb-6 text-2xl font-black italic">
                  <span>TOTAL</span>
                  <span className="text-torque-red">${total.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => alert('Checkout integration would happen here.')}
                  className="btn-primary w-full py-5 text-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState('home');
  const [cartItems, setCartItems] = useState<(Product & { qty: number })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const handleToggle = () => setIsCartOpen(!isCartOpen);
    window.addEventListener('toggle-cart', handleToggle);
    return () => window.removeEventListener('toggle-cart', handleToggle);
  }, [isCartOpen]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage={page} setPage={setPage} cartCount={cartCount} />

      <main className="flex-grow">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'services' && <ServicesHub />}
        {page === 'shop' && <ShopPage addToCart={addToCart} />}
        {page === 'engine-performance' && <EnginePerformancePage />}
        {page === 'transmission-clutch' && <TransmissionClutchPage />}
        {page === 'drivetrain-suspension' && <DrivetrainSuspensionPage />}
        {page === 'general-mechanical' && <GeneralMechanicalPage />}
        {page === 'megatron' && <MegatronPage />}
        {page === 'reviews' && <ReviewsPage />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer setPage={setPage} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
}
