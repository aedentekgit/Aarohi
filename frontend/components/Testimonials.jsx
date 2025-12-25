import React, { useRef } from 'react';
import { Star, Quote, ArrowRight, ArrowLeft } from 'lucide-react';

const Testimonials = () => {
    const scrollRef = useRef(null);
    const reviews = [
        {
            name: "Sarah Jenkins",
            role: "Principal Interior Designer",
            text: "Unita Stone provided the most exquisite Calacatta Gold for my latest hotel project. The consistency in veining across 400 slabs was truly unmatched. Their commitment to quality is evident in every piece.",
            rating: 5,
            company: "Studio Jenkins"
        },
        {
            name: "Michael Ross",
            role: "Lead Architect",
            text: "Their team handled the complex fabrication for our curved staircase with absolute precision. Truly world-class craftsmanship that respects the material's natural beauty. A partner we trust implicitly.",
            rating: 5,
            company: "Ross & Associates"
        },
        {
            name: "Elena Rodriguez",
            role: "Developer",
            text: "The selection process was seamless. They understood the vision for the 'Vista Heights' project and delivered stones that became the focal point of the entire lobby design.",
            rating: 5,
            company: "Luxury Homes Group"
        }
    ];

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = window.innerWidth * 0.85 + 24;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-white py-24 md:py-32 relative overflow-hidden border-t border-zinc-100">
            {/* Architectural Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
            </div>

            {/* Background Decorative Text */}
            <div className="absolute bottom-10 right-[-10%] pointer-events-none select-none opacity-[0.02]">
                <span className="text-[40vw] font-black font-urbanist leading-none tracking-tighter">VOICES</span>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-8 md:gap-12 border-b border-zinc-100 pb-10">
                    <div className="max-w-2xl w-full">
                        <div className="flex items-center gap-4 mb-4 md:mb-6">
                            <span className="w-8 md:w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-zinc-400 font-bold tracking-[0.4em] text-[8px] md:text-[10px] uppercase">Curated Client Stories</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-8xl font-black text-black font-urbanist leading-none md:leading-[0.85] tracking-tighter break-words">
                            Architectural <br />
                            <span className="text-zinc-300 italic font-light tracking-widest pl-1 md:pl-2 block md:inline">Visions</span>
                        </h2>
                    </div>

                    <div className="flex flex-row width-full justify-between lg:flex-col lg:items-end lg:text-right w-full lg:w-auto">
                        <div className="flex flex-col lg:items-end">
                            <div className="flex items-center gap-2 mb-2 md:mb-3">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-[#fae606] fill-[#fae606]" />)}
                            </div>
                            <div className="text-3xl md:text-5xl font-black text-black font-urbanist leading-none tracking-tighter">4.9/5</div>
                            <p className="text-zinc-400 text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-black mt-2">Aggregate Rating</p>
                        </div>
                    </div>
                </div>

                {/* Mobile Scroll Indicator */}
                <div className="flex justify-between items-center md:hidden mb-8">
                    <div className="flex gap-4">
                        <button onClick={() => scroll('left')} className="p-3 border border-zinc-200 rounded-full active:bg-[#fae606] transition-colors">
                            <ArrowLeft size={16} />
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 border border-zinc-200 rounded-full active:bg-[#fae606] transition-colors">
                            <ArrowRight size={16} />
                        </button>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 whitespace-nowrap">Slide To Read</span>
                </div>

                {/* Testimonial Architectural Blocks - Separated Edition */}
                <div
                    ref={scrollRef}
                    className="flex lg:grid lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none no-scrollbar py-6"
                >
                    {reviews.map((r, i) => (
                        <div
                            key={i}
                            className="relative shrink-0 w-[85vw] lg:w-auto snap-center group p-10 md:p-12 transition-all duration-500 bg-zinc-50 border border-zinc-100 rounded-[40px] hover:bg-zinc-950 hover:border-zinc-950 overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-4"
                        >
                            {/* Oversized Index Number */}
                            <span className="absolute -top-6 -right-2 text-[100px] font-black font-urbanist text-white group-hover:text-white/5 transition-colors z-0 select-none">
                                0{i + 1}
                            </span>

                            {/* Hover Accent Line */}
                            <div className="absolute top-0 right-0 w-1.5 h-0 bg-[#fae606] group-hover:h-full transition-all duration-500 ease-in-out"></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-10">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#fae606]/10 transition-colors">
                                        <Quote size={20} className="text-[#fae606]" strokeWidth={2} />
                                    </div>
                                    <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">
                                        "{r.text}"
                                    </p>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex gap-1 mb-5">
                                        {[...Array(r.rating)].map((_, i) => (
                                            <Star key={i} size={12} className="text-[#fae606] fill-[#fae606]" />
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-1 bg-[#fae606] rounded-full group-hover:w-16 transition-all duration-500"></div>
                                        <div>
                                            <h4 className="text-xl font-black font-urbanist text-black group-hover:text-white transition-colors tracking-tight">
                                                {r.name}
                                            </h4>
                                            <div className="flex flex-col mt-1">
                                                <span className="text-[9px] text-[#fae606] uppercase tracking-[0.2em] font-black">
                                                    {r.role}
                                                </span>
                                                <span className="text-[9px] text-zinc-400 font-medium group-hover:text-zinc-500">
                                                    {r.company}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
