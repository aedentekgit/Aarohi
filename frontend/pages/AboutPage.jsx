import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Target, Trophy, Users, Globe2, ArrowRight, History, Award, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import about from '../images/about.png';

const aboutBanner = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000";
const storyImg = "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200";

// Animated Section Component with Intersection Observer
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
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

    return (
        <div
            ref={domRef}
            className={`${className} transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
                }`}
        >
            {children}
        </div>
    );
};

// Counter Animation Component
const CounterAnimation = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !hasAnimated) {
                setHasAnimated(true);
                let start = 0;
                const increment = end / (duration / 16);
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);
            }
        }, { threshold: 0.5 });

        if (counterRef.current) observer.observe(counterRef.current);
        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return <span ref={counterRef}>{count}{suffix}</span>;
};

const AboutPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedAward, setSelectedAward] = useState(null);

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
        document.title = "About Us | Aarohi Exports";

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const achievements = [
        {
            icon: Users,
            count: 450,
            suffix: "+",
            label: "Satisfied Clients",
            detail: "Building long-lasting relationships through dependable service and superior product quality."
        },
        {
            icon: Trophy,
            count: 1200,
            suffix: "+",
            label: "Global Projects",
            detail: "Delivering stone solutions for residential, commercial, and large-scale infrastructure developments."
        },
        {
            icon: Globe2,
            count: 18,
            suffix: "+",
            label: "Countries",
            detail: "A strong international network that reflects our global credibility and reach."
        },
        {
            icon: Award,
            count: 75,
            suffix: "+",
            label: "Professionals",
            detail: "A dedicated team of experts ensuring precision, innovation, and excellence at every stage."
        }
    ];

    const values = [
        {
            icon: Shield,
            title: "Quality First",
            description: "Every stone undergoes rigorous inspection to meet international standards."
        },
        {
            icon: Target,
            title: "Customer Focus",
            description: "Your vision drives our mission. We deliver tailored solutions that exceed expectations."
        },
        {
            icon: Sparkles,
            title: "Innovation",
            description: "Combining traditional craftsmanship with cutting-edge technology."
        }
    ];

    return (
        <div className="min-h-screen bg-white">


            {/* Hero Section with Parallax */}
            <section className="relative pt-44 pb-32 overflow-hidden min-h-[85vh] flex items-center bg-[#0F0F0F]">
                <div
                    className="absolute inset-0 z-0"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <img
                        src={about}
                        alt="About Us"
                        className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${isVisible ? 'scale-100' : 'scale-125'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-20">
                    <div className="max-w-4xl">
                        <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <span className="w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase">Corporate Heritage</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 font-['Playfair_Display']">
                            {['Establishing', 'Excellence', 'Our Eternal Legacy'].map((word, index) => (
                                <span
                                    key={index}
                                    className={`block transition-all duration-[1200ms] delay-[${300 + index * 200}ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                        } ${index === 1 ? 'text-[#fae606] italic font-light' : index === 2 ? 'text-4xl md:text-6xl font-light text-white/80 mt-6' : ''}`}
                                >
                                    {word}
                                </span>
                            ))}
                        </h1>

                        <p className={`text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl transition-all duration-1000 delay-[900ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            Founded on the principles of geological purity and architectural precision, Aarohi Exports has defined the pinnacle of natural stone craftsmanship since inception.
                        </p>

                        <div className={`relative mt-16 inline-block transition-all duration-1000 delay-[1100ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            {/* Stylish Vertical Layout */}
                            <div className="flex items-center gap-6">
                                {/* Large Year */}
                                <div className="relative">
                                    <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#fae606] to-white/20 font-['Playfair_Display'] opacity-90">
                                        2000
                                    </span>
                                    <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#fae606] to-transparent"></div>
                                </div>

                                <div className="flex flex-col justify-center h-full pt-4">
                                    <span className="text-white font-bold text-lg tracking-wide">ESTABLISHED</span>
                                    <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-1">Global Inception</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <AnimatedSection className="py-24 md:py-32 bg-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">

                        {/* Left - Image */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-[#fae606]/10 rounded-[40px] transform rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>
                            <div className="relative overflow-hidden rounded-[40px] shadow-2xl">
                                <img
                                    src={storyImg}
                                    alt="Our Story"
                                    className="w-full h-[500px] md:h-[700px] object-cover transition-all duration-[3000ms] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                {/* Floating Badge */}
                                <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#fae606] rounded-xl flex items-center justify-center">
                                            <Award className="w-6 h-6 text-black" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg">ISO Certified</p>
                                            <p className="text-white/60 text-xs">Quality Assured</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-1 bg-[#fae606]"></div>
                                <span className="text-[#fae606] font-bold tracking-[0.3em] text-xs uppercase">Our Journey</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight font-['Playfair_Display']">
                                Crafting Excellence <br />
                                <span className="text-slate-500 italic">Since 2000</span>
                            </h2>

                            <div className="space-y-6 mb-10">
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Aarohi Exports was born from a vision to redefine the natural stone industry. What started as a small venture has grown into a global enterprise, serving clients across continents with premium granite, marble, and natural stones.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Our commitment to quality, innovation, and customer satisfaction has made us a trusted name in the industry. Every project we undertake is a testament to our dedication to excellence.
                                </p>
                            </div>

                            {/* Values */}
                            <div className="space-y-4">
                                {values.map((value, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#fae606]/30 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-default"
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        <div className="w-12 h-12 bg-[#fae606]/20 border border-[#fae606]/30 rounded-xl flex items-center justify-center group-hover:bg-[#fae606] transition-all flex-shrink-0">
                                            <value.icon className="w-6 h-6 text-[#fae606] group-hover:text-black transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1 group-hover:text-[#fae606] transition-colors">{value.title}</h4>
                                            <p className="text-slate-600 text-sm">{value.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Achievements Section with Counter Animation */}
            <AnimatedSection className="py-24 md:py-32 bg-slate-50">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">

                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-16 h-1 bg-[#fae606]"></div>
                            <span className="text-[#fae606] font-bold tracking-[0.3em] text-xs uppercase">Our Impact</span>
                            <div className="w-16 h-1 bg-[#fae606]"></div>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-['Playfair_Display']">
                            Numbers That Speak
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-[#fae606] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#fae606] transition-all duration-500 group-hover:rotate-12">
                                    <achievement.icon className="w-8 h-8 text-slate-700 group-hover:text-black transition-colors" strokeWidth={1.5} />
                                </div>

                                <div className="text-5xl font-black text-slate-900 mb-2 group-hover:text-[#fae606] transition-colors font-['Playfair_Display']">
                                    <CounterAnimation end={achievement.count} suffix={achievement.suffix} />
                                </div>

                                <h4 className="text-lg font-bold text-slate-900 mb-3">{achievement.label}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{achievement.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Awards and Recognition Section */}
            <AnimatedSection className="pt-24 md:pt-32 pb-8 md:pb-12 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

                        {/* Left Column: Image & Feature Text */}
                        <div className="w-full lg:w-1/3">
                            <div className="relative mb-10 overflow-hidden rounded-2xl shadow-xl group">
                                <img
                                    src="https://images.unsplash.com/photo-1621333100656-782163359740?auto=format&fit=crop&q=80&w=1200"
                                    alt="Stone Collection"
                                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Playfair_Display'] leading-tight">
                                Enhance Your Space With <br /> Timeless Elegance!
                            </h3>
                            <p className="text-slate-600 text-base leading-relaxed">
                                We offer quality stone products in the form of tiles and slabs selected from all over the world to enhance your home project.
                            </p>
                        </div>

                        {/* Right Column: Awards Content */}
                        <div className="w-full lg:w-2/3 relative">
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-2 bg-[#fae606]"></div>
                                <span className="text-slate-500 font-semibold tracking-[0.2em] text-[10px] uppercase">Awards and Recognition</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-12 font-['Playfair_Display'] leading-tight">
                                Design That Speaks Our <br /> Industry Awards
                            </h2>

                            {/* Awards List */}
                            <div className="relative">
                                <div className="space-y-0">
                                    {[
                                        { category: "Designs of the Year", title: "Best New Building in Germany", year: "2021" },
                                        { category: "Architecture Awards", title: "Best Architectural Firm", year: "2022" },
                                        { category: "Green Architecture Awards", title: "Excellence in Sustainability", year: "2023" },
                                        { category: "Environment Lighting Award", title: "Community Impact Award", year: "2024" },
                                        { category: "Urban Renewal Award", title: "Grand Award winner", year: "2025" }
                                    ].map((award, i) => (
                                        <div
                                            key={i}
                                            className="relative flex items-center justify-between py-6 px-6 md:px-8 transition-all duration-300 group bg-white hover:bg-[#F5F1ED]"
                                        >
                                            <div className="flex-1 pr-4">
                                                <span className="text-slate-400 text-sm font-medium">{award.category}</span>
                                            </div>
                                            <div className="flex-1 px-4">
                                                <h4 className="text-lg md:text-xl font-bold text-slate-900">{award.title}</h4>
                                            </div>
                                            <div className="flex-shrink-0 pl-4">
                                                <span className="text-slate-400 text-sm font-semibold">{award.year}</span>
                                            </div>

                                            {/* Award Winner Badge - Shows on Hover */}
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-30">
                                                <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-2xl w-40 relative overflow-hidden">
                                                    {/* Decorative circles */}
                                                    <div className="absolute -top-3 -right-3 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
                                                    <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-[#fae606]/10 rounded-full blur-xl"></div>

                                                    <div className="relative z-10 text-center flex flex-col items-center">
                                                        {/* Laurel Wreath Circle */}
                                                        <div className="w-20 h-20 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center p-2 mb-3 animate-spin-slow">
                                                            <div className="w-full h-full border-2 border-[#fae606] rounded-full flex items-center justify-center relative">
                                                                {/* Laurel leaves - simplified */}
                                                                <svg className="absolute inset-0 w-full h-full text-white/40" viewBox="0 0 100 100" fill="currentColor">
                                                                    {/* Left laurel */}
                                                                    <path d="M30,50 Q25,40 20,35 Q25,45 30,50 Q25,55 20,65 Q25,60 30,50" />
                                                                    {/* Right laurel */}
                                                                    <path d="M70,50 Q75,40 80,35 Q75,45 70,50 Q75,55 80,65 Q75,60 70,50" />
                                                                </svg>
                                                                {/* Trophy/Award icon in center */}
                                                                <Award className="text-[#fae606] w-6 h-6 relative z-10" />
                                                            </div>
                                                        </div>

                                                        {/* Text */}
                                                        <span className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em] mb-1">Honored</span>
                                                        <h5 className="text-white font-black text-lg italic leading-tight">
                                                            AWARD<br />WINNER
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for Award Image */}
                {showModal && selectedAward && (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8 animate-fadeIn"
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scaleIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Award Image */}
                            <div className="relative">
                                <img
                                    src={selectedAward.image}
                                    alt={selectedAward.title}
                                    className="w-full h-auto max-h-[70vh] object-contain bg-slate-100"
                                />

                                {/* Award Badge Overlay on Image */}
                                <div className="absolute top-8 right-8 bg-[#1a1a1a] p-6 rounded-xl shadow-2xl">
                                    <div className="text-center flex flex-col items-center">
                                        <div className="w-16 h-16 border-2 border-[#fae606] rounded-full flex items-center justify-center mb-3">
                                            <Trophy className="text-[#fae606] w-8 h-8" />
                                        </div>
                                        <span className="text-[8px] text-white/40 font-bold uppercase tracking-[0.3em] mb-1">Award</span>
                                        <h5 className="text-white font-black text-lg">{selectedAward.year}</h5>
                                    </div>
                                </div>
                            </div>

                            {/* Award Details */}
                            <div className="p-8 bg-white border-t border-slate-100">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <span className="text-slate-400 text-sm font-medium mb-2 block">{selectedAward.category}</span>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedAward.title}</h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[#fae606] text-4xl font-black">{selectedAward.year}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <style>{`
                    @keyframes spin-slow {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .animate-spin-slow {
                        animation: spin-slow 12s linear infinite;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.3s ease-out;
                    }
                    @keyframes scaleIn {
                        from { transform: scale(0.9); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-scaleIn {
                        animation: scaleIn 0.3s ease-out;
                    }
                `}</style>
            </AnimatedSection>

            {/* CTA Section */}
            <AnimatedSection className="pt-8 md:pt-12 pb-24 md:pb-32 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000"
                                alt="Contact Background"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70"></div>
                        </div>

                        <div className="relative z-10 p-12 md:p-20 text-center">
                            <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Playfair_Display']">
                                Let's Build Something <br />
                                <span className="text-[#fae606] italic">Extraordinary</span>
                            </h3>
                            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                                Partner with us to bring your architectural vision to life with premium natural stones.
                            </p>
                            <Link to="/contact" className="px-10 py-4 bg-[#fae606] hover:bg-[#e6d500] text-black font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2">
                                <span>Contact Us</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

        </div>
    );
};

export default AboutPage;
