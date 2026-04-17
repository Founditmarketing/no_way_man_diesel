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
    { id: 'blogs', label: 'Blogs' },
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
            High-end diesel repair, performance tuning, and custom builds for those who demand absolute mechanical authority. We don't just fix trucks—we engineer reliability.
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

    {/* Blog Slider */}
    <BlogSlider setPage={setPage} />

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
        <div className="inline-flex items-center gap-3 mb-6 bg-torque-red/20 border border-torque-red/40 px-6 py-2 rounded-none">
          <span className="text-torque-red font-black uppercase tracking-[0.3em] text-sm">🏆 3X National Title Winner</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black italic mb-6">WE RACE WHAT WE BUILD.</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Our competition pulling truck, "Megatron," isn't just for show. It's our R&amp;D lab for extreme diesel performance.
        </p>
        <button
          onClick={() => setPage('megatron')}
          className="px-10 py-4 bg-gradient-to-r from-[#4b0082] to-[#a855f7] hover:brightness-110 text-white font-bold uppercase tracking-widest transition-all duration-300 inline-block"
        >
          Explore The Legacy
        </button>
      </div>
    </section>

    {/* Customer Testimonials */}
    <TestimonialSlider />

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
              <h4 className="font-bold uppercase mb-2">Bulletproofing (Ford 6.0)</h4>
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
            Beyond mechanical rebuilds, we offer cutting-edge performance tuning that wakes up your truck's true potential. We specialize in custom EFI Live, EZ LYNK, and HP Tuners tuning, optimized specifically for your platform—be it Cummins, Powerstroke, or Duramax. Our tuning philosophy balances raw power with drivability and safety, managing EGTs and fuel delivery to ensure maximum efficiency whether you're at the track or towing a 20,000lb trailer through the hills. From mild street tunes to full competition maps that have been proven by our own track-tested legacy, we provide the mechanical authority your truck deserves.
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
          <img src="/Truck%20images/transmission.jpg" className="w-full h-full object-cover opacity-90" alt="Assembled Diesel Transmission" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 mb-16">
        <div className="bg-gunmetal p-10 border-l-4 border-torque-red">
          <h3 className="text-2xl font-bold uppercase italic text-white mb-6">Heavy-Duty Transmissions</h3>
          <p className="leading-relaxed">
            Nothing kills a diesel truck faster than a blown transmission, especially when subjected to the massive torque of a modern performance build. At No Way Man Diesel, we build transmissions for both the street and the dirt—whether you're hauling freight on Missouri highways or launching hard off the line at a pulling event. Our build process for Allison, 68RFE, and Aisin units involves reinforcing every weak point in the factory design. We utilize billet input and output shafts, upgraded valve bodies, and high-energy clutch materials to ensure crisp shifting and reliable power transfer under any condition. Whether it's an on-road daily driver that needs to survive 100,000 miles of hard towing or an off-road competition truck that demands absolute reliability at wide-open throttle, every transmission we build is held to the same clean-room standard of precision.
          </p>
        </div>
        <div className="bg-gunmetal p-10 border-l-4 border-torque-red">
          <h3 className="text-2xl font-bold uppercase italic text-white mb-6">Precision Clutch Engineering</h3>
          <p className="leading-relaxed">
            For the manual heavy-haulers, we offer precision clutch engineering that bridges the gap between factory smooth and competition strong. No Way Man Diesel specifically specializes in Valair Clutches—one of the most respected names in diesel performance clutch systems—offering their full lineup of dual-disc and triple-disc installations that can handle the aggressive torque curves of tuned diesel engines without sacrificing pedal feel. Whether you're looking for a Stock Plus rebuild for daily reliability or a Stage 3 competition unit capable of handling 800+ horsepower, our team has the technical expertise to deliver a drivetrain that will never let you down on the job site or the Fairgrounds.
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
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase italic border-l-4 border-torque-red pl-6">Pulling &amp; Racing Suspension</h3>
            <p className="text-gray-400 leading-relaxed">
              No Way Man Diesel is a specialty shop for pulling and racing truck suspension builds. We understand that a sled-pulling truck and a street truck have dramatically different suspension demands—and we engineer each setup accordingly. From reinforced front-end geometry and high-strength traction bars designed to eliminate axle wrap off the line, to custom 4-link rear setups that keep your rear tires planted in the dirt, we build suspension systems that are purpose-built to survive the violent forces of competition. If you're serious about making a clean, full-pull, your suspension starts here.
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
            Our general mechanical services also include fleet-grade preventative maintenance and custom fabrication for unique performance needs. We offer platform-specific system flushes, high-efficiency oil and fuel filtering, and a safety inspection to protect your investment. When the aftermarket falls short, our in-house fabrication team steps in, utilizing precision welding to create high-strength components such as custom mounting brackets and reinforced cooling layouts. From routine oil changes to one-off competition solutions, we provide the comprehensive mechanical care that defines No Way Man Diesel.
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
              { label: "TURBO", val: "3.0 Smooth Bore" },
              { label: "HP", val: "1,600+" },
              { label: "FUEL", val: "Triple CP3 Pumps" },
              { label: "CHASSIS", val: "Custom Fabricated" },
              { label: "TIRES", val: "DOT Street Tire / Mud Grips" },
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

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = [
    { name: "William Sweet G Craig", truck: "6 years ago", content: "Great place to have truck worked on for a fair price an everything is in working order done right an tested", location: "Verified Review" },
    { name: "actionjaxon08", truck: "6 years ago", content: "A wonderful place to have work on your truck fair and honest pricing and a knowledgeable service team!", location: "Verified Review" },
    { name: "Andy Phillips", truck: "12/31/21", content: "Jason is awesome!!! Great guy and knows his stuff! Highly recommend for all your repairs, the man has a pulling truck, and wins, so he can get your pickup in shape, trust me!!! Thanks again for getting me going again!!!", location: "Verified Review" },
    { name: "Casey Ann", truck: "9/18/2020", content: "Great diesel mechanic, knows his stuff. Down to earth and super friendly as well.", location: "Verified Review" },
    { name: "Jack Thompson", truck: "9/7/2020", content: "Jason is very helpful and attentive. And very knowledgeable. And his rates are very competitive.", location: "Verified Review" },
    { name: "Gus Allen", truck: "9/30/2016", content: "Great service and great people! Fast and great work!", location: "Verified Review" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="py-24 bg-matte-black border-t-4 border-t-torque-red border-b border-b-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black italic mb-4">CUSTOMER REVIEWS</h2>
        <div className="flex justify-center text-torque-red mb-8">
          {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="currentColor" />)}
        </div>
        <div className="relative h-64 md:h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <p className="text-xl md:text-2xl italic text-gray-300 mb-8 leading-relaxed">"{reviews[currentIndex].content}"</p>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-sm text-white">{reviews[currentIndex].name}</h4>
                <p className="text-torque-red text-xs uppercase font-bold font-mono">{reviews[currentIndex].truck}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? 'bg-torque-red' : 'bg-gray-600 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSlider = ({ setPage }: { setPage: (p: string) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const blogs = [
    { title: "The Truth About 6.7L Cummins Head Gaskets", category: "Tech Talk", date: "Coming Soon", excerpt: "We dive deep into why the 6.7L Cummins needs head studs and what you can do to prevent failure..." },
    { title: "Prepping Your Duramax For Pulling Season", category: "Performance", date: "Coming Soon", excerpt: "From tie-rod sleeves to EFI Live tuning, here is everything you need to get your L5P track-ready..." },
    { title: "Powerstroke 6.0L: Bulletproofing Demystified", category: "Builds", date: "Coming Soon", excerpt: "Is the 6.0L really as bad as they say? Not if you fix the factory flaws. Here is our exact blueprint..." },
    { title: "Why We Choose S400 Turbos For Megatron", category: "Shop Notes", date: "Coming Soon", excerpt: "Track data and airflow numbers explaining our compound setup on our competition pulling truck..." },
    { title: "Missouri Winter Diesel Checklist", category: "Maintenance", date: "Coming Soon", excerpt: "Don't get stranded in the cold. Fuel additives, block heaters, and battery health explained..." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blogs.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [blogs.length]);

  return (
    <section className="py-24 bg-gunmetal border-y border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black italic mb-2">LATEST FROM THE GARAGE</h2>
            <div className="h-1 w-16 bg-torque-red" />
          </div>
          <button onClick={() => setPage('blogs')} className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-torque-red hover:text-white transition-colors">
            View All <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="relative h-[250px] md:h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-matte-black p-8 border border-white/5"
            >
              <div>
                <span className="text-torque-red text-[10px] font-bold uppercase tracking-widest mb-2 block">{blogs[currentIndex].category} • {blogs[currentIndex].date}</span>
                <h3 className="text-2xl font-black italic mb-4 text-white line-clamp-2">{blogs[currentIndex].title}</h3>
                <button onClick={() => setPage('blogs')} className="btn-primary text-xs px-6 py-2 mt-4 hidden md:inline-block">Read More</button>
              </div>
              <div className="border-l border-white/10 md:pl-8">
                <p className="text-gray-400 text-sm leading-relaxed italic line-clamp-3">"{blogs[currentIndex].excerpt}"</p>
                <button onClick={() => setPage('blogs')} className="btn-primary text-xs px-6 py-2 mt-6 md:hidden w-full">Read More</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center gap-3 mt-8">
          {blogs.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 transition-all ${i === currentIndex ? 'w-8 bg-torque-red' : 'w-2 bg-gray-600 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogPost1 = ({ setPage }: { setPage: (p: string) => void }) => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700 bg-matte-black min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <div className="mb-12 border-b border-white/10 pb-12">
        <span className="text-torque-red text-sm font-bold uppercase tracking-widest mb-4 block">Tech Talk • Coming Soon</span>
        <h1 className="text-4xl md:text-5xl font-black italic mb-6 text-white leading-tight">The Truth About 6.7L Cummins Head Gaskets: Why They Fail and How to Bulletproof Your Diesel</h1>
        <p className="text-gray-400 text-lg leading-relaxed">Discover why the 6.7L Cummins is prone to head gasket failure and learn how No Way Man Diesel uses ARP studs and precision machining to bulletproof your truck.</p>
      </div>

      <div className="prose prose-invert prose-red max-w-none space-y-8 text-gray-300">
        <p className="text-lg">If you run a 6.7L Cummins—whether it’s a daily driver, a heavy hauler moving cattle across Missouri, or a track-ready competition rig—you know you own one of the most capable diesel platforms on the planet. The Cummins legacy is built on raw, low-end torque and inline-six durability. But even legends have their weak points. If there is one topic that keeps 6.7L owners awake at night, it's the dreaded blown head gasket.</p>
        <p className="text-lg">At <strong>No Way Man Diesel</strong>, we’ve torn down, machined, and rebuilt countless 6.7L engines. In this complete guide, we’re cutting through the forums and the myths to give you the clinical truth about why Cummins head gaskets let go, how to spot the early warning signs, and exactly what it takes to bulletproof your engine for good.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Why Do 6.7L Cummins Head Gaskets Fail?</h2>
        <p>To fix the problem permanently, we first have to understand why it happens. The 6.7L Cummins block and head are massive chunks of cast iron. They are incredibly strong, but they are fighting against physics, emissions equipment, and cylinder pressure. Here are the three primary culprits behind head gasket failure:</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Excessive Cylinder Pressure (The Tuning Factor)</h3>
        <p>The 6.7L Cummins responds incredibly well to aftermarket tuning. It’s not uncommon to add 100 to 200 horsepower with a simple tune. However, the factory head bolts are torque-to-yield (TTY). These bolts are designed to stretch once during installation to provide clamping force. When you introduce aggressive tuning, you drastically increase cylinder pressure. That excess pressure can actually lift the heavy cast-iron cylinder head off the block by microscopic fractions of an inch. Even a momentary lift is enough to allow ultra-hot combustion gases to slip past the factory multi-layer steel (MLS) head gasket, burning the seal and causing a failure.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Drive Pressure and VGT Turbos</h3>
        <p>The factory Variable Geometry Turbocharger (VGT) is great for spool-up and acting as an exhaust brake, but it comes with a downside: extreme drive pressure. The ratio of drive pressure to boost pressure can become severely unbalanced, especially when towing heavy loads up grades or running hot tunes. High drive pressures create intense heat and stress inside the cylinder, exacerbating the lifting effect on the cylinder head.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Warped Cylinder Heads</h3>
        <p>Cast iron is tough, but it’s not immune to heat cycles. Over tens of thousands of miles of intense heating and cooling, the long, heavy cylinder head on the inline-six Cummins can experience minor warping or twisting. Once the mating surface is no longer perfectly flat, the head gasket cannot maintain a uniform seal, inevitably leading to a blowout.</p>

        <div className="bg-gunmetal border border-white/5 p-8 my-12 text-center text-gray-500 italic">
        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/inside_the_engine.png" alt="Close-up internal engine view" className="w-full h-auto object-cover" />
        </div>
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Warning Signs: Catching the Failure Early</h2>
        <p>A blown head gasket doesn't always result in a catastrophic, smoke-billowing breakdown on the highway. Often, the early signs are subtle. Watch out for these symptoms:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 ml-6">
          <li><strong>Unexplained Coolant Loss:</strong> Consistently topping off your reservoir with no visible leaks.</li>
          <li><strong>Coolant Puking:</strong> Combustion gases over-pressurizing the system, forcing coolant out the overflow tube.</li>
          <li><strong>Overheating Under Load:</strong> Temperature spikes only when towing or accelerating hard.</li>
          <li><strong>White Smoke on Startup:</strong> Sweet-smelling smoke indicating coolant in the combustion chamber.</li>
        </ul>

        <div className="bg-gunmetal border border-white/5 p-8 my-12 text-center text-gray-500 italic">
        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/engine.png" alt="Mechanic inspecting the engine block" className="w-full h-auto object-cover" />
        </div>
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The "No Way Man Diesel" Bulletproofing Blueprint</h2>
        <p>If you suspect your 6.7L is suffering from a blown head gasket, simply slapping a new factory gasket in there and torqueing down new factory bolts is a temporary band-aid. Here is our clinical approach to permanently bulletproofing the 6.7L Cummins:</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Step 1: Precision Machining and Decking</h3>
        <p>We pull the cylinder head and send it to our precision machining partners. The head is meticulously magnafluxed and decked to strict tolerances. We also inspect the engine block deck to ensure a flawless mating surface.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Step 2: High-Grade MLS Gaskets</h3>
        <p>We utilize premium, high-grade Multi-Layer Steel (MLS) head gaskets engineered specifically to handle elevated cylinder pressures, providing a far superior seal compared to OEM replacements.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Step 3: ARP Head Studs (The Ultimate Upgrade)</h3>
        <p>We eliminate the weak factory torque-to-yield bolts and install high-tensile ARP Head Studs (such as ARP 2000s or Custom Age 625+). Unlike factory bolts that stretch, ARP studs are threaded into the block first, and the head is clamped down with nuts, providing exponentially more clamping force.</p>

        <div className="bg-gunmetal border border-white/5 p-8 my-12 text-center text-gray-500 italic">
        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/2.png" alt="Heavy duty studs installed on the block" className="w-full h-auto object-cover" />
        </div>
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Final Verdict</h2>
        <p>The 6.7L Cummins is a mechanical masterpiece, and a blown head gasket shouldn't scare you away from owning one. Once the weak factory bolts are replaced with heavy-duty studs and a precision-milled head, the block becomes nearly indestructible. Whether you are looking to pull a 20,000lb gooseneck with absolute confidence or you want to build a high-horsepower street monster, <strong>No Way Man Diesel</strong> has the technical authority and the track-proven experience to bulletproof your Cummins.</p>
        
        <div className="sticky bottom-8 h-0 overflow-visible flex justify-start items-end pointer-events-none z-50 mt-12 -ml-6 md:-ml-24 lg:-ml-32">
          <button 
            onClick={() => setPage('blogs')} 
            className="pointer-events-auto bg-torque-red/10 border-2 border-torque-red hover:bg-torque-red text-white p-3 md:p-4 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            title="Close Blog Post"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const BlogPost2 = ({ setPage }: { setPage: (p: string) => void }) => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700 bg-matte-black min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <div className="mb-12 border-b border-white/10 pb-12">
        <span className="text-torque-red text-sm font-bold uppercase tracking-widest mb-4 block">Performance • Now Published</span>
        <h1 className="text-4xl md:text-5xl font-black italic mb-6 text-white leading-tight">Prepping Your Duramax For Pulling Season: The Ultimate Guide to Track-Ready Performance</h1>
        <p className="text-gray-400 text-lg leading-relaxed">Get your GM Duramax ready for pulling season. We explain everything from tie-rod sleeves and Allison transmission builds to EFI Live tuning and fuel system upgrades.</p>
      </div>

      <div className="prose prose-invert prose-red max-w-none space-y-8 text-gray-300">
        <p className="text-lg">When spring thaws the Missouri ground and the fairground dirt starts getting prepped, something special happens in the diesel community. The air begins to smell like burnt rubber, exhaust, and anticipation. Diesel pulling season is an entirely different beast compared to daily driving or heavy towing. It requires a vehicle that can endure the absolute limits of mechanical stress for 300 brutal feet.</p>
        <p className="text-lg">If you drive a GM HD truck equipped with a Duramax diesel—whether it's an older LB7 or a modern L5P—you already have an incredible foundation for torque. But factory engineering is designed for longevity under <em>normal</em> conditions, not dragging a 40,000-pound sled through heavy clay. Without the right modifications, that first hook of the season could end in snapped tie-rods, a slipped Allison transmission, or a blown CP4 injection pump.</p>
        <p className="text-lg">At <strong>No Way Man Diesel</strong>, we know what it takes to survive the track. Our competition truck, "Megatron," didn't become a legend by remaining stock. In this massive, 2000-word deep dive, we are going to walk you through the exact blueprint for prepping your Duramax for pulling season. We’ll cover suspension stability, driveline reinforcement, critical fueling upgrades, and the tuning necessary to grab that first-place trophy without leaving truck parts scattered in the dirt.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Phase 1: Suspension and Steering Stability (The Duramax Achilles Heel)</h2>
        <p>Before we even talk about horsepower or turbochargers, we have to address the elephant in the room regarding the GM Independent Front Suspension (IFS). While the IFS provides an incredibly smooth ride on the highway, it is notoriously weak when subjected to high-torque, four-wheel-drive launches. If you don't reinforce the front end, you will experience the dreaded "toe-in" effect, which usually ends with a snapped tie-rod and your front tires pointing at each other.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Tie-Rod Sleeves and Upgraded Tie-Rods</h3>
        <p>The absolute first modification any Duramax owner should make before hooking to a sled is installing heavy-duty tie-rod sleeves or completely upgraded billet tie-rods. The factory tie-rods on 2500HD and 3500HD trucks are thin and prone to bending when immense torque is applied to the front wheels while they have high traction (like weighted dirt). Tie-rod sleeves slide over the weak factory rods, reinforcing them and preventing them from buckling under pressure.</p>
        
        <h3 className="text-xl font-bold text-white mt-8 mb-4">Center Link and Pitman/Idler Arm Braces</h3>
        <p>Even with reinforced tie-rods, the center link can twist, and the factory pitman and idler arms can wear out rapidly under pulling conditions. Upgrading to a straight center link prevents the twisting motion that changes your steering geometry mid-pull. Additionally, installing pitman and idler arm braces (commonly known as "Kryptonite" braces or similar heavy-duty variants) ties the steering components together securely, eliminating the flex that leads to catastrophic front-end failure.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Traction Bars (CalTracs or Custom Builds)</h3>
        <p>While the front end has its issues, the rear end isn't immune to physics. When you launch a heavy truck with massive torque, the rear axle wants to twist backward. This is called axle wrap. Severe axle wrap causes the rear springs to bend into an S-shape, leading to wheel hop. Wheel hop is violent and will easily snap a driveshaft, U-joint, or axle shaft. Installing heavy-duty traction bars ties the rear axle to the frame, physically preventing the axle from rotating and ensuring smooth, consistent power delivery to the dirt.</p>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/truck_in_the_dirt.png" alt="Duramax in the dirt" className="w-full h-auto object-cover" />
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Phase 2: Drivetrain and The Allison Transmission</h2>
        <p>The Allison transmission is legendary in the diesel world, but it has defined limits. A stock 5-speed or 6-speed Allison is generally safe up to about 100 horsepower over stock (roughly 400-450 rear-wheel horsepower depending on the generation). Once you start adding heavy fueling, large turbos, and throwing a sled on the back, the factory clutches will slip, and it will go into limp mode.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Building the Allison for the Track</h3>
        <p>If you are serious about pulling, a built Allison is a mandatory investment. At No Way Man Diesel, an entry-level competition build involves several critical upgrades:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 ml-6">
          <li><strong>Upgraded Torque Converter:</strong> The factory converter cannot handle aggressive locked launches. We install a billet multi-disc torque converter. A triple-disc converter provides massive surface area for the clutches to grab, ensuring zero slip when the converter locks up.</li>
          <li><strong>Upgraded Clutch Packs and Steels:</strong> We remove the factory clutches and install high-energy friction materials capable of holding massive torque loads without burning up.</li>
          <li><strong>Valve Body Modifications:</strong> Better clutches need better fluid pressure to hold them together. Modifying the valve body and installing a shift kit increases line pressure, ensuring crisp, fast, and secure shifts under wide-open throttle.</li>
          <li><strong>Billet Shafts:</strong> For high-horsepower trucks, the input, main, and output shafts must be upgraded to billet steel. Snapping a factory shaft during a launch will instantly end your night and require a complete transmission teardown.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">U-Joints and Driveshafts</h3>
        <p>Don't overlook the vital links connecting your built transmission to the axles. Factory U-joints should be swapped out for non-greasable, high-strength forged U-joints. If you are pushing over 800 horsepower, a custom one-piece aluminum or heavy-duty steel driveshaft is highly recommended to prevent twisting the factory thin-wall shaft in half.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Phase 3: Fuel Delivery and Ensuring Reliability</h2>
        <p>Duramax trucks utilize high-pressure common rail (HPCR) injection systems. They produce excellent power, but fuel delivery is a delicate balance. Pushing a highly tuned Duramax down the track without adequate fuel supply will lead to rail pressure drops, high exhaust gas temperatures (EGTs), and major pump failures.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The CP4 Dilemma (LML Platforms 2011-2016)</h3>
        <p>If you own an LML Duramax, you are likely aware of the Bosch CP4.2 high-pressure injection pump. The CP4 is less robust than the older CP3 and is highly susceptible to failure from lack of lubrication or air in the fuel. When a CP4 fails, it sends metal shrapnel through the entire fuel system, requiring a $10,000+ repair. For a pulling truck, a CP4 to CP3 conversion kit is absolutely essential. The CP3 flows more fuel, is exponentially more reliable, and can handle the aggressive tuning required for competition.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Lift Pumps (FASS or AirDog)</h3>
        <p>Unlike Cummins trucks, factory Duramax trucks do not have a lift pump in the fuel tank; the injection pump creates a vacuum to pull fuel all the way from the rear of the truck. Under extreme acceleration, this vacuum is not enough, leading to starvation and cavitation (air bubbles in the fuel). Installing a high-flow lift pump (like a FASS 165gph or AirDog system) positively pressurizes the fuel line, feeding the injection pump exactly what it needs while simultaneously stripping out air and water. This is cheap insurance for your expensive injectors.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Upgraded Injectors</h3>
        <p>If your goal is to dominate the unlimited or high-horsepower classes, factory injectors won't flow enough fuel. Upgrading to 30%, 60%, or even 100% over-stock injectors allows you to deliver the massive volume of fuel required to spool large turbos and maintain power throughout the entire pull.</p>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/1.png" alt="Technician installing high flow fuel lines" className="w-full h-auto object-cover" />
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Phase 4: Airflow and Turbo Selection</h2>
        <p>Fuel is only half of the horsepower equation. To burn that fuel efficiently and keep your EGTs from melting pistons, you need massive airflow.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Drop-In vs. Custom Turbo Setups</h3>
        <p>For street-class pullers, a high-quality "drop-in" variable vane turbo (VVT) upgrade—like a 63mm or 68mm—offers a great balance of quick spooling and increased top-end power. However, for dedicated pulling trucks, many drivers ditch the factory VVT geometry entirely in favor of a fixed-geometry turbo (like an S400 frame) or a custom compound turbo setup.</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 ml-6">
          <li><strong>Fixed Geometry (S300/S400):</strong> These turbos are simpler, more reliable at extreme boost pressures, and flow massive amounts of air on the top end. The trade-off is they take longer to spool, demanding specific tuning strategies to leave the starting line strong.</li>
          <li><strong>Compound Turbos:</strong> By using a smaller high-pressure turbo to feed a massive low-pressure (atmospheric) turbo, you get the best of both worlds: instant spool-up off the line and a hurricane of dense, cool air at the top of the track.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Intercoolers and Intake Piping</h3>
        <p>Pushing 40 to 60+ PSI of boost generates extreme heat. The factory intercooler on older Duramax trucks is restrictive and prone to blowing the factory plastic end-tanks or rubber boots. Upgrading to an all-aluminum, high-flow intercooler with hard piping and high-burst-pressure silicone boots ensures that all the boost your turbo makes actually makes it into the intake manifold without leaking.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Phase 5: EFI Live Tuning (The Brains of the Operation)</h2>
        <p>You can bolt on all the billet hardware in the world, but if the engine control module (ECM) and transmission control module (TCM) aren't commanding it correctly, the truck will fall on its face. The Duramax platform revolutionized diesel tuning through EFI Live and EZ LYNK.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Custom Track Tuning vs. Street Tuning</h3>
        <p>A street tune is designed for drivability, safe shifting, and moderate EGTs. A strictly dedicated pulling tune is violently different.</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 ml-6">
          <li><strong>Fuel Curves:</strong> A pulling tune commands maximum fuel delivery the moment the accelerator hits the floor to build spool rapidly.</li>
          <li><strong>Timing:</strong> Injection timing is advanced significantly to extract every ounce of mechanical energy from the combustion event.</li>
          <li><strong>TCM Tuning:</strong> The transmission is tuned to raise shift points, lock the torque converter earlier, and increase line pressure to its absolute maximum to prevent clutch slip.</li>
          <li><strong>RPM Limitations:</strong> Factory RPM limits are often raised from ~3200 RPM to over 4000 RPM (requiring upgraded valve springs to prevent valve float) to keep wheel speed as high as possible.</li>
        </ul>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Phase 6: Track-Day Prep and Strategy</h2>
        <h3 className="text-xl font-bold text-white mt-8 mb-4">Hitch Height and Weight Distribution</h3>
        <p>The rules of your local pulling organization will dictate your maximum hitch height (typically 24 to 26 inches). You want the hitch as high as legally allowed, creating a steeper downward angle on the chain, which lifts the front of the sled and pulls the rear tires of the truck harder into the dirt. Weight distribution is equally critical. You want to hang as much weight as legally permitted on the front bumper. The sled will naturally pull the rear down; front hanging weights keep the front tires planted for crucial 4WD traction and steering control.</p>
        
        <h3 className="text-xl font-bold text-white mt-8 mb-4">Tire Selection and Pressure</h3>
        <p>Street tires will not cut it. You need aggressive all-terrain or mud-terrain tires. For dedicated pullers, "cut" tires—where the front edges of the tread blocks are sharpened by a specialized machine—provide an unfair advantage by digging violently into the clay. Tire pressure should be dropped significantly (often between 25-35 PSI depending on the tire and track surface) to widen the footprint and maximize grip.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Ultimate Commitment</h2>
        <p>Prepping a Duramax for pulling season is a major commitment. It requires a meticulous balance of chassis reinforcement, drivetrain hardening, massive fueling, and precision tuning. It is an expensive and demanding sport, but the feeling of dragging a multi-ton sled past the 300-foot mark while the exhaust screams and the crowd roars is completely unmatched.</p>
        <p>If you are ready to take your Duramax from a daily street cruiser to a track-dominating force, <strong>No Way Man Diesel</strong> is your partner in performance. We don’t just bolt on parts; we engineer competitive vehicles based on real-world track experience with our own trucks.</p>
        <p className="mt-8"><em>Don't let a snapped tie-rod or a slipping Allison ruin your season before it begins. Contact us today, bring your Duramax to Novinger, Missouri, and let's build something built to survive the dirt.</em></p>

        <div className="sticky bottom-8 h-0 overflow-visible flex justify-start items-end pointer-events-none z-50 mt-12 -ml-6 md:-ml-24 lg:-ml-32">
          <button 
            onClick={() => setPage('blogs')} 
            className="pointer-events-auto bg-torque-red/10 border-2 border-torque-red hover:bg-torque-red text-white p-3 md:p-4 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            title="Close Blog Post"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const BlogPost3 = ({ setPage }: { setPage: (p: string) => void }) => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700 bg-matte-black min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <div className="mb-12 border-b border-white/10 pb-12">
        <span className="text-torque-red text-sm font-bold uppercase tracking-widest mb-4 block">Builds • Now Published</span>
        <h1 className="text-4xl md:text-5xl font-black italic mb-6 text-white leading-tight">Powerstroke 6.0L: Bulletproofing Demystified - Separating Myth from Mechanical Reality</h1>
        <p className="text-gray-400 text-lg leading-relaxed">No Way Man Diesel explains the true process of bulletproofing the 6.0L, including EGR deletes, ARP studs, OEM oil coolers, and FICM upgrades.</p>
      </div>

      <div className="prose prose-invert prose-red max-w-none space-y-8 text-gray-300">
        <p className="text-lg">In the world of diesel trucks, few engines evoke as much emotion—both passionate defense and outright hatred—as the Ford 6.0L Powerstroke. Introduced in late 2003 to replace the legendary 7.3L, the 6.0L (manufactured by Navistar International as the VT365) was a technological leap forward. It offered improved emissions, variable geometry turbocharging, and incredible throttle response. It was designed to rule the heavy-duty truck market.</p>
        <p className="text-lg">Instead, it became infamous. Online forums are littered with horror stories of blown head gaskets, ruptured EGR coolers, clogged oil coolers, and failed injectors. For a time, the 6.0L was considered a dealership nightmare. However, as the platform aged, brilliant diesel engineers and aftermarket companies dissected the engine, found the root causes of the failures, and developed permanent solutions. The term "Bulletproofing" was born.</p>
        <p className="text-lg">Today, a properly bulletproofed 6.0L Powerstroke is widely considered one of the most reliable and capable diesel engines on the road. At <strong>No Way Man Diesel</strong>, we have resurrected countless 6.0L trucks that were on the way to the scrap yard, turning them into 500+ horsepower tow monsters that run flawlessly. In this comprehensive 2000-word guide, we are going to demystify the 6.0L. We’ll break down exactly what goes wrong, why it happens, and the clinical steps required to fix it once and for all.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Domino Effect of Failure: Why the 6.0L Breaks</h2>
        <p>To fully understand the bulletproofing process, you cannot look at 6.0L failures in isolation. The engine suffers from what mechanics call a "cascade failure." One relatively small, poorly designed component fails, which instantly triggers a chain reaction that destroys larger, more expensive parts. Let's trace the domino effect from the beginning.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Domino 1: The Oil Cooler</h3>
        <p>The 6.0L uses a liquid-to-liquid oil cooler located deep in the engine valley. Engine coolant flows through tiny passageways in the cooler to absorb heat from the engine oil. Unfortunately, Ford utilized a silicate-based coolant (Ford Gold) from the factory. Under extreme heat, the silicates in this coolant break down and turn into a gel or sludge. Also, casting sand leftover from the original engine block manufacturing process tends to circulate in the cooling system.</p>
        <p>This gel and sand constantly hit the tiny heat-exchanger fins in the oil cooler, eventually plugging it up. Once the coolant side of the oil cooler is blocked, engine oil temperatures skyrocket, and coolant is prevented from flowing to the next crucial component in the chain.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Domino 2: The EGR Cooler</h3>
        <p>The Exhaust Gas Recirculation (EGR) cooler is designed to cool super-heated exhaust gases before they are routed back into the intake manifold for emissions control. The EGR cooler relies entirely on coolant flowing <em>out</em> of the oil cooler. When the oil cooler becomes plugged (Domino 1), the EGR cooler is starved of coolant while still being blasted by 1,200-degree exhaust gases.</p>
        <p>Predictably, the thin metal fins inside the EGR cooler flash-boil whatever tiny amount of coolant is left and rupture. Once ruptured, coolant pours directly into the exhaust system (causing huge clouds of white smoke) or flows into the intake manifold, eventually making its way into the combustion chambers.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Domino 3: Blown Head Gaskets</h3>
        <p>Because liquids cannot be compressed, ingesting coolant into the engine cylinder creates massive hydraulic pressure. This process, combined with the fact that Ford used a mere four torque-to-yield head bolts per cylinder (which are known to stretch), results in the catastrophic failure of the head gaskets.</p>
        <p>Furthermore, even without EGR failure, the factory head bolts are simply inadequate to handle the increased cylinder pressures generated by aggressive aftermarket tunes. Thus, the 6.0L earns its reputation as a terrible engine—when in reality, the entire head gasket failure can often be traced back to a clogged oil cooler.</p>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/engine.png" alt="6.0L Coolant Flow Diagram" className="w-full h-auto object-cover" />
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The 5 Pillars of 6.0L Bulletproofing</h2>
        <p>Bulletproofing isn’t a single part you can buy; it is a comprehensive system overhaul designed to eliminate the factory bottlenecks and weak points. To truly claim a 6.0L is bulletproofed, five critical pillars must be addressed.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Pillar 1: Re-Establishing Oil Cooling</h3>
        <p>The absolute first step is correcting the oil cooler issue.</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 ml-6">
          <li><strong>The Flush:</strong> Before tearing the engine down, the entire cooling system must be aggressively chemically flushed to remove the silicates and casting sand that caused the problem in the first place.</li>
          <li><strong>The Solution:</strong> We replace the clogged oil cooler with an updated Ford OEM oil cooler (which has slightly wider coolant passages) or, for severe duty applications, we install an aftermarket air-to-oil cooler kit (like the ones from Bullet Proof Diesel) which completely isolates the oil cooling system from the engine coolant system.</li>
          <li><strong>Coolant Filtration:</strong> To prevent future clogs, an aftermarket coolant filtration system is highly recommended. These bypass filters catch leftover sand and debris before it can ever reach the new cooler. We also mandate the switch from Ford Gold coolant to an Extended Life Coolant (ELC), typically a heavy-duty red coolant (like Cat EC-1) that is free of silicates.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Pillar 2: Addressing the EGR System</h3>
        <p>With the oil cooler handled, we must neutralize the threat of the EGR cooler. Depending on the emissions laws in your specific jurisdiction and the purpose of the truck (e.g., off-road or competition use), there are two ways to handle this.</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 ml-6">
          <li><strong>The EGR Upgrade:</strong> If the vehicle must retain its emissions equipment, the factory EGR cooler is replaced with a heavy-duty, stainless-steel tube-style EGR cooler (such as those from Bullet Proof Diesel or BDP). These coolers feature internal tubes that are TIG welded and exponentially stronger than the factory finned design. They almost never rupture, even under extreme heat.</li>
          <li><strong>The EGR Delete:</strong> For dedicated off-road or track vehicles, deleting the EGR system entirely by removing the cooler and installing a block-off plate is the most absolute guarantee against failure.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Pillar 3: ARP Head Studs and Precision Machine Work</h3>
        <p>Just like the 6.7L Cummins, fixing the head gaskets means doing it correctly. The cab of the truck is typically lifted off the chassis to provide clear access. The cylinder heads are removed and sent off for precision magnafluxing, pressure testing, and decking to ensure perfectly flat mating surfaces.</p>
        <p>The weak factory torque-to-yield head bolts are thrown in the trash. We install high-tensile <strong>ARP Head Studs</strong> and heavy-duty Multi-Layer Steel (MLS) gaskets. Because the 6.0L only uses four fasteners per cylinder, clamping force is absolutely critical. ARP studs provide the necessary clamping force to ensure the heavy cast-iron cylinder heads never lift, even when you inevitably plug in a programmer and turn the tuning up.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Pillar 4: The FICM (Fuel Injection Control Module)</h3>
        <p>The 6.0L utilizes a unique HEUI (Hydraulically Actuated Electronically Controlled Unit Injector) system. The injectors are fired by high-pressure engine oil, commanded by the FICM. The FICM requires exactly 48 volts to operate the injectors efficiently. Over time, the internal soldering inside the factory FICM degrades from engine vibration and heat, causing the voltage to drop to 45v, 40v, or even lower.</p>
        <p>Low FICM voltage causes rough running, cold-start issues, and will quickly destroy all eight expensive fuel injectors. A comprehensive bulletproofing job includes testing the FICM and upgrading the power board to a heavy-duty, 48v or 58v billet unit.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Pillar 5: Updated Stand Pipes and Dummy Plugs</h3>
        <p>Because the injectors rely on High-Pressure Oil to fire, the system must remain perfectly sealed. The 2004.5 - 2007 6.0L engines are infamous for developing high-pressure oil leaks from the D-rings on the internal stand pipes and dummy plugs. When these O-rings blow out, the engine will suffer a "no-start when hot" condition.</p>
        <p>While the engine is apart for head studs, installing the updated Ford OEM versions of the stand pipes and dummy plugs—which feature upgraded white Teflon backup rings in addition to the rubber D-rings—permanently solves this oil leak vulnerability.</p>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/inside_the_engine.png" alt="Super Duty Cab Off" className="w-full h-auto object-cover" />
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Misunderstood Injector System (HEUI)</h2>
        <p>One of the most common complaints about the 6.0L is "stiction" in the injectors. Because the injectors rely on highly pressurized engine oil to open the fuel valves, the quality of your engine oil dictates the lifespan of your fuel system.</p>
        <p>When oil breaks down due to heat and extended drain intervals, internal friction essentially glues the spool valves inside the injectors shut—this is "stiction." It results in terrible cold starts and aggressive bucking until the engine reaches operating temperature.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Maintaining a Bulletproofed 6.0L</h3>
        <p>Once we have bulletproofed your truck, keeping it reliable requires a religious commitment to maintenance:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 ml-6">
          <li><strong>Oil Changes:</strong> The 6.0L shears oil faster than almost any other diesel. 5,000-mile oil change intervals using a high-quality synthetic 5W-40 oil (like Rotella T6) and genuine Motorcraft filters are mandatory.</li>
          <li><strong>Fuel Filters:</strong> Changing both the upper and lower fuel filters every 10,000 miles ensures clean fuel pressure to prevent injector scoring.</li>
          <li><strong>Stiction Eliminators:</strong> Using oil additives such as Hot Shot’s Secret or Archoil during oil changes keeps the intricate parts of the HEUI injectors perfectly clean.</li>
        </ul>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Should You Buy a 6.0L Powerstroke?</h2>
        <p>If you are shopping for a used heavy-duty truck, the 6.0L Powerstroke represents an incredible value proposition. Because of their terrible internet reputation, pristine 6.0L trucks can be bought for thousands of dollars less than an equivalent Duramax or Cummins of the same era.</p>
        <p>If you purchase a cheap 6.0L and immediately bring it to a specialized facility like <strong>No Way Man Diesel</strong>, you can invest the money you saved into our full bulletproofing process. The result? You drive away with an incredibly capable, sharp-looking Ford Super Duty that incorporates bulletproof reliability and easily supports 450 to 500 rear-wheel horsepower on tow tunes. It is one of the smartest financial moves in the diesel truck game, provided you use the right mechanics to do the work.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Final Output: Absolute Mechanical Authority</h2>
        <p>The Ford 6.0L Powerstroke is not a bad engine; it was a brilliantly designed engine crippled by a few small, poorly executed factory parts.</p>
        <p>By systematically addressing the oil cooler, EGR cooler, head bolts, FICM, and high-pressure oil system, the domino effect is stopped dead in its tracks. A fully bulletproofed 6.0L sounds incredible, tows flawlessly, and will serve you dependably for hundreds of thousands of miles.</p>
        <p>At <strong>No Way Man Diesel</strong>, we don't guess when it comes to the 6.0L. We use strictly OEM or track-proven aftermarket replacement parts. We pull the cabs, deck the heads, and rebuild the legends. If you have a Powerstroke that is puking coolant, suffering from stiction, or if you simply want to buy some peace of mind before hauling your 5th wheel across the midwest, we possess the mechanical authority to make it right.</p>

        <p className="mt-8"><em>Ready to end the 6.0L anxiety? Call the Powerstroke experts at No Way Man Diesel at <strong>(660) 216-5453</strong> to schedule your comprehensive bulletproofing service today, or visit our <a href="/?page=contact" className="text-torque-red hover:underline">Contact Page</a> to book shop time.</em></p>

        <div className="sticky bottom-8 h-0 overflow-visible flex justify-start items-end pointer-events-none z-50 mt-12 -ml-6 md:-ml-24 lg:-ml-32">
          <button 
            onClick={() => setPage('blogs')} 
            className="pointer-events-auto bg-torque-red/10 border-2 border-torque-red hover:bg-torque-red text-white p-3 md:p-4 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            title="Close Blog Post"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const BlogPost4 = ({ setPage }: { setPage: (p: string) => void }) => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700 bg-matte-black min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <div className="mb-12 border-b border-white/10 pb-12">
        <span className="text-torque-red text-sm font-bold uppercase tracking-widest mb-4 block">Shop Notes • Now Published</span>
        <h1 className="text-4xl md:text-5xl font-black italic mb-6 text-white leading-tight">Why We Choose S400 Turbos For Megatron: Airflow, Drive Pressure, and 1000+ HP</h1>
        <p className="text-gray-400 text-lg leading-relaxed">We break down the science behind our competition pulling truck's compound turbo setup, explaining compressor maps, turbine housings, and why the BorgWarner S400 platform is the undisputed king of dirt.</p>
      </div>

      <div className="prose prose-invert prose-red max-w-none space-y-8 text-gray-300">
        <p className="text-lg">If you have ever stood near the starting line at a Missouri truck pull, you know the sound. It's an unmistakable, high-pitched scream that cuts through the roar of a straight-piped diesel exhaust. That shriek is the sound of atmospheric air being violently compressed at over 100,000 RPMs. It's the sound of a competition turbocharger fighting for its life to feed an engine that's burning fuel at an unimaginable rate.</p>
        <p className="text-lg">At <strong>No Way Man Diesel</strong>, our competition pulling truck, "Megatron," is built to do one thing: drag 40,000 pounds of dead weight through the dirt faster and farther than anyone else. To do that, the engine produces well north of 1,000 horsepower. But making that kind of power isn't just about dumping fuel into the cylinders; it's about matching that massive fuel volume with an equally massive volume of dense, oxygen-rich air.</p>
        <p className="text-lg">In this exhaustive 2000-word deep dive, we are going to open the hood on Megatron and explain the exact science behind our turbocharger selection. We will break down why we abandoned variable geometry turbos (VGTs), why we chose the BorgWarner S400 platform, and the delicate balancing act between manifold boost and exhaust drive pressure.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Problem with Variable Geometry Turbos (VGTs)</h2>
        <p>Almost all modern heavy-duty pickup trucks (Cummins 6.7L, Duramax LML/L5P, Powerstroke 6.7L) come from the factory equipped with Variable Geometry Turbochargers. VGTs use internal exhaust vanes that physically open and close. At low RPMs, the vanes close to act like a smaller turbo, spooling instantly and providing excellent off-the-line torque. At high RPMs, the vanes open to act like a larger turbo to flow more air.</p>
        <p>For a daily driver or a tow rig, a VGT is a marvel of modern engineering. However, for a 1000+ horsepower competition pulling truck, VGTs are a massive liability.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Exhaust Restriction Bottleneck</h3>
        <p>To make 1000 horsepower, you must inject an incredible amount of fuel. Burning that fuel creates a massive volume of superheated exhaust gas. The intricate moving vanes inside a VGT housing present a physical restriction to that exhaust flow. When you try to force that much exhaust gas through a VGT at wide-open throttle, the exhaust <strong>drive pressure</strong> skyrockets.</p>
        <p>Drive pressure is the pressure of the exhaust gases in the manifold <em>before</em> they pass through the turbo. Ideally, your drive pressure should be closely matched to your intake boost pressure (a 1:1 ratio). In an over-fueled VGT setup, it is common to see 50 PSI of boost, but 90+ PSI of drive pressure. That extreme exhaust backpressure creates immense heat (EGTs), chokes the engine on the top end, and frequently causes the engine to lift the cylinder head and blow the head gaskets.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Mechanical Failure</h3>
        <p>Furthermore, the sliding vanes and unison rings inside a VGT are prone to physical failure when subjected to 1,800-degree competition EGTs and 60+ PSI of boost. The soot bakes onto the vanes, causing them to stick. A sticking VGT on a pulling track means an instant loss of power or a catastrophic over-speeding of the compressor wheel.</p>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/turbos.png" alt="VGT vs Fixed Geometry S400 turbocharger" className="w-full h-auto object-cover" />
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Enter the Fixed Geometry Heavyweight: The BorgWarner S400</h2>
        <p>To solve the bottleneck and survive the torture of dirt pulling, we rely entirely on fixed geometry turbochargers. Specifically, the BorgWarner S-Series. While the S300 frame is excellent for high-performance street trucks, a dedicated sled puller like Megatron requires the immense physical size and airflow capability of the S400 frame.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">What Makes the S400 Different?</h3>
        <p>The S400 is not a delicate, emission-friendly piece of hardware. It is a massive, incredibly durable industrial turbocharger originally designed for heavy commercial equipment. It features a massive journal bearing system (or an upgraded severely oversized ball-bearing cartridge), a massive shaft diameter, and huge turbine and compressor wheels.</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 ml-6">
          <li><strong>Zero Moving Exhaust Vanes:</strong> Because the S400 is a fixed geometry turbo, the turbine housing is basically a massive cast-iron funnel. There is nothing to stick, melt, or fail. The exhaust gas enters the housing, spins the turbine wheel, and exits cleanly.</li>
          <li><strong>Massive Airflow (Pounds Per Minute):</strong> A factory turbo might flow 65 pounds of air per minute. A large S400 (like an S475 or S480) can easily flow 110 to 130+ pounds per minute. That sheer volume of air is what supports four-digit horsepower numbers while keeping EGTs in check.</li>
          <li><strong>Lower Drive Pressure:</strong> Because the exhaust housing (typically a T4 or T6 footprint) is so large, drive pressure stays incredibly low. On Megatron, we routinely see near 1:1 drive-to-boost ratios even at 70 PSI, meaning we aren't choking the engine.</li>
        </ul>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Single vs. Compound Debate on the Track</h2>
        <p>When you commit to the S400 platform for a pulling truck, you have two architectural choices: run a single massive S400 turbo, or run a compound twin-turbo setup (using an S300/S400 or an S400/S500 combo). Both have distinct advantages depending on your track class rules.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Large Single (S475 / S480)</h3>
        <p>Many "Work Stock" or "Limited Pro Stock" pulling classes mandate a single turbocharger, often restricting the inducer size (e.g., a 2.5-inch or 2.6-inch rule). Running a massive single S400 has benefits: it's lighter, there is less under-hood piping to blow apart, and it's easier to package.</p>
        <p>The drawback to a large single fixed-geometry turbo is spool time. Because the exhaust housing is so large and there are no vanes to restrict flow, a giant S400 requires immense heat and RPM to start spinning. To get the truck moving, the driver must stage furiously, bringing the engine near 3,000 RPM, slipping the clutch or converter, and using heavy fuel to light the turbo before unleashing the truck.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Compound Setup (The Best of Both Worlds)</h3>
        <p>For Megatron, operating in unlimited or less restrictive classes allows us to utilize compound turbos. A compound setup links two turbos together sequentially. A smaller, high-pressure turbo (like an S366 or S467) is bolted directly to the exhaust manifold. The exhaust gas exits this smaller turbo and immediately feeds into a massive low-pressure (atmospheric) turbo, like an S480 or even an S488.</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 ml-6">
          <li><strong>Instant Spool:</strong> The smaller turbo lights almost instantly off the starting line, forcing air into the engine and creating the initial torque needed to get the 40,000-pound sled moving.</li>
          <li><strong>Top-End Hurricane:</strong> Once the engine is at high RPM, the small turbo becomes a restriction—but this is when the massive atmospheric S400 wakes up. The S400 forces a hurricane of dense, compressed air directly into the intake of the smaller turbo, compounding the pressure. The result is 70 to 90 PSI of total manifold boost with incredibly cool intake temperatures.</li>
        </ul>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/turbos.png" alt="Megatron's Compound Turbo Piping" className="w-full h-auto object-cover" />
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Managing the Air: Wastegates and Intercooling</h2>
        <p>When you are pushing an S400 turbo close to its absolute map limit, you have to control the chaos. If an S400 barks (compressesor surge) under 80 PSI of boost, it can snap the billet shaft in half instantly.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">External Wastegates</h3>
        <p>To safely manage the massive exhaust energy, we rely on high-flow external wastegates (like precision 46mm or 60mm gates). If the drive pressure in the exhaust manifold exceeds our safe limit, the wastegate physically opens, bypassing the turbine wheel and dumping the exhaust straight out the hood stack. This prevents the turbo from overspeeding and acts as a mechanical safety valve for the entire engine.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Custom Air-to-Water Intercoolers</h3>
        <p>Compressing air to 80 PSI creates friction, and friction creates incredible heat. Hot air is less dense and less oxygenated. While factory air-to-air intercoolers are fine for the street, they are totally inadequate on a track. On Megatron, we utilize a massive custom air-to-water intercooler packed with ice in the bed of the truck. This drops the intake air temperatures from 400+ degrees down to just above freezing just before the air enters the intake manifold. Cold, dense air equals safe, massive horsepower.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Bottom Line on Airflow</h2>
        <p>The BorgWarner S400 is not just a turbocharger; it is a foundational building block for any serious diesel horsepower application. They are incredibly rugged, surprisingly affordable to rebuild, and offer limitless variations of compressor and turbine wheel sizes to perfectly match your fueling strategy.</p>
        <p>Building a 1000+ horsepower truck like Megatron isn't just bolting random parts together. It's an exact mathematical calculation of volumetric efficiency, fuel delivery, and turbine aerodynamics. The S400 platform allows us to calculate exactly what we need, build the turbo to spec, and unleash hell on the track.</p>
        <p>Whether you want to upgrade your daily driver with a subtle S300 second-gen swap or you want to build a dedicated pulling truck with massive S400 compounds, <strong>No Way Man Diesel</strong> has the track experience to spec, build, and tune your perfect airflow setup.</p>
        
        <p className="mt-8"><em>Want to talk turbos? Contact the experts at No Way Man Diesel at <strong>(660) 216-5453</strong> or visit our <a href="/?page=contact" className="text-torque-red hover:underline">Contact Page</a> to start planning your build.</em></p>

        <div className="sticky bottom-8 h-0 overflow-visible flex justify-start items-end pointer-events-none z-50 mt-12 -ml-6 md:-ml-24 lg:-ml-32">
          <button 
            onClick={() => setPage('blogs')} 
            className="pointer-events-auto bg-torque-red/10 border-2 border-torque-red hover:bg-torque-red text-white p-3 md:p-4 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            title="Close Blog Post"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const BlogPost5 = ({ setPage }: { setPage: (p: string) => void }) => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700 bg-matte-black min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <div className="mb-12 border-b border-white/10 pb-12">
        <span className="text-torque-red text-sm font-bold uppercase tracking-widest mb-4 block">Maintenance • Now Published</span>
        <h1 className="text-4xl md:text-5xl font-black italic mb-6 text-white leading-tight">Missouri Winter Diesel Checklist: Surviving Sub-Zero Temperatures</h1>
        <p className="text-gray-400 text-lg leading-relaxed">Winter in the Midwest is unforgiving to diesel engines. We cover block heaters, grid heaters vs glow plugs, fuel anti-gel additives, 5w40 synthetic oil, and battery health to ensure your truck starts on the coldest mornings.</p>
      </div>

      <div className="prose prose-invert prose-red max-w-none space-y-8 text-gray-300">
        <p className="text-lg">If there is one thing a diesel engine universally despises, it is the bitter, biting cold of a Midwest winter morning. When the ambient temperature drops into the single digits (or sub-zero), the massive cast-iron blocks, thick engine oil, and complex fuel systems of a heavy-duty diesel truck all conspire against the simple act of starting.</p>
        <p className="text-lg">Unlike gasoline engines, which rely on a spark plug to ignite a highly volatile vapor, diesel engines rely entirely on the heat generated by rapid compression to ignite their fuel. When the cylinder walls are ice cold and the intake air is frigid, that necessary heat is rapidly absorbed before ignition can occur.</p>
        <p className="text-lg">At <strong>No Way Man Diesel</strong>, winter is our busiest season for emergency calls. Frustrated owners call us because their Duramax is stranded in a driveway, their Powerstroke refuses to crank fast enough, or their Cummins fuel filters have turned into a solid block of wax. In this massive 2000-word winter survival guide, we will break down the exact science of cold-weather diesel operation and provide a bulletproof checklist to ensure your truck starts on command all winter long.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Step 1: The Chemistry of Cold Fuel (Gelling)</h2>
        <p>The single most common cause of a "no-start" condition in the winter is fuel gelling. Diesel fuel naturally contains paraffin wax. This wax is excellent for lubrication and energy density, but it is highly temperature-sensitive. When the temperature drops below approximately 15°F (-9°C), the wax begins to crystallize and precipitate out of the liquid fuel.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Cloud Point and The Pour Point</h3>
        <p>The temperature at which you first see the fuel become cloudy is the <em>Cloud Point</em>. A few degrees below this is the <em>Cold Filter Plugging Point (CFPP)</em>, which is the exact moment the wax crystals become large enough to clog the tiny microscopic pores of your fuel filter. Once the filter is plugged, the high-pressure injection pump is instantly starved of fuel, and the engine dies or refuses to start.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Winter Fuel and Anti-Gel Additives</h3>
        <p>Most gas stations in the Midwest transition to a "winter blend" diesel (a mix of No. 2 and No. 1 diesel fuel) late in the fall, which lowers the gelling point. However, this blend is not foolproof, especially during sudden deep freezes or polar vortex events.</p>
        <p>To guarantee survival, you must manually run a high-quality anti-gel additive (like Howes, Stanadyne, or Hot Shot's Secret Diesel Winter Anti-Gel) with every fill-up starting in November. Anti-gel additives do not "melt" the wax; they chemically modify the shape of the wax crystals, keeping them small enough to pass safely through the fuel filters without accumulating.</p>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/pouring_oil.png" alt="Gelled Diesel Fuel Example" className="w-full h-auto object-cover" />
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Step 2: Engine Oil Viscosity (5W-40 Synthetic is King)</h2>
        <p>Most diesel owners run petroleum-based 15W-40 engine oil year-round. While 15W-40 provides fantastic protection during heavy summer towing, it is a massive hindrance during a cold start.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The "Syrup" Effect</h3>
        <p>The "W" in motor oil stands for Winter. The number preceding it indicates the oil's viscosity (thickness) when cold. At 0°F, conventional 15W-40 oil flows with the consistency of cold maple syrup. When you turn the key, the starter motor has to fight against 3 or 4 gallons of that thick sludge just to rotate the massive internal engine components.</p>
        <p>Furthermore, because the oil is incredibly thick, it takes significantly longer for the oil pump to push it through the galleries to lubricate the turbocharger bearings and the top end of the engine. The vast majority of engine wear occurs during the first few seconds of a cold start. If you own a 6.0L or 7.3L Powerstroke with HEUI injectors (which rely on high-pressure oil to fire), thick 15W-40 oil causes extreme "stiction," resulting in violent bucking, misfires, and white smoke until the engine warms up.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Switching to Full Synthetic 5W-40</h3>
        <p>The single best mechanical change you can make for the winter is switching your oil to a high-quality, full-synthetic 5W-40 (like Rotella T6 or Valvoline Premium Blue). Synthetic 5W-40 flows exponentially faster at sub-zero temperatures, drastically reducing the physical strain on your starter, enabling the engine to spin over fast enough to generate ignition heat, and providing instant lubrication to your turbocharger.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Step 3: Batteries, Alternators, and Starting RPM</h2>
        <p>As mentioned earlier, diesels require rapid compression to generate the heat necessary for ignition. If the engine does not spin fast enough, the heat dissipates into the cylinder block, and the truck will simply crank endlessly without starting. The speed at which the engine cranks is entirely dependent on the health of your electrical system.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Cold Cranking Amp (CCA) Requirement</h3>
        <p>Diesels utilize massive dual-battery systems because standard automotive batteries cannot provide the massive surge of amperage required to turn over a high-compression 6.7L engine. Cold temperatures wreak havoc on battery chemistry; a battery that provides 100% capacity at 80°F will only provide roughly 50% capacity at 0°F.</p>
        <p>If your batteries are more than three or four years old, they may still start the truck in the summer but will fail you entirely in the winter. At No Way Man Diesel, we load-test batteries individually (disconnecting them first, as testing them in parallel masks a weak battery). We highly recommend installing premium AGM (Absorbent Glass Mat) batteries with at least 850 Cold Cranking Amps (CCA) per battery to ensure maximum cranking speed.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Alternator Output</h3>
        <p>In the winter, your alternator is working heavily overtime. Not only is it running the headlights, blower motor, and heated seats, but on modern diesels, it has to replenish batteries that were deeply discharged by massive current draws from grid heaters and glow plugs. Upgrading to a high-output alternator or dual-alternator setup ensures the batteries stay fully topped off during short winter commutes.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Step 4: Intake Heating (Glow Plugs vs. Grid Heaters)</h2>
        <p>To combat the heat-absorbing cylinder walls of a cold engine, diesel manufacturers utilize pre-heating systems before the engine ever begins cranking. Understanding your specific system is critical for winter maintenance.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Glow Plugs (Duramax and Powerstroke)</h3>
        <p>GM and Ford utilize glow plugs. A glow plug looks like a small heating element threaded directly into the cylinder head. When you turn the key to the "Run" position, the Wait-To-Start light illuminates, and electricity is sent to the tips of the glow plugs. The tips literally glow bright orange, super-heating the ambient air directly inside the combustion chamber.</p>
        <p>Over time, glow plugs burn out, and the glow plug control modules fail. If two or three glow plugs are dead on an engine, those specific cylinders will misfire upon startup, causing severe vibration and a cloud of unburnt white fuel smoke. Before winter hits, a diagnostic scan should be performed to verify the resistance and health of all eight glow plugs.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Grid Heaters (Cummins)</h3>
        <p>Dodge/RAM Cummins engines take a different approach. Because the inline-six engine has less surface area, Cummins chose to use an intake grid heater. Located directly in the intake manifold, the grid heater consists of a massive, heavy-duty electrical heating element. When activated, it heats the vast column of incoming air before it reaches the cylinders.</p>
        <p>The Cummins grid heater draws phenomenal amounts of amperage (over 100 amps). If a grid heater relay sticks, it will melt the element or drain the batteries in minutes. At our shop, we test the grid heater relays and clean all the massive electrical connection points to ensure they aren't losing voltage to corrosion.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Step 5: The Block Heater (Plug It In)</h2>
        <p>The single most effective winter weapon at your disposal is the factory block heater. Almost every heavy-duty diesel comes equipped with a block heater element installed directly into a freeze plug port in the engine block water jacket.</p>
        <p>The block heater is essentially a high-wattage water heater. When you plug the cord hanging from your front bumper into a standard 120V outlet overnight, the element slowly heats the engine coolant. This warmth radiates throughout the massive cast-iron engine block, heating the cylinders and slightly warming the engine oil. Plugging the truck in ensures near-instant starts, faster cabin heat, vastly reduced engine wear, and less strain on the batteries and starter.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Inspecting the Cord</h3>
        <p>The most common failure point of a block heater isn't the heating element itself; it's the 120V extension cord. Because it's exposed to road salt, ice, and vibration at the front bumper, the prongs often corrode or the wiring breaks internally. Inspect the cord visually and use a multimeter to check the resistance of the element before the snow flies.</p>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/truck_in_the_snow.png" alt="Diesel truck plugged into a block heater in the snow" className="w-full h-auto object-cover" />
        </div>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Winter Fronts and Condensation Management</h2>
        <p>Even if you get the truck started, maintaining heat during a drive in sub-zero weather can be difficult. A massive diesel radiator is extremely efficient at shedding heat. If you are not towing a load, the engine may struggle to maintain the 190°F operating temperature required for optimal efficiency and cabin heating. Installing a winter front (a specialized cover that blocks airflow across the radiator grille) forces the engine to retain its heat.</p>
        <p>Finally, keep your fuel tank as close to full as possible throughout the winter. A half-empty fuel tank contains an enormous volume of air. As temperatures fluctuate, the moisture in that air condenses into liquid water on the inside walls of the fuel tank. That water trickles down, enters the fuel system, eventually freezes in the fuel lines, or destroys your injection pump. Keeping the fuel tank full leaves no room for moist air to exist.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Be Prepared, Not Stranded</h2>
        <p>Owning a diesel truck in the Midwest requires proactive responsibility. If you ignore maintenance, the cold will find your weak points without mercy.</p>
        <p>At <strong>No Way Man Diesel</strong>, we offer comprehensive Winterization Packages. We load-test both batteries, check alternator output, scan the glow plug or grid heater circuits, inspect block heater cords, swap your oil to premium synthetic 5W-40, and change both fuel filters. We prep the truck so that when the thermometer hits -15°F, you can turn the key with absolute confidence.</p>
        
        <p className="mt-8"><em>Don't wait until the first blizzard. Call No Way Man Diesel at <strong>(660) 216-5453</strong> or visit our <a href="/?page=contact" className="text-torque-red hover:underline">Contact Page</a> to schedule your Winterization Prep today.</em></p>

        <div className="sticky bottom-8 h-0 overflow-visible flex justify-start items-end pointer-events-none z-50 mt-12 -ml-6 md:-ml-24 lg:-ml-32">
          <button 
            onClick={() => setPage('blogs')} 
            className="pointer-events-auto bg-torque-red/10 border-2 border-torque-red hover:bg-torque-red text-white p-3 md:p-4 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            title="Close Blog Post"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const BlogPost6 = ({ setPage }: { setPage: (p: string) => void }) => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700 min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <div className="mb-12">
        <span className="text-torque-red text-sm font-bold uppercase tracking-widest mb-4 block">Tech Talk • Now Published</span>
        <h1 className="text-5xl font-black italic mb-6 text-white leading-tight">Beyond the Engine: Mastering Fluid Maintenance and Interior Monitoring</h1>
        <div className="flex items-center gap-4 text-gray-400 font-bold uppercase tracking-widest text-sm">
          <span>By Lead Technician</span>
          <span>•</span>
          <span>12 Min Read</span>
        </div>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:italic prose-a:text-torque-red">
        <p className="text-xl text-gray-300 leading-relaxed font-light mb-8 italic">
          We spend thousands of dollars chasing horsepower, upgrading turbos, and beefing up transmissions. But the harsh reality of diesel ownership is that none of those expensive hard parts matter if you neglect the absolute baselines of performance: premium fluid maintenance and accurate interior telemetry monitoring to keep tabs on your engine's vital signs.
        </p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Lifeblood: Why "Good Enough" Oil Doesn't Cut It</h2>
        <p>Your engine oil does much more than just lubricate moving parts. In a modern high-performance diesel, particularly HEUI engines like the 7.3L and 6.0L Powerstroke where high-pressure oil actively fires the fuel injectors, the sheer quality and anti-foaming properties of your engine oil essentially dictate how well the truck runs, idles, and performs.</p>
        <p>Many diesel owners blindly pour generic conventional 15W-40 into their crankcases, completely ignoring the chemical shear stability required when pushing double the factory horsepower. Under extreme pressure and heat, inferior oil breaks down rapidly. Its molecular chains fracture, viscosity drops, and the protective film between your main bearings and crankshaft essentially disappears. If you are towing 20,000 lbs up a steep grade with compound turbos shoving 60 PSI into the cylinders, conventional oil simply will not survive the thermal load.</p>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/oil_can.png" alt="Premium synthetic diesel oil and fluid maintenance additives" className="w-full h-auto object-cover" />
        </div>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Argument for Full Synthetic 5W-40</h3>
        <p>At No Way Man Diesel, we exclusively run and recommend full-synthetic 5W-40 formulations (like Schaeffer's, Amsoil, or Rotella T6) for nearly all high-performance and daily-driven applications. The benefits are undeniable and measurable:</p>
        <ul className="list-disc pl-6 space-y-3 my-8 text-gray-300">
          <li><strong>Cold Start Protection:</strong> The "5W" winter rating means the oil remains incredibly fluid at deeply sub-zero temperatures. Unlike gooey 15W-40 that takes agonizing seconds to reach the valvetrain on a cold morning, 5W-40 pumps instantly, drastically reducing cold-start wear.</li>
          <li><strong>Thermal Stability:</strong> Pure synthetic base stocks can withstand localized oil temperatures exceeding 250°F around the turbocharger bearings without coking (turning into hard carbon deposits).</li>
          <li><strong>Stiction Elimination:</strong> For HEUI engines, the high-detergent packages found in premium synthetics strip away the varnish inside the injector spool valves, practically eliminating the dreaded cold-engine "stiction" misfires.</li>
        </ul>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Oil Analysis: Your Engine's Blood Test</h2>
        <p>If you aren't doing Used Oil Analysis (UOA) on your performance diesel, you are flying completely blind. For roughly $30, a laboratory will break down a sample of your used oil and provide a chemical readout of microscopic wear metals (iron, aluminum, copper, lead), fuel dilution percentages, coolant contamination, and remaining additive life.</p>
        <p>We have literally saved customers from instantly destroying $15,000 built engines because a routine oil analysis detected a spike in sodium and potassium (indicating early head gasket/EGR cooler failure) or trace amounts of fuel (indicating a leaking injector cup long before it caused a runaway scenario).</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Data is Power: Upgrading Your Interior Telemetry</h2>
        <p>You can pour the finest synthetic fluids into your truck, but if you have no idea what those fluid temperatures and pressures are doing under load, you're at the mercy of factory "dummy gauges." The factory dashboard gauges on almost all modern trucks are heavily electronically dampened. The factory coolant temp gauge, for example, will sit completely dead-center whether the engine is at 180°F or a catastrophic 230°F. It only moves to "Hot" when it is mathematically too late to save the engine.</p>
        <p>This is why outfitting your interior with highly accurate, real-time digital monitoring systems (like an Edge CTS3, Banks iDash, or traditional analog A-pillar gauges) is an absolute mandatory upgrade for any modified diesel.</p>

        <div className="my-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img src="/carimages/vehicle_interior.png" alt="A highly upgraded diesel truck interior featuring custom gauges and an advanced digital monitor" className="w-full h-auto object-cover" />
        </div>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Holy Trinity of Diesel Gauges</h3>
        <p>If you are upgrading your interior telemetry, there are three absolute, non-negotiable parameters you must monitor directly from the sensors:</p>
        <ul className="list-disc pl-6 space-y-3 my-8 text-gray-300">
          <li><strong>EGT (Exhaust Gas Temperature):</strong> A thermocouple drilled directly into the exhaust manifold prior to the turbo. Diesel fuel acts as the engine's throttle—more fuel means more heat. If you hit an aggressive tune while towing and your EGTs surpass 1,400°F for a sustained period, you will literally melt the aluminum pistons and destroy the turbine wheel. Only a dedicated EGT gauge can warn you to back out of the throttle in time.</li>
          <li><strong>Actual Coolant / Oil Delta:</strong> Specifically critical for 6.0L and 6.4L Powerstrokes, you must monitor the exact numerical divergence (Delta) between your Engine Oil Temperature (EOT) and Engine Coolant Temperature (ECT). Under load, if the oil temperature exceeds the coolant temperature by more than 15 degrees, your oil cooler is completely clogged and total failure is imminent.</li>
          <li><strong>Fuel Pressure / Lift Pump Pressure:</strong> High-pressure injection pumps (like the CP3, CP4, or HPOP) rely entirely on incoming low-pressure fuel to keep them cooled and lubricated. If you drop fuel pressure under heavy acceleration due to clogged filters or a weak factory lift pump, the high-pressure pump runs dry, shears its internals, and sends a wave of metal shrapnel directly into all eight fuel injectors. An interior low-pressure fuel gauge will immediately warn you of a drop before it destroys the fuel system.</li>
        </ul>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">Breathing Easy: The Forgotten Cabin Filters</h2>
        <p>While we are focusing on the interior, there is a physical maintenance item inside the cab that is shockingly overlooked: the Cabin Air Filter. Most diesel owners meticulously change their high-flow engine air filters every 10,000 miles but will drive for five years without touching the cabin air filter.</p>
        <p>Because diesel trucks frequently operate in highly dusty agricultural environments, on dirt sled-pulling tracks, or amidst thick exhaust soot, the cabin filter becomes utterly impacted with debris. A clogged cabin filter severely restricts the HVAC blower motor, leading to blown resistors, terrible A/C performance in the summer, and a foul, dusty odor inside the cab. Replacing this $20 interior filter takes less than five minutes and drastically improves the truck's livability on long hauls.</p>

        <h2 className="text-3xl font-bold italic text-white mt-12 mb-6">The Final Verdict</h2>
        <p>Building a high-horsepower, bulletproof diesel truck is an exercise in balancing power output with structural rigidity and intelligent active monitoring. Changing your fluids with top-tier synthetics, utilizing chemical anti-wear additives, and outfitting your vehicle's interior with the digital screens and gauges required to actually analyze how those fluids are performing is the true secret behind the million-mile trucks you see rolling out of our bays.</p>
        <p>Stop relying on factory dashboard dummy needles. Stop pouring off-the-shelf conventional oil into a heavily fueled engine. Control the data from your driver's seat, maintain the fluids with religious precision, and your truck will reward you with unrelenting reliability.</p>

        <div className="bg-gunmetal border border-torque-red/50 p-8 my-12 text-center shadow-lg transform hover:scale-105 transition-transform duration-500 rounded-xl">
          <h3 className="text-2xl font-bold italic text-white mb-4">Want To Upgrade Your Interior Telemetry?</h3>
          <p className="text-gray-300 mb-6">Whether you need an Edge CTS3 monitor, customized A-pillar analog gauges, or a comprehensive fluid flush with premium synthetics, we have exactly what you need.</p>
          <button onClick={() => setPage('contact')} className="bg-torque-red hover:bg-red-700 text-white font-bold py-3 px-8 skew-x-[-10deg] uppercase tracking-widest transition-colors duration-300">
            <span className="skew-x-[10deg] block">Schedule Shop Time</span>
          </button>
        </div>

        <div className="sticky bottom-8 h-0 overflow-visible flex justify-start items-end pointer-events-none z-50 mt-12 -ml-6 md:-ml-24 lg:-ml-32">
          <button 
            onClick={() => setPage('blogs')} 
            className="pointer-events-auto bg-torque-red/10 border-2 border-torque-red hover:bg-torque-red text-white p-3 md:p-4 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            title="Close Blog Post"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const BlogsPage = ({ setPage }: { setPage: (p: string) => void }) => {
  const blogs = [
    { id: 'blog-cummins-head-gasket', title: "The Truth About 6.7L Cummins Head Gaskets", category: "Tech Talk", date: "Now Published", excerpt: "We dive deep into why the 6.7L Cummins needs head studs and what you can do to prevent failure...", image: "/carimages/inside_the_engine.png" },
    { id: 'blog-duramax-pulling', title: "Prepping Your Duramax For Pulling Season", category: "Performance", date: "Now Published", excerpt: "From tie-rod sleeves to EFI Live tuning, here is everything you need to get your L5P track-ready...", image: "/carimages/truck_in_the_dirt.png" },
    { id: 'blog-powerstroke-60', title: "Powerstroke 6.0L: Bulletproofing Demystified", category: "Builds", date: "Now Published", excerpt: "Is the 6.0L really as bad as they say? Not if you fix the factory flaws. Here is our exact blueprint...", image: "/carimages/engine.png" },
    { id: 'blog-megatron-turbos', title: "Why We Choose S400 Turbos For Megatron", category: "Shop Notes", date: "Now Published", excerpt: "Track data and airflow numbers explaining our compound setup on our competition pulling truck...", image: "/carimages/turbos.png" },
    { id: 'blog-winter-checklist', title: "Missouri Winter Diesel Checklist", category: "Maintenance", date: "Now Published", excerpt: "Don't get stranded in the cold. Fuel additives, block heaters, and battery health explained...", image: "/carimages/truck_in_the_snow.png" },
    { id: 'blog-fluid-and-gauges', title: "Beyond the Engine: Mastering Fluid Maintenance and Interior Monitoring", category: "Tech Talk", date: "Now Published", excerpt: "Why premium oils and precision interior gauges are the true secret to million-mile diesel longevity...", image: "/carimages/oil_can.png" },
  ];

  return (
    <div className="pt-32 pb-24 animate-in fade-in duration-700 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black italic mb-4 text-white">THE GARAGE <span className="text-torque-red">BLOG</span></h1>
          <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">Insights, builds, and diesel knowledge from the shop floor.</p>
          <div className="h-1 w-20 bg-torque-red mx-auto mt-8" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <div key={i} className="bg-gunmetal border border-white/5 overflow-hidden flex flex-col group cursor-pointer" onClick={() => setPage(blog.id)}>
              <div className="h-48 bg-matte-black opacity-80 flex items-center justify-center border-b border-white/10 group-hover:opacity-100 transition-opacity relative overflow-hidden">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                ) : (
                  <Wrench className="text-gray-700 group-hover:text-torque-red transition-colors" size={32} />
                )}
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-torque-red text-[10px] font-bold uppercase tracking-widest mb-2 block">{blog.category} • {blog.date}</span>
                  <h3 className="text-xl font-bold italic mb-4 text-white group-hover:text-torque-red transition-colors">{blog.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{blog.excerpt}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SPONSORS = [
  { name: "Valair Clutch", url: "https://valairinc.com/", tagline: "Official Clutch Partner" },
  { name: "Perkins Diesel", url: "https://www.perkinsdieselshop.com/", tagline: "Trusted Parts Supplier" },
  { name: "Dynomite Diesel Products", url: "https://dynomitediesel.com/", tagline: "Performance Build Partner" },
  { name: "Valair Clutch", url: "https://valairinc.com/", tagline: "Official Clutch Partner" },
  { name: "Perkins Diesel", url: "https://www.perkinsdieselshop.com/", tagline: "Trusted Parts Supplier" },
  { name: "Dynomite Diesel Products", url: "https://dynomitediesel.com/", tagline: "Performance Build Partner" },
];

const SponsorTicker = () => (
  <div className="bg-matte-black border-y border-white/10 py-5 overflow-hidden">
    <div className="flex items-center gap-6 mb-2 px-6">
      <div className="h-px flex-grow bg-white/10" />
      <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold shrink-0">Official Sponsors</span>
      <div className="h-px flex-grow bg-white/10" />
    </div>
    <div className="relative overflow-hidden">
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: 'ticker-scroll 30s linear infinite',
        }}
      >
        {SPONSORS.map((sponsor, i) => (
          <a
            key={i}
            href={sponsor.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-6 px-12 group shrink-0"
          >
            <div className="h-8 w-px bg-torque-red/30" />
            <div>
              <span className="text-white font-black uppercase tracking-widest text-sm group-hover:text-torque-red transition-colors">
                {sponsor.name}
              </span>
              <span className="text-gray-600 text-[10px] uppercase tracking-widest font-bold ml-3">
                {sponsor.tagline}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
    <style>{`
      @keyframes ticker-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div>
          <h1 className="text-5xl font-black italic mb-8">OUR STORY</h1>
          <p className="text-gray-400 leading-relaxed mb-6">
            Founded in the heart of Novinger, Missouri, No Way Man Diesel LLC began with a single bay and a relentless obsession with diesel performance. Jason was raised on a farm just outside of Novinger, where his family operated a cattle operation of over 1,000 head—and his family still owns that ground today. Those roots run deep in the Missouri soil, and that work ethic is what built this shop’s reputation one truck at a time. We didn’t want to be just another repair shop; we wanted to be the facility that people traveled across state lines to visit.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Today, we are a premier destination for enthusiasts and working truck owners who won't settle for second place. Our team is comprised of specialists who live and breathe diesel. We don’t just work here; we pull, we race, and we haul. That real-world experience is what sets us apart. When you bring your truck to No Way Man Diesel, you’re getting more than a repair—you’re getting a legacy of mechanical excellence.
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
  { id: 3, name: "High-Flow Injector Set", price: 2450.00, category: "Fuel", image: "/Truck%20images/injector-set.png", desc: "30% over stock, competition-grade precision injectors for Cummins, Duramax, and Powerstroke platforms." },
  { id: 5, name: "Megatron Signature Tee", price: 34.99, category: "Apparel", image: "/Truck%20images/megatron-tee.png", desc: "Heavyweight cotton with Megatron track graphics. Rep the shop that races what it builds." },
];

const PARTNER_BRANDS = [
  {
    id: 'hotshot',
    name: "Hot Shot's Secret",
    category: "Additives",
    image: "/Truck%20images/hotshot-secret.png",
    desc: "Premium diesel fuel additives, oil treatments, and anti-gel formulas. Shop the full Hot Shot's Secret lineup — No Way Man Diesel's recommended additive brand.",
    url: "https://www.hotshotsecret.com/"
  },
  {
    id: 'sb',
    name: "S&B Intakes",
    category: "Intake & Air",
    image: "/Truck%20images/sb-intake.png",
    desc: "Cold air intake systems engineered specifically for diesel trucks. S&B Intakes deliver measurable airflow gains with premium filtration for Cummins, Duramax, and Powerstroke.",
    url: "https://sbfilters.com/"
  }
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
        </div>

        {/* Shop Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {PRODUCTS.map(product => (
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
                <a
                  href="https://squareup.com/store/no-way-man-diesel"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-transparent border-2 border-white hover:bg-torque-red hover:border-torque-red transition-all py-3 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Order via Square
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Brands */}
        <div className="border-t border-white/10 pt-16 mb-4">
          <h2 className="text-3xl font-black italic mb-2">TRUSTED BRAND PARTNERS</h2>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-12">Brands we run, recommend, and stand behind.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PARTNER_BRANDS.map(brand => (
              <div key={brand.id} className="bg-gunmetal border border-white/5 group overflow-hidden">
                <div className="h-64 overflow-hidden relative">
                  <img src={brand.image} alt={brand.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-torque-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                    Partner Brand
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 block">{brand.category}</span>
                  <h3 className="text-xl font-bold mb-3 uppercase italic">{brand.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{brand.desc}</p>
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-transparent border-2 border-torque-red hover:bg-torque-red transition-all py-3 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 text-torque-red hover:text-white"
                  >
                    Shop {brand.name} <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
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
        {page === 'blogs' && <BlogsPage setPage={setPage} />}
        {page === 'blog-cummins-head-gasket' && <BlogPost1 setPage={setPage} />}
        {page === 'blog-duramax-pulling' && <BlogPost2 setPage={setPage} />}
        {page === 'blog-powerstroke-60' && <BlogPost3 setPage={setPage} />}
        {page === 'blog-megatron-turbos' && <BlogPost4 setPage={setPage} />}
        {page === 'blog-winter-checklist' && <BlogPost5 setPage={setPage} />}
        {page === 'blog-fluid-and-gauges' && <BlogPost6 setPage={setPage} />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <SponsorTicker />
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
