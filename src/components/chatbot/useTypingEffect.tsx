import { useEffect, useState, useRef } from 'react';

export function useTypingEffect(
    text: string,
    speed: number,
    onDone?: () => void,
) {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const previousTextRef = useRef('');

    useEffect(() => {
        // Skip if the text hasn't changed
        if (!text || text === previousTextRef.current) return;

        previousTextRef.current = text;
        setDisplayedText('');
        indexRef.current = 0;

        intervalRef.current = setInterval(() => {
            setDisplayedText((prev) => {
                if (indexRef.current >= text.length) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                    onDone?.();
                    return text;
                }

                const nextChar = text.charAt(indexRef.current);
                indexRef.current += 1;
                return prev + nextChar;
            });
        }, speed);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [text, speed]);

    return displayedText;
}
