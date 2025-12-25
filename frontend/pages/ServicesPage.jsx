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
                        <div className={`flex items-center gap-8 mt-12 transition-all duration-1000 delay-[1100ms] ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full border border-[#fae606]/30 flex items-center justify-center backdrop-blur-md">
                                    <Sparkles className="w-6 h-6 text-[#fae606]" />
                                </div>
                                <div>
                                    <p className="text-[#fae606] font-black text-xl leading-none">Premium</p>
                                    <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold mt-1">Quality Assured</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full border border-[#fae606]/30 flex items-center justify-center backdrop-blur-md">
                                    <Star className="w-6 h-6 text-[#fae606] fill-[#fae606]" />
                                </div>
                                <div>
                                    <p className="text-[#fae606] font-black text-xl leading-none">Global</p>
                                    <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold mt-1">Reach & Service</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section - Alternating Layout */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">

                    {/* Section Header */}
                    <AnimatedSection className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Star className="w-5 h-5 text-[#fae606] fill-[#fae606]" />
                            <span className="text-[#fae606] font-bold tracking-[0.3em] text-xs uppercase">What We Offer</span>
                            <Star className="w-5 h-5 text-[#fae606] fill-[#fae606]" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight font-['Playfair_Display']">
                            Comprehensive Stone Solutions
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                            From quarry to installation, we provide end-to-end services ensuring unmatched quality and craftsmanship at every stage.
                        </p>
                    </AnimatedSection>

                    {/* Services - Alternating Layout */}
                    <div className="space-y-32">
                        {services.map((service, index) => (
                            <AnimatedSection
                                key={service.id}
                                delay={index * 200}
                                direction={index % 2 === 0 ? "left" : "right"}
                            >
                                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                                    {/* Image Side */}
                                    <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''} relative group`}>
                                        {/* Decorative Background */}
                                        <div className={`absolute -inset-6 bg-gradient-to-br ${service.color} opacity-10 rounded-[60px] transform ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'} group-hover:rotate-6 transition-all duration-700`}></div>

                                        {/* Image Container */}
                                        <div className="relative overflow-hidden rounded-[40px] shadow-2xl">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-[400px] md:h-[500px] object-cover transition-all duration-[2000ms] group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                            {/* Floating Number Badge */}
                                            <div className="absolute top-8 left-8">
                                                <div className={`text-8xl md:text-9xl font-black bg-gradient-to-br ${service.color} bg-clip-text text-transparent opacity-30 font-['Playfair_Display']`}>
                                                    {service.id}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className={`${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                        {/* Service Icon */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-500`}>
                                                <service.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{service.subtitle}</p>
                                                <p className="text-slate-300 text-2xl font-black">{service.id}</p>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-['Playfair_Display']">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                            {service.description}
                                        </p>

                                        {/* Features List */}
                                        <div className="space-y-4 mb-8">
                                            {service.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-start gap-3 group/item hover:translate-x-2 transition-transform duration-300"
                                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                                >
                                                    <div className={`w-6 h-6 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                                        <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                                                    </div>
                                                    <span className="text-slate-700 font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <Link to="/contact" className={`px-8 py-4 bg-gradient-to-r ${service.color} text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2`}>
                                            <span>Contact Us</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Premium Card Design */}
            <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#fae606] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-900 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                    {/* Main Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50">
                        {/* Decorative Top Border */}
                        <div className="h-2 bg-gradient-to-r from-[#fae606] via-[#e6d500] to-[#fae606]"></div>

                        <div className="grid lg:grid-cols-2 gap-0">
                            {/* Left Column - Content */}
                            <div className="px-6 py-12 md:p-16 lg:p-20 flex flex-col justify-center">
                                {/* Ornamental Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#fae606] to-transparent"></div>
                                    <Star className="w-5 h-5 text-[#fae606] fill-[#fae606]" />
                                    <Star className="w-4 h-4 text-[#fae606] fill-[#fae606] opacity-60" />
                                </div>

                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-['Playfair_Display'] leading-tight">
                                    Ready to Transform <br className="hidden sm:block" />
                                    <span className="text-[#fae606] italic">Your Space?</span>
                                </h3>

                                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                    Partner with us to bring your architectural vision to life with premium natural stones.
                                    Our expert team delivers excellence in every project.
                                </p>

                                {/* Statistics */}
                                <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-10 pb-10 border-b border-slate-200">
                                    <div className="text-center">
                                        <div className="text-2xl md:text-4xl font-bold text-slate-900 mb-1">500+</div>
                                        <div className="text-sm text-slate-500 uppercase tracking-wider">Projects</div>
                                    </div>
                                    <div className="text-center border-x border-slate-200">
                                        <div className="text-2xl md:text-4xl font-bold text-slate-900 mb-1">15+</div>
                                        <div className="text-sm text-slate-500 uppercase tracking-wider">Countries</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl md:text-4xl font-bold text-slate-900 mb-1">25+</div>
                                        <div className="text-sm text-slate-500 uppercase tracking-wider">Years</div>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/contact" className="group px-8 py-4 bg-[#fae606] hover:bg-[#e6d500] text-slate-900 font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center justify-center gap-2">
                                        <span>Contact Us</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <button className="px-8 py-4 bg-transparent border-2 border-slate-300 hover:border-slate-900 text-slate-900 font-bold rounded-full transition-all duration-300 hover:bg-slate-50">
                                        View Portfolio
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Contact Cards */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-12 md:p-16 lg:p-20 flex flex-col justify-center relative overflow-hidden">
                                {/* Decorative Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                        backgroundSize: '40px 40px'
                                    }}></div>
                                </div>

                                <div className="relative z-10">
                                    <div className="mb-8">
                                        <div className="inline-block px-4 py-2 bg-[#fae606]/20 border border-[#fae606]/30 rounded-full mb-6">
                                            <span className="text-[#fae606] text-sm font-semibold uppercase tracking-wider">Get in Touch</span>
                                        </div>
                                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 font-['Playfair_Display']">
                                            Let's Discuss Your Project
                                        </h4>
                                        <p className="text-white/60">
                                            Our team is ready to help you create something extraordinary.
                                        </p>
                                    </div>

                                    {/* Contact Cards */}
                                    <div className="space-y-4">
                                        {/* Email Card */}
                                        <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#fae606]/50 transition-all duration-300 cursor-pointer">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-[#fae606]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#fae606]/30 transition-colors">
                                                    <CheckCircle2 className="w-6 h-6 text-[#fae606]" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-white/50 text-sm mb-1">Email Us</div>
                                                    <div className="text-white font-semibold">aarohiexports@gmail.com</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phone Card */}
                                        <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#fae606]/50 transition-all duration-300 cursor-pointer">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-[#fae606]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#fae606]/30 transition-colors">
                                                    <CheckCircle2 className="w-6 h-6 text-[#fae606]" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-white/50 text-sm mb-1">Call Us</div>
                                                    <div className="text-white font-semibold">+91 98435 64268</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location Card */}
                                        <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#fae606]/50 transition-all duration-300 cursor-pointer">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-[#fae606]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#fae606]/30 transition-colors">
                                                    <CheckCircle2 className="w-6 h-6 text-[#fae606]" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-white/50 text-sm mb-1">Visit Us</div>
                                                    <div className="text-white font-semibold">Madurai, India</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ServicesPage;
