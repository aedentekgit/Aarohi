import React, { useEffect, useState } from 'react';
import { ShieldCheck, Layers, Ruler, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const bannerImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000";

const ServicesPage = () => {
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        setHeroVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const services = [
        {
            id: "01",
            title: "Quality Assurance",
            description: "Every stone undergoes strict inspection for strength, polish, and finish to ensure only the highest-quality slabs reach our customers.",
            icon: ShieldCheck,
            features: [
                "10-Point Inspection Protocol",
                "Laser-Guided Calibration",
                "95+ Gloss Polishing",
                "Structural Stress Testing"
            ]
        },
        {
            id: "02",
            title: "Stone Sourcing",
            description: "We source the finest quality granite and natural stones from renowned quarries across India, ensuring premium texture, durability, and color consistency.",
            icon: Layers,
            features: [
                "150+ Material Variations",
                "Rare Exotic Stones",
                "Custom Surface Finishes",
                "Large Format Slabs"
            ]
        },
        {
            id: "03",
            title: "Precision Fabrication",
            description: "Using advanced machinery, we offer custom cutting, polishing, and surface finishing to meet exact design and architectural requirements.",
            icon: Ruler,
            features: [
                "CNC-Automated Cutting",
                "Custom Countertops",
                "Intricate Edge Joinery",
                "Architectural Sculpting"
            ]
        },
        {
            id: "04",
            title: "Global Logistics",
            description: "From sample selection to project completion, our dedicated team provides personalized guidance and reliable after-sales assistance.",
            icon: Truck,
            features: [
                "Worldwide Shipping",
                "Secure Packaging",
                "Real-Time Tracking",
                "On-Time Delivery"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Banner */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[75vh] flex items-center bg-[#0F0F0F]">
                <div className="absolute inset-0 z-0">
                    <img
                        src={bannerImg}
                        alt="Services Banner"
                        className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${heroVisible ? 'scale-100' : 'scale-125'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-20">
                    <div className="max-w-4xl">
                        <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${heroVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <span className="w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase">Elite Stone Solutions</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-12">
                            <span className={`block transition-all duration-[1200ms] delay-300 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>Our Crafted</span>
                            <span className={`block text-[#fae606] italic font-light transition-all duration-[1200ms] delay-500 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>Expertise</span>
                        </h1>

                        <p className={`text-white/60 text-lg md:text-2xl font-light leading-relaxed max-w-2xl transition-all duration-1000 delay-700 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            Comprehensive stone solutions that bridge the gap between architectural vision and geological reality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid - Professional Corporate Layout */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">

                    {/* Section Header */}
                    <div className="max-w-3xl mb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-1 bg-[#fae606]"></div>
                            <span className="text-[#fae606] font-bold tracking-[0.3em] text-xs uppercase">What We Offer</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            Comprehensive Stone Solutions
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            From quarry to installation, we provide end-to-end services ensuring unmatched quality and craftsmanship at every stage.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="group bg-white border-2 border-slate-200 rounded-2xl p-8 md:p-10 hover:border-[#fae606] hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Service Number & Icon */}
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-[#fae606] transition-all duration-500">
                                            <service.icon className="w-8 h-8 text-slate-700 group-hover:text-black transition-colors" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-slate-300 font-black text-5xl group-hover:text-[#fae606] transition-colors">{service.id}</span>
                                    </div>
                                </div>

                                {/* Service Title */}
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-[#fae606] transition-colors">
                                    {service.title}
                                </h3>

                                {/* Service Description */}
                                <p className="text-slate-600 text-base leading-relaxed mb-8">
                                    {service.description}
                                </p>

                                {/* Features List */}
                                <div className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#fae606] mt-0.5 flex-shrink-0" strokeWidth={2} />
                                            <span className="text-slate-700 text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Learn More Link */}
                                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm group-hover:text-[#fae606] transition-colors cursor-pointer">
                                    <span>Learn More</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
