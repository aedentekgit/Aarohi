import React, { useEffect, useState } from 'react';
import { BookOpen, X, Maximize2, Sparkles, ChevronLeft, ChevronRight, History } from 'lucide-react';


const ProductsPage = () => {
    const [collections, setCollections] = useState([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState('');
    const [collectionsFilterId, setCollectionsFilterId] = useState(''); // Separate state for "Our Collections" section
    const [products, setProducts] = useState([]);
    const [allVariants, setAllVariants] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [variantsLoading, setVariantsLoading] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsVisible(true);
        document.title = "Material Library | Aarohi Exports";
        fetchInitialData();

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchInitialData = async () => {
        try {
            // Fetch with high limits to ensure all categories and products are available for filtering
            const [colRes, prodRes, varRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections?limit=100`),
                fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=1000`),
                fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product-variants?limit=5000`)
            ]);

            const colJson = await colRes.json();
            const prodJson = await prodRes.json();
            const varsResult = await varRes.json();

            const cols = colJson.data || (Array.isArray(colJson) ? colJson : []);
            const prods = prodJson.data || (Array.isArray(prodJson) ? prodJson : []);
            const vars = varsResult.success ? (varsResult.data || []) : (Array.isArray(varsResult) ? varsResult : []);

            setCollections(cols);
            setProducts(prods);
            setAllVariants(vars);
            setLoading(false);

            // Filter products that have at least one variant
            const activeProds = prods.filter(p => vars.some(v => v.productId.id === p.id));

            // Find first collection that has "active" products
            const validCols = cols.filter(col => activeProds.some(p => p.collection_id === col.id));

            if (validCols.length > 0) {
                const firstColId = validCols[0].id.toString();
                setSelectedCollectionId(firstColId);
                setCollectionsFilterId(firstColId); // Set default filter for "Our Collections" section

                const colProds = activeProds.filter(p => p.collection_id === parseInt(firstColId));
                if (colProds.length > 0) {
                    handleProductSelect(colProds[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching initial data:', error);
            setLoading(false);
        }
    };

    const handleCollectionSelect = (collectionId) => {
        setSelectedCollectionId(collectionId);
        const activeProds = products.filter(p => allVariants.some(v => v.productId.id === p.id));
        const filteredProducts = activeProds.filter(p => p.collection_id === parseInt(collectionId));

        if (filteredProducts.length > 0) {
            handleProductSelect(filteredProducts[0]);
        } else {
            setSelectedProduct(null);
            setVariants([]);
        }
    };

    const handleProductSelect = async (product) => {
        setSelectedProduct(product);
        setVariantsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product-variants/product/${product.id}`);
            const result = await response.json();

            if (result.success) {
                setVariants(result.data);
            }
            setVariantsLoading(false);
        } catch (error) {
            console.error('Error fetching variants:', error);
            setVariantsLoading(false);
        }
    };

    const openImageModal = (image, globalIndex) => {
        setCurrentImageIndex(globalIndex);
        setModalImage(image);
        setShowImageModal(true);
    };

    const handleNextImage = (e) => {
        if (e) e.stopPropagation();
        const allImages = variants.flatMap(v => v.images);
        if (allImages.length === 0) return;

        const nextIndex = (currentImageIndex + 1) % allImages.length;
        setCurrentImageIndex(nextIndex);
        setModalImage(allImages[nextIndex]);
    };

    const handlePrevImage = (e) => {
        if (e) e.stopPropagation();
        const allImages = variants.flatMap(v => v.images);
        if (allImages.length === 0) return;

        const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        setCurrentImageIndex(prevIndex);
        setModalImage(allImages[prevIndex]);
    };

    const activeProductsForSelected = products
        .filter(p => p.collection_id === parseInt(selectedCollectionId))
        .filter(p => allVariants.some(v => v.productId.id === p.id));

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-[#fae606] selection:text-black">


            {/* Premium Hero Banner - Matching About Page Exactly */}
            <section className="relative pt-44 pb-32 overflow-hidden min-h-[85vh] flex items-center bg-[#0F0F0F]">
                <div
                    className="absolute inset-0 z-0"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000"
                        alt="Products Banner"
                        className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${isVisible ? 'scale-100' : 'scale-125'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-20">
                    <div className="max-w-4xl">
                        <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <span className="w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase">Premium Selection</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 font-['Playfair_Display']">
                            {['Our', 'Products', 'Material Library'].map((word, index) => (
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
                            Explore our premium collection of natural stone and marble products, meticulously sourced and crafted for architectural excellence.
                        </p>

                        <div className={`flex items-center gap-6 mt-12 transition-all duration-1000 delay-[1100ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            <div className="w-20 h-20 rounded-full border border-[#fae606]/30 flex items-center justify-center backdrop-blur-md animate-pulse">
                                <History className="text-[#fae606] w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[#fae606] font-black text-2xl leading-none">2016</p>
                                <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold mt-1">Inception Year</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1600px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40">
                            <div className="w-16 h-16 border-4 border-slate-100 border-t-[#fae606] rounded-full animate-spin mb-6"></div>
                            <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">Loading Products...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-16">

                            {/* Sticky Sidebar for Collections */}
                            <div className="lg:w-1/5">
                                <div className="sticky top-32">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-8 h-8 bg-[#fae606] rounded-full flex items-center justify-center shadow-lg shadow-[#fae606]/20">
                                            <BookOpen size={16} className="text-black" />
                                        </div>
                                        <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Collections</h2>
                                    </div>

                                    <div className="space-y-3">
                                        {collections.length === 0 ? (
                                            <div className="p-8 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 text-center">
                                                <Sparkles className="mx-auto text-slate-300 mb-4" size={32} />
                                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed">No collections recorded.</p>
                                            </div>
                                        ) : (
                                            collections
                                                .filter(col => products.some(p => p.collection_id === col.id && allVariants.some(v => v.productId.id === p.id)))
                                                .map((col) => (
                                                    <div key={col.id} className="space-y-2">
                                                        <button
                                                            onClick={() => handleCollectionSelect(col.id.toString())}
                                                            className={`w-full group relative flex items-center justify-between p-4 rounded-xl transition-all duration-500 overflow-hidden ${selectedCollectionId === col.id.toString()
                                                                ? 'bg-[#0F0F0F] text-white shadow-2xl scale-105 z-10'
                                                                : 'bg-white border border-slate-100 hover:border-slate-300 text-slate-600'
                                                                }`}
                                                        >
                                                            <span className="font-bold relative z-10 text-left uppercase tracking-tighter text-sm">{col.name}</span>
                                                        </button>
                                                    </div>
                                                ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            <style>{`
                                .no-scrollbar::-webkit-scrollbar { display: none; }
                                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                            `}</style>

                            {/* Main Display Area */}
                            <div className="lg:w-4/5 flex flex-col">
                                <div className="flex-1">
                                    {selectedProduct ? (
                                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                                {variantsLoading ? (
                                                    [1, 2, 3].map(i => (
                                                        <div key={i} className="aspect-[4/5] bg-slate-50 rounded-[24px] animate-pulse" />
                                                    ))
                                                ) : variants.length > 0 ? (
                                                    variants.flatMap(v => v.images.map((image, index) => ({ image, index, variant: v }))).map((item, idx) => (
                                                        <div key={`${item.variant.id}-${item.index}`} className="group">
                                                            <div
                                                                className="relative aspect-[4/5] bg-slate-100 rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2"
                                                                onClick={() => openImageModal(item.image, idx)}
                                                            >
                                                                <img
                                                                    src={`${import.meta.env.VITE_API_BASE_URL}${item.image}`}
                                                                    alt={item.variant.name}
                                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                                <div className="absolute inset-x-0 bottom-0 p-8 flex items-center justify-between pointer-events-none translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 transform transition-transform group-hover:scale-110">
                                                                        <Maximize2 size={20} className="text-white" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="col-span-full py-40 bg-slate-50 rounded-[64px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                                                        <Sparkles className="text-slate-200 mb-6" size={48} />
                                                        <p className="text-slate-400 font-bold uppercase tracking-widest">No specimens recorded for this product.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-40 bg-slate-50 rounded-[64px] border-2 border-dashed border-slate-200">
                                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                                                <BookOpen size={40} className="text-[#fae606]" />
                                            </div>
                                            <h3 className="text-3xl font-black text-slate-950 tracking-tighter mb-4 font-['Playfair_Display']">Product Gallery</h3>
                                            <p className="text-slate-400 text-lg font-medium text-center max-w-sm">Please select a collection from the sidebar to browse our products.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Product (Values) Horizontal List */}
                                {activeProductsForSelected.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-slate-100 overflow-x-auto no-scrollbar">
                                        <div className="flex items-center gap-8 min-w-max pb-4">

                                            {activeProductsForSelected.map((product) => (
                                                <button
                                                    key={product.id}
                                                    onClick={() => handleProductSelect(product)}
                                                    className={`group relative flex flex-col items-center p-4 transition-all duration-700 ${selectedProduct?.id === product.id
                                                        ? 'scale-110 z-10'
                                                        : 'opacity-50 hover:opacity-100'}`}
                                                >
                                                    <div className={`w-20 h-20 rounded-full overflow-hidden border-[3px] transition-all duration-700 shadow-sm ${selectedProduct?.id === product.id ? 'border-[#fae606] shadow-xl shadow-[#fae606]/20' : 'border-white group-hover:border-slate-100'}`}>
                                                        <img
                                                            src={`${import.meta.env.VITE_API_BASE_URL}${product.image_url}`}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col items-center text-center mt-1">
                                                        <span className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all ${selectedProduct?.id === product.id ? 'text-slate-900' : 'text-slate-400'}`}>
                                                            {product.name}
                                                        </span>
                                                    </div>

                                                    {selectedProduct?.id === product.id && (
                                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#fae606] rounded-full" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Image Modal */}
            {showImageModal && (
                <div
                    className="fixed inset-0 bg-white/40 backdrop-blur-[40px] z-[9999] flex items-center justify-center p-6 md:p-12 transition-all duration-700 ease-out animate-in fade-in"
                    onClick={() => setShowImageModal(false)}
                >
                    <button onClick={() => setShowImageModal(false)} className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center transition-all duration-300 z-[10000] group"><X size={24} className="text-slate-800" /></button>
                    <button onClick={handlePrevImage} className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center hover:scale-110 transition-all"><ChevronLeft size={48} className="text-slate-800" strokeWidth={1} /></button>
                    <button onClick={handleNextImage} className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center hover:scale-110 transition-all"><ChevronRight size={48} className="text-slate-800" strokeWidth={1} /></button>
                    <div className="max-w-6xl w-full h-full flex flex-col items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
                        <img src={`${import.meta.env.VITE_API_BASE_URL}${modalImage}`} alt="Specimen" className="max-w-full max-h-[75vh] object-contain shadow-2xl" />
                        {selectedProduct && <div className="mt-12 text-center"><h1 className="text-slate-950 text-4xl md:text-6xl font-extralight tracking-tight italic font-serif">{selectedProduct.name}</h1><span className="text-slate-400 text-xs font-black uppercase tracking-[0.4em] mt-6">Product Gallery</span></div>}
                    </div>
                </div>
            )}

            {/* Our Collections Section - All Products Display */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="text-[#fae606] font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4 block">Curated Selection</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-['Playfair_Display']">
                            Our Collections
                        </h2>
                        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                            Explore our range of pure and natural products, sourced directly from nature's finest reserves.
                        </p>
                    </div>

                    {/* Collection Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {collections.map((col) => (
                            <button
                                key={col.id}
                                onClick={() => setCollectionsFilterId(col.id.toString())}
                                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${collectionsFilterId === col.id.toString()
                                    ? 'bg-[#0F0F0F] text-white shadow-lg'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                {col.name}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {(collectionsFilterId === '' ? products : products.filter(p => p.collection_id === parseInt(collectionsFilterId)))
                            .map((product) => (
                                <div
                                    key={product.id}
                                    className="group cursor-pointer"
                                    onClick={() => {
                                        if (product.image_url) {
                                            setModalImage(product.image_url);
                                            setShowImageModal(true);
                                        }
                                    }}
                                >
                                    <div className="relative aspect-square bg-slate-100 rounded-3xl overflow-hidden mb-4 shadow-sm hover:shadow-2xl transition-all duration-700">
                                        {product.image_url ? (
                                            <img
                                                src={`${import.meta.env.VITE_API_BASE_URL}${product.image_url}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-200">
                                                <Sparkles className="text-slate-400" size={40} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between pointer-events-none translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                                                <Maximize2 size={16} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center px-2">
                                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-1">
                                            {product.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Empty State */}
                    {(collectionsFilterId === '' ? products : products.filter(p => p.collection_id === parseInt(collectionsFilterId))).length === 0 && (
                        <div className="text-center py-20">
                            <Sparkles className="mx-auto text-slate-300 mb-6" size={64} />
                            <p className="text-slate-400 text-lg font-bold uppercase tracking-widest">
                                No products found in this collection
                            </p>
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default ProductsPage;
