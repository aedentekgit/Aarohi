import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Visibility Check
            if (window.scrollY > 800) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Calculate Scroll Progress
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            setScrollProgress(scroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Calculate ring stroke
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - scrollProgress * circumference;

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-10 z-50 w-14 h-14 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
                }`}
            aria-label="Scroll to top"
        >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 60 60">
                <circle
                    cx="30" cy="30" r={radius}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-white/10"
                />
                <circle
                    cx="30" cy="30" r={radius}
                    stroke="#fae606"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-100 ease-out"
                />
            </svg>

            {/* Arrow Icon */}
            <ArrowUp
                className="w-5 h-5 text-[#fae606] relative z-10 transition-transform duration-500 group-hover:-translate-y-1"
                strokeWidth={2}
            />
        </button>
    );
};

export default ScrollToTopButton;
