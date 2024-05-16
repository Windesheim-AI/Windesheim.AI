import React from 'react';
import { View, StyleSheet } from 'react-native';

import {
    useColorConfig,
    shadow,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

export const Introduction = () => {
    const colors = useColorConfig();
    const fonts = useFonts();
    const colorStateConfig = useColorStateConfig();
    const introductionText =
        "Welcome to the Windesheim AI App! This innovative platform is your direct link to Windesheim.tech, offering comprehensive resources for both educators and students. Discover handy prompts, insights into tech themes, and leading providers. Designed for modern academia, it enhances learning with features like guidance on tech advancements, instructional materials, and interactive courses. Whether you're an educator or a student, the Windesheim AI App is your go-to for all things tech!";
    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            padding: 15,
            backgroundColor: colors.listItemBg,
            borderRadius: 15,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        title: {
            marginBottom: 3,
            ...fonts.newTitle,
            color: colors.titleDefault,
        },
        text: {
            ...fonts.homeCard,
            textAlign: 'justify',
            color: colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <TextTranslated
                        style={styles.title}
                        text="Why Windesheim AI?"
                    />
                    <TextTranslated
                        style={styles.text}
                        text={introductionText}
                    />
                </View>
            </View>
        </View>
    );
};
