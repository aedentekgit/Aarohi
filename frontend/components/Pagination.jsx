import React from 'react';

const Pagination = ({ currentPage, totalPages, totalCount, pageSize, onPageChange }) => {
    if (totalPages <= 1) return null;

    const startItem = ((currentPage - 1) * pageSize) + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    return (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{startItem}</span> to{' '}
                <span className="font-semibold text-slate-900">{endItem}</span> of{' '}
                <span className="font-semibold text-slate-900">{totalCount}</span> items
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
                                    onClick={() => onPageChange(pageNum)}
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
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
