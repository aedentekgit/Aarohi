import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Layers,
    FileImage,
    Package,
    Menu,
    Image,
    Plus
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState({
        collections: 0,
        products: 0,
        variants: 0,
        gallery: 0
    });

    useEffect(() => {
        document.title = "Dashboard | Admin Aarohi";
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch user data
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error('Unauthorized');
                return res.json();
            })
            .then(data => setUser(data))
            .catch(() => {
                localStorage.removeItem('token');
                navigate('/login');
            });

        // Fetch stats
        fetchStats(token);
    }, [navigate]);

    const fetchStats = async (token) => {
        try {
            // Fetch collections count
            const collectionsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections`);
            const collectionsData = await collectionsRes.json();

            // Fetch products count
            const productsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
            const productsData = await productsRes.json();

            // Fetch variants count
            const variantsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product-variants`);
            const variantsData = await variantsRes.json();

            // Fetch gallery count
            const galleryRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery`);
            const galleryData = await galleryRes.json();

            setStats({
                collections: collectionsData.pagination ? collectionsData.pagination.total : (Array.isArray(collectionsData) ? collectionsData.length : 0),
                products: productsData.pagination ? productsData.pagination.total : (Array.isArray(productsData) ? productsData.length : 0),
                variants: variantsData.pagination ? variantsData.pagination.total : (variantsData.success && Array.isArray(variantsData.data) ? variantsData.data.length : 0),
                gallery: galleryData.pagination ? galleryData.pagination.total : (Array.isArray(galleryData.data) ? galleryData.data.length : 0)
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    if (!user) return null;

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activePage="dashboard" />

            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header - Matching other admin pages */}
                <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-20 shadow-sm">
                    <div className="px-6 lg:px-10 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                            >
                                <Menu size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Welcome back, {user.email.split('@')[0]}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right mr-3">
                                <p className="text-sm font-bold text-slate-900">{user.email.split('@')[0].toUpperCase()}</p>
                                <p className="text-xs text-slate-500">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-[#fae606] to-[#e6d500] rounded-lg flex items-center justify-center text-slate-900 text-sm font-bold shadow-lg">
                                {user.email[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Title */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">System Overview</h2>
                            <p className="text-base text-slate-500">Monitor your inventory and business metrics</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Collections Card */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                                onClick={() => navigate('/admin/collections')}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <Layers className="text-blue-600" size={24} />
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        Active
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-2">Total Collections</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-4xl font-bold text-slate-900">{stats.collections}</h3>
                                    <span className="text-sm text-slate-400">categories</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-500">Click to manage collections →</p>
                                </div>
                            </div>

                            {/* Products Card */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                                onClick={() => navigate('/admin/products')}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                        <FileImage className="text-green-600" size={24} />
                                    </div>
                                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                        Active
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-2">Total Products</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-4xl font-bold text-slate-900">{stats.products}</h3>
                                    <span className="text-sm text-slate-400">items</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-500">Click to manage products →</p>
                                </div>
                            </div>

                            {/* Product Variants Card */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                                onClick={() => navigate('/admin/product-variants')}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                        <Package className="text-purple-600" size={24} />
                                    </div>
                                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                        Active
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-2">Product Variants</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-4xl font-bold text-slate-900">{stats.variants}</h3>
                                    <span className="text-sm text-slate-400">variations</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-500">Click to manage variants →</p>
                                </div>
                            </div>

                            {/* Gallery Card */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                                onClick={() => navigate('/admin/gallery')}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                        <Image className="text-amber-600" size={24} />
                                    </div>
                                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                        Active
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-2">Gallery Images</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-4xl font-bold text-slate-900">{stats.gallery}</h3>
                                    <span className="text-sm text-slate-400">images</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-500">Click to manage gallery →</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <button
                                    onClick={() => navigate('/admin/collections')}
                                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all text-left"
                                >
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Layers className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Add Collection</p>
                                        <p className="text-xs text-slate-500">Create new category</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => navigate('/admin/products')}
                                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all text-left"
                                >
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <FileImage className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Add Product</p>
                                        <p className="text-xs text-slate-500">Create new product</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => navigate('/admin/product-variants')}
                                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all text-left"
                                >
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Package className="text-purple-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Add Variant</p>
                                        <p className="text-xs text-slate-500">Create product variation</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => navigate('/admin/gallery')}
                                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all text-left"
                                >
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <Image className="text-amber-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Gallery</p>
                                        <p className="text-xs text-slate-500">Manage gallery</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
