import React from 'react';
import project1 from '../project/1.jpeg';
import project2 from '../project/2.jpeg';
import project3 from '../project/3.jpg';
import project4 from '../project/4.jpeg';
import project5 from '../project/5.JPG';
import project6 from '../project/6.jpeg';

const Process = () => {
    const steps = [
        {
            number: '01',
            title: 'Restroom',
            desc: 'Spa-Like Luxury',
            details: 'Elegant natural stone installations for modern restrooms. Premium marble and granite surfaces creating sophisticated, waterproof, and timeless bathroom spaces.',
            image: project6
        },
        {
            number: '02',
            title: 'Office Space',
            desc: 'Corporate Elegance',
            details: 'Professional granite and marble flooring for modern office environments. Creating impressive workspaces that exude professionalism and sophistication.',
            image: project2
        },
        {
            number: '03',
            title: 'Executive Office',
            desc: 'Premium Workspace',
            details: 'Sophisticated stone installations for executive offices and corporate interiors. Combining durability with refined aesthetics for professional excellence.',
            image: project3
        },
        {
            number: '04',
            title: 'Balcony',
            desc: 'Outdoor Elegance',
            details: 'Weather-resistant natural stone for stunning balcony designs. Durable, low-maintenance surfaces that enhance outdoor living spaces with timeless beauty.',
            image: project4
        },
        {
            number: '05',
            title: 'Kitchen',
            desc: 'Culinary Excellence',
            details: 'Premium granite countertops and marble backsplashes for modern kitchens. Heat-resistant, stain-proof surfaces combining functionality with elegant design.',
            image: project5
        },
        {
            number: '06',
            title: 'Hall Living Area',
            desc: 'Grand Impressions',
            details: 'Stunning stone flooring and feature walls for spacious living halls. Creating impressive entryways and elegant living areas that welcome with style.',
            image: project1
        }
    ];

    return (
        <section id="process" className="bg-[#0F0F0F] text-white py-12 pb-12 md:py-20 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                {/* Side-by-Side Split Header Structure */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 md:mb-8 pb-4 md:pb-6 border-b border-white/5 gap-8 md:gap-10">
                    <div className="flex-1 w-full">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-urbanist leading-[0.9] md:leading-[0.85] tracking-tighter">
                            Our <br />
                            <span className="text-zinc-700 italic font-light tracking-widest pl-1 md:pl-2">Projects</span>
                        </h2>
                    </div>

                    <div className="flex-1 w-full lg:max-w-md lg:pb-2">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <span className="w-6 md:w-8 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] uppercase whitespace-nowrap">Featured Work</span>
                        </div>
                        <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
                            Explore our portfolio of premium natural stone installations across diverse spaces — from elegant restrooms to sophisticated offices and luxurious living areas.
                        </p>
                    </div>
                </div>

                {/* Blueprint-style Grid Layout */}
                <div className="relative overflow-hidden group/marquee">
                    <div className="flex w-max animate-marquee-process gap-8 pb-6 pt-4">
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
                        animation: marquee-scroll-process 90s linear infinite;
                    }
                    .group\\/marquee:hover .animate-marquee-process {
                        animation-play-state: paused;
                    }
                `}</style>
        </section >
    );
};

export default Process;
