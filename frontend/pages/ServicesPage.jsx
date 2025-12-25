import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Layers, Ruler, Truck, CheckCircle2, ArrowRight, Sparkles, Star } from 'lucide-react';


// Granite Showroom Background Image
const bannerImg = "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=2000";

// Animated Section with Fade & Slide
const AnimatedSection = ({ children, className = "", delay = 0, direction = "up" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            });
        }, { threshold: 0.1 });

        const currentRef = domRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [delay]);

    const getTransform = () => {
        if (direction === "up") return isVisible ? 'translate-y-0' : 'translate-y-24';
        if (direction === "down") return isVisible ? 'translate-y-0' : '-translate-y-24';
        if (direction === "left") return isVisible ? 'translate-x-0' : 'translate-x-24';
        if (direction === "right") return isVisible ? 'translate-x-0' : '-translate-x-24';
        return '';
    };

    return (
        <div
            ref={domRef}
            className={`${className} transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100' : 'opacity-0'
                } ${getTransform()}`}
        >
            {children}
        </div>
    );
};

// Component to detect when a section is in view
const InViewSection = ({ children, onInView, className = "" }) => {
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    onInView(true);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        const currentRef = domRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [onInView]);

    return (
        <div ref={domRef} className={className}>
            {children}
        </div>
    );
};

const ServicesPage = () => {
    const [heroVisible, setHeroVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [activeService, setActiveService] = useState(0);

    useEffect(() => {
        setHeroVisible(true);
        window.scrollTo(0, 0);
        document.title = "Our Services | Aarohi Exports";

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const services = [
        {
            id: "01",
            title: "Quality Assurance",
            subtitle: "The Gold Standard",
            description: "Every stone undergoes strict 10-point inspection for structural integrity, polish consistency, and aesthetic perfection before it leaves our facility.",
            icon: ShieldCheck,
            image: "https://images.unsplash.com/photo-1628163486121-72991870df22?auto=format&fit=crop&q=80&w=1200",
            features: [
                "10-Point Inspection Protocol",
                "Laser-Guided Calibration",
                "95+ Gloss Polishing",
                "Structural Stress Testing"
            ],
            color: "from-[#fae606] to-[#d4c300]" // Elite Gold
        },
        {
            id: "02",
            title: "Stone Sourcing",
            subtitle: "Global Excellence",
            description: "Direct partnerships with legendary quarries worldwide. We source rare and exotic natural stones, ensuring exclusive textures and unmatched durability.",
            icon: Layers,
            image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200",
            features: [
                "150+ Material Variations",
                "Direct Quarry Access",
                "Exclusive Block Selection",
                "Color-Matched Inventory"
            ],
            color: "from-slate-500 to-slate-700" // Quarry Slate
        },
        {
            id: "03",
            title: "Precision Fabrication",
            subtitle: "Engineering Excellence",
            description: "Utilizing state-of-the-art CNC technology and master craftsmanship to transform raw slabs into architectural masterpieces with micron-level precision.",
            icon: Ruler,
            image: "https://images.unsplash.com/photo-1590482422730-804192477321?auto=format&fit=crop&q=80&w=1200",
            features: [
                "CNC-Automated Cutting",
                "Zero-Tolerance Joins",
                "Custom Edge Profiling",
                "Complex Surface Inlays"
            ],
            color: "from-zinc-700 to-zinc-900" // Precision Steel
        },
        {
            id: "04",
            title: "Global Logistics",
            subtitle: "Worldwide Delivery",
            description: "Our white-glove logistics network handles everything from export documentation to secure crating, guaranteeing safe delivery to any project site globally.",
            icon: Truck,
            image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=1200",
            features: [
                "Secure Export Packaging",
                "Full-Chain Documentation",
                "Site-to-Site Logistics",
                "White-Glove Handling"
            ],
            color: "from-gray-800 to-black" // Global Midnight
        }
    ];

    return (
        <div className="min-h-screen bg-white">


            {/* Hero Banner - Matching About Page with Parallax */}
            <section className="relative pt-44 pb-32 overflow-hidden min-h-[85vh] flex items-center bg-[#0F0F0F]">
                <div
                    className="absolute inset-0 z-0"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <img
                        src={bannerImg}
                        alt="Services - Premium Stone Solutions"
                        className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${heroVisible ? 'scale-100' : 'scale-125'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-20">
                    <div className="max-w-4xl">
                        {/* Ornamental Line */}
                        <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${heroVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <span className="w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase">Elite Stone Solutions</span>
                        </div>

                        {/* Animated Title */}
                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 font-['Playfair_Display']">
                            {['Our Crafted', 'Expertise', 'Services'].map((word, index) => (
                                <span
                                    key={index}
                                    className={`block transition-all duration-[1200ms] delay-[${300 + index * 200}ms] ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                        } ${index === 1 ? 'text-[#fae606] italic font-light' : index === 2 ? 'text-4xl md:text-6xl font-light text-white/80 mt-6' : ''}`}
                                >
                                    {word}
                                </span>
                            ))}
                        </h1>

                        <p className={`text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl transition-all duration-1000 delay-[900ms] ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            Comprehensive stone solutions that bridge the gap between architectural vision and geological reality.
                        </p>

                        {/* Decorative Elements */}
                        {/* Architectural Stat Display */}
                        <div className={`relative mt-16 inline-block transition-all duration-1000 delay-[1100ms] ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            <div className="flex items-center gap-6">
                                {/* Large Number */}
                                <div className="relative">
                                    <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#fae606] to-white/20 font-['Playfair_Display'] opacity-90">
                                        15K+
                                    </span>
                                    <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#fae606] to-transparent"></div>
                                </div>

                                <div className="flex flex-col justify-center h-full pt-4">
                                    <span className="text-white font-bold text-lg tracking-wide">Trusted</span>
                                    <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-1">Global Clients</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: Sticky Split-Screen Experience */}
            <section className="bg-white relative">
                <div className="container mx-auto px-0 max-w-[1600px]">

                    <div className="flex flex-col lg:flex-row">

                        {/* LEFT COLUMN: Sticky Image Deck (Desktop Only) */}
                        <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 z-10 overflow-hidden bg-[#0F0F0F]">
                            {services.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeService === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                        }`}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover opacity-60"
                                    />
                                    {/* Overlay Text on Image */}
                                    <div className="absolute bottom-20 left-12 right-12 z-20">
                                        <span className="text-8xl font-black text-white/10 font-['Playfair_Display'] block mb-2">
                                            {service.id}
                                        </span>
                                        <div className="w-12 h-[2px] bg-[#fae606] mb-6"></div>
                                        <p className="text-white/80 text-lg font-light max-w-md">
                                            {service.subtitle}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT COLUMN: Scrolling Content */}
                        <div className="w-full lg:w-1/2 bg-white">
                            {services.map((service, index) => {
                                // Logic to update active state
                                const handleInView = (inView) => {
                                    if (inView) setActiveService(index);
                                };

                                return (
                                    <InViewSection key={service.id} onInView={handleInView} className="min-h-screen lg:min-h-[80vh] flex flex-col justify-center px-6 md:px-20 py-12 md:py-24 border-b border-gray-100">

                                        {/* Mobile Only Image Header */}
                                        <div className="lg:hidden mb-8 -mx-6 md:mx-0 md:rounded-3xl overflow-hidden h-[250px] relative shadow-lg">
                                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20"></div>
                                            <div className="absolute bottom-4 left-6">
                                                <span className="text-white/80 text-xs font-bold uppercase tracking-widest block mb-1">Step {service.id}</span>
                                                <span className="text-white text-xl font-['Playfair_Display'] font-italic">{service.subtitle}</span>
                                            </div>
                                        </div>

                                        <div className="hidden lg:flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#0F0F0F]">
                                                <service.icon size={24} strokeWidth={1.5} />
                                            </div>
                                            <span className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-sm">Step {service.id}</span>
                                        </div>

                                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0F0F0F] mb-6 md:mb-8 font-['Playfair_Display'] leading-[1.1] md:leading-[0.9]">
                                            {service.title}
                                        </h3>

                                        <p className="text-base md:text-lg text-zinc-500 leading-relaxed md:leading-loose mb-8 md:mb-12 font-light">
                                            {service.description}
                                        </p>

                                        {/* Specs Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 bg-gray-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3 md:gap-4">
                                                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#fae606] mt-1 flex-shrink-0" />
                                                    <span className="text-sm font-semibold text-zinc-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                    </InViewSection>
                                );
                            })}

                            {/* Conclusion / CTA Block within scroll */}
                            <div className="py-24 md:py-32 px-6 md:px-20 bg-zinc-900 text-white">
                                <h3 className="text-3xl md:text-4xl font-['Playfair_Display'] mb-6">Unrivaled Expertise.</h3>
                                <p className="text-zinc-400 mb-10 max-w-md text-sm md:text-base">Our commitment to quality is not just a promise, it's a rigorously executed protocol.</p>
                                <Link to="/contact" className="inline-block border-b border-[#fae606] text-[#fae606] pb-1 uppercase tracking-widest hover:text-white hover:border-white transition-all text-sm md:text-base">
                                    Start a Conversation
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default ServicesPage;
