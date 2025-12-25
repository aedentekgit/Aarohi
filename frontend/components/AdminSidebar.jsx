import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    LogOut,
    Layers,
    FileImage,
    X,
    Package,
    Image
} from 'lucide-react';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, activePage }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Premium Sidebar */}
            <aside className={`w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col fixed h-full z-40 shadow-xl shadow-slate-900/5 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {/* Logo */}
                <div className="p-6 lg:p-8 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#fae606] to-[#e6d500] rounded-lg flex items-center justify-center shadow-lg shadow-yellow-900/20">
                            <span className="text-slate-900 font-serif text-lg italic font-bold">A</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-900 tracking-tight">AAROHI</div>
                            <div className="text-[10px] text-slate-400 font-semibold tracking-wider">ADMIN PORTAL</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <NavItem
                        icon={<LayoutDashboard size={18} />}
                        label="Dashboard"
                        active={activePage === 'dashboard'}
                        onClick={() => { navigate('/dashboard'); setSidebarOpen(false); }}
                    />
                    <NavItem
                        icon={<Layers size={18} />}
                        label="Collections"
                        active={activePage === 'collections'}
                        onClick={() => { navigate('/admin/collections'); setSidebarOpen(false); }}
                    />
                    <NavItem
                        icon={<FileImage size={18} />}
                        label="Products"
                        active={activePage === 'products'}
                        onClick={() => { navigate('/admin/products'); setSidebarOpen(false); }}
                    />
                    <NavItem
                        icon={<Package size={18} />}
                        label="Product Variants"
                        active={activePage === 'variants'}
                        onClick={() => { navigate('/admin/product-variants'); setSidebarOpen(false); }}
                    />
                    <NavItem
                        icon={<Image size={18} />}
                        label="Gallery"
                        active={activePage === 'gallery'}
                        onClick={() => { navigate('/admin/gallery'); setSidebarOpen(false); }}
                    />
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-slate-400 hover:text-red-600 transition-all p-3 w-full rounded-lg hover:bg-red-50 group"
                    >
                        <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${active
            ? 'bg-gradient-to-r from-[#fae606] to-[#e6d500] text-slate-900 shadow-lg shadow-yellow-900/20'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
    >
        <span className={active ? 'text-slate-900' : 'text-slate-400'}>{icon}</span>
        <span>{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 bg-slate-900 rounded-full"></div>}
    </button>
);

export default AdminSidebar;
