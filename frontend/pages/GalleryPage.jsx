import React, { useEffect, useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import galleryImg from '../images/gallery.jpg';

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
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextImage(e);
            if (e.key === 'ArrowLeft') prevImage(e);
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('scroll', handleScroll);
        if (selectedImage) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedImage, images.length, selectedIndex]); // Added dependencies to ensure handlers have fresh state

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
                        src={galleryImg}
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

                        <div className={`relative mt-16 inline-block transition-all duration-1000 delay-[1100ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            {/* Stylish Vertical Layout - Gallery Theme */}
                            <div className="flex items-center gap-6">
                                {/* Large Number */}
                                <div className="relative">
                                    <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#fae606] to-white/20 font-['Playfair_Display'] opacity-90">
                                        350+
                                    </span>
                                    <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#fae606] to-transparent"></div>
                                </div>

                                <div className="flex flex-col justify-center h-full pt-4">
                                    <span className="text-white font-bold text-lg tracking-wide">Signature</span>
                                    <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-1">Projects Completed</span>
                                </div>
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 aspect-[4/5]"
                                    onClick={() => openModal(index)}
                                >
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}${image.image_url}`}
                                        alt={`Gallery Project ${image.id}`}
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
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
                    className="fixed inset-0 bg-white/40 backdrop-blur-[40px] z-[9999] flex items-center justify-center p-6 md:p-12 transition-all duration-700 ease-out animate-in fade-in"
                    onClick={closeModal}
                >
                    <button onClick={closeModal} className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center transition-all duration-300 z-[10000] group"><X size={24} className="text-slate-800" /></button>
                    <button onClick={prevImage} className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center hover:scale-110 transition-all"><ChevronLeft size={48} className="text-slate-800" strokeWidth={1} /></button>
                    <button onClick={nextImage} className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center hover:scale-110 transition-all"><ChevronRight size={48} className="text-slate-800" strokeWidth={1} /></button>

                    <div className="max-w-7xl w-full h-full flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${selectedImage.image_url}`}
                            alt="Full Preview"
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg"
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default GalleryPage;
