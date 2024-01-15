import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

type Props = {
    text: string;
    iconName: string;
    iconColor?: string;
    textStyle?: TextStyle;
    iconPosition?: 'left' | 'right';
    size: number;
    style?: ViewStyle;
};

export function IconLine({
    text,
    iconColor,
    iconName,
    textStyle,
    iconPosition,
    size,
    style,
}: Props) {
    const colors = useColorConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            marginRight: 5,
        },
        text: {
            ...fonts.description,
            color: colors.titleDefault,
            fontWeight: 'bold',
            ...textStyle,
        },
    });

    return (
        <View style={[style, styles.container]}>
            {iconPosition === 'left' ? (
                <FontAwesome5Icon
                    name={iconName}
                    size={15}
                    color={iconColor ?? colors.text}
                    style={styles.icon}
                />
            ) : null}
            <TextTranslated style={styles.text} text={text} />
            {iconPosition === 'right' ? (
                <FontAwesome5Icon
                    name={iconName}
                    size={size}
                    color={iconColor ?? colors.text}
                    style={styles.icon}
                />
            ) : null}
        </View>
    );
}
