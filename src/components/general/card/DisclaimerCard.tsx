import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
} from 'react-native';

import { useColorConfig, shadow } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { openBrowserPopup } from '../../../lib/utility/browserPopup';
import { TextTranslated } from '../text/TextTranslated';
export const DisclaimerCard = () => {
    const colors = useColorConfig();
    const fonts = useFonts();

    const disclaimerText =
        "The Windesheim AI App is an educational tool developed by students at Windesheim University of Applied Sciences. While efforts are made to ensure accuracy, users should verify information independently. The app is for educational purposes only and should not substitute professional advice. Windesheim University does not guarantee the app's content, functionality and third-party links.";

    const styles = StyleSheet.create({
        container: {
            marginTop: 20,
            padding: 15,
            backgroundColor: colors.attentionYellow,
            borderRadius: 15,
            borderColor: colors.borderColor,
            ...shadow,
        },
        title: {
            marginBottom: 3,
            ...fonts.h1,
            color: colors.disclaimerText,
        },
        text: {
            ...fonts.small,
            textAlign: 'justify',
            color: colors.disclaimerText,
        },
        textRow: {
            display: 'flex',
            flexDirection: 'row',
            width: '85%',
        },
        exclamationMark: {
            marginLeft: 23,
            marginTop: 'auto',
            marginBottom: 'auto',
            width: 25,
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
                <View style={styles.textRow}>
                    <View>
                        <TextTranslated
                            style={styles.title}
                            text="Disclaimer"
                        />
                        <TextTranslated
                            style={styles.text}
                            text={disclaimerText}
                        />
                    </View>
                    <Image
                        style={styles.exclamationMark}
                        source={
                            // eslint-disable-next-line @typescript-eslint/no-var-requires
                            require('../../../assets/images/Icon/exclamation-mark.png') as ImageSourcePropType
                        }
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};
