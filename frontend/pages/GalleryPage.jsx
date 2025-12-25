import React, { useEffect, useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';


const galleryBanner = "https://images.unsplash.com/photo-1516834474-48c0abc2a902?auto=format&fit=crop&q=80&w=2000";

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
        document.title = "Project Gallery | Aarohi Exports";
        fetchGallery();

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchGallery = async () => {
        try {
            // Fetch all images for the gallery page (ignoring pagination limit for full showcase initially)
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery?limit=100`);
            const data = await res.json();
            if (data.data) {
                setImages(data.data);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (index) => {
        setSelectedIndex(index);
        setSelectedImage(images[index]);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const nextIdx = (selectedIndex + 1) % images.length;
        setSelectedIndex(nextIdx);
        setSelectedImage(images[nextIdx]);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const prevIdx = (selectedIndex - 1 + images.length) % images.length;
        setSelectedIndex(prevIdx);
        setSelectedImage(images[prevIdx]);
    };

    return (
        <div className="min-h-screen bg-white">


            {/* Hero Section with Parallax - Mirrored Gradient from About Page */}
            <section className="relative pt-44 pb-32 overflow-hidden min-h-[85vh] flex items-center bg-[#0F0F0F]">
                <div
                    className="absolute inset-0 z-0"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
                        alt="Gallery Banner"
                        className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${isVisible ? 'scale-100' : 'scale-125'}`}
                    />
                    {/* Mirrored gradient - from right to left */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-black/30"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-20">
                    <div className="max-w-4xl">
                        <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <span className="w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase">Visual Masterpieces</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 font-['Playfair_Display']">
                            {['Curated', 'Gallery', 'Timeless Artistry'].map((word, index) => (
                                <span
                                    key={index}
                                    className={`block transition-all duration-[1200ms] delay-[${300 + index * 200}ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                        } ${index === 1 ? 'text-[#fae606] italic font-light' : index === 2 ? 'text-4xl md:text-6xl font-light text-white/80 mt-6' : ''}`}
                                >
                                    {word}
                                </span>
                            ))}
                        </h1>

                        <p className={`text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl transition-all duration-1000 delay-[900ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            Explore our portfolio of architectural masterpieces and premium stone installations that define the pinnacle of luxury design and craftsmanship.
                        </p>

                        <div className={`flex items-center gap-6 mt-12 transition-all duration-1000 delay-[1100ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            <div className="w-20 h-20 rounded-full border border-[#fae606]/30 flex items-center justify-center backdrop-blur-md animate-pulse">
                                <Camera className="text-[#fae606] w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[#fae606] font-black text-sm uppercase tracking-[0.3em]">Since 1995</p>
                                <p className="text-white/40 text-xs font-light">Excellence in Stone</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid Section */}
            <section className="py-24 bg-white relative">
                {/* Decorative architectural grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="aspect-[4/5] bg-slate-100 animate-pulse rounded-2xl"></div>
                            ))}
                        </div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-40">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ImageIcon className="text-slate-300" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Portfolio Coming Soon</h3>
                            <p className="text-slate-500">We are currently updating our curated gallery with new masterpieces.</p>
                        </div>
                    ) : (
                        <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-8 space-y-8">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative group cursor-pointer overflow-hidden rounded-3xl break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2"
                                    onClick={() => openModal(index)}
                                >
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}${image.image_url}`}
                                        alt={`Gallery Project ${image.id}`}
                                        className="w-full h-auto object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-[#fae606] flex items-center justify-center">
                                                    <Maximize2 size={14} className="text-black" />
                                                </div>
                                                <span className="text-white font-bold tracking-widest text-[10px] uppercase">View Project</span>
                                            </div>
                                            <div className="h-[1px] w-full bg-white/20"></div>
                                        </div>
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <Sparkles className="text-[#fae606] w-5 h-5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 transition-all duration-500"
                    onClick={closeModal}
                >
                    <button
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                        onClick={closeModal}
                    >
                        <X size={32} />
                    </button>

                    <button
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#fae606] hover:text-black transition-all duration-300 z-[110]"
                        onClick={prevImage}
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#fae606] hover:text-black transition-all duration-300 z-[110]"
                        onClick={nextImage}
                    >
                        <ChevronRight size={28} />
                    </button>

                    <div className="relative max-w-6xl w-full h-full flex items-center justify-center animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${selectedImage.image_url}`}
                            alt="Full Preview"
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl shadow-yellow-900/10"
                        />
                        <div className="absolute -bottom-12 left-0 right-0 text-center">
                            <p className="text-white/40 text-xs tracking-[0.2em] font-bold uppercase">
                                Masterpiece Installation {selectedIndex + 1} of {images.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default GalleryPage;
