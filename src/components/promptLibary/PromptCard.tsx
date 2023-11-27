import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useFonts } from '../../constants/Fonts';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { Prompt } from '../../types/Prompt';
import { Card } from '../general/base/Card';
import { useColorStateConfig } from '../../constants/Colors';

export const PromptCard = ({ prompt }: { prompt: Prompt }) => {
    const fonts = useFonts();
    const navigation = useNavigation();
    const colorStateConfig = useColorStateConfig();

    const styles = StyleSheet.create({
        card: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...colorStateConfig.highContrastBorder,
        },
        leftContent: {
            flex: 1,
        },
        rightContent: {
            flex: 1,
            alignItems: 'flex-end',
        },
    });
    return (
        <Pressable
            onPress={() => {
                navigation.navigate(Routes.Prompt, {
                    promptId: prompt.id,
                });
            }}
            key={prompt.id}
        >
            <Card style={styles.card}>
                <View style={styles.leftContent}>
                    <Text style={fonts.h3}>{prompt.title}</Text>
                    <Text style={fonts.accent}>{prompt.promptPattern}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={fonts.h2}>{prompt.tool}</Text>
                </View>
            </Card>
        </Pressable>
    );
};
