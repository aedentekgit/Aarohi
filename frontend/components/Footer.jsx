import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';

const Footer = () => {
    return (
        <footer id="contact" className="bg-[#0A0A0A] pt-32 pb-12 relative overflow-hidden text-zinc-400">
            {/* Background Texture/Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">

                {/* Top Section: CTA & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-20 mb-20 gap-10">
                    <div className="max-w-xl">
                        <h3 className="text-white text-3xl md:text-4xl font-bold font-urbanist mb-4">Start your next masterpiece.</h3>
                        <p className="text-zinc-500 font-medium">Expert consultation for your most ambitious architectural visions.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Link
                            to="/login"
                            className="px-8 py-4 border border-[#fae606] text-[#fae606] text-[12px] font-black tracking-[0.3em] rounded-full hover:bg-[#fae606] hover:text-black transition-all duration-500 flex items-center gap-4 group"
                        >
                            CLIENT PORTAL
                            <User size={18} className="group-hover:rotate-12 transition-transform" />
                        </Link>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#fae606] hover:border-[#fae606] hover:text-black transition-all duration-500 group">
                                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Grid: Info & Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-32">

                    {/* Column 1: Brand Info */}
                    <div className="lg:pr-10">
                        <img src={logo} alt="Aarohi Logo" className="h-16 w-16 mb-8 rounded-full object-cover" />
                        <p className="text-sm leading-8 text-zinc-500">
                            Aarohi Exports is the definitive source for rare natural stones, supplying the world's most prestigious projects with uncompromising quality and architectural precision.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-10">Company</h4>
                        <ul className="space-y-6">
                            <li key="About Aarohi"><Link to="/about" className="text-sm hover:text-white flex items-center gap-2 group transition-all"><span className="w-0 h-[1px] bg-[#fae606] group-hover:w-4 transition-all"></span>About Aarohi</Link></li>
                            <li key="Our Services"><Link to="/services" className="text-sm hover:text-white flex items-center gap-2 group transition-all"><span className="w-0 h-[1px] bg-[#fae606] group-hover:w-4 transition-all"></span>Our Services</Link></li>
                            <li key="Contact"><Link to="/contact" className="text-sm hover:text-white flex items-center gap-2 group transition-all"><span className="w-0 h-[1px] bg-[#fae606] group-hover:w-4 transition-all"></span>Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-10">Library</h4>
                        <ul className="space-y-6">
                            <li key="Material Catalog"><Link to="/products" className="text-sm hover:text-white flex items-center gap-2 group transition-all"><span className="w-0 h-[1px] bg-[#fae606] group-hover:w-4 transition-all"></span>Material Catalog</Link></li>
                            <li key="Project Gallery"><Link to="/gallery" className="text-sm hover:text-white flex items-center gap-2 group transition-all"><span className="w-0 h-[1px] bg-[#fae606] group-hover:w-4 transition-all"></span>Project Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="lg:pl-8">
                        <h4 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-10">Office</h4>
                        <ul className="space-y-8">
                            <li className="flex items-start gap-5">
                                <MapPin size={20} className="text-[#fae606] shrink-0" />
                                <span className="text-sm leading-relaxed">Plot No. 36, 1st Floor, 3rd Cross, <br /> Near AR HOSPITAL, KK Nagar, Madurai - 625020</span>
                            </li>
                            <li className="flex items-center gap-5">
                                <Phone size={20} className="text-[#fae606] shrink-0" />
                                <span className="text-sm">+91 98435 64268</span>
                            </li>
                            <li className="flex items-center gap-5 group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#fae606] transition-colors">
                                    <Mail size={16} className="text-white group-hover:text-black transition-colors" />
                                </div>
                                <span className="text-sm group-hover:text-white transition-colors">aarohiexports@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Giant Logo & Metadata */}
                <div className="relative pt-20 border-t border-white/5">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center w-full overflow-hidden pointer-events-none opacity-5">
                        <span className="text-[20vw] font-black font-urbanist leading-none tracking-tighter text-white whitespace-nowrap uppercase">AAROHI EXPORTS</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 relative z-20">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600">
                                &copy; 2024 Aarohi Exports Global. All rights reserved.
                            </p>
                            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
                                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms</a>
                                <a href="#" className="hover:text-white transition-colors">Cookies</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
