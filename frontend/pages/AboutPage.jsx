import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Target, Trophy, Users, Globe2, ArrowRight, History, Award, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import about from '../images/about.jpeg';
import ceo from '../images/ceo.jpeg';
import iso from '../images/iso.jpeg';
import awardImg from '../images/Award.jpeg';

const aboutBanner = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000";
const storyImg = ceo;

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
            label: "Happy Clients",
            detail: "Building lasting relationships through trust, quality products, and exceptional service."
        },
        {
            icon: History,
            count: 1200,
            suffix: "+",
            label: "Global Projects",
            detail: "Delivering stone solutions for residential, commercial, and large-scale infrastructure developments."
        },
        {
            icon: Globe2,
            count: 18,
            suffix: "+",
            label: "Countries Served",
            detail: "Managing a robust export network across USA, UK, Canada, UAE, Europe, and Asia."
        },
        {
            icon: Award,
            count: 75,
            suffix: "+",
            label: "Skilled Professionals",
            detail: "A dedicated team of experts ensuring precision and excellence at every stage of production."
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
                            {['Pioneering', 'Global Quality', 'A Legacy of Architectural Distinction'].map((word, index) => (
                                <span
                                    key={index}
                                    className={`block transition-all duration-[1200ms] delay-[${300 + index * 200}ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                        } ${index === 1 ? 'text-[#fae606] italic font-light' : index === 2 ? 'text-2xl md:text-4xl font-light text-white/70 mt-4 tracking-widest uppercase' : ''}`}
                                >
                                    {word}
                                </span>
                            ))}
                        </h1>

                        <p className={`text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl transition-all duration-1000 delay-[900ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            At the intersection of geological expertise and architectural vision, Aarohi stands as a premier global exporter, curating India's finest natural stones to redefine international infrastructure standards.
                        </p>

                        <div className={`relative mt-16 inline-block transition-all duration-1000 delay-[1100ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            {/* Stylish Vertical Layout */}
                            <div className="flex items-center gap-6">
                                {/* Large Year */}
                                <div className="relative">
                                    <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#fae606] to-white/20 font-['Playfair_Display'] opacity-90">
                                        2016
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
                                A Global Leader <br />
                                <span className="text-slate-500 italic">Since 2016</span>
                            </h2>

                            <div className="space-y-6 mb-10">
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Aarohi is a leading natural stone and granite exports company that has been at the forefront of the global construction and infrastructure development sector for nearly a decade. With a customer base spanning across continents, we have established a reputation for delivering high-quality products, innovative solutions, and excellent customer service.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Established in 2016, Aarohi started as a small venture by a team of experienced professionals with a vision to provide sustainable and eco-friendly natural stone and granite solutions. Over the years, the company has grown rapidly, both in terms of its customer base and product range.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Today, Aarohi operates from multiple locations across India and has a strong global presence with customers in countries such as the <span className="text-slate-900 font-bold">USA, Vietnam, Indonesia, Egypt, Oman, Thailand, Canada, the UK, the UAE,</span> and several <span className="text-slate-900 font-bold">European nations.</span>
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

            {/* Awards and Recognition Section - Redesigned UI */}
            <AnimatedSection className="py-32 bg-[#FAF9F6] relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fae606]/5 -skew-x-12 transform origin-top-right pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 border border-[#fae606]/10 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">

                        {/* Left Side: Editorial Content */}
                        <div className="w-full lg:w-1/2">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8">
                                <Trophy className="w-4 h-4 text-[#fae606]" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Excellence in Design</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 font-['Playfair_Display'] leading-[1.1]">
                                A Legacy of <br />
                                <span className="italic font-light text-[#fae606]">Excellence</span> & <br />
                                Innovation
                            </h2>

                            <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-xl">
                                Our commitment to architectural integrity and material perfection has been recognized globally. Each award represents our dedication to transforming spaces into timeless masterpieces.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-50">
                                    <div className="text-[#fae606] font-bold text-sm uppercase tracking-widest mb-4">Architecture</div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">Design of the Year</h4>
                                    <p className="text-sm text-slate-500">Recognizing our commitment to structural beauty and functional elegance.</p>
                                </div>
                                <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-50">
                                    <div className="text-[#fae606] font-bold text-sm uppercase tracking-widest mb-4">Innovation</div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">Industry Leader</h4>
                                    <p className="text-sm text-slate-500">Honored for pioneering new techniques in stone processing and application.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Featured Award Card */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative group">
                                {/* Decorative gold frame effect */}
                                <div className="absolute -inset-4 border border-[#fae606]/30 rounded-[2rem] pointer-events-none group-hover:scale-105 transition-transform duration-700"></div>

                                <div className="relative bg-white rounded-[1.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-2">
                                    {/* Main Certificate Mockup */}
                                    <div className="relative h-[500px] overflow-hidden">
                                        <img
                                            src={iso}
                                            alt="Award Certificate"
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                        {/* Floating Badge */}
                                        <div className="absolute top-8 right-8 w-24 h-24 bg-[#fae606] rounded-full flex flex-col items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500 border-4 border-white/20">
                                            <span className="text-[10px] font-black text-black tracking-tighter uppercase">Year</span>
                                            <span className="text-2xl font-black text-black">2021</span>
                                        </div>

                                        {/* Award Text Overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="w-10 h-[1px] bg-[#fae606]"></div>
                                                <span className="text-[#fae606] font-bold text-xs uppercase tracking-[0.4em]">Outstanding Export</span>
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                                CAPEXIL Excellence <br /> Award
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Card Footer Details */}
                                    <div className="p-8 flex items-center justify-between bg-white border-t border-slate-50">
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Status</span>
                                                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                    Certified Winner
                                                </span>
                                            </div>
                                            <div className="w-[1px] h-10 bg-slate-100"></div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Location</span>
                                                <span className="text-sm font-bold text-slate-900">New Delhi, India</span>
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-[#fae606] transition-colors duration-500">
                                            <Sparkles className="w-6 h-6 text-slate-300 group-hover:text-black transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Experience Badge overlapping the card */}
                                <div className="absolute -left-6 bottom-20 hidden xl:flex flex-col items-center justify-center w-32 h-32 bg-slate-900 text-white rounded-2xl shadow-2xl rotate-[-8deg] border-4 border-white z-20">
                                    <span className="text-3xl font-black text-[#fae606]">9+</span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-center mt-1">Years of <br /> Prestige</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>



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

        </div >
    );
};

export default AboutPage;
