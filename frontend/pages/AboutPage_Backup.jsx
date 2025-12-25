import React, { useEffect, useState } from 'react';
import { Target, Trophy, Users, Globe2, ArrowRight, History, Award, CheckCircle2, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import about from '../banner/about.png';

// Premium Visual Assets
const aboutBanner = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000";
const storyImg = "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200";
const achievementBg = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000";

const AboutPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const achievements = [
        {
            icon: Users,
            count: "450+",
            label: "Satisfied Clients",
            detail: "Building long-lasting relationships through dependable service and superior product quality."
        },
        {
            icon: Trophy,
            count: "1,200+",
            label: "Global Projects",
            detail: "Delivering stone solutions for residential, commercial, and large-scale infrastructure developments worldwide."
        },
        {
            icon: Globe2,
            count: "18+",
            label: "Countries",
            detail: "A strong international network that reflects our global credibility and reach."
        },
        {
            icon: Award,
            count: "75+",
            label: "Professionals",
            detail: "A dedicated team of experts ensuring precision, innovation, and excellence at every stage."
        }
    ];

    return (
        <div className="min-h-screen bg-white font-urbanist selection:bg-[#fae606] selection:text-black">
            <Navbar />

            {/* Cinematic Hero Section */}
            <section className="relative pt-44 pb-32 overflow-hidden min-h-[85vh] flex items-center bg-[#0F0F0F]">
                <div className="absolute inset-0 z-0">
                    <img
                        src={aboutBanner}
                        alt="About Us"
                        className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${isVisible ? 'scale-100' : 'scale-125'}`}
                    />
                    <div className={about}></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-20">
                    <div className="max-w-4xl">
                        <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <span className="w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase">Corporate Heritage</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
                            <span className={`block transition-all duration-[1200ms] delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>Establishing</span>
                            <span className={`block text-[#fae606] italic font-light transition-all duration-[1200ms] delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>Excellence</span>
                            <span className={`block text-4xl md:text-6xl font-light text-white/80 mt-6 transition-all duration-[1200ms] delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>Our Eternal Legacy</span>
                        </h1>

                        <p className={`text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl transition-all duration-1000 delay-[900ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            Founded on the principles of geological purity and architectural precision, Aarohi Exports has defined the pinnacle of natural stone craftsmanship since inception.
                        </p>

                        <div className={`flex items-center gap-6 mt-12 transition-all duration-1000 delay-[1100ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            <div className="w-20 h-20 rounded-full border border-[#fae606]/30 flex items-center justify-center backdrop-blur-md">
                                <History className="text-[#fae606] w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[#fae606] font-black text-2xl leading-none">2016</p>
                                <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold mt-1">Inception Year</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Our Story Redesign: The Architectural Narrative */}
            <section className="py-24 md:py-48 bg-white overflow-hidden relative">
                {/* Decorative Background Element: Perspective Grid lines */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">

                        {/* Left: Narrative Segment (7 Columns) */}
                        <div className="lg:col-span-7">
                            <div className={`flex items-center gap-4 mb-10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-[#fae606] shadow-xl shadow-black/10">
                                    <Target size={22} />
                                </div>
                                <div>
                                    <span className="text-zinc-400 font-black tracking-[0.5em] text-[10px] uppercase block">Chapter 01</span>
                                    <span className="text-black font-bold text-xs uppercase tracking-widest mt-0.5 block">Corporate Profile</span>
                                </div>
                            </div>

                            <h2 className="text-5xl md:text-8xl font-black text-black tracking-tighter mb-16 leading-[0.9]">
                                Our <span className="text-[#fae606]">Story</span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <p className="text-black font-bold text-2xl leading-tight">
                                        Defining technical excellence in natural stone export since 2016.
                                    </p>
                                    <p className="text-zinc-500 font-light text-lg leading-relaxed">
                                        Aarohi Exports began as a focused initiative by seasoned industry professionals who shared a common vision: to supply responsibly sourced, precision-crafted stone to the global market.
                                    </p>
                                </div>
                                <div className="space-y-6 pt-1 md:pt-16">
                                    <p className="text-zinc-500 font-light text-lg leading-relaxed">
                                        Through continuous innovation and stringent quality control, we've built long-term partnerships across multiple continents, supplying to over 50 nations including the US, UK, and UAE.
                                    </p>
                                    <div className="flex items-center gap-4 pt-4">
                                        <div className="w-12 h-[1px] bg-[#fae606]"></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black">Global Authority</span>
                                    </div>
                                </div>
                            </div>

                            {/* ISO Certification Capsule */}
                            <div className="mt-20 group relative max-w-xl">
                                <div className="absolute inset-0 bg-[#fae606] translate-x-2 translate-y-2 rounded-3xl transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                <div className="relative bg-black p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center gap-8 border border-white/10">
                                    <div className="w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                                        <CheckCircle2 className="text-[#fae606]" size={40} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <p className="text-[#fae606] font-black text-xs uppercase tracking-[0.3em] mb-2">Quality Assurance</p>
                                        <h3 className="text-white text-2xl font-bold mb-1">ISO 9001:2015 Registered</h3>
                                        <p className="text-white/40 font-light text-sm">Commitment to Global Standards and Precision.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Architectural Imagery (5 Columns) */}
                        <div className="lg:col-span-5 relative group">
                            {/* Decorative Outset Frame */}
                            <div className="absolute -inset-4 border border-black/5 rounded-[100px_40px_100px_40px] transition-all duration-1000 group-hover:inset-0 group-hover:border-[#fae606]/30"></div>

                            <div className="relative overflow-hidden rounded-[100px_40px_100px_40px] shadow-2xl bg-zinc-100">
                                <img
                                    src={storyImg}
                                    className="w-full h-[500px] md:h-[700px] object-cover transition-all duration-[3000ms] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                    alt="Marble Quarry Production"
                                />

                                {/* Image Overlay for Depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                {/* Floating Experience Badge */}
                                <div className="absolute bottom-10 left-10 p-6 bg-white rounded-2xl shadow-2xl flex items-center gap-4 border border-zinc-100 transform -rotate-3 group-hover:rotate-0 transition-transform duration-700">
                                    <History className="text-[#fae606]" size={32} />
                                    <div>
                                        <p className="text-black font-black text-2xl leading-none">8+</p>
                                        <p className="text-zinc-500 font-bold text-[8px] uppercase tracking-widest mt-1">Years of Legacy</p>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Coordinate Detail */}
                            <div className="absolute -top-10 -right-10 hidden xl:block">
                                <div className="flex flex-col items-end opacity-20">
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black">Coord: 25.13 N / 75.14 E</span>
                                    <span className="w-24 h-[1px] bg-black mt-2"></span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-24 md:py-44 bg-[#0F0F0F] relative overflow-hidden">
                {/* Texture Background */}
                <div className="absolute inset-0 z-0 opacity-10 grayscale pointer-events-none">
                    <img src={achievementBg} className="w-full h-full object-cover" alt="Achievement Background" />
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-3 bg-[#fae606] px-6 py-2 rounded-full mb-8">
                            <Trophy className="text-black w-4 h-4" />
                            <span className="text-black font-black text-[10px] tracking-[0.2em] uppercase">Set Industry Benchmarks</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1]">Our Achievements</h2>
                        <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
                            Guided by a commitment to quality, trust, and operational excellence, Aarohi Exports continues to lead the global natural stone export market.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((item, idx) => (
                            <div key={idx} className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[48px] hover:bg-[#fae606] transition-all duration-700 cursor-pointer">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-black transition-colors duration-500">
                                    <item.icon className="text-[#fae606] w-8 h-8" />
                                </div>
                                <h3 className="text-white text-5xl font-black tracking-tighter mb-4 group-hover:text-black transition-colors">{item.count}</h3>
                                <p className="text-[#fae606] font-black uppercase tracking-widest text-xs mb-6 group-hover:text-black transition-colors">{item.label}</p>
                                <p className="text-white/40 text-sm leading-relaxed group-hover:text-black/70 font-medium transition-all duration-500">
                                    {item.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design & Awards Section */}
            <section className="py-24 md:py-48 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">
                    <div className="flex flex-col lg:flex-row gap-20 items-start">

                        {/* Left Side: Context & Visual */}
                        <div className="lg:w-1/3">
                            <div className="relative overflow-hidden rounded-3xl mb-12 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1628163486121-72991870df22?auto=format&fit=crop&q=80&w=800"
                                    className="w-full aspect-[4/5] object-cover"
                                    alt="Stone Samples"
                                />
                            </div>
                            <h3 className="text-3xl font-black text-black tracking-tighter mb-6 leading-tight">
                                Enhance Your Space With <br />Timeless Elegance!
                            </h3>
                            <p className="text-zinc-500 font-light leading-relaxed">
                                We offer quality stone products in the form of tiles and slabs selected from all over the world to enhance your home project.
                            </p>
                        </div>

                        {/* Right Side: Awards Narrative */}
                        <div className="lg:w-2/3 relative">
                            <div className="mb-16">
                                <p className="text-[#fae606] font-black tracking-[0.4em] uppercase text-[10px] mb-4">Industrial Recognition</p>
                                <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-[1.1]">
                                    Design That Speaks <br />Our Industry Awards
                                </h2>
                            </div>

                            {/* Awards List */}
                            <div className="space-y-0 relative">
                                {[
                                    { cat: "Designs of the Year", val: "Best New Building in Germany", year: "2021" },
                                    { cat: "Architecture Awards", val: "Best Architectural Firm", year: "2022" },
                                    { cat: "Green Architecture Awards", val: "Excellence in Sustainability", year: "2023" },
                                    { cat: "Environment Lighting Award", val: "Community Impact Award", year: "2024" }
                                ].map((award, i) => (
                                    <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-zinc-100 transition-all duration-500 hover:bg-zinc-50 hover:px-8">
                                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                                            <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest w-40">{award.cat}</span>
                                            <span className="text-black font-bold text-xl md:text-2xl tracking-tight group-hover:text-[#fae606] transition-colors">{award.val}</span>
                                        </div>
                                        <span className="text-zinc-300 font-black text-sm mt-4 md:mt-0">{award.year}</span>
                                    </div>
                                ))}

                                {/* Floating Award Badge */}
                                <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/4 hidden xl:flex w-44 h-44 bg-[#1A1A1A] rounded-2xl p-6 flex-col items-center justify-center text-center shadow-2xl rotate-6 group hover:rotate-0 transition-transform duration-500 border border-white/10">
                                    <div className="mb-4">
                                        <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#fae606]">
                                            <path fill="currentColor" d="M50 10l5 15h15l-12 9 5 15-13-10-13 10 5-15-12-9h15l5-15z" />
                                            <path fill="none" stroke="currentColor" strokeWidth="2" d="M50 85c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35" strokeDasharray="4 4" />
                                        </svg>
                                    </div>
                                    <p className="text-white font-black text-[10px] tracking-[0.3em] uppercase leading-tight">Award<br />Winner</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
