import React, { useState, useEffect } from 'react';
import { TextTranslated } from '../text/TextTranslated';
import { StyleSheet, View } from 'react-native';
import { useFonts } from '../../constants/Fonts';

interface Props {
    text: string;
    speed?: number;
}

const WordAnimation = ({ text, speed = 1 }: Props) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        // Split the text into an array of words
        const words = text.split(' ');

        let intervalId: NodeJS.Timeout;

        const displayWords = async () => {
            // Loop through each word in the array
            for (const word of words) {
                // Generate a random number between 60 and 300
                const randomDigit =
                    Math.floor(Math.random() * (300 - 120 + 1)) + 60;

                // Wait for the specified amount of time before displaying the next word
                await new Promise<void>((resolve) => {
                    intervalId = setInterval(() => {
                        // Add the current word and a space to the display text
                        setDisplayText((prevText) => prevText + word + ' ');

                        // Stop the interval and resolve the promise
                        clearInterval(intervalId);
                        resolve();
                    }, randomDigit / speed);
                });
            }
        };

        // Call the displayWords function
        void displayWords();

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [text, speed]);

    const fonts = useFonts();

    const styles = StyleSheet.create({
        p: {
            ...fonts.p,
            fontSize: 16,
            fontStyle: 'italic',
        },
    });
    return (
        <View style={styles.p}>
            <TextTranslated text={displayText} />
        </View>
    );
};

export default WordAnimation;