import ChatInterface from '@/components/ChatInterface';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 p-4">
            <div className="container mx-auto h-screen flex items-center justify-center">
                <div className="w-full h-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
                    <ChatInterface />
                </div>
            </div>
        </main>
    );
}
