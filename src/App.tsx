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
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const BRAND = {
  name: "No Way Man Diesel LLC",
  address: "19760 Rye Creek Road, Novinger, MO 63559",
  phone: "(660) 216-5453",
  email: "sales@nowaymandiesel.com",
  hours: "Mon – Fri: 8AM – 5PM (Sat – Sun: Closed)",
  facebook: "https://www.facebook.com/people/No-Way-Man-Diesel-LLC/100035953075932/",
  mapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15989.090023980767!2d-92.6731452!3d40.2415076!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87e81361adb348e3%3A0xef9599d8a35a6fda!2sNo%20Way%20Man%20Diesel%2C%20LLC!5e1!3m2!1sen!2sus!4v1772833388705!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
};

// --- Components ---

const Header = ({ activePage, setPage }: { activePage: string, setPage: (p: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'megatron', label: 'Megatron' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
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
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`uppercase text-sm font-bold tracking-widest transition-colors ${activePage === link.id ? 'text-torque-red' : 'hover:text-torque-red'}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a href={`tel:${BRAND.phone}`} className="hidden md:flex items-center gap-2 font-mono font-bold text-torque-red hover:text-white transition-colors">
            <Phone size={16} /> {BRAND.phone}
          </a>
          <button onClick={() => setPage('contact')} className="btn-primary text-xs px-6 py-2">Book Shop Time</button>
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
                <button
                  key={link.id}
                  onClick={() => { setPage(link.id); setIsMenuOpen(false); }}
                  className="text-left uppercase font-bold tracking-widest py-2 border-b border-white/5"
                >
                  {link.label}
                </button>
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
      <p>CLINICAL PRECISION. HEAVY METAL PERFORMANCE.</p>
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
        <option>ENGINE REBUILD</option>
        <option>TRANSMISSION</option>
        <option>DIAGNOSTICS</option>
        <option>TUNING</option>
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
        <img
          src="https://picsum.photos/seed/diesel-shop/1920/1080"
          alt="Shop Bay"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-matte-black via-matte-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-torque-red" />
            <span className="uppercase tracking-[0.3em] text-torque-red font-bold text-sm">Novinger, Missouri</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] italic">
            CLINICAL <span className="text-torque-red">PRECISION.</span><br />
            HEAVY METAL.
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
            High-end diesel repair, performance tuning, and custom builds for those who demand absolute mechanical authority. We don't just fix trucks—we bulletproof them.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setPage('contact')} className="btn-primary flex items-center gap-3 group">
              Book Shop Time <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setPage('services')} className="btn-secondary">View Capabilities</button>
          </div>
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
              <button onClick={() => setPage('engines')} className="text-torque-red font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {[
            { title: "Engine Rebuilds", desc: "Complete teardowns and clinical reassembly. We specialize in long-block longevity and performance machining.", icon: <Wrench size={32} /> },
            { title: "Transmissions", desc: "Stock rebuilds to competition-grade Allison and 68RFE builds. Engineered to handle massive torque loads.", icon: <Settings size={32} /> },
            { title: "Diagnostics", desc: "Dealer-level scanning and electrical troubleshooting. We find the ghost in the machine that others miss.", icon: <Gauge size={32} /> },
            { title: "Performance Tuning", desc: "Custom EFI Live and EZ LYNK tuning. Optimized for towing efficiency or maximum track performance.", icon: <Zap size={32} /> },
            { title: "Maintenance", desc: "Fleet-grade preventative care. Oil, filters, and 50-point inspections to keep your business moving.", icon: <Truck size={32} /> },
            { title: "Custom Fabrication", desc: "TIG-welded piping, custom mounts, and chassis reinforcements. If they don't make it, we build it.", icon: <ShieldCheck size={32} /> },
          ].map((service, i) => (
            <div key={service.title} className="bg-matte-black p-12 hover:bg-gunmetal transition-colors group">
              <div className="text-torque-red mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h4 className="text-xl font-bold mb-4 uppercase italic">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Megatron Teaser */}
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/pulling-truck/1920/1080"
          alt="Megatron Pulling Truck"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black italic mb-6">WE RACE WHAT WE BUILD.</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Our competition pulling truck, "Megatron," isn't just for show. It's our R&D lab for extreme diesel performance.
        </p>
        <button onClick={() => setPage('megatron')} className="btn-primary">Explore The Legacy</button>
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
          At No Way Man Diesel, we believe in "Doing it right the first time." Our philosophy is simple: clinical precision in every bolt turned, every diagnostic run, and every custom build. We don't cut corners because in the world of heavy-duty diesel, a corner cut is a breakdown waiting to happen.
        </p>

        <div className="space-y-20">
          {[
            {
              title: "ENGINE SERVICES",
              items: ["Full Rebuilds", "Head Gaskets & Studding", "Fuel System Upgrades", "Turbocharger Replacement", "EGR/DPF Solutions (Competition Only)"]
            },
            {
              title: "DRIVETRAIN & TRANSMISSION",
              items: ["Allison Performance Builds", "68RFE Valve Bodies", "Dual Disc Clutch Installs", "Differential Re-gearing", "Driveline Balancing"]
            },
            {
              title: "DIAGNOSTICS & ELECTRICAL",
              items: ["OEM Software Scanning", "Wiring Harness Repair", "Module Programming", "Sensor Calibration", "Battery & Charging Systems"]
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

const EnginesPage = () => (
  <div className="pt-32 pb-24 animate-in slide-in-from-bottom-10 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h1 className="text-5xl md:text-6xl font-black italic mb-8 leading-tight">
            ENGINE REBUILDS & <span className="text-torque-red">BULLETPROOFING</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            When your diesel heart stops beating, we perform the surgery that brings it back stronger than the day it left the factory.
          </p>
          <button className="btn-primary">Schedule a Diagnostic</button>
        </div>
        <div className="bg-gunmetal p-1 aspect-video border border-white/10">
          <img src="https://picsum.photos/seed/engine-rebuild/800/600" alt="Engine Rebuild" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="bg-gunmetal p-10 border-l-4 border-torque-red">
          <h3 className="text-2xl font-bold mb-6 uppercase italic">Common Symptoms You Need a Rebuild</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-3"><X size={18} className="text-torque-red mt-1" /> Excessive Blow-by at the oil fill cap</li>
            <li className="flex items-start gap-3"><X size={18} className="text-torque-red mt-1" /> Metal shavings in the oil filter</li>
            <li className="flex items-start gap-3"><X size={18} className="text-torque-red mt-1" /> Constant overheating or coolant loss</li>
            <li className="flex items-start gap-3"><X size={18} className="text-torque-red mt-1" /> Significant loss of compression/power</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6 uppercase italic">Our Clinical Process</h3>
          <p className="text-gray-400 leading-relaxed">
            Our engine rebuild process is exhaustive. It begins with a complete teardown to the bare block, followed by hot-tanking and precision machining. We check every tolerance against OEM specs, often exceeding them for performance builds. We use only high-grade components—ARP studs, Mahle pistons, and genuine gaskets. Assembly takes place in a controlled environment where cleanliness is paramount. Every engine is primed and tested before it ever sees the frame rails of your truck again.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const TransmissionsPage = () => (
  <div className="pt-32 pb-24 animate-in slide-in-from-bottom-10 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-5xl font-black italic mb-12 text-center">TRANSMISSIONS & DRIVETRAIN</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <p className="text-xl text-gray-400 leading-relaxed">
          Nothing kills a diesel truck faster than a blown transmission. Whether you're towing 20,000 lbs through the Missouri hills or chasing a 10-second slip at the track, your drivetrain is the weak link. We specialize in building transmissions that don't just survive—they thrive under pressure.
        </p>
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-gunmetal p-6 border border-white/5">
            <div className="text-torque-red font-black text-4xl italic">01</div>
            <div>
              <h4 className="font-bold uppercase">Stock Plus</h4>
              <p className="text-xs text-gray-500">Correcting factory flaws for daily reliability.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gunmetal p-6 border border-white/5">
            <div className="text-torque-red font-black text-4xl italic">02</div>
            <div>
              <h4 className="font-bold uppercase">Tow-Ready</h4>
              <p className="text-xs text-gray-500">Upgraded clutches and coolers for heavy hauling.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-torque-red p-6">
            <div className="text-white font-black text-4xl italic">03</div>
            <div>
              <h4 className="font-bold uppercase">Competition</h4>
              <p className="text-white/80 text-xs">Billet shafts and custom valve bodies for max HP.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gunmetal">
          <thead>
            <tr className="bg-matte-black border-b border-white/10">
              <th className="p-6 text-left uppercase tracking-widest text-sm">Build Tier</th>
              <th className="p-6 text-left uppercase tracking-widest text-sm">HP Rating</th>
              <th className="p-6 text-left uppercase tracking-widest text-sm">Key Features</th>
              <th className="p-6 text-left uppercase tracking-widest text-sm">Best For</th>
            </tr>
          </thead>
          <tbody className="text-gray-400 text-sm">
            <tr className="border-b border-white/5">
              <td className="p-6 font-bold text-white">STAGE 1</td>
              <td className="p-6">Up to 450HP</td>
              <td className="p-6">Improved Valve Body, New Seals</td>
              <td className="p-6">Daily Driving</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-6 font-bold text-white">STAGE 2 (TOW)</td>
              <td className="p-6">Up to 600HP</td>
              <td className="p-6">Billet Converter, Upgraded Clutches</td>
              <td className="p-6">Heavy Hauling</td>
            </tr>
            <tr>
              <td className="p-6 font-bold text-white">STAGE 3 (RACE)</td>
              <td className="p-6">800HP+</td>
              <td className="p-6">Full Billet Internals, Custom Tuning</td>
              <td className="p-6">Competition</td>
            </tr>
          </tbody>
        </table>
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
            Megatron was born from a simple question: "How far can we push it?" This truck is the culmination of thousands of hours of fabrication, tuning, and track-side adjustments. It serves as our primary testing ground for the high-performance parts we install in our customers' trucks. When we say a part is "competition-proven," it's because Megatron survived the pull with it. From local Missouri fairgrounds to national circuits, Megatron has established No Way Man Diesel as a force to be reckoned with.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gunmetal h-64"><img src="https://picsum.photos/seed/pull1/400/400" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>
          <div className="bg-gunmetal h-80"><img src="https://picsum.photos/seed/pull2/400/500" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>
          <div className="bg-gunmetal h-80 -mt-16"><img src="https://picsum.photos/seed/pull3/400/500" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>
          <div className="bg-gunmetal h-64"><img src="https://picsum.photos/seed/pull4/400/400" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>
        </div>
      </div>
    </div>
  </div>
);

const BlogPage = () => (
  <div className="pt-32 pb-24 animate-in fade-in duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-5xl font-black italic mb-16">THE DIESEL DIARIES</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[
          {
            title: "Preparing Your 6.7 Powerstroke for Missouri Winters",
            meta: "Don't let the Missouri freeze crack your block. Learn the essential winterization steps for your Powerstroke, from fuel additives to block heaters.",
            h2s: ["Fuel Gelling Prevention", "Battery Health Checks", "Coolant Concentration"]
          },
          {
            title: "Common CP4 Failures: What Every Duramax Owner Needs to Know",
            meta: "The CP4 pump is a ticking time bomb for many LML owners. We break down why they fail and how a bypass kit can save your entire fuel system.",
            h2s: ["The Root Cause of CP4 Failure", "Symptoms of Imminent Disaster", "Prevention Strategies"]
          },
          {
            title: "Towing vs. Racing: Choosing the Right Turbo Setup",
            meta: "Bigger isn't always better. We explore the trade-offs between spool time and top-end power for Missouri's heavy haulers and weekend racers.",
            h2s: ["Single vs. Compound Turbos", "Understanding A/R Ratios", "Matching Turbo to Injectors"]
          }
        ].map(post => (
          <div key={post.title} className="bg-gunmetal border border-white/5 group cursor-pointer">
            <div className="h-48 bg-matte-black overflow-hidden">
              <img src={`https://picsum.photos/seed/${post.title.length}/600/400`} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="p-8">
              <h2 className="text-xl font-bold mb-4 uppercase italic leading-tight group-hover:text-torque-red transition-colors">{post.title}</h2>
              <p className="text-gray-400 text-sm mb-6 line-clamp-3">{post.meta}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.h2s.map(h => <span key={h} className="text-[10px] bg-matte-black px-2 py-1 text-gray-500 uppercase font-bold">{h}</span>)}
              </div>
              <button className="text-torque-red font-bold text-xs uppercase tracking-widest flex items-center gap-2">Read Article <ArrowRight size={14} /></button>
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
        <div className="grid grid-cols-2 gap-4">
          <img src="https://picsum.photos/seed/shop1/400/600" className="w-full h-80 object-cover" referrerPolicy="no-referrer" />
          <img src="https://picsum.photos/seed/shop2/400/600" className="w-full h-80 object-cover mt-12" referrerPolicy="no-referrer" />
        </div>
      </div>

      <h2 className="text-4xl font-black italic mb-12 text-center">MEET THE TECHS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { name: "Owner / Lead Tech", bio: "20+ years of Cummins expertise. The mastermind behind Megatron." },
          { name: "Performance Specialist", bio: "Tuning wizard and electrical diagnostic expert. If it has a wire, he can fix it." },
          { name: "Fabrication Lead", bio: "Master TIG welder and chassis engineer. Turning raw steel into performance art." }
        ].map(tech => (
          <div key={tech.name} className="text-center">
            <div className="w-48 h-48 bg-gunmetal rounded-full mx-auto mb-6 overflow-hidden border-4 border-torque-red">
              <img src={`https://picsum.photos/seed/${tech.name}/200/200`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h4 className="text-xl font-bold uppercase italic">{tech.name}</h4>
            <p className="text-gray-500 text-sm mt-2">{tech.bio}</p>
          </div>
        ))}
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

// --- Main App ---

export default function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage={page} setPage={setPage} />

      <main className="flex-grow">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'services' && <ServicesHub />}
        {page === 'engines' && <EnginesPage />}
        {page === 'transmissions' && <TransmissionsPage />}
        {page === 'megatron' && <MegatronPage />}
        {page === 'blog' && <BlogPage />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
