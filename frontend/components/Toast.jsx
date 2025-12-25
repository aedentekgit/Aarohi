import React, { useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const styles = {
        success: {
            bg: 'bg-green-50 border-green-200',
            text: 'text-green-800',
            icon: <CheckCircle className="text-green-500" size={20} />
        },
        error: {
            bg: 'bg-red-50 border-red-200',
            text: 'text-red-800',
            icon: <AlertCircle className="text-red-500" size={20} />
        },
        info: {
            bg: 'bg-blue-50 border-blue-200',
            text: 'text-blue-800',
            icon: <Info className="text-blue-500" size={20} />
        }
    };

    const style = styles[type] || styles.success;

    return (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${style.bg}`}>
                {style.icon}
                <p className={`text-sm font-semibold ${style.text}`}>{message}</p>
                <button
                    onClick={onClose}
                    className={`ml-2 hover:opacity-70 transition-opacity ${style.text}`}
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Toast;
