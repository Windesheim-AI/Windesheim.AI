import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
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
            borderWidth: 1,
            /* shadow properties for Android only */
            shadowColor: colors.black,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            /* shadow properties for iOS only */
            elevation: 8,
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

    return (
        <View style={styles.container}>
            <View style={styles.textRow}>
                <View>
                    <TextTranslated style={styles.title} text="Disclaimer" />
                    <TextTranslated style={styles.text} text={disclaimerText} />
                </View>
                <Image
                    style={styles.exclamationMark}
                    source={
                        require('../../../assets/images/Icon/exclamation-mark.png') as ImageSourcePropType
                    }
                />
            </View>
        </View>
    );
};
