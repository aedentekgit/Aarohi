import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Layers, Ruler, Truck, ChevronRight } from 'lucide-react';
import premiumQualityImg from '../images/Premium-Quality.jpg';
import qualityAssuranceImg from '../images/Quality-Assurance.jpg';
import globalLogisticsImg from '../images/Global-Logistics.jpg';
import reliableExportImg from '../images/about (2).jpg';

const Services = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [serviceVisible, setServiceVisible] = useState({});
    const headerRef = useRef(null);
    const serviceRefs = useRef([]);

    // Custom hook-like logic for staggered reveal
    useEffect(() => {
        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setHeaderVisible(true);
            },
            { threshold: 0.1 }
        );
        if (headerRef.current) headerObserver.observe(headerRef.current);

        const observers = serviceRefs.current.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setServiceVisible(prev => ({ ...prev, [index]: true }));
                    }
                },
                { threshold: 0.15 }
            );
            if (ref) observer.observe(ref);
            return observer;
        });
        return () => {
            headerObserver.disconnect();
            observers.forEach(obs => obs.disconnect());
        };
    }, []);

    const services = [
        {
            id: '01',
            title: "Premium Quality",
            subtitle: "Global Standards",
            desc: "We follow precise international export standards, ensuring every stone slab is safely packed, handled, and shipped with complete reliability.",
            points: [
                "Export-grade packaging and secure container handling",
                "Complies with ISO and global stone export norms",
                "Timely dispatch and transparent documentation for smooth trade",
                "Trusted by architects, contractors, and importers worldwide"
            ],
            image: premiumQualityImg,
            icon: ShieldCheck
        },
        {
            id: '02',
            title: "Global Standards",
            subtitle: "International Grade",
            desc: "Adhering to Global Export Standards. We ensure every stone slab is safely packed, handled, and shipped with complete reliability.",
            points: [
                "Export-grade packaging and secure container handling",
                "Complies with ISO and global stone export norms",
                "Timely dispatch and transparent documentation for smooth trade",
                "Trusted by architects, contractors, and importers worldwide"
            ],
            image: qualityAssuranceImg,
            icon: Layers
        },
        {
            id: '03',
            title: "Wide Range",
            subtitle: "Extensive Collection",
            desc: "Whether you seek elegant white marble or bold black granite, Aarohi Exports offers stones that match every design vision.",
            points: [
                "Wide range of Granite, Marble, Quartzite, and Sandstone",
                "Available in various colors, finishes, and thicknesses",
                "Perfect for residential, commercial, and architectural applications",
                "Stones that match every design vision"
            ],
            image: globalLogisticsImg,
            icon: Ruler
        },
        {
            id: '04',
            title: "Reliable Export",
            subtitle: "Hassle-Free Process",
            desc: "With years of experience in stone exports, we guarantee timely delivery and professional coordination from quarry to port.",
            points: [
                "Seamless coordination with shipping and logistics partners",
                "Detailed tracking and constant communication with clients",
                "Commitment to transparency, trust, and long-term relationships",
                "Reliable after-sales assistance"
            ],
            image: reliableExportImg,
            icon: Truck
        }
    ];

    useEffect(() => {
        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setHeaderVisible(true);
            },
            { threshold: 0.1 }
        );
        if (headerRef.current) headerObserver.observe(headerRef.current);

        const observers = serviceRefs.current.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !isHovering) {
                        setActiveIdx(index);
                    }
                },
                {
                    threshold: 0.6,
                    rootMargin: "-10% 0px -10% 0px"
                }
            );
            if (ref) observer.observe(ref);
            return observer;
        });

        return () => {
            headerObserver.disconnect();
            observers.forEach(obs => obs.disconnect());
        };
    }, [isHovering]);

    return (
        <section id="services" className="bg-white pt-10 pb-16 md:pt-14 md:pb-24 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">

                {/* Minimal Header with Reveal Animation */}
                <div ref={headerRef} className="max-w-6xl mb-16 md:mb-32 relative">
                    {/* Floating Decorative Watermark */}
                    <div className="absolute -top-20 -left-20 pointer-events-none select-none opacity-[0.03] animate-drift">
                        <span className="text-[200px] font-black text-black tracking-tighter uppercase">Services</span>
                    </div>

                    <div className="overflow-hidden mb-6">
                        <div className="flex items-center gap-3">
                            <div className={`h-px bg-[#fae606] transition-all duration-1000 delay-100 ${headerVisible ? 'w-12' : 'w-0'}`}></div>
                            <span className={`text-[#fae606] font-black tracking-[0.5em] text-[10px] uppercase block transition-all duration-1000 delay-100 ${headerVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                Our Expertise
                            </span>
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-8xl lg:text-[120px] font-black font-urbanist text-[#0F0F0F] leading-[0.85] tracking-tighter mb-12 group cursor-default flex items-center flex-wrap">
                        <div className="overflow-hidden mr-4 md:mr-8 pb-4">
                            <span className={`inline-block transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) ${headerVisible ? 'translate-y-0 rotate-0' : 'translate-y-full rotate-6'}`}>
                                Our
                            </span>
                        </div>
                        <div className="overflow-hidden pb-4">
                            <span className={`inline-block text-[#fae606] italic font-black tracking-normal transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) delay-200 ${headerVisible ? 'translate-y-0 rotate-0' : 'translate-y-full -rotate-6'}`}>
                                Services
                            </span>
                        </div>
                    </h2>

                    <p className={`text-zinc-500 text-lg md:text-2xl font-light leading-relaxed max-w-4xl transition-all duration-1000 delay-500 ${headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        We offer end-to-end natural stone and granite solutions — from quarrying and processing to export and installation — ensuring unmatched quality and craftsmanship at every stage.
                    </p>
                </div>

                {/* Enhanced Design: Interactive Horizontal Strips */}
                <div className="flex flex-col border-t border-zinc-100">
                    {services.map((service, index) => {
                        const isFocused = activeIdx === index;
                        return (
                            <div
                                key={index}
                                ref={el => serviceRefs.current[index] = el}
                                className={`group relative border-b border-zinc-100 transition-all duration-[1000ms] py-12 md:py-24 overflow-hidden ${isFocused ? 'bg-zinc-50/70' : ''} ${serviceVisible[index] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                                onMouseEnter={() => {
                                    setIsHovering(true);
                                    setActiveIdx(index);
                                }}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {/* Interactive Accent Line - Visible when Focused */}
                                <div className={`absolute left-0 top-0 h-full w-1 bg-[#fae606] transform transition-transform duration-500 ease-out z-30 ${isFocused ? 'translate-x-0' : '-translate-x-full'}`}></div>

                                {/* Left Side: ID Block - Pin to Left Side with High Visibility */}
                                <div className="absolute left-0 top-12 md:top-[88px] px-4 md:px-0 flex flex-col items-center w-12 md:w-20 lg:w-32 z-40">
                                    <span className={`font-urbanist font-black text-lg md:text-3xl transition-colors duration-500 block ${isFocused ? 'text-[#fae606]' : 'text-zinc-300'}`}>
                                        {service.id}
                                    </span>
                                    <div className={`h-8 md:h-20 w-px transition-all duration-500 mt-2 ${isFocused ? 'bg-[#fae606]' : 'bg-zinc-200'}`}></div>
                                </div>

                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 relative z-10 w-full pl-12 md:pl-28 lg:pl-32">

                                    {/* Middle Section: Title Block */}
                                    <div className="relative w-full md:w-auto">
                                        <div className={`text-[#fae606] text-[9px] font-black uppercase tracking-[0.4em] mb-2 transition-all duration-500 ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                            {service.subtitle}
                                        </div>
                                        <h3 className={`text-3xl md:text-7xl font-bold font-urbanist tracking-tighter leading-none transition-all duration-700 ease-out ${isFocused ? 'text-[#0F0F0F] translate-x-2' : 'text-zinc-400'}`}>
                                            {service.title.split(' ')[0]} <br />
                                            <span className={`italic font-light transition-colors duration-700 ${isFocused ? 'text-black' : 'text-zinc-200'}`}>{service.title.split(' ').slice(1).join(' ')}</span>
                                        </h3>
                                    </div>

                                    {/* Right Side: Description & CTA */}
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-20 max-w-2xl w-full">
                                        <div className="relative w-full">
                                            <p className={`text-sm md:text-lg font-medium leading-relaxed transition-colors duration-500 max-w-md mb-4 md:mb-6 ${isFocused ? 'text-zinc-900' : 'text-zinc-300'}`}>
                                                {service.desc}
                                            </p>
                                            <div className={`space-y-2 transition-all duration-700 ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 h-0 overflow-hidden'}`}>
                                                {service.points.map((point, pIdx) => (
                                                    <div key={pIdx} className="flex items-start gap-3 group/point">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#fae606] mt-1.5 transition-transform duration-300 group-hover/point:scale-150 flex-shrink-0"></div>
                                                        <span className="text-zinc-600 text-xs md:text-sm font-light tracking-wide leading-snug">{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={`absolute -left-4 md:-left-6 top-0 h-full w-px transition-colors duration-500 ${isFocused ? 'bg-[#fae606]/30' : 'bg-zinc-100'}`}></div>
                                        </div>

                                        <div className="relative flex-shrink-0 mt-4 md:mt-0">
                                            <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full border flex items-center justify-center transition-all duration-700 ${isFocused ? 'bg-[#0F0F0F] border-[#0F0F0F] text-white rotate-12' : 'border-zinc-200 text-zinc-300'}`}>
                                                <ArrowUpRight size={20} className={`md:w-6 md:h-6 transition-transform duration-500 ${isFocused ? 'scale-125' : ''}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Image Preview - Syncs with Scroll Focus - Adjusted for Mobile Visibility */}
                                <div
                                    className={`absolute left-[50%] md:left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[350px] md:w-[500px] aspect-[16/10] rounded-2xl md:rounded-[40px] overflow-hidden pointer-events-none transition-all duration-[800ms] cubic-bezier(0.23, 1, 0.32, 1) z-20 ${isFocused ? 'opacity-100 scale-100 translate-y-0 blur-0' : 'opacity-0 scale-95 translate-y-10 blur-2xl'} ${isFocused ? 'md:block hidden' : 'hidden md:block'}`}
                                    style={{
                                        boxShadow: '0 60px 120px -30px rgba(0,0,0,0.4)',
                                        transform: `translate(-50%, -50%) rotate(${isFocused ? (index % 2 === 0 ? '-3deg' : '3deg') : '0deg'})`
                                    }}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className={`w-full h-full object-cover transition-transform duration-[4s] ease-out ${isFocused ? 'scale-110' : 'scale-100'}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#fae606] flex items-center justify-center">
                                            <service.icon size={14} className="text-black" />
                                        </div>
                                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">{service.title}</span>
                                    </div>
                                </div>

                                {/* Mobile Bottom Image Strip - Appears only on mobile when focused */}
                                <div className={`md:hidden overflow-hidden transition-all duration-1000 mt-6 mx-4 md:mx-0 rounded-xl ${isFocused ? 'h-48 opacity-100' : 'h-0 opacity-0'}`}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Massive Backwatermark - Now on the Left Side */}
                                <span className={`absolute left-0 bottom-0 font-black text-[35vw] md:text-[25vw] leading-none pointer-events-none select-none z-0 transition-all duration-1000 opacity-[0.03] ${isFocused ? 'text-zinc-100 -translate-y-4 translate-x-10' : 'text-zinc-50'}`}>
                                    {service.id}
                                </span>

                            </div>
                        );
                    })}
                </div>
            </div>
            <style>{`
                @keyframes drift {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(20px, 10px) rotate(2deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                .animate-drift {
                    animation: drift 20s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Services;
