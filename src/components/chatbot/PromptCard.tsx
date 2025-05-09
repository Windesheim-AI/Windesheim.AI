import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { useColorConfig } from '../../lib/constants/Colors';

type PromptCardProps = {
    text: string;
    onPress: () => void;
};

export const PromptCard: React.FC<PromptCardProps> = ({ text, onPress }) => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.lightGrey, // basic gray
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
            marginRight: 10,
        },
        text: {
            fontSize: 14,
            color: colors.black,
        },
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};
