import React from 'react';

const Process = () => {
    const steps = [
        {
            number: '01',
            title: 'Granite',
            desc: 'Igneous Rock',
            details: 'A medium to coarse-grained igneous rock rich in quartz and feldspar. Known for its durability and strength, granite is ideal for countertops, flooring, and exterior applications.',
            image: 'https://images.unsplash.com/photo-1590482422730-804192477321?auto=format&fit=crop&q=80&w=800'
        },
        {
            number: '02',
            title: 'Marble',
            desc: 'Metamorphic Rock',
            details: 'A metamorphic rock formed from limestone under heat and pressure. Valued for its smooth texture and timeless beauty, marble is perfect for interiors, sculptures, and luxury designs.',
            image: 'https://images.unsplash.com/photo-1628163486121-72991870df22?auto=format&fit=crop&q=80&w=800'
        },
        {
            number: '03',
            title: 'Sandstone',
            desc: 'Sedimentary Rock',
            details: 'A sedimentary rock composed mainly of sand-sized minerals. Known for its earthy tones and natural textures, sandstone is widely used for walls, pavements, and cladding.',
            image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800'
        },
        {
            number: '04',
            title: 'Limestone',
            desc: 'Sedimentary Rock',
            details: 'A sedimentary rock composed primarily of calcium carbonate (CaCO₃). Used extensively for flooring, wall tiles, and as a key material in cement production.',
            image: 'https://images.unsplash.com/photo-1584622781464-1119a8286bfe?auto=format&fit=crop&q=80&w=800'
        },
        {
            number: '05',
            title: 'Slate',
            desc: 'Metamorphic Rock',
            details: 'A fine-grained metamorphic rock formed from shale. It splits easily into thin, durable sheets, making it ideal for roofing, wall cladding, and decorative purposes.',
            image: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&q=80&w=800'
        },
        {
            number: '06',
            title: 'Quartzite',
            desc: 'Metamorphic Rock',
            details: 'A hard, non-foliated metamorphic rock which was originally pure quartz sandstone. Its extreme durability and crystalline sparkle make it a top choice for luxury projects.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
        }
    ];

    return (
        <section id="process" className="bg-[#0F0F0F] text-white py-20 pb-24 md:py-32 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                {/* Side-by-Side Split Header Structure */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 pb-8 md:pb-12 border-b border-white/5 gap-8 md:gap-10">
                    <div className="flex-1 w-full">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-urbanist leading-[0.9] md:leading-[0.85] tracking-tighter">
                            Stone <br />
                            <span className="text-zinc-700 italic font-light tracking-widest pl-1 md:pl-2">Categories</span>
                        </h2>
                    </div>

                    <div className="flex-1 w-full lg:max-w-md lg:pb-2">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <span className="w-6 md:w-8 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] uppercase whitespace-nowrap">Explore Our Stones</span>
                        </div>
                        <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
                            Understand the beauty and uniqueness of every natural stone we offer — from durable granites to elegant marbles and classic sandstones.
                        </p>
                    </div>
                </div>

                {/* Blueprint-style Grid Layout */}
                <div className="relative overflow-hidden group/marquee">
                    <div className="flex w-max animate-marquee-process gap-8 pb-12 pt-8">
                        {/* Multi-duplication for smooth infinite scroll */}
                        {[...steps, ...steps, ...steps, ...steps].map((step, index) => (
                            <div
                                key={index}
                                className="group relative shrink-0 w-[300px] md:w-[380px]"
                            >
                                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/5 transition-all duration-700 group-hover:border-[#fae606]/30 mb-10">
                                    {/* Atmospheric Image Background */}
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                                    {/* Step Number Badge */}
                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center group-hover:border-[#fae606]/50 group-hover:bg-[#fae606] transition-all duration-500">
                                            <span className="text-[#fae606] group-hover:text-black text-xs font-black font-urbanist">{step.number}</span>
                                        </div>
                                    </div>

                                    {/* In-container text overlay for better visual use of vertical space */}
                                    <div className="absolute bottom-8 left-8 right-8 z-20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[#fae606] text-[9px] font-black uppercase tracking-[0.4em]">
                                                {step.desc}
                                            </span>
                                            <div className="flex-1 h-[1px] bg-white/20 group-hover:bg-[#fae606]/50 transition-all"></div>
                                        </div>
                                        <h3 className="text-3xl font-bold font-urbanist text-white group-hover:text-[#fae606] transition-colors tracking-tight">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="px-4">
                                    <p className="text-zinc-400 text-sm font-light leading-relaxed group-hover:text-zinc-200 transition-colors">
                                        {step.details}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                    @keyframes marquee-scroll-process {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee-process {
                        animation: marquee-scroll-process 60s linear infinite;
                    }
                    .group\\/marquee:hover .animate-marquee-process {
                        animation-play-state: paused;
                    }
                `}</style>
        </section >
    );
};

export default Process;
