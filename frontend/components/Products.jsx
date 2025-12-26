import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Products = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    const fetchGalleryImages = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery?limit=20`);
            const data = await res.json();
            if (data.data && data.data.length > 0) {
                setGalleryImages(data.data);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    // CSS Marquee handles smooth looping without JS jitter
    return (
        <section id="gallery" className="bg-[#FAFAFA] pt-16 md:pt-32 pb-0 relative overflow-hidden">
            {/* Header */}
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between relative z-10">
                <div>
                    <span className="text-[#fae606] font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-3 md:mb-4 block">Gallery</span>
                    <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-black font-urbanist leading-none">
                        Our <span className="text-zinc-200">Gallery</span>
                    </h2>
                </div>
                <Link
                    to="/gallery"
                    className="mt-6 md:mt-0 group flex items-center gap-3 text-black hover:text-[#fae606] transition-colors duration-300"
                >
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">View All</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
            </div>

            {/* Horizontal Marquee Gallery Style */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-[#fae606] rounded-full animate-spin"></div>
                </div>
            ) : galleryImages.length > 0 ? (
                <div className="relative w-full overflow-hidden group/marquee">
                    <div className="flex w-max animate-products-marquee gap-6 md:gap-8 pb-20 md:pb-32">
                        {/* Multi-duplication for smooth infinite scroll */}
                        {[...galleryImages, ...galleryImages, ...galleryImages].map((img, index) => (
                            <Link
                                to="/gallery"
                                key={index}
                                className="group relative shrink-0 w-[280px] sm:w-[320px] md:w-[450px] cursor-pointer"
                            >
                                {/* Inner Container - Trigger stays still, content scales */}
                                <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-3xl md:rounded-[40px] overflow-hidden bg-zinc-100 transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] group-hover:-translate-y-2">
                                    {/* Gallery Image */}
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}${img.image_url}`}
                                        alt={img.title || 'Gallery Image'}
                                        className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                    />

                                    {/* Cinematic Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:bg-black/40 transition-all duration-700"></div>

                                    {/* Badge */}
                                    {img.category && (
                                        <div className="absolute top-6 md:top-8 left-6 md:left-8 transition-transform duration-500 group-hover:translate-x-2">
                                            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-white/10 group-hover:border-[#fae606]/50 transition-colors">
                                                {img.category}
                                            </span>
                                        </div>
                                    )}

                                    {/* Content Overlays */}
                                    <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10">
                                        {img.title && (
                                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold font-urbanist text-white mb-3 md:mb-4 leading-tight tracking-tight">
                                                {img.title}
                                            </h3>
                                        )}
                                        {img.description && (
                                            <p className="text-white/60 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xs group-hover:text-white transition-colors duration-500">
                                                {img.description}
                                            </p>
                                        )}

                                        <div className="mt-6 md:mt-8 overflow-hidden h-0 group-hover:h-10 md:group-hover:h-12 transition-all duration-500">
                                            <button className="flex items-center gap-3 md:gap-4 text-[#fae606] uppercase tracking-[0.3em] text-[9px] md:text-[10px] font-black group/btn">
                                                <span className="w-6 md:w-8 h-[1px] bg-[#fae606] transition-all group-hover/btn:w-12 md:group-hover/btn:w-16"></span>
                                                View Gallery
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-slate-400 text-lg">No gallery images available</p>
                </div>
            )}

            <style>{`
                @keyframes products-marquee-scroll {
                    0% { transform: translateX(-40%); }
                    100% { transform: translateX(0); }
                }
                .animate-products-marquee {
                    animation: products-marquee-scroll 80s linear infinite;
                }
                .group\\/marquee:hover .animate-products-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Products;
