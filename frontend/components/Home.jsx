
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import bg1 from '../banner/1.png';
import bg2 from '../banner/2.png';
import bg3 from '../banner/3.png';
import bg4 from '../banner/4.png';
import bg5 from '../banner/5.png';
import m1 from '../banner/1.1.png';
import m2 from '../banner/2.2.png';
import m3 from '../banner/3.3.png';
import m4 from '../banner/4.4.png';
import m5 from '../banner/5.5.png';

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { bg: bg1, marble: m1 },
    { bg: bg2, marble: m2 },
    { bg: bg3, marble: m3 },
    { bg: bg4, marble: m4 },
    { bg: bg5, marble: m5 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // Slightly longer for a more luxurious feel

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[850px] w-full flex items-center bg-[#0F0F0F] z-10">
      {/* Background Image Carousel */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-[1500ms] ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            backgroundImage: `url(${slide.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/40 to-black/60" />

      {/* Main Content Area */}
      <div className="relative z-20 px-6 md:px-12 lg:px-20 w-full pt-20 md:pt-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="overflow-hidden mb-4 pb-4">
            <h1 className="text-white font-bold text-[34px] sm:text-[40px] md:text-[50px] lg:text-[76px] leading-[1.1] md:leading-[1.05] tracking-[-0.03em] animate-reveal-left cursor-default drop-shadow-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Luxury Of <span className="text-[#fae606]">Marble</span> Stone <br className="hidden md:block" />
              For <span className="italic font-light text-white/90">Modern Design</span>
            </h1>
          </div>

          <div className="max-w-xl ml-1 space-y-8 md:space-y-10">
            <p className="text-white/70 text-sm sm:text-base md:text-xl font-medium leading-relaxed tracking-tight animate-reveal-left-slow delay-300 max-w-lg">
              Elevating architectural spaces with the world's most <br className="hidden md:block" />
              exclusive natural stone, cured to absolute perfection.
            </p>

            <div className="animate-reveal-left-slower delay-700">
              <button
                onClick={() => {
                  navigate('/products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative px-8 md:px-14 py-3.5 md:py-5 text-[10px] md:text-[13px] font-bold uppercase tracking-[0.25em] flex items-center justify-center transition-all duration-500 overflow-hidden border-2 border-white/30 hover:border-[#fae606] bg-transparent hover:bg-[#fae606] text-white hover:text-black backdrop-blur-sm rounded-full"
              >
                <span className="relative z-10 flex items-center gap-3 md:gap-4">
                  EXPLORE COLLECTIONS
                  <span className="transition-transform duration-500 group-hover:translate-x-2">
                    <svg width="18" height="18" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                  </span>
                </span>
                <div className="absolute inset-0 bg-[#fae606] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Left Bottom */}
      <div className="absolute bottom-10 md:bottom-12 left-6 md:left-12 lg:left-20 z-30 flex items-center gap-6 animate-reveal-left" style={{ animationDelay: '1.5s' }}>
        {/* Unified Navigation Pill */}
        <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full border border-white/10 p-1">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center hover:bg-[#fae606] hover:text-black text-white transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="w-[1px] h-6 bg-white/10"></div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center hover:bg-[#fae606] hover:text-black text-white transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Counter Info */}
        <div className="cursor-default select-none pl-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[#fae606] text-sm font-black tracking-tighter">0{currentIndex + 1}</span>
            <div className="w-12 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-[#fae606] transition-all duration-1000 ease-out"
                style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="text-white/30 text-sm font-black tracking-tighter">0{slides.length}</span>
          </div>
          <p className="text-white font-bold text-[10px] uppercase tracking-[0.3em] opacity-80">Next Experience</p>
        </div>
      </div>

      {/* Background Text "Marble" Watermark - Right Aligned */}
      <div className="absolute bottom-8 md:bottom-12 right-0 pointer-events-none z-10 select-none overflow-visible h-fit flex justify-end items-end pr-4 md:pr-12">
        <h2 className="text-white leading-[0.7] tracking-[-0.08em] opacity-[0.05] md:opacity-[0.1] font-black text-right" style={{
          fontSize: 'clamp(80px, 25vw, 400px)',
          fontFamily: "'Vend Sans', sans-serif",
          WebkitTextStroke: '1px rgba(255,255,255,0.05)'
        }}>
          Marble
        </h2>
      </div>

      {/* Synchronized 3D Marble Chunk Carousel */}
      <div className="absolute -bottom-20 md:-bottom-40 left-0 right-0 pointer-events-none z-40 hidden md:block">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.marble}
            alt="Marble Variant"
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[200px] md:h-[300px] lg:h-[380px] w-auto max-w-none object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-all duration-[1500ms] ease-out animate-slow-rotate ${index === currentIndex ? 'opacity-100 rotate-0 animate-zoom-in' : 'opacity-0 rotate-12'
              }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes revealLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-reveal-left { animation: revealLeft 2.0s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-reveal-left-slow { animation: revealLeft 2.2s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
        .animate-reveal-left-slower { animation: revealLeft 2.4s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }

        @keyframes slow-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-slow-rotate { animation: slow-rotate 60s linear infinite; }

        @keyframes zoom-in {
          from { 
            transform: translate(-50%, 0) scale(0.5);
            opacity: 0;
          }
          to { 
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
        }

        .animate-zoom-in {
          animation: zoom-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .delay-300 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 1.2s; }
      `}</style>
    </section>
  );
};

export default Home;
