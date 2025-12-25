import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';

const Footer = () => {
    return (
        <footer id="contact" className="bg-[#050505] pt-24 pb-12 relative overflow-hidden text-zinc-400 font-sans border-t border-white/5">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#fae606]/50 to-transparent blur-sm"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 border-b border-white/5 pb-20">

                    {/* Brand Column (Span 4) */}
                    <div className="lg:col-span-4 lg:pr-12">
                        <Link to="/" className="inline-block mb-8">
                            <img src={logo} alt="Aarohi Exports" className="h-14 w-14 rounded-full object-cover ring-2 ring-white/10" />
                        </Link>
                        <p className="text-zinc-500 text-base leading-7 mb-8 max-w-sm font-light">
                            Aarohi Exports defines the pinnacle of natural stone sourcing, delivering rare and exquisite materials to architectural landmarks worldwide.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#fae606] hover:text-black transition-all duration-300 group"
                                >
                                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns (Span 2 each) */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[11px] mb-8">Company</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-sm hover:text-[#fae606] transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-sm hover:text-[#fae606] transition-colors">About</Link></li>
                            <li><Link to="/services" className="text-sm hover:text-[#fae606] transition-colors">Service</Link></li>
                            <li><Link to="/contact" className="text-sm hover:text-[#fae606] transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[11px] mb-8">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link to="/gallery" className="text-sm hover:text-[#fae606] transition-colors">Gallery</Link></li>
                            <li><Link to="/products" className="text-sm hover:text-[#fae606] transition-colors">Products</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter & Office (Span 4) */}
                    <div className="lg:col-span-4 lg:pl-8">
                        <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[11px] mb-8">Stay Updated</h4>
                        <p className="text-xs text-zinc-500 mb-6">Subscribe to our exclusive newsletter for new arrivals and architectural trends.</p>

                        <div className="relative mb-10">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fae606]/50 transition-colors"
                            />
                            <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-[#fae606] rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                                <span className="sr-only">Subscribe</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                            </button>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="text-[#fae606] shrink-0 mt-1" size={18} />
                            <div className="text-sm text-zinc-400 leading-relaxed">
                                <span className="text-white block font-medium mb-1">Global HQ</span>
                                Plot No. 36, 1st Floor, 3rd Cross,<br />
                                K.K. Nagar, Madurai, India - 625020
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-[11px] uppercase tracking-wider font-medium text-zinc-600">
                    <p>&copy; {new Date().getFullYear()} Aarohi Exports. Excellence in Stone.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
