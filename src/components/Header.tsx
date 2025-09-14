'use client';

import { Bot, Settings, Info } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
    onShowInfo?: () => void;
    onShowSettings?: () => void;
}

export default function Header({ onShowInfo, onShowSettings }: HeaderProps) {
    const [showTooltip, setShowTooltip] = useState<string | null>(null);

    return (
        <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg relative">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">KinChat</h1>
                            <p className="text-primary-100 text-sm">Made by AIGemini</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onShowInfo}
                            onMouseEnter={() => setShowTooltip('info')}
                            onMouseLeave={() => setShowTooltip(null)}
                            className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200 relative"
                        >
                            <Info className="w-5 h-5" />
                            {showTooltip === 'info' && (
                                <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded whitespace-nowrap">
                                    About this AI
                                </div>
                            )}
                        </button>
                        <button
                            onClick={onShowSettings}
                            onMouseEnter={() => setShowTooltip('settings')}
                            onMouseLeave={() => setShowTooltip(null)}
                            className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200 relative"
                        >
                            <Settings className="w-5 h-5" />
                            {showTooltip === 'settings' && (
                                <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded whitespace-nowrap">
                                    Settings
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
