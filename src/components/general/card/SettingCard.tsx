import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

export type SettingCardProps = {
    title: string;
    description?: string;
    icon: string;
    children: React.ReactNode;
    testID?: string;
    isFlexEnabled?: boolean;
};

export const SettingCard = ({
    title,
    description,
    icon,
    children,
    testID,
    isFlexEnabled = true,
}: SettingCardProps) => {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const styles = StyleSheet.create({
        cardContainer: {
            borderColor: colors.gray,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
            ...colorStateConfig.highContrastBorder,
        },
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonCardContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: colors.gray,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
            ...colorStateConfig.highContrastBorder,
        },
        iconContainer: {
            marginRight: 10,
        },
        icon: {
            ...fonts.icon,
            color: colors.text,
        },
        titleContainer: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        title: {
            ...fonts.h2,
            marginBottom: 5,
        },
        description: {
            ...fonts.description,
        },
    });

    if (isFlexEnabled) {
        return (
            <View style={styles.buttonCardContainer} testID={testID}>
                <View style={styles.iconContainer}>
                    <FontAwesome5 style={styles.icon} name={icon} size={24} />
                </View>
                <View style={styles.titleContainer}>
                    <TextTranslated style={styles.title} text={title} />
                    <TextTranslated
                        style={styles.description}
                        text={description ?? ''}
                    />
                </View>

                {children}
            </View>
        );
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.buttonContainer} testID={testID}>
                <View style={styles.iconContainer}>
                    <FontAwesome5 style={styles.icon} name={icon} size={24} />
                </View>
                <View style={styles.titleContainer}>
                    <TextTranslated style={styles.title} text={title} />
                    <TextTranslated
                        style={styles.description}
                        text={description ?? ''}
                    />
                </View>
            </View>

            <View>{children}</View>
        </View>
    );
};
