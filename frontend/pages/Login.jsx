import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Shield, Globe, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
        document.title = "Admin Login | Aarohi Exports";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6 font-sans selection:bg-[#fae606] selection:text-black relative">
            {/* Background Aesthetic Elements - Refined for a clean, light architectural look */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-[#fae606]/10 rounded-full blur-[100px] animate-pulse duration-[8000ms]" />
                <div className="absolute bottom-[0%] left-[-5%] w-[35%] h-[35%] bg-slate-200/40 rounded-full blur-[100px]" />

                {/* Subtle Geometric Overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1.2px, transparent 1.2px), linear-gradient(90deg, #000 1.2px, transparent 1.2px)', backgroundSize: '60px 60px' }}></div>
            </div>

            <div className={`w-full max-w-4xl bg-white rounded-[40px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row transition-all duration-1000 ease-out border border-white/50 relative z-10 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

                {/* Visual Side - Dark Architectural Theme */}
                <div className="hidden lg:flex w-[42%] relative bg-[#0F0F0F] p-10 flex-col justify-between overflow-hidden">
                    {/* Animated Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                            alt="Luxury Architecture"
                            className="w-full h-full object-cover opacity-40 scale-110 animate-pulse duration-[10000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/60 via-transparent to-[#0F0F0F]" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-[#fae606] rounded-xl flex items-center justify-center text-black font-black text-xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                A
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-black tracking-tighter text-xl uppercase leading-none">Aarohi</span>
                                <span className="text-[#fae606] font-light tracking-[0.3em] text-[10px] uppercase mt-1">Exports Central</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-left">
                        <div className="w-10 h-1 bg-[#fae606] mb-6" />
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-[0.95] mb-6 font-['Playfair_Display']">
                            Mastering the <br />
                            <span className="text-[#fae606] italic font-light">Art of Stone.</span>
                        </h2>
                        <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm">
                            Access the global administrative gateway for premium stone logistics and curated collection management.
                        </p>

                        <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0F0F0F] bg-zinc-800 flex items-center justify-center overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Admin" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-xs tracking-tight">Active Administrators</span>
                                <span className="text-[#fae606] text-[9px] font-black uppercase tracking-widest">Verified Network</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side - Clean Modern Typography */}
                <div className="w-full lg:w-[58%] p-8 md:p-12 flex flex-col bg-white">
                    <div className="mb-10 text-left">
                        <div className="flex items-center gap-2 mb-3">
                            <Shield className="text-[#fae606]" size={18} fill="currentColor" />
                            <span className="text-[10px] font-black text-[#fae606] uppercase tracking-[0.4em]">Secure Gateway</span>
                        </div>
                        <h1 className="text-3xl font-black text-[#0F0F0F] tracking-tighter mb-3 leading-none">Administrative Login</h1>
                        <p className="text-zinc-500 text-sm font-medium max-w-md">Please enter your enterprise credentials to access the Aarohi ecosystem.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                        <div className="space-y-2 text-left">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[11px] font-black text-[#0F0F0F] uppercase tracking-widest">Identity</label>
                                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Email Address</span>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Mail className="text-zinc-400 group-focus-within:text-[#0F0F0F] transition-colors" size={20} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="yourname@aarohi.com"
                                    className="w-full h-16 bg-zinc-50 border border-zinc-200 rounded-[20px] pl-14 pr-6 text-base font-semibold text-[#0F0F0F] placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-[#fae606]/10 focus:border-[#0F0F0F] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 text-left">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[11px] font-black text-[#0F0F0F] uppercase tracking-widest">Security</label>
                                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Passphrase</span>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Lock className="text-zinc-400 group-focus-within:text-[#0F0F0F] transition-colors" size={20} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-16 bg-zinc-50 border border-zinc-200 rounded-[20px] pl-14 pr-6 text-base font-semibold text-[#0F0F0F] placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-[#fae606]/10 focus:border-[#0F0F0F] transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-2">
                            <label className="flex items-center gap-3 text-xs font-bold text-zinc-500 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-zinc-200 rounded-lg checked:bg-[#fae606] checked:border-[#fae606] transition-all cursor-pointer" />
                                    <UserCheck className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 left-1 transition-opacity pointer-events-none" />
                                </div>
                                <span className="group-hover:text-[#0F0F0F] transition-colors">Remember this session</span>
                            </label>
                            <button type="button" className="text-xs font-black text-[#0F0F0F] hover:text-[#fae606] underline decoration-2 underline-offset-4 transition-colors">Forgot?</button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-16 bg-[#0F0F0F] hover:bg-[#1A1A1A] text-white rounded-[20px] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 group transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Authenticating</span>
                                </div>
                            ) : (
                                <>
                                    <span>Establish Connection</span>
                                    <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Globe size={16} className="text-zinc-400" />
                                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Global Node</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield size={16} className="text-zinc-400" />
                                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Encrypted SSL</span>
                            </div>
                        </div>
                        <p className="text-zinc-300 text-[9px] font-black uppercase tracking-[0.3em]">© 2025 Aarohi System Architecture</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
