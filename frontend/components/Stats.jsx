import React, { useState, useEffect, useRef } from 'react';

const Stats = () => {
    const stats = [
        { target: 25, suffix: '+', text: 'Years Of Mastery' },
        { target: 368, suffix: '+', text: 'Landmark Projects' },
        { target: 120, suffix: '', text: 'Unique Varieties' },
        { target: 15, suffix: 'k', text: 'Global Clients' }
    ];

    return (
        <section className="bg-white py-20 border-b border-zinc-100 relative overflow-hidden">
            {/* Subtle background texture or element to keep it premium */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                    {stats.map((stat, index) => (
                        <AnimatedStat key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const AnimatedStat = ({ target, suffix, text }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    let startValue = 0;
                    const duration = 2000;
                    const stepTime = duration / target;
                    const timer = setInterval(() => {
                        setCount(prev => {
                            if (prev >= target) { clearInterval(timer); return target; }
                            setHasAnimated(true);
                            return prev + 1;
                        });
                    }, Math.max(stepTime, 20));
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, hasAnimated]);

    return (
        <div ref={ref} className="group flex flex-col items-center text-center cursor-default">
            {/* Number with hover transition */}
            <div className="text-5xl md:text-7xl font-black text-[#0F0F0F] font-urbanist mb-4 flex items-baseline tracking-tighter transition-all duration-500 group-hover:text-[#fae606] group-hover:scale-110">
                {count}<span className="text-[#fae606] text-xl md:text-2xl ml-2 font-bold transition-transform duration-500 group-hover:rotate-12">{suffix}</span>
            </div>

            {/* Animated Divider */}
            <div className="h-[2px] w-8 bg-[#fae606] mb-6 transition-all duration-700 ease-out group-hover:w-20"></div>

            {/* Text with hover color change */}
            <p className="text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] font-urbanist leading-relaxed transition-colors duration-500 group-hover:text-black">
                {text}
            </p>
        </div>
    );
};

export default Stats;
