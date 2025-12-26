import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Edit2,
    Trash2,
    X,
    Search,
    Upload,
    Menu,
    FileImage
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';

const AdminProducts = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize] = useState(10);

    // Confirmation modal state
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, productId: null });

    // Toast state
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const [formData, setFormData] = useState({
        name: '',
        collection_id: '',
        image: null
    });

    useEffect(() => {
        document.title = "Manage Products | Admin Aarohi";
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [navigate, currentPage, searchTerm]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const params = new URLSearchParams({
                page: currentPage,
                limit: pageSize,
                search: searchTerm
            });

            const productsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products?${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const productsData = await productsRes.json();

            if (productsData.data) {
                setProducts(productsData.data);
                setTotalPages(productsData.pagination.totalPages);
                setTotalCount(productsData.pagination.total);
            } else {
                setProducts(Array.isArray(productsData) ? productsData : []);
            }

            const collectionsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections`);
            const collectionsData = await collectionsRes.json();
            setCollections(collectionsData.data || collectionsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('collection_id', formData.collection_id);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const url = editingProduct
                ? `${import.meta.env.VITE_API_BASE_URL}/api/products/${editingProduct.id}`
                : `${import.meta.env.VITE_API_BASE_URL}/api/products`;

            const method = editingProduct ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            if (response.ok) {
                setToast({
                    show: true,
                    message: editingProduct ? 'Product updated successfully!' : 'Product created successfully!',
                    type: 'success'
                });
                setShowModal(false);
                resetForm();
                fetchData();
            }
        } catch (error) {
            console.error('Error:', error);
            setToast({ show: true, message: 'An error occurred', type: 'error' });
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            collection_id: product.collection_id,
            image: null
        });
        setImagePreview(`${import.meta.env.VITE_API_BASE_URL}${product.image_url}`);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setToast({ show: true, message: 'Product deleted successfully!', type: 'success' });
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            setToast({ show: true, message: 'Failed to delete product', type: 'error' });
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            collection_id: '',
            image: null
        });
        setEditingProduct(null);
        setImagePreview(null);
    };


    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activePage="products" />

            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
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
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Manage your product inventory</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fae606] focus:border-transparent w-64"
                                />
                            </div>
                            <button
                                onClick={() => { resetForm(); setShowModal(true); }}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#fae606] to-[#e6d500] text-slate-900 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-yellow-900/20 transition-all"
                            >
                                <Plus size={18} />
                                <span className="hidden sm:inline">Add Product</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10" data-lenis-prevent>
                    <div className="max-w-7xl mx-auto">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Total Products</p>
                                        <p className="text-3xl font-bold text-slate-900 mt-1">{totalCount}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <FileImage className="text-blue-600" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Search (visible only on small screens) */}
                        <div className="md:hidden mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fae606] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">S. No</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Product Name</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Collection</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {products.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                                    No products found
                                                </td>
                                            </tr>
                                        ) : (
                                            products.map((product, index) => (
                                                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-slate-900 font-medium text-center">{((currentPage - 1) * pageSize) + index + 1}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-900 font-semibold text-center">{product.name}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 text-center">{product.collection_name || 'N/A'}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex justify-center">
                                                            <img
                                                                src={`${import.meta.env.VITE_API_BASE_URL}${product.image_url}`}
                                                                alt={product.name}
                                                                className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleEdit(product)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => setConfirmModal({ isOpen: true, productId: product.id })}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {products.length === 0 ? (
                                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                                    <p className="text-slate-500">No products found</p>
                                </div>
                            ) : (
                                products.map((product, index) => (
                                    <div key={product.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={`${import.meta.env.VITE_API_BASE_URL}${product.image_url}`}
                                                    alt={product.name}
                                                    className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-sm font-bold text-slate-900 truncate">{product.name}</h3>
                                                        <p className="text-xs text-slate-500 mt-0.5">{product.collection_name || 'N/A'}</p>
                                                    </div>
                                                    <span className="flex-shrink-0 text-xs font-medium text-slate-400">#{((currentPage - 1) * pageSize) + index + 1}</span>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 mt-3">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all text-xs font-semibold"
                                                    >
                                                        <Edit2 size={14} />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmModal({ isOpen: true, productId: product.id })}
                                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all text-xs font-semibold"
                                                    >
                                                        <Trash2 size={14} />
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalCount={totalCount}
                            pageSize={pageSize}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </main>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
                        <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button
                                onClick={() => { setShowModal(false); resetForm(); }}
                                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            placeholder="e.g., Italian Marble"
                                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fae606] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                            Collection *
                                        </label>
                                        <select
                                            value={formData.collection_id}
                                            onChange={(e) => setFormData({ ...formData, collection_id: e.target.value })}
                                            required
                                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fae606] focus:border-transparent"
                                        >
                                            <option value="">Select a collection</option>
                                            {collections.map(collection => (
                                                <option key={collection.id} value={collection.id}>
                                                    {collection.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                        Product Image {!editingProduct && '*'}
                                    </label>
                                    {!imagePreview ? (
                                        <label className="flex flex-col items-center justify-center px-4 py-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition-all h-[200px]">
                                            <Upload className="text-slate-400 mb-2" size={32} />
                                            <span className="text-sm text-slate-600 font-semibold">Click to upload</span>
                                            <span className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                required={!editingProduct}
                                                className="hidden"
                                            />
                                        </label>
                                    ) : (
                                        <div className="relative group">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-[200px] object-cover rounded-lg border-2 border-slate-200"
                                                onError={(e) => {
                                                    console.error('Image failed to load:', imagePreview);
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                                                Preview
                                            </div>
                                            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg flex items-center justify-center">
                                                <span className="text-white text-sm font-semibold">Change Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); resetForm(); }}
                                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#fae606] to-[#e6d500] text-slate-900 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-yellow-900/20 transition-all"
                                >
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, productId: null })}
                onConfirm={() => handleDelete(confirmModal.productId)}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                confirmText="Delete"
                type="warning"
            />

            {/* Toast Notification */}
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
};

export default AdminProducts;


