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

interface DisclaimerCardProps {
    onClose: () => void;
}

export const DisclaimerCard: React.FC<DisclaimerCardProps> = ({ onClose }) => {
    const colors = useColorConfig();
    const fonts = useFonts();
    const colorStateConfig = useColorStateConfig();
    const disclaimerText =
        "The Windesheim AI App is an educational tool developed by students at Windesheim University of Applied Sciences. While efforts are made to ensure accuracy, users should verify information independently. The app is for educational purposes only and should not substitute professional advice. Windesheim University does not guarantee the app's content, functionality and third-party links.";
    const sizeExclamationMark = (fonts.h1.fontSize ?? 1) * 4;

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
        exclamationMark: {
            fontSize: sizeExclamationMark,
            color: colors.danger,
            marginRight: 10,
        },
        disclaimerText: {
            ...fonts.h2,
            color: colors.text,
        },
        closeButton: {
            marginTop: 20,
            padding: 10,
            backgroundColor: colors.primary,
            borderRadius: 5,
            alignItems: 'center',
        },
        closeButtonText: {
            ...fonts.button,
            color: colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.textRow}>
                <TextTranslated style={styles.exclamationMark} text="!" />
                <TextTranslated
                    style={styles.disclaimerText}
                    text={disclaimerText}
                />
            </View>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                    HapticFeedback(HapticForces.Light);
                    onClose();
                }}
            >
                <TextTranslated style={styles.closeButtonText} text="Close" />
            </TouchableOpacity>
        </View>
    );
};
