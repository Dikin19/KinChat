'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, FileText, Mic, X, Bot, User, Sparkles } from 'lucide-react';
import { Message, FileUpload } from '@/types';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import TimeDisplay from './TimeDisplay';


function formatProfessionalText(text: string): string {
        return text
            // Remove bullet points and list markers
            .replace(/^[*•\-+]\s*/gm, '')
            // Remove bold/italic markdown
            .replace(/(^|\s)[*_]{1,2}([^*_]+)[*_]{1,2}(?=\s|$)/g, '$1$2')
            // Remove excessive line breaks
            .replace(/\n{3,}/g, '\n\n')
            // Clean up whitespace
            .replace(/^\s+|\s+$/g, '')
            // Ensure proper paragraph spacing
            .split('\n\n')
            .map(paragraph => paragraph.trim())
            .filter(paragraph => paragraph.length > 0)
            .join('\n\n');
    }


export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'ai',
            content: "Hello! I'm KinChat. I can help you with text conversations, analyze images, process documents, and transcribe audio. How can I assist you today?",
            timestamp: new Date(),
        },
    ]);


    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<FileUpload[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFiles: FileUpload[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let type: 'image' | 'document' | 'audio' = 'document';

            if (file.type.startsWith('image/')) {
                type = 'image';
            } else if (file.type.startsWith('audio/')) {
                type = 'audio';
            }

            newFiles.push({ file, type });
        }

        setAttachedFiles([...attachedFiles, ...newFiles]);
    };

    const removeFile = (index: number) => {
        setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
    };

    const sendMessage = async () => {
        if (!inputValue.trim() && attachedFiles.length === 0) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue || 'Analyzing attached file...',
            timestamp: new Date(),
            attachments: attachedFiles.map(f => ({
                type: f.type,
                name: f.file.name,
                size: f.file.size,
            })),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setInputValue('');

        try {
            let response;

            if (attachedFiles.length > 0) {
                const file = attachedFiles[0];
                const formData = new FormData();
                formData.append(file.type, file.file);
                formData.append('prompt', inputValue || 'Analyze this file');

                const endpoint = `/api/generate-from-${file.type}`;
                response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                });
            } else {
                response = await fetch('/api/generate-text', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: inputValue }),
                });
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: data.output,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: 'Sorry, I encountered an error while processing your request. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            setAttachedFiles([]);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white shadow-2xl rounded-xl overflow-hidden">
            {/* Header */}
            <Header />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-gray-50 to-white">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                        <div className={`flex items-end max-w-2xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow ${message.type === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                {message.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>
                            {/* Chat Bubble */}
                            <div className={`relative px-6 py-5 rounded-3xl shadow-lg font-sans text-base ${message.type === 'user' ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900'}`}
                                style={{ minWidth: '140px', maxWidth: '80%' }}>
                                {/* Bubble Tail */}
                                <span className={`absolute bottom-0 ${message.type === 'user' ? 'right-[-10px] border-l-[16px] border-t-[16px] border-l-primary-600 border-t-transparent' : 'left-[-10px] border-r-[16px] border-t-[16px] border-r-gray-200 border-t-transparent'}`}></span>
                                {/* Sender Label & Timestamp */}
                                <div className="flex items-center mb-2 gap-2">
                                    <span className={`text-xs font-semibold tracking-wide ${message.type === 'user' ? 'text-white' : 'text-primary-700'}`}>{message.type === 'user' ? 'You' : 'KinChat AI'}</span>
                                    <span className="text-xs text-gray-400">|</span>
                                    <TimeDisplay timestamp={message.timestamp} />
                                </div>
                                {/* Message Content */}
                                <div className="text-base leading-relaxed">
                                    {message.type === 'ai' ? (
                                        <div className="space-y-4">
                                            {formatProfessionalText(message.content)
                                                .split('\n\n')
                                                .map((paragraph, idx) => (
                                                    <p key={idx} className="text-justify">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                        </div>
                                    ) : (
                                        <p>{message.content}</p>
                                    )}
                                </div>
                                {/* Attachments */}
                                {message.attachments && (
                                    <div className="mt-3 space-y-1">
                                        {message.attachments.map((attachment, index) => (
                                            <div key={index} className="flex items-center space-x-2 text-xs bg-white bg-opacity-90 rounded-lg p-1">
                                                {attachment.type === 'image' && <Image className="w-4 h-4 text-blue-500" />}
                                                {attachment.type === 'document' && <FileText className="w-4 h-4 text-green-500" />}
                                                {attachment.type === 'audio' && <Mic className="w-4 h-4 text-red-500" />}
                                                <span className="font-medium truncate max-w-[120px]">{attachment.name}</span>
                                                <span className="text-xs text-gray-500">({(attachment.size / 1024).toFixed(1)} KB)</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start animate-slide-up">
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 flex items-center justify-center shadow-lg">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div className="chat-bubble chat-bubble-ai shadow-lg">
                                <div className="flex items-center space-x-2 text-primary-600 mb-2">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-xs font-medium">KinChat Your AI Assistant</span>
                                </div>
                                <LoadingSpinner text="Analyzing and generating response..." />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* File Attachments Preview */}
            {attachedFiles.length > 0 && (
                <div className="border-t bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                    <div className="flex flex-wrap gap-3">
                        {attachedFiles.map((file, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm">
                                <div className="flex-shrink-0">
                                    {file.type === 'image' && <Image className="w-5 h-5 text-blue-500" />}
                                    {file.type === 'document' && <FileText className="w-5 h-5 text-green-500" />}
                                    {file.type === 'audio' && <Mic className="w-5 h-5 text-red-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{file.file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.file.size / 1024).toFixed(1)} KB</p>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="border-t bg-white p-6">
                <div className="flex items-end space-x-4">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-3 text-gray-400 hover:text-primary-500 transition-colors rounded-xl hover:bg-primary-50 border border-gray-200 hover:border-primary-200"
                                title="Attach file"
                            >
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileSelect}
                                accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
                                className="hidden"
                            />
                            <span className="text-xs text-gray-500">
                                Supports images, audio files, and documents
                            </span>
                        </div>
                        <div className="relative">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message"
                                className="input-field resize-none pr-20 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-0"
                                rows={1}
                                style={{ minHeight: '56px', maxHeight: '120px' }}
                            />
                            <div className="absolute bottom-3 right-3">
                                <button
                                    onClick={sendMessage}
                                    disabled={isLoading || (!inputValue.trim() && attachedFiles.length === 0)}
                                    className="btn-primary p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                    <button
                        onClick={() => setInputValue("Hello! What can you help me with today?")}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    >
                        👋 Greeting
                    </button>
                    <button
                        onClick={() => setInputValue("Can you explain how AI works?")}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    >
                        🤖 About AI
                    </button>
                    <button
                        onClick={() => setInputValue("Help me analyze this document")}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    >
                        📄 Document Analysis
                    </button>
                    <button
                        onClick={() => setInputValue("What do you see in this image?")}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    >
                        🖼️ Image Analysis
                    </button>
                </div>
            </div>
        </div>
    );
}
