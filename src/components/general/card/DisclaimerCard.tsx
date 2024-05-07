import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import {
    useColorConfig,
    shadow,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { openBrowserPopup } from '../../../lib/utility/browserPopup';
import { TextTranslated } from '../text/TextTranslated';
export const DisclaimerCard = () => {
    const colors = useColorConfig();
    const fonts = useFonts();
    const colorStateConfig = useColorStateConfig();
    const disclaimerText =
        "The Windesheim AI App is an educational tool developed by students at Windesheim University of Applied Sciences. While efforts are made to ensure accuracy, users should verify information independently. The app is for educational purposes only and should not substitute professional advice. Windesheim University does not guarantee the app's content, functionality and third-party links.";
    const sizeExlamationMark = (fonts.h1.fontSize ?? 1) * 4;
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 60,
            marginTop: 20,
            padding: 15,
            backgroundColor: colors.attentionYellow,
            borderRadius: 15,
            borderColor: colors.borderColor,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        textRow: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginRight: 45,
        },
        title: {
            marginBottom: 3,
            ...fonts.newTitle,
            color: colors.disclaimerText,
        },
        text: {
            ...fonts.homeCard,
            textAlign: 'justify',
            color: colors.disclaimerText,
        },
        exclamationMark: {
            fontSize: sizeExlamationMark,
            fontWeight: 'bold',
            marginLeft: 15,
            marginTop: 25,
            marginBottom: 5,
        },
    });

    function handlePress(): void {
        HapticFeedback(HapticForces.Light);
        openBrowserPopup(
            'https://www.windesheim.nl/over-windesheim/disclaimer',
        );
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <TextTranslated style={styles.title} text="Disclaimer" />
                <View style={styles.textRow}>
                    <TextTranslated style={styles.text} text={disclaimerText} />
                    <TextTranslated style={styles.exclamationMark} text="!" />
                </View>
            </View>
        </TouchableOpacity>
    );
};
