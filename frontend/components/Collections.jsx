import React from 'react';
import darkMarbleBg from '../images/dark_marble_bg.png';
import p1 from '../images/about.jpg';
import p2 from '../images/about2.jpg';
import p3 from '../images/h1-wedo03.png';

const Collections = () => {
    const collections = [
        { name: "Travertine", img: p1 },
        { name: "Dione Nuvolato", img: p2 },
        { name: "Granite", img: p3 },
        { name: "Dione White", img: p1 },
        { name: "Limestone", img: p2 },
        { name: "Marble Aretusa", img: p3 },
        { name: "Quartz", img: p1 },
        { name: "Dione Spider", img: p2 },
    ];

    return (
        <section id="collections" className="py-16 md:py-32 relative overflow-hidden">
            {/* HD Background Image */}
            <div className="absolute inset-0">
                <img src={darkMarbleBg} alt="Marble Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/80"></div> {/* Slightly darker for better readability */}
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                {/* Top Section: Circular Button & Title */}
                <div className="flex flex-col lg:flex-row items-center mb-12 md:mb-24 gap-8 md:gap-12 lg:gap-32">

                    {/* Circular Spinner Button - Scaled down for mobile */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 shrink-0 flex items-center justify-center group cursor-default bg-white rounded-full transition-transform duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-0 lg:mb-0">
                        <div className="absolute inset-0 animate-spin-slow">
                            <svg viewBox="0 0 100 100" className="w-full h-full p-1">
                                <defs>
                                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                </defs>
                                <text fontSize="13" fontWeight="900" fill="black" letterSpacing="1.2" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                                    <textPath href="#circle" startOffset="0%">
                                        MARBLE & TILES • MARBLE & TILES •
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center relative z-10 shadow-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                            </svg>
                        </div>
                    </div>

                    {/* Main Title - Centered on mobile, Right-aligned on desktop */}
                    <div className="text-center lg:text-left max-w-4xl">
                        <div className="flex items-center gap-3 md:gap-6 mb-4 md:mb-8 justify-center lg:justify-start">
                            <div className="w-8 md:w-20 h-3 md:h-6 border-t-[2px] md:border-t-[5px] border-l-[2px] md:border-l-[5px] border-[#fae606]"></div>
                            <span className="text-[#fae606] font-extrabold tracking-[0.2em] text-[9px] md:text-sm uppercase block">Choose Your Stone</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[50px] font-bold text-white font-urbanist leading-[1.3] md:leading-[1.2] lg:leading-[1.05] tracking-tight">
                            Geological Masterpieces: <br className="hidden sm:block" /> <span className="text-zinc-400">Timeless Elegance & Natural Beauty</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Auto-Scrolling Carousel with Gaps */}
            <div className="border-t border-zinc-800/50 pt-12 md:pt-16 w-full px-0 overflow-hidden group">
                <div className="flex w-max animate-marquee gap-6">
                    {/* Multi-duplication for smooth infinite scroll */}
                    {[...collections, ...collections, ...collections, ...collections].map((item, index) => (
                        <div key={index} className="group cursor-pointer w-[160px] md:w-[220px] shrink-0">
                            <div className="aspect-square bg-zinc-900 border-[6px] md:border-[8px] border-white/90 overflow-hidden relative shadow-xl">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-white font-bold text-xs md:text-sm uppercase tracking-widest group-hover:text-[#fae606] transition-colors">{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .animate-spin-slow {
                    animation: spin 20s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes scroll {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); } 
                }
                .animate-marquee {
                    animation: scroll 60s linear infinite;
                    will-change: transform;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Collections;
