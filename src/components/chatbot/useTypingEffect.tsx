import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

export function useTypingEffect(
    text: string,
    speed: number,
    onDone?: () => void,
) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        setDisplayedText(''); // Reset displayed text when text changes

        // Set the first character immediately to avoid missing it
        setDisplayedText(text[0]);

        const interval = setInterval(() => {
            index++;

            // Start typing from the second character
            setDisplayedText((prev) => prev + text[index]);

            if (index >= text.length - 1) {
                clearInterval(interval);
                if (onDone) onDone();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return displayedText;
}
