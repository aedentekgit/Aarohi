import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Layers, Ruler, Truck, ArrowRight, CheckCircle2, Globe, FileText, Settings, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Luxury Images
const bannerImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000";

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                    observer.unobserve(domRef.current);
                }
            });
        }, { threshold: 0.1 });

        const currentRef = domRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [delay]);

    return (
        <div
            ref={domRef}
            className={`${className} transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}
        >
            {children}
        </div>
    );
};

const ServicesPage = () => {
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        setHeroVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const elaborateServices = [
        {
            id: "01",
            title: "Premium Quality Assurance",
            subtitle: "The Gold Standard of Natural Stone",
            icon: ShieldCheck,
            image: "https://images.unsplash.com/photo-1628163486121-72991870df22?auto=format&fit=crop&q=80&w=1200",
            description: "At Aarohi Exports, quality is not a department—it is our legacy. We implement a multi-stage quality control protocol that begins at the very heart of the quarry. Each block is inspected for structural integrity, pigment consistency, and geological purity before it ever reaches our processing facility.",
            features: [
                "Rigorous 10-Point Stone Inspection Protocol",
                "Advanced Laser-Guided Calibration for Perfect Uniformity",
                "Ultra-Gloss Polishing exceeding 95+ luminosity",
                "Structural Stress Testing for High-Traffic Applications"
            ],
            technical: {
                standard: "ISO 9001:2015 Certified",
                precision: "0.1mm Tolerance",
                surface: "High-Gloss / Matte / Leather",
                durability: "Grade A+ Export Quality"
            }
        },
        {
            id: "02",
            title: "Global Range & Finishing",
            subtitle: "Boundless Design Possibilities",
            icon: Layers,
            image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200",
            description: "Our material library is a testament to the Earth's geological artistry. We source an expansive collection of Granite, Marble, Quartzite, and Sandstone, offering a spectrum of textures and hues that cater to both classic architectural styles and hyper-modern aesthetics.",
            features: [
                "Exclusive 'Private Collection' Rare Exotic Stones",
                "Full Palette of 150+ Mineral Variations",
                "Custom Surface Engineering (Flamed, Sandblasted, Antiqued)",
                "Large Format Slab Availability (Up to 3200mm x 1900mm)"
            ],
            technical: {
                materials: "Granite, Marble, Quartzite, Onyx",
                finishes: "12+ Bespoke Surface Textures",
                variants: "Global & Domestic Indian Stones",
                customization: "Full Block Selection Available"
            }
        },
        {
            id: "03",
            title: "Precision Fabrication",
            subtitle: "Engineering Excellence in Stone",
            icon: Ruler,
            image: "https://images.unsplash.com/photo-1590482422730-804192477321?auto=format&fit=crop&q=80&w=1200",
            description: "Transitioning vision into reality requires surgical precision. Our state-of-the-art fabrication facility utilizes Italian CNC machinery and water-jet cutting technology to execute complex patterns, intricate edges, and massive architectural elements with flawless accuracy.",
            features: [
                "CNC-Automated Cutting for Complex Geometric Patterns",
                "Custom Countertop & Vanity Top Fabrication",
                "Intricate Mitered Edge Joinery for Seamless Corners",
                "Architectural Column & Monumental Stone Sculpting"
            ],
            technical: {
                machinery: "5-Axis CNC & Italian Saws",
                accuracy: "Digital Template Synchronization",
                edges: "Bullnose, Ogee, Dupont, Miter",
                complexity: "High-Volume Commercial Capable"
            }
        },
        {
            id: "04",
            title: "Reliable Global Logistics",
            subtitle: "Seamless Supply Chain Management",
            icon: Truck,
            image: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&q=80&w=1200",
            description: "Exporting stone slabs is a masterclass in logistics. We ensure your material arrives in pristine condition, regardless of the destination. From shock-absorbent custom crating to real-time satellite tracking, we manage every variable of the international transit process.",
            features: [
                "Custom ISPM-15 Certified Heat-Treated Wood Crating",
                "Shock-Proof Container Loading & Weight Balancing",
                "Comprehensive Transit Insurance & Documentation",
                "White-Glove Delivery Coordination to Project Site"
            ],
            technical: {
                ports: "Mudra, Kandla, Mumbai Access",
                packaging: "Enhanced A-Frame Reinforcement",
                tracking: "24/7 Digital Logistics Manifest",
                regions: "Handling across 50+ Nations"
            }
        }
    ];

    return (
        <div className="min-h-screen bg-white font-urbanist selection:bg-[#fae606] selection:text-black">
            <Navbar />

            {/* Dynamic Animated Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[75vh] flex items-center bg-[#0F0F0F]">
                <div className="absolute inset-0 z-0">
                    <img
                        src={bannerImg}
                        alt="Services Banner"
                        className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${heroVisible ? 'scale-100' : 'scale-125'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-20">
                    <div className="max-w-4xl">
                        <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${heroVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <span className="w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase">Elite Stone Solutions</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-12">
                            <span className={`block transition-all duration-[1200ms] delay-300 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>Our Crafted</span>
                            <span className={`block text-[#fae606] italic font-light transition-all duration-[1200ms] delay-500 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>Expertise</span>
                        </h1>

                        <p className={`text-white/60 text-lg md:text-2xl font-light leading-relaxed max-w-2xl transition-all duration-1000 delay-700 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            Comprehensive stone solutions that bridge the gap between architectural vision and geological reality. We define the future of stone export.
                        </p>

                        <div className={`mt-12 flex gap-8 transition-all duration-1000 delay-1000 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-4 group hover:bg-[#fae606] transition-all cursor-default">
                                <Shield className="text-[#fae606] group-hover:text-black transition-colors" />
                                <span className="text-white group-hover:text-black font-bold text-xs tracking-widest uppercase">Verified Quality</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-4 group hover:bg-[#fae606] transition-all cursor-default">
                                <Globe className="text-[#fae606] group-hover:text-black transition-colors" />
                                <span className="text-white group-hover:text-black font-bold text-xs tracking-widest uppercase">Global Network</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Introduction: The Philosophy */}
            <section className="py-12 bg-white relative overflow-hidden transition-all duration-700">
                {/* Decorative ZigZag Background Element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCA2MCAxMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxMEw1IDBMMTAgMTBMMTUgMEwyMCAxMEwyNSAwTDMwIDEwTDM1IDBMNDAgMTBMNDUgMEw1MCAxMEw1NSAwTDYwIDEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmYWU2MDYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')] opacity-30"></div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                        <div className="max-w-2xl relative">
                            {/* Technical Stepped Brace */}
                            <div className="absolute -left-10 top-0 bottom-0 w-1 bg-zinc-100 hidden lg:block">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#fae606]"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#fae606]"></div>
                            </div>

                            <h2 className="text-zinc-400 font-black tracking-[0.5em] text-[10px] uppercase mb-6">Service Methodology</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-[1.1]">
                                Engineering a higher standard of <span className="text-[#fae606]">geological procurement.</span>
                            </h3>
                        </div>
                        <div className="md:w-1/3">
                            <p className="text-zinc-500 font-light text-base leading-relaxed border-l border-zinc-100 pl-8">
                                Our bespoke approach combines 15+ years of mineral expertise with cutting-edge Italian fabrication technology.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Elaborated Services Layout: The Dossier Series */}
            <section className="pt-16 pb-24 bg-white relative overflow-hidden">
                {/* Global Perspective Grid Background */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '120px 120px' }}>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                    {elaborateServices.map((service, index) => (
                        <div key={service.id}>
                            {index > 0 && (
                                <div className="py-20 flex justify-center opacity-10">
                                </div>
                            )}
                            <AnimatedSection className="mb-20 md:mb-32 last:mb-0">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">

                                    {/* Left Content Section (7 Columns) */}
                                    <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                        <div className="flex items-center gap-6 mb-12 group/module">
                                            <div className="w-16 h-16 bg-black rounded-[20px] flex items-center justify-center text-[#fae606] shadow-2xl transition-transform duration-700 group-hover/module:rotate-[360deg] group-hover/module:scale-110">
                                                <service.icon size={28} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-zinc-400 font-black tracking-[0.5em] text-[10px] uppercase mb-1">Module {service.id}</p>
                                                <p className="text-black font-bold text-xs uppercase tracking-widest">{service.subtitle}</p>
                                            </div>
                                        </div>

                                        <h2 className="text-5xl md:text-8xl font-black text-black tracking-tighter mb-12 leading-[0.9] overflow-hidden">
                                            {service.title.split(' ').map((word, i) => (
                                                <span key={i} className={`inline-block transition-transform duration-[1200ms] delay-[${i * 100}ms] hover:text-[#fae606] hover:-translate-y-2 cursor-default ${i === 1 ? "text-[#fae606]" : ""}`}>
                                                    {word}{' '}
                                                </span>
                                            ))}
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                                            <p className="text-black font-bold text-xl leading-tight border-l-2 border-[#fae606] pl-6 py-2">
                                                {service.description.split('.')[0]}.
                                            </p>
                                            <p className="text-zinc-500 font-light text-lg leading-relaxed">
                                                {service.description.split('.').slice(1).join('.')}
                                            </p>
                                        </div>

                                        {/* Feature Matrix with staggered entrance */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 relative overflow-hidden group/matrix">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#fae606]/5 to-transparent opacity-0 group-hover/matrix:opacity-100 transition-opacity duration-700"></div>
                                            {service.features.map((feature, fIdx) => (
                                                <div key={fIdx} className="flex gap-4 items-start group relative z-10">
                                                    <div className="w-2 h-2 rounded-full bg-[#fae606] mt-2 group-hover:w-6 transition-all duration-500"></div>
                                                    <span className="text-zinc-700 font-bold text-[13px] uppercase tracking-wider leading-snug group-hover:text-black group-hover:translate-x-2 transition-all duration-500">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right Matrix Section (5 Columns) */}
                                    <div className={`lg:col-span-5 relative group ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                        {/* Architectural Frame with breathing animation */}
                                        <div className={`absolute -inset-6 border border-black/5 transition-all duration-1000 group-hover:inset-0 group-hover:border-[#fae606]/30 group-hover:shadow-[0_0_50px_rgba(250,230,6,0.1)] ${index % 2 === 0 ? 'rounded-[120px_40px_120px_40px]' : 'rounded-[40px_120px_40px_120px]'}`}></div>

                                        <div className={`relative overflow-hidden shadow-2xl bg-zinc-100 aspect-[4/5] overflow-hidden ${index % 2 === 0 ? 'rounded-[120px_40px_120px_40px]' : 'rounded-[40px_120px_40px_120px]'}`}>
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-all duration-[5000ms] group-hover:scale-125 grayscale-[20%] group-hover:grayscale-0"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-40"></div>

                                            {/* Technical Overlay Box with floating effect */}
                                            <div className="absolute bottom-10 left-10 right-10 backdrop-blur-xl bg-black/40 border border-white/10 p-8 rounded-3xl transform transition-all duration-700 group-hover:-translate-y-4 shadow-2xl animate-float-slow">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-8 h-[1px] bg-[#fae606]"></div>
                                                    <span className="text-white font-black text-[9px] tracking-[0.3em] uppercase">Engineering Specs</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    {Object.entries(service.technical).map(([key, val], tIdx) => (
                                                        <div key={tIdx}>
                                                            <p className="text-[#fae606] font-black uppercase tracking-widest text-[8px] mb-1">{key}</p>
                                                            <p className="text-white font-bold text-xs truncate">{val}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Abstract ID Watermark */}
                                        <div className={`absolute -top-12 ${index % 2 === 0 ? '-right-12' : '-left-12'} hidden xl:block pointer-events-none opacity-[0.05] group-hover:opacity-10 transition-opacity`}>
                                            <span className="text-[180px] font-black leading-none">{service.id}</span>
                                        </div>
                                    </div>

                                </div>
                            </AnimatedSection>
                        </div>
                    ))}
                </div>
            </section>

            {/* Premium Redesigned CTA Section: Architectural Split */}
            <AnimatedSection>
                <section className="py-24 md:py-44 bg-white">
                    <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">

                            {/* Left Content Side: Deep Charcoal Architectural Panel */}
                            <div className="lg:col-span-7 bg-[#0F0F0F] p-12 md:p-24 lg:p-32 flex flex-col justify-center relative overflow-hidden">
                                {/* Subtle Architectural Grid Background */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
                                </div>

                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-4 mb-10">
                                        <span className="w-8 h-[2px] bg-[#fae606]"></span>
                                        <span className="text-[#fae606] font-black tracking-[0.4em] text-[10px] uppercase">Final Step</span>
                                    </div>

                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-10">
                                        Manifest <br />
                                        <span className="text-[#fae606]">Your Vision</span>
                                    </h1>

                                    <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed mb-16 max-w-xl">
                                        Our stone advisors are ready to translate your architectural drawings into a global procurement strategy.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                                        <Link to="/contact" className="group relative inline-flex items-center gap-8 px-12 py-5 bg-[#fae606] text-black rounded-full overflow-hidden transition-all duration-500 hover:pr-16 hover:shadow-[0_20px_40px_rgba(250,230,6,0.3)]">
                                            <span className="relative z-10 font-black uppercase tracking-[0.2em] text-[11px]">Start Project</span>
                                            <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                                        </Link>

                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Direct Line</span>
                                            <span className="text-white font-bold text-lg">+91 98435 64268</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual Side: Immersive Narrative Image */}
                            <div className="lg:col-span-5 relative h-[400px] lg:h-auto group overflow-hidden bg-zinc-900">
                                <img
                                    src={bannerImg}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                    alt="Modern Architecture"
                                />
                                {/* Multi-layered cinematic overlays */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-transparent"></div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-1000"></div>

                                {/* Floating Architectural Badge */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:border-[#fae606]/50 transition-colors duration-700">
                                    <div className="w-40 h-40 border border-white/10 rounded-full flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <p className="text-[8px] font-black tracking-[0.4em] uppercase mb-1">Established</p>
                                            <p className="text-xl font-bold font-urbanist">2008</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <Footer />

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    50% { transform: translateY(-10px) rotate(0.5deg); }
                }
                .animate-float-slow {
                    animation: float-slow 4s ease-in-out infinite;
                }
                .cubic-bezier(0.16, 1, 0.3, 1) {
                    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </div>
    );
};

export default ServicesPage;
