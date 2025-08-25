'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    type?: 'error' | 'warning' | 'info';
}

export default function ErrorMessage({ message, onRetry, type = 'error' }: ErrorMessageProps) {
    const getTypeStyles = () => {
        switch (type) {
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
            default:
                return 'bg-red-50 border-red-200 text-red-800';
        }
    };

    const getIconColor = () => {
        switch (type) {
            case 'warning':
                return 'text-yellow-500';
            case 'info':
                return 'text-blue-500';
            default:
                return 'text-red-500';
        }
    };

    return (
        <div className={`rounded-lg border p-4 ${getTypeStyles()}`}>
            <div className="flex items-start space-x-3">
                <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getIconColor()}`} />
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-2 inline-flex items-center space-x-2 text-sm font-medium hover:underline"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Try again</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
