import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Edit2,
    Trash2,
    X,
    Search,
    Menu,
    Layers
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';

const AdminCollections = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collections, setCollections] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCollection, setEditingCollection] = useState(null);
    const [formData, setFormData] = useState({ name: '' });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize] = useState(10);

    // Confirmation modal state
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, collectionId: null });

    // Toast state
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        document.title = "Manage Collections | Admin Aarohi";
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchCollections();
    }, [navigate, currentPage, searchTerm]);

    const fetchCollections = async () => {
        try {
            const params = new URLSearchParams({
                page: currentPage,
                limit: pageSize,
                search: searchTerm
            });

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections?${params}`);
            const data = await res.json();

            if (data.data) {
                setCollections(data.data);
                setTotalPages(data.pagination.totalPages);
                setTotalCount(data.pagination.total);
            } else {
                // Fallback for non-paginated response
                setCollections(data);
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
            setToast({ show: true, message: 'Failed to fetch collections', type: 'error' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const url = editingCollection
                ? `${import.meta.env.VITE_API_BASE_URL}/api/collections/${editingCollection.id}`
                : `${import.meta.env.VITE_API_BASE_URL}/api/collections`;

            const response = await fetch(url, {
                method: editingCollection ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setToast({
                    show: true,
                    message: editingCollection ? 'Collection updated successfully!' : 'Collection created successfully!',
                    type: 'success'
                });
                setShowModal(false);
                resetForm();
                fetchCollections();
            } else {
                const errorData = await response.json();
                setToast({ show: true, message: errorData.message || 'Failed to save collection', type: 'error' });
            }
        } catch (error) {
            console.error('Error saving collection:', error);
            setToast({ show: true, message: 'Failed to save collection', type: 'error' });
        }
    };

    const handleEdit = (collection) => {
        setEditingCollection(collection);
        setFormData({ name: collection.name });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setToast({ show: true, message: 'Collection deleted successfully!', type: 'success' });
                fetchCollections();
            }
        } catch (error) {
            console.error('Error deleting collection:', error);
            setToast({ show: true, message: 'Failed to delete collection', type: 'error' });
        }
    };

    const resetForm = () => {
        setFormData({ name: '' });
        setEditingCollection(null);
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activePage="collections" />

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
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Collections</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Manage your product collections</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search collections..."
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
                                <span className="hidden sm:inline">Add Collection</span>
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
                                        <p className="text-sm text-slate-500 font-medium">Total Collections</p>
                                        <p className="text-3xl font-bold text-slate-900 mt-1">{totalCount}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <Layers className="text-blue-600" size={24} />
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
                                    placeholder="Search collections..."
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
                                            <th className="w-[10%] px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">S. No</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Collection Name</th>
                                            <th className="w-[15%] px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {collections.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                                                    No collections found
                                                </td>
                                            </tr>
                                        ) : (
                                            collections.map((collection, index) => (
                                                <tr key={collection.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-slate-900 font-medium text-center">{((currentPage - 1) * pageSize) + index + 1}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-900 font-semibold text-center">{collection.name}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleEdit(collection)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => setConfirmModal({ isOpen: true, collectionId: collection.id })}
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
                            {collections.length === 0 ? (
                                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                                    <p className="text-slate-500">No collections found</p>
                                </div>
                            ) : (
                                collections.map((collection, index) => (
                                    <div key={collection.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-medium text-slate-400">#{((currentPage - 1) * pageSize) + index + 1}</span>
                                                </div>
                                                <h3 className="text-sm font-bold text-slate-900">{collection.name}</h3>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(collection)}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all text-xs font-semibold"
                                            >
                                                <Edit2 size={14} />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => setConfirmModal({ isOpen: true, collectionId: collection.id })}
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
                        {totalPages > 1 && (
                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 p-4">
                                <div className="text-sm text-slate-600">
                                    Showing <span className="font-semibold text-slate-900">{((currentPage - 1) * pageSize) + 1}</span> to{' '}
                                    <span className="font-semibold text-slate-900">{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
                                    <span className="font-semibold text-slate-900">{totalCount}</span> collections
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex items-center gap-1">
                                        {[...Array(totalPages)].map((_, idx) => {
                                            const pageNum = idx + 1;
                                            // Show first, last, current, and adjacent pages
                                            if (
                                                pageNum === 1 ||
                                                pageNum === totalPages ||
                                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`w-10 h-10 text-sm font-semibold rounded-lg transition-all ${currentPage === pageNum
                                                            ? 'bg-[#fae606] text-slate-900'
                                                            : 'text-slate-700 hover:bg-slate-100'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            } else if (
                                                pageNum === currentPage - 2 ||
                                                pageNum === currentPage + 2
                                            ) {
                                                return <span key={pageNum} className="text-slate-400">...</span>;
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                        <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingCollection ? 'Edit Collection' : 'Add New Collection'}
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
                                    Collection Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ name: e.target.value })}
                                    required
                                    placeholder="e.g., Marble, Granite, Sandstone"
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fae606] focus:border-transparent"
                                />
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
                                    {editingCollection ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, collectionId: null })}
                onConfirm={() => handleDelete(confirmModal.collectionId)}
                title="Delete Collection"
                message="Are you sure you want to delete this collection? This action cannot be undone."
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

export default AdminCollections;


