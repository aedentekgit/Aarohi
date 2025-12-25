import React, { useState, useEffect, useRef } from 'react';
import aboutImg from '../images/about-main.jpg';
import { Leaf, Award, Zap, ArrowRight } from 'lucide-react';

const About = () => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    let start = 0;
                    const end = 25;
                    const duration = 2000;
                    const incrementTime = duration / end;

                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start === end) clearInterval(timer);
                    }, incrementTime);

                    setHasAnimated(true);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <section ref={sectionRef} className="bg-white py-24 lg:pt-52 lg:pb-32 overflow-hidden relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* Left: Image with Experience Badge */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Outset Border Frame */}
                        <div className="absolute -inset-4 border border-[#fae606]/30 rounded-[100px_0_100px_0] md:rounded-[150px_0_150px_0] pointer-events-none transform -rotate-1"></div>

                        <div className="relative z-10 overflow-hidden group rounded-[100px_0_100px_0] md:rounded-[150px_0_150px_0] shadow-2xl">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img src={aboutImg} alt="About Us" className="w-full h-[500px] md:h-[700px] object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out" />
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -bottom-8 -left-8 w-2/3 h-2/3 bg-[#fae606]/10 -z-10 bg-grid-slate-100/[0.04]"></div>

                        {/* Experience Badge */}
                        {/* Experience Badge - Stylish Redesign Optimized for Mobile */}
                        <div className="absolute -bottom-6 -right-4 md:-bottom-12 md:-right-12 bg-[#fae606] p-6 md:p-12 rounded-[50px_0_50px_0] md:rounded-[80px_0_80px_0] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] z-20 overflow-hidden group hover:bg-[#ffe81a] transition-colors duration-300">
                            {/* Decorative Background Icon */}
                            <Award className="absolute -right-4 -bottom-4 w-24 h-24 md:w-40 md:h-40 text-black/5 -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-700 ease-out" />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col justify-center h-full">
                                <div className="flex items-start gap-1 mb-1 md:mb-2">
                                    <h3 className="text-4xl md:text-7xl font-black font-urbanist leading-none tracking-tight text-[#0F0F0F]">{count}</h3>
                                    <span className="text-xl md:text-4xl font-bold text-[#0F0F0F] mt-1 md:mt-2">+</span>
                                </div>
                                <div className="w-8 md:w-12 h-1 md:h-1.5 bg-black/10 mb-2 md:mb-4 group-hover:w-20 transition-all duration-500"></div>
                                <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] leading-tight text-[#0F0F0F]">Years of<br />Experience</span>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-1/2">
                        <span className="text-[#fae606] font-extrabold tracking-[0.2em] text-sm uppercase mb-4 block">About Our Company</span>
                        <h2 className="text-4xl md:text-5xl lg:text-[50px] font-bold text-[#0F0F0F] font-urbanist leading-[1.05] mb-8 group cursor-default">
                            <span className="inline-block transition-all duration-500 group-hover:translate-x-3 group-hover:text-[#fae606]">We Are The Leaders</span> <br />
                            <span className="inline-block transition-all duration-700 delay-75 group-hover:translate-x-6 italic font-light text-zinc-400 group-hover:text-black">In Stone Processing</span>
                        </h2>
                        <p className="text-zinc-500 text-lg leading-relaxed mb-8 font-light">
                            With over two decades of expertise, we have established ourselves as the premier destination for the world's finest natural stone. Our commitment to quality and precision ensures that every slab we process meets the highest standards of luxury and durability.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            {[
                                { icon: Leaf, title: "Eco Friendly", desc: "Sustainable extraction & processing practices." },
                                { icon: Award, title: "Certified Quality", desc: "ISO 9001 certified for operational excellence." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-5 group cursor-pointer p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-500 shadow-sm">
                                    <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-[#fae606] group-hover:border-[#fae606]">
                                        <div className="text-[#fae606] group-hover:text-black transition-colors duration-500">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-urbanist text-xl text-black mb-1 group-hover:text-[#fae606]">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-700">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a href="/contact" className="group relative inline-flex items-center gap-6 px-12 py-5 bg-black text-white rounded-full overflow-hidden transition-all duration-500 active:scale-95 shadow-xl shadow-black/10">
                            {/* Sliding Background */}
                            <span className="absolute inset-0 bg-[#fae606] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>

                            {/* Content */}
                            <span className="relative z-10 font-black uppercase tracking-[0.3em] text-[11px] group-hover:text-black transition-colors duration-500">Discover More</span>

                            {/* Arrow Icon reveal */}
                            <span className="relative z-10 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                <ArrowRight size={18} className="group-hover:text-black transition-colors duration-500" />
                            </span>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
