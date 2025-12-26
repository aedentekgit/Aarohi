import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Edit2,
    Trash2,
    X,
    Menu,
    Image,
    Upload
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';

const AdminGallery = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize] = useState(10);

    // Confirmation modal state
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, imageId: null });

    // Toast state
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        document.title = "Manage Gallery | Admin Aarohi";
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchImages();
    }, [navigate, currentPage]);

    const fetchImages = async () => {
        try {
            const params = new URLSearchParams({
                page: currentPage,
                limit: pageSize
            });

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery?${params}`);
            const data = await res.json();

            if (data.data) {
                setImages(data.data);
                setTotalPages(data.pagination.totalPages);
                setTotalCount(data.pagination.total);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
            setToast({ show: true, message: 'Failed to fetch gallery images', type: 'error' });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
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
        const formData = new FormData();
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const url = editingImage
                ? `${import.meta.env.VITE_API_BASE_URL}/api/gallery/${editingImage.id}`
                : `${import.meta.env.VITE_API_BASE_URL}/api/gallery`;

            const response = await fetch(url, {
                method: editingImage ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                setToast({
                    show: true,
                    message: editingImage ? 'Image updated successfully!' : 'Image uploaded successfully!',
                    type: 'success'
                });
                setShowModal(false);
                resetForm();
                fetchImages();
            } else {
                const errorData = await response.json();
                setToast({ show: true, message: errorData.message || 'Failed to save image', type: 'error' });
            }
        } catch (error) {
            console.error('Error saving image:', error);
            setToast({ show: true, message: 'Failed to save image', type: 'error' });
        }
    };

    const handleEdit = (image) => {
        setEditingImage(image);
        setImagePreview(`${import.meta.env.VITE_API_BASE_URL}${image.image_url}`);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setToast({ show: true, message: 'Image deleted successfully!', type: 'success' });
                fetchImages();
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            setToast({ show: true, message: 'Failed to delete image', type: 'error' });
        }
    };

    const resetForm = () => {
        setImageFile(null);
        setImagePreview(null);
        setEditingImage(null);
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activePage="gallery" />

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
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gallery</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Manage your gallery images</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { resetForm(); setShowModal(true); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#fae606] to-[#e6d500] text-slate-900 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-yellow-900/20 transition-all"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Add Image</span>
                        </button>
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
                                        <p className="text-sm text-slate-500 font-medium">Total Images</p>
                                        <p className="text-3xl font-bold text-slate-900 mt-1">{totalCount}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <Image className="text-blue-600" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="w-[15%] px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">S. No</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Gallery Image</th>
                                            <th className="w-[15%] px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {images.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                                                    No images found
                                                </td>
                                            </tr>
                                        ) : (
                                            images.map((image, index) => (
                                                <tr key={image.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-slate-900 font-medium text-center">
                                                        {((currentPage - 1) * pageSize) + index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex justify-center">
                                                            <img
                                                                src={`${import.meta.env.VITE_API_BASE_URL}${image.image_url}`}
                                                                alt={`Gallery ${image.id}`}
                                                                className="h-24 w-auto object-cover rounded-lg border border-slate-200 shadow-sm"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleEdit(image)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => setConfirmModal({ isOpen: true, imageId: image.id })}
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
                            {images.length === 0 ? (
                                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                                    <p className="text-slate-500">No images found</p>
                                </div>
                            ) : (
                                images.map((image, index) => (
                                    <div key={image.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <div className="flex-1">
                                                <span className="text-xs font-medium text-slate-400">#{((currentPage - 1) * pageSize) + index + 1}</span>
                                                <img
                                                    src={`${import.meta.env.VITE_API_BASE_URL}${image.image_url}`}
                                                    alt={`Gallery ${image.id}`}
                                                    className="w-full h-40 object-cover rounded-lg border border-slate-200 mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(image)}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg text-xs font-semibold"
                                            >
                                                <Edit2 size={14} />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => setConfirmModal({ isOpen: true, imageId: image.id })}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-red-600 bg-red-50 rounded-lg text-xs font-semibold"
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
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                        <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingImage ? 'Edit Image' : 'Add Gallery Image'}
                            </h2>
                            <button
                                onClick={() => { setShowModal(false); resetForm(); }}
                                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                    Gallery Image {!editingImage && '*'}
                                </label>
                                {!imagePreview ? (
                                    <label className="flex flex-col items-center justify-center px-4 py-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition-all h-[240px]">
                                        <Upload className="text-slate-400 mb-2" size={32} />
                                        <span className="text-sm text-slate-600 font-semibold">Click to upload</span>
                                        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            required={!editingImage}
                                            className="hidden"
                                        />
                                    </label>
                                ) : (
                                    <div className="relative group">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-[240px] object-cover rounded-lg border-2 border-slate-200"
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

                            <div className="flex gap-3">
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
                                    {editingImage ? 'Update' : 'Upload'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, imageId: null })}
                onConfirm={() => handleDelete(confirmModal.imageId)}
                title="Delete Gallery Image"
                message="Are you sure you want to delete this image? This action cannot be undone."
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

export default AdminGallery;
