import React, { useRef } from 'react';
import { Globe, ShieldCheck, Headphones, Palette, Layers, Search } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Search,
            title: "Stone Sourcing",
            desc: "We source the quality granite & natural stones from renowned quarries across India, ensuring premium texture, durability & color consistency."
        },
        {
            icon: Layers,
            title: "Cutting & Fabrication",
            desc: "Using advanced machinery, we offer customized cutting, polishing, and surface finishing to meet exact design and architectural requirements."
        },
        {
            icon: Palette,
            title: "Custom Design Solutions",
            desc: "Our experts provide tailored stone design solutions for flooring, wall cladding, countertops, monuments, and exterior applications."
        },
        {
            icon: Globe,
            title: "Global Export",
            desc: "We handle seamless international logistics, packaging, and documentation — delivering stones safely and on time to clients worldwide."
        },
        {
            icon: ShieldCheck,
            title: "Quality Assurance",
            desc: "Every stone undergoes strict inspection for strength, polish, and finish to ensure only the highest-quality slabs reach our customers."
        },
        {
            icon: Headphones,
            title: "Customer Support",
            desc: "From sample selection to project completion, our dedicated team provides personalized guidance and reliable after-sales assistance."
        }
    ];

    return (
        <section id="features" className="relative py-24 md:py-32 overflow-hidden min-h-[600px] flex items-center">
            {/* Immersive Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
                    alt="Luxury Marble Interior"
                    className="w-full h-full object-cover scale-105"
                />
                {/* Dark Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.4em] text-[10px] uppercase">Our Expertise</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black font-urbanist text-white leading-[0.9] tracking-tighter mb-8">
                            Our <span className="text-[#fae606] italic font-light">Services</span>
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
                            We offer end-to-end natural stone and granite solutions — from quarrying and processing to export and installation — ensuring unmatched quality and craftsmanship at every stage.
                        </p>
                    </div>
                </div>

                {/* CSS Marquee - Much smoother for high-end feel */}
                <div className="relative w-full overflow-hidden group/marquee mt-10">
                    <div className="flex w-max animate-marquee-slow gap-6 py-12">
                        {/* Multi-duplication for smooth infinite scroll */}
                        {[...features, ...features, ...features, ...features].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative shrink-0 w-[300px] md:w-[350px] lg:w-[400px] cursor-pointer"
                            >
                                {/* Inner Card Container - This handles the hover animation so hit-area stays still */}
                                <div className="p-8 md:p-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) group-hover:bg-[#fae606] group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_-20px_rgba(250,230,6,0.3)]">
                                    {/* Animated Icon Container */}
                                    <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 border border-white/10 transition-all duration-500 group-hover:bg-black group-hover:scale-110 group-hover:rotate-6">
                                        <div className="text-[#fae606] transition-colors duration-500">
                                            <feature.icon size={36} strokeWidth={1} />
                                        </div>
                                    </div>

                                    {/* Feature Text */}
                                    <div className="relative z-10 transition-colors duration-500">
                                        <span className="text-[11px] font-black tracking-[0.5em] text-white/20 mb-6 block group-hover:text-black/30">
                                            SERVICE 0{(index % 6) + 1}
                                        </span>
                                        <h4 className="text-white font-bold font-urbanist text-2xl mb-5 tracking-tight group-hover:text-black">
                                            {feature.title}
                                        </h4>
                                        <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-black/80 font-medium">
                                            {feature.desc}
                                        </p>
                                    </div>

                                    {/* Floating Glow */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-tr-[40px] pointer-events-none"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-slow {
                    animation: marquee-scroll 60s linear infinite;
                }
                .group\/marquee:hover .animate-marquee-slow {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Features;
