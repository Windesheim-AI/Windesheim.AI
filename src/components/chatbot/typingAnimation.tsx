import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';

export const TypingAnimation = ({ color }: { color: string }) => {
    const dots = useRef(['', '.', '..', '...']);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % dots.current.length);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return <Text style={{ fontSize: 24, color }}>{dots.current[index]}</Text>;
};
