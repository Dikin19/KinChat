import type { Metadata } from 'next'
import './globals.css'
import dikinIcon from './dikin.png';

export const metadata: Metadata = {
    title: 'KinChat - Made by AIGemini',
    description: 'Professional AI Chatbot with text, image, document, and audio analysis capabilities',
    keywords: ['AI', 'Chatbot', 'Gemini', 'Assistant', 'Machine Learning'],
    authors: [{ name: 'KinChat' }],
    icons: dikinIcon.src
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="h-full font-sans antialiased">
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                    {children}
                </div>
            </body>
        </html>
    )
}
