import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Instagram, Linkedin, Facebook, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/logo.jpeg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('ENGLISH');

  const languages = [
    { name: 'ENGLISH', code: 'EN' },
    { name: 'ARABIC', code: 'AR' },
    { name: 'POLISH', code: 'PL' },
    { name: 'RUSSIAN', code: 'RU' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '/', detail: 'The beginning of luxury' },
    { name: 'ABOUT', href: '/about', detail: 'Our Eternal Legacy' },
    { name: 'PRODUCTS', href: '/products', detail: 'Material Library' },
    { name: 'GALLERY', href: '/gallery', detail: 'Visual Elegance' },
    { name: 'SERVICES', href: '/services', detail: 'Stone Solutions' },
    { name: 'CONTACT US', href: '/contact', detail: 'Start Journey' },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    if (href.includes('#')) {
      const path = href.split('#')[0];
      return location.pathname === path || (path === '' && location.pathname === '/');
    }
    return location.pathname === href;
  };

  const handleLinkClick = (e, href) => {
    setIsMobileMenuOpen(false);

    // If it's an external-style route (like /contact)
    if (href.startsWith('/') && !href.includes('#')) {
      e.preventDefault();
      navigate(href);
      // Scroll to top when navigating to a new page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If it's a hash link on the home page
    if (href.includes('#')) {
      const [path, hash] = href.split('#');

      if (location.pathname === path || (path === '/' && location.pathname === '/')) {
        // We are already on the target page, just scroll
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to the target page first
        // React Router will handle the path. The hash scroll usually needs a small effect or timeout.
        navigate(href);
        // Scroll to top after navigation
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ${isScrolled
          ? 'bg-black/60 backdrop-blur-xl py-4 border-b border-white/10'
          : 'bg-transparent py-8 border-b border-transparent'
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">
          {/* Desktop Navbar Layout */}
          <div className="hidden xl:flex items-center justify-center gap-16">
            {/* Left Section */}
            <div className="flex items-center gap-12">
              {navLinks.slice(0, 3).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-[13px] font-bold tracking-[0.3em] transition-all duration-300 relative group ${isActive(link.href) ? 'text-[#fae606]' : 'text-white hover:text-[#fae606]'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[1px] bg-[#fae606] transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              ))}
            </div>

            {/* Centered Logo */}
            <div className="flex items-center px-4">
              <Link to="/">
                <img
                  src={logo}
                  alt="Aarohi Logo"
                  className={`h-16 md:h-24 aspect-square rounded-full object-cover transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-100'}`}
                />
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-12">
              {navLinks.slice(3).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-[13px] font-bold tracking-[0.3em] transition-all duration-300 relative group ${isActive(link.href) ? 'text-[#fae606]' : 'text-white hover:text-[#fae606]'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[1px] bg-[#fae606] transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Navbar Layout */}
          <div className="xl:hidden w-full flex items-center justify-between relative">
            {/* Spacer for center alignment balance */}
            <div className="w-10 opacity-0 pointer-events-none"></div>

            <Link to="/">
              <img
                src={logo}
                alt="Aarohi Logo"
                className={`h-14 sm:h-16 aspect-square rounded-full object-cover transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-100'}`}
              />
            </Link>

            <div className="relative z-[2000] flex items-center gap-6">
              {/* Language Selector Mobile Toggle */}
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="text-white text-[10px] font-bold tracking-[0.2em] border border-white/20 rounded-full px-4 py-2 bg-white/5"
              >
                {currentLang.slice(0, 2)}
              </button>

              <button
                className="text-white w-10 h-10 flex items-center justify-end focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="flex flex-col gap-1.5 items-end p-1">
                  <span className={`block h-[2px] bg-white transition-all duration-500 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-7'}`}></span>
                  <span className={`block h-[2px] bg-white transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0' : 'w-5'}`}></span>
                  <span className={`block h-[2px] bg-white transition-all duration-500 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[0.55rem]' : 'w-7'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Re-engineered Fully Responsive Premium Mobile Menu - FIXED VISIBILITY */}
      <div
        className={`fixed inset-0 z-[1500] transition-all duration-[800ms] cubic-bezier(0.9,0,0.1,1) ${isMobileMenuOpen
          ? 'translate-x-0 visible opacity-100'
          : 'translate-x-full invisible opacity-0'
          }`}
      >
        <div className="absolute inset-0 bg-[#0A0A0A]"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
        </div>

        {/* Scrollable container */}
        <div className="relative h-full overflow-y-auto overflow-x-hidden flex flex-col p-6 sm:p-10 md:p-16">
          <div className="flex justify-between items-center mb-10 shrink-0">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img src={logo} alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border border-white/10" />
            </Link>
            <button
              className="flex items-center gap-3 text-white/60 hover:text-[#fae606] transition-all group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase hidden sm:block">Close</span>
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10">
                <X size={20} strokeWidth={1} />
              </div>
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center py-6">
            <nav className="space-y-4 sm:space-y-6">
              {navLinks.map((link, index) => (
                <div key={link.name} className="group relative">
                  <div className="overflow-hidden py-1">
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`flex items-baseline text-4xl sm:text-5xl md:text-7xl font-black font-urbanist leading-[1.1] transition-all duration-700 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        } ${isActive(link.href) ? 'text-[#fae606]' : 'text-white hover:text-[#fae606]'}`}
                      style={{
                        transitionDelay: isMobileMenuOpen ? `${300 + index * 100}ms` : '0ms'
                      }}
                    >
                      <span className={`mr-4 sm:mr-6 text-sm sm:text-xl font-light shrink-0 opacity-40 ${isActive(link.href) ? 'text-[#fae606]' : 'text-zinc-500'}`}>0{index + 1}</span>
                      <span className="tracking-tight">{link.name}</span>
                    </a>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: isMobileMenuOpen ? `${400 + index * 100}ms` : '0ms' }}
                  >
                    <p className="text-zinc-600 text-[10px] sm:text-xs ml-10 sm:ml-16 tracking-widest uppercase font-bold py-1">
                      {link.detail}
                    </p>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 shrink-0">
            <div className={`space-y-6 transition-all duration-1000 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
              <p className="text-zinc-700 text-[9px] sm:text-[10px] font-black tracking-[0.5em] uppercase">Connect With Excellence</p>
              <div className="flex gap-8">
                {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="text-white/30 hover:text-[#fae606] transition-colors">
                    <Icon size={18} strokeWidth={1} />
                  </a>
                ))}
              </div>

              {/* Language List in Mobile Menu */}
              <div className="pt-8 border-t border-white/5 space-y-4">
                <p className="text-zinc-700 text-[9px] font-black tracking-[0.5em] uppercase">Select Language</p>
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left text-[11px] font-bold tracking-[0.2em] transition-all duration-300 ${currentLang === lang.name ? 'text-[#fae606]' : 'text-zinc-500'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={`w-full sm:w-auto flex justify-center sm:justify-end opacity-10 transition-all duration-1000 ${isMobileMenuOpen ? 'opacity-10 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '900ms' }}>
              <p className="text-white text-4xl sm:text-6xl md:text-[100px] font-black tracking-tighter uppercase whitespace-nowrap">Aarohi Exports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Language Selector - Bottom Right */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-3 text-[11px] font-black tracking-[0.3em] text-white hover:text-[#fae606] transition-all duration-300 py-3 px-5 border border-white/20 rounded-full bg-black/80 backdrop-blur-xl shadow-2xl hover:shadow-[#fae606]/20 hover:border-[#fae606]/50"
          >
            <span>{currentLang}</span>
            <div className={`w-1.5 h-1.5 rounded-full bg-[#fae606] transition-transform duration-500 ${isLangOpen ? 'scale-150 rotate-180' : 'scale-100'}`}></div>
          </button>

          <div className={`absolute bottom-full right-0 mb-4 w-52 bg-black/95 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 origin-bottom-right ${isLangOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}>
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => {
                  setCurrentLang(lang.name);
                  setIsLangOpen(false);
                }}
                className={`w-full text-left px-6 py-4 text-[10px] font-bold tracking-[0.2em] transition-all duration-300 ${currentLang === lang.name ? 'text-[#fae606] bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'} ${index !== languages.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
