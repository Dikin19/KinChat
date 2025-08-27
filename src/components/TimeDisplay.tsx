'use client';

import { useState, useEffect } from 'react';

interface TimeDisplayProps {
    timestamp: Date;
}

export default function TimeDisplay({ timestamp }: TimeDisplayProps) {
    const [timeString, setTimeString] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Format waktu dengan opsi yang konsisten
        const formatted = timestamp.toLocaleTimeString('en-US', {
            hour12: false, // Gunakan format 24 jam untuk konsistensi
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        setTimeString(formatted);
    }, [timestamp]);

    // Jika masih di server side rendering, tampilkan placeholder
    if (!isClient) {
        return <span>--:--:--</span>;
    }

    return <span>{timeString}</span>;
}
