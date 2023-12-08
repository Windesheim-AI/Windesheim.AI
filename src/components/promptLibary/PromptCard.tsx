import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorStateConfig } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { Prompt } from '../../types/Prompt';
import { Card } from '../general/base/Card';

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
                HapticFeedback(HapticForces.Light);
                navigation.navigate(Routes.Prompt, {
                    promptId: prompt.id,
                });
            }}
            key={prompt.id}
            testID="prompt-card"
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
