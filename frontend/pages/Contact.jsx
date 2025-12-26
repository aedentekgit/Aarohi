import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare, Clock, ArrowRight, Shield, Star, CheckCircle2, Building2, Users, Award } from 'lucide-react';
import contactImg from '../images/contact.jpg';

const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
        document.title = "Contact Us | Aarohi Exports";

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            value: "sabarishthavamani@gmail.com",
            detail: "Response within 24 hours",
            bgColor: "bg-[#fae606]/20",
            iconColor: "text-[#fae606]"
        },
        {
            icon: Phone,
            title: "Call Us",
            value: "+91 98435 64268",
            detail: "Mon - Sat, 9am - 7pm",
            bgColor: "bg-[#fae606]/20",
            iconColor: "text-[#fae606]"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            value: "Plot No. 36, 1st Floor, 3rd Cross",
            detail: "KK Nagar, Tamil Nadu 625020",
            bgColor: "bg-[#fae606]/20",
            iconColor: "text-[#fae606]"
        }
    ];

    const features = [
        {
            icon: Building2,
            title: "Global Presence",
            description: "Serving clients across 15+ countries"
        },
        {
            icon: Users,
            title: "Expert Team",
            description: "25+ years of industry experience"
        },
        {
            icon: Award,
            title: "Premium Quality",
            description: "500+ successful projects delivered"
        }
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = "Name must be at least 3 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // EmailJS Configuration
            // IMPORTANT: Replace these with your actual EmailJS credentials
            // Get them from: https://www.emailjs.com/
            const serviceId = 'YOUR_SERVICE_ID';  // Replace with your EmailJS Service ID
            const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
            const publicKey = 'YOUR_PUBLIC_KEY';   // Replace with your EmailJS Public Key

            // Import EmailJS
            const emailjs = (await import('@emailjs/browser')).default;

            // Prepare template parameters
            const templateParams = {
                from_name: formData.fullName,
                from_email: formData.email,
                phone_number: formData.phoneNumber,
                message: formData.message,
                to_email: 'sabarishthavamani@gmail.com'
            };

            // Send email using EmailJS
            await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            console.log('Email sent successfully!');
            setSubmitStatus('success');
            setFormData({ fullName: '', email: '', phoneNumber: '', message: '' });
        } catch (error) {
            console.error('Email sending failed:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Hide status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-white font-urbanist selection:bg-[#fae606] selection:text-black">


            {/* Hero Section with Parallax - Matching About Page */}
            <section className="relative pt-44 pb-32 overflow-hidden min-h-[85vh] flex items-center bg-[#0F0F0F]">
                <div
                    className="absolute inset-0 z-0"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <img
                        src={contactImg}
                        alt="Contact Us - Granite Showroom"
                        className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${isVisible ? 'scale-100' : 'scale-125'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-20">
                    <div className="max-w-4xl">
                        <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <span className="w-12 h-[1px] bg-[#fae606]"></span>
                            <span className="text-[#fae606] font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase">Get In Touch</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 font-['Playfair_Display']">
                            {['Let\'s Create', 'Something', 'Contact Us'].map((word, index) => (
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
                            Connect with our team of experts to bring your architectural vision to life with premium natural stones and exceptional craftsmanship.
                        </p>

                        <div className={`flex flex-wrap items-center gap-8 mt-12 transition-all duration-1000 delay-[1100ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full border border-[#fae606]/30 flex items-center justify-center backdrop-blur-md">
                                        <feature.icon className="text-[#fae606] w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm leading-tight">{feature.title}</p>
                                        <p className="text-white/40 text-xs mt-0.5">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Contact Section - Premium Card Design */}
            <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#fae606] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-900 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px] relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#fae606]"></div>
                            <Star className="w-5 h-5 text-[#fae606] fill-[#fae606]" />
                            <Star className="w-4 h-4 text-[#fae606] fill-[#fae606] opacity-60" />
                            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#fae606]"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 font-['Playfair_Display']">
                            Get In Touch
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            We're here to help you transform your space with premium natural stones
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50">
                        {/* Decorative Top Border */}
                        <div className="h-2 bg-gradient-to-r from-[#fae606] via-[#e6d500] to-[#fae606]"></div>

                        <div className="grid lg:grid-cols-5 gap-0">
                            {/* Left Column - Contact Form (3/5) */}
                            <div className="lg:col-span-3 p-8 md:p-12 lg:p-14">
                                <div className="mb-10">
                                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Playfair_Display']">
                                        Send Us a Message
                                    </h3>
                                    <p className="text-slate-600">
                                        Fill out the form below and our team will get back to you within 24 hours.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                                                {errors.fullName && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.fullName}</span>}
                                            </div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className={`w-full bg-slate-50 border ${errors.fullName ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'} px-5 py-4 rounded-2xl focus:ring-2 focus:ring-[#fae606]/50 focus:border-[#fae606] transition-all outline-none text-slate-900`}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                                                {errors.email && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.email}</span>}
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full bg-slate-50 border ${errors.email ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'} px-5 py-4 rounded-2xl focus:ring-2 focus:ring-[#fae606]/50 focus:border-[#fae606] transition-all outline-none text-slate-900`}
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                                            {errors.phoneNumber && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.phoneNumber}</span>}
                                        </div>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className={`w-full bg-slate-50 border ${errors.phoneNumber ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'} px-5 py-4 rounded-2xl focus:ring-2 focus:ring-[#fae606]/50 focus:border-[#fae606] transition-all outline-none text-slate-900`}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Message</label>
                                            {errors.message && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.message}</span>}
                                        </div>
                                        <textarea
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`w-full bg-slate-50 border ${errors.message ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'} px-5 py-3 rounded-2xl focus:ring-2 focus:ring-[#fae606]/50 focus:border-[#fae606] transition-all outline-none text-slate-900 resize-none`}
                                            placeholder="Tell us about your project..."
                                        ></textarea>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`group w-full md:w-auto px-10 py-4 ${isSubmitting ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#fae606] hover:bg-[#e6d500] text-slate-900'} font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center justify-center gap-2`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin"></div>
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Send Message</span>
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        {submitStatus === 'success' && (
                                            <div className="flex items-center gap-2 text-green-600 animate-in fade-in slide-in-from-left-4">
                                                <CheckCircle2 size={20} />
                                                <span className="font-bold text-sm uppercase tracking-wider">Message Sent Successfully!</span>
                                            </div>
                                        )}
                                        {submitStatus === 'error' && (
                                            <div className="flex items-center gap-2 text-red-600 animate-in fade-in slide-in-from-left-4">
                                                <Shield size={20} />
                                                <span className="font-bold text-sm uppercase tracking-wider">Failed to send. Please try again.</span>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Right Column - Contact Information (2/5) */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 lg:p-14 flex flex-col justify-center relative overflow-hidden">
                                {/* Decorative Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                        backgroundSize: '40px 40px'
                                    }}></div>
                                </div>

                                <div className="relative z-10">
                                    <div className="mb-6">
                                        <div className="inline-block px-4 py-2 bg-[#fae606]/20 border border-[#fae606]/30 rounded-full mb-6">
                                            <span className="text-[#fae606] text-sm font-semibold uppercase tracking-wider">Contact Information</span>
                                        </div>
                                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 font-['Playfair_Display']">
                                            Reach Out to Us
                                        </h4>
                                        <p className="text-white/60 leading-relaxed">
                                            Our team is available to answer your questions and help you find the perfect natural stone for your project.
                                        </p>
                                    </div>

                                    {/* Contact Cards */}
                                    <div className="space-y-4">
                                        {contactInfo.map((info, index) => (
                                            <div
                                                key={index}
                                                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-5 hover:bg-white/10 hover:border-[#fae606]/50 transition-all duration-300 cursor-pointer"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#fae606]/30 transition-colors`}>
                                                        <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-white/50 text-sm mb-1">{info.title}</div>
                                                        <div className="text-white font-semibold text-sm md:text-base leading-snug">{info.value}</div>
                                                        <div className="text-white/40 text-xs mt-1">{info.detail}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Business Hours */}
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-[#fae606]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-6 h-6 text-[#fae606]" />
                                            </div>
                                            <div>
                                                <div className="text-white/50 text-sm mb-1">Business Hours</div>
                                                <div className="text-white font-semibold">Monday - Saturday</div>
                                                <div className="text-white/60 text-sm">9:00 AM - 7:00 PM</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1440px]">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Playfair_Display']">
                            Visit Our Showroom
                        </h3>
                        <p className="text-slate-600 text-lg">
                            Experience our premium collection in person
                        </p>
                    </div>

                    <div className="rounded-3xl h-[500px] relative overflow-hidden shadow-2xl border border-slate-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15720.076869407!2d78.13459!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c58246069cc7%3A0x40c72386fdc9930!2sK.K.%20Nagar%2C%20Madurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1703330000000!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>

                        {/* Map Marker */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#fae606]/20 rounded-full animate-ping"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#fae606] rounded-full shadow-[0_0_30px_rgba(250,230,6,0.6)] border-4 border-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;
