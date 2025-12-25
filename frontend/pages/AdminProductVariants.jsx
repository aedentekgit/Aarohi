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
    Image as ImageIcon
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';

const AdminProductVariants = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [variants, setVariants] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingVariant, setEditingVariant] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize] = useState(10);

    // Confirmation modal state
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, variantId: null });

    // Toast state
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const [formData, setFormData] = useState({
        productId: '',
        name: '',
        images: [null, null, null] // Array for 3 images
    });
    const [imagePreviews, setImagePreviews] = useState([null, null, null]);

    useEffect(() => {
        document.title = "Manage Variants | Admin Aarohi";
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

            // Fetch variants
            const variantsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product-variants?${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const variantsData = await variantsRes.json();
            if (variantsData.success) {
                setVariants(variantsData.data);
                if (variantsData.pagination) {
                    setTotalPages(variantsData.pagination.totalPages);
                    setTotalCount(variantsData.pagination.total);
                }
            }

            // Fetch products for dropdown
            const productsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const productsData = await productsRes.json();
            // Products API returns array directly, not wrapped in success object
            if (Array.isArray(productsData)) {
                setProducts(productsData);
            } else if (productsData.data) {
                setProducts(productsData.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleProductChange = (productId) => {
        setFormData({ ...formData, productId });
        const product = products.find(p => p.id === parseInt(productId));
        setSelectedProduct(product);
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...formData.images];
            newImages[index] = file;
            setFormData({ ...formData, images: newImages });

            const reader = new FileReader();
            reader.onloadend = () => {
                const newPreviews = [...imagePreviews];
                newPreviews[index] = reader.result;
                setImagePreviews(newPreviews);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();
        formDataToSend.append('productId', formData.productId);
        formDataToSend.append('name', formData.name);

        // Append all non-null images
        formData.images.forEach((image, index) => {
            if (image) {
                formDataToSend.append('images', image);
            }
        });

        try {
            const url = editingVariant
                ? `${import.meta.env.VITE_API_BASE_URL}/api/product-variants/${editingVariant.id}`
                : `${import.meta.env.VITE_API_BASE_URL}/api/product-variants`;

            const method = editingVariant ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                setToast({
                    show: true,
                    message: editingVariant ? 'Variant updated successfully!' : 'Variant created successfully!',
                    type: 'success'
                });
                setShowModal(false);
                resetForm();
                fetchData();
            } else {
                setToast({ show: true, message: data.message || 'Operation failed', type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setToast({ show: true, message: 'An error occurred', type: 'error' });
        }
    };

    const handleEdit = (variant) => {
        setEditingVariant(variant);
        setFormData({
            productId: variant.productId?.id || '',
            name: variant.name,
            images: [null, null, null]
        });
        setSelectedProduct(variant.productId);

        // Set image previews from existing variant images
        const previews = [null, null, null];
        if (variant.images && variant.images.length > 0) {
            variant.images.forEach((img, index) => {
                if (index < 3 && img) {
                    previews[index] = `${import.meta.env.VITE_API_BASE_URL}${img}`;
                }
            });
        }
        setImagePreviews(previews);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product-variants/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setToast({ show: true, message: 'Variant deleted successfully!', type: 'success' });
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting variant:', error);
            setToast({ show: true, message: 'Failed to delete variant', type: 'error' });
        }
    };

    const resetForm = () => {
        setFormData({
            productId: '',
            name: '',
            images: [null, null, null]
        });
        setEditingVariant(null);
        setImagePreviews([null, null, null]);
        setSelectedProduct(null);
    };


    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activePage="variants" />

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
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Variants</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Manage product variations and options</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search variants..."
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
                                <span className="hidden sm:inline">Add Variant</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Total Variants</p>
                                        <p className="text-3xl font-bold text-slate-900 mt-1">{totalCount}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <ImageIcon className="text-blue-600" size={24} />
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
                                    placeholder="Search variants..."
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
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Product Image</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Collection</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Variant Name</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Variant Images</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {variants.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                                    No variants found
                                                </td>
                                            </tr>
                                        ) : (
                                            variants.map((variant, index) => (
                                                <tr key={variant.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-slate-900 font-medium text-center">{((currentPage - 1) * pageSize) + index + 1}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-900 font-medium text-center">{variant.productId?.name || 'N/A'}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex justify-center">
                                                            <img
                                                                src={`${import.meta.env.VITE_API_BASE_URL}${variant.productId?.image}`}
                                                                alt={variant.productId?.name}
                                                                className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 text-center">{variant.productId?.collectionId?.name || 'N/A'}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-900 font-medium text-center">{variant.name}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex gap-2 justify-center">
                                                            {variant.images && variant.images.length > 0 ? (
                                                                variant.images.map((img, idx) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={`${import.meta.env.VITE_API_BASE_URL}${img}`}
                                                                        alt={`${variant.name} ${idx + 1}`}
                                                                        className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                                                                    />
                                                                ))
                                                            ) : (
                                                                <span className="text-slate-400 text-xs">No images</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleEdit(variant)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => setConfirmModal({ isOpen: true, variantId: variant.id })}
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
                            {variants.length === 0 ? (
                                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                                    <p className="text-slate-500">No variants found</p>
                                </div>
                            ) : (
                                variants.map((variant, index) => (
                                    <div key={variant.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                                        {/* Header with Serial Number */}
                                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                                            <span className="text-xs font-medium text-slate-400">#{((currentPage - 1) * pageSize) + index + 1}</span>
                                            <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded">
                                                {variant.productId?.collectionId?.name || 'N/A'}
                                            </span>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex gap-3 mb-3">
                                            <img
                                                src={`${import.meta.env.VITE_API_BASE_URL}${variant.productId?.image}`}
                                                alt={variant.productId?.name}
                                                className="w-16 h-16 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-bold text-slate-900 mb-1">{variant.productId?.name || 'N/A'}</h3>
                                                <p className="text-xs text-slate-600 font-semibold">Variant: {variant.name}</p>
                                            </div>
                                        </div>

                                        {/* Variant Images */}
                                        {variant.images && variant.images.length > 0 && (
                                            <div className="mb-3">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">
                                                    Variant Images
                                                </label>
                                                <div className="flex gap-2 overflow-x-auto pb-2">
                                                    {variant.images.map((img, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={`${import.meta.env.VITE_API_BASE_URL}${img}`}
                                                            alt={`${variant.name} ${idx + 1}`}
                                                            className="w-20 h-20 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(variant)}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all text-xs font-semibold"
                                            >
                                                <Edit2 size={14} />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => setConfirmModal({ isOpen: true, variantId: variant.id })}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all text-xs font-semibold"
                                            >
                                                <Trash2 size={14} />
                                                <span>Delete</span>
                                            </button>
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
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingVariant ? 'Edit Variant' : 'Add New Variant'}
                            </h2>
                            <button
                                onClick={() => { setShowModal(false); resetForm(); }}
                                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Two Column Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    {/* Product Dropdown */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                            Product Name *
                                        </label>
                                        <select
                                            value={formData.productId}
                                            onChange={(e) => handleProductChange(e.target.value)}
                                            required
                                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fae606] focus:border-transparent"
                                        >
                                            <option value="">Select a product</option>
                                            {products.map(product => (
                                                <option key={product.id} value={product.id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Auto-filled Product Details */}
                                    {selectedProduct && (
                                        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                                                    Product Image
                                                </label>
                                                <img
                                                    src={`${import.meta.env.VITE_API_BASE_URL}${selectedProduct.image || selectedProduct.image_url}`}
                                                    alt={selectedProduct.name}
                                                    className="w-full h-20 object-cover rounded-lg border border-slate-200"
                                                    onError={(e) => {
                                                        console.error('Product image failed to load:', selectedProduct);
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                                                    Collection
                                                </label>
                                                <p className="text-xs font-semibold text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200 flex items-center h-20">
                                                    {selectedProduct.collection_name || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Variant Name */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                            Variant Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            placeholder="e.g., Polished, Matte, Brushed"
                                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fae606] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Right Column - Image Upload */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                        Variant Images (3 Images) *
                                    </label>
                                    <div className="space-y-3">
                                        {[0, 1, 2].map((index) => (
                                            <div key={index} className="relative">
                                                <div className="absolute -left-2 -top-2 w-6 h-6 bg-[#fae606] rounded-full flex items-center justify-center text-xs font-bold text-slate-900 z-10">
                                                    {index + 1}
                                                </div>
                                                {imagePreviews[index] ? (
                                                    <div className="relative group">
                                                        <img
                                                            src={imagePreviews[index]}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-32 object-cover rounded-lg border-2 border-slate-200"
                                                        />
                                                        <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg flex items-center justify-center">
                                                            <span className="text-white text-sm font-semibold">Change Image</span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleImageChange(e, index)}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <label className="flex flex-col items-center justify-center px-4 py-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition-all h-32">
                                                        <Upload className="text-slate-400 mb-1" size={24} />
                                                        <span className="text-xs text-slate-600 font-semibold">Upload Image {index + 1}</span>
                                                        <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WEBP</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleImageChange(e, index)}
                                                            required={index === 0 && !editingVariant}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
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
                                    {editingVariant ? 'Update Variant' : 'Create Variant'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, variantId: null })}
                onConfirm={() => handleDelete(confirmModal.variantId)}
                title="Delete Variant"
                message="Are you sure you want to delete this variant? This action cannot be undone."
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

export default AdminProductVariants;


