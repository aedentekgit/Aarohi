import React, { useState } from 'react';
import worldMap from '../images/world-map.png';

const GlobalPresence = () => {
    const [activeLocation, setActiveLocation] = useState(null);

    const locations = [
        { name: 'Canada', countries: ['North America'], top: '25%', left: '18%', id: 'can' },
        { name: 'USA', countries: ['United States'], top: '38%', left: '20%', id: 'usa' },
        { name: 'the UK', countries: ['Western Europe'], top: '26%', left: '47%', id: 'uk' },
        { name: 'Russia', countries: ['Eurasia'], top: '28%', left: '65%', id: 'rus' },
        { name: 'Egypt', countries: ['North Africa'], top: '46%', left: '54%', id: 'egy' },
        { name: 'the UAE', countries: ['Middle East'], top: '50%', left: '59%', id: 'uae' },
        { name: 'Oman', countries: ['Middle East'], top: '52%', left: '60%', id: 'omn' },
        { name: 'Thailand', countries: ['Southeast Asia'], top: '56%', left: '74%', id: 'tha' },
        { name: 'Vietnam', countries: ['Southeast Asia'], top: '55%', left: '77%', id: 'vie' },
        { name: 'Indonesia', countries: ['Southeast Asia'], top: '67%', left: '78%', id: 'idn' },
    ];

    const stats = [
        { label: 'Countries Supplied', value: '25+' },
        { label: 'Premium Quarries', value: '12' },
        { label: 'Design Partners', value: '150+' },
    ];

    return (
        <section className="bg-[#0A0A0A] py-12 md:py-24 relative overflow-hidden">
            {/* Subtle Gradient Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#fae606]/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                {/* Editorial Header */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#fae606] to-transparent"></div>
                        <span className="text-[#fae606] font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase">International Distribution</span>
                        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#fae606] to-transparent"></div>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10 font-['Playfair_Display']">
                        Global <span className="text-[#fae606] italic font-light">Presence</span>
                    </h2>


                </div>

                {/* Immersive Map Visualizer */}
                <div className="relative max-w-[1200px] mx-auto">
                    {/* Main Decorative Frame */}
                    <div className="relative aspect-[16/10] md:aspect-[21/9] w-full bg-zinc-950/40 rounded-[60px] border border-white/5 shadow-3xl backdrop-blur-sm overflow-hidden group/map">

                        {/* High-Tech Grid Overlay */}
                        <div className="absolute inset-0 opacity-[0.15] z-10 pointer-events-none"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                                `,
                                backgroundSize: '60px 60px'
                            }}>
                        </div>

                        {/* Scanner Beam Effect */}
                        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-[#fae606]/5 to-transparent w-[30%] h-full -skew-x-12 animate-scanner"></div>

                        {/* Map Image */}
                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-[3000ms] ease-out">
                            <img
                                src={worldMap}
                                alt="Global Logistics Map"
                                className={`w-[85%] h-auto object-contain mix-blend-screen transition-all duration-1000 ${activeLocation ? 'opacity-40 scale-105' : 'opacity-20 scale-100 grayscale'}`}
                            />
                        </div>

                        {/* Interactive Nodes */}
                        {locations.map((loc) => (
                            <div
                                key={loc.id}
                                className={`absolute transition-all duration-1000 ${activeLocation === loc.id ? 'z-30 scale-125' : 'z-20 scale-100 opacity-60'}`}
                                style={{ top: loc.top, left: loc.left }}
                            >
                                <div
                                    className="relative flex items-center justify-center cursor-pointer group/node"
                                    onMouseEnter={() => setActiveLocation(loc.id)}
                                    onMouseLeave={() => setActiveLocation(null)}
                                >
                                    {/* Concentric Pulse Rings */}
                                    <div className={`absolute w-12 h-12 bg-[#fae606]/10 rounded-full animate-ping ${activeLocation === loc.id ? 'opacity-100' : 'opacity-0'}`}></div>
                                    <div className={`absolute w-16 h-16 border border-[#fae606]/20 rounded-full transition-all duration-1000 ${activeLocation === loc.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>

                                    {/* Core Point */}
                                    <div className={`w-3 h-3 rounded-full transition-all duration-500 border-2 ${activeLocation === loc.id ? 'bg-[#fae606] border-white shadow-[0_0_20px_#fae606]' : 'bg-white/20 border-white/40'}`}></div>

                                    {/* Editorial Label */}
                                    <div className={`absolute bottom-full mb-6 left-1/2 -translate-x-1/2 transition-all duration-700 pointer-events-none ${activeLocation === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-[#fae606]"></div>
                                            <div className="flex flex-col items-start leading-[1.1]">
                                                <span className="text-white font-bold text-xs uppercase tracking-widest">{loc.name}</span>
                                                <span className="text-[#fae606] font-medium text-[8px] uppercase tracking-[0.2em] mt-1">{loc.countries[0]}</span>
                                            </div>
                                        </div>
                                        {/* Connector Line */}
                                        <div className="w-[1px] h-6 bg-gradient-to-t from-[#fae606] to-transparent mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Quantitative Footprint */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-32 max-w-5xl mx-auto">
                    {[
                        { label: 'Direct Quarries', value: '12', prefix: '' },
                        { label: 'Export Markets', value: '25', prefix: '+' },
                        { label: 'Global Partners', value: '150', prefix: '+' },
                        { label: 'Annual Tonnage', value: '50', prefix: 'k+' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group cursor-default">
                            <div className="text-4xl md:text-5xl font-black text-white mb-3 font-['Playfair_Display'] group-hover:text-[#fae606] transition-colors">
                                {stat.value}<span className="text-[#fae606]">{stat.prefix}</span>
                            </div>
                            <div className="h-[1px] w-8 bg-zinc-800 mx-auto mb-4 group-hover:w-16 transition-all"></div>
                            <div className="text-white/30 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default GlobalPresence;
