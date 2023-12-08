import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
    ColorGradientScheme,
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';

export type AmazingCardProps = {
    colorGradientScheme: ColorGradientScheme;
    children?: React.ReactNode;
};

export const AmazingCard = ({
    colorGradientScheme,
    children,
}: AmazingCardProps) => {
    const colorStateConfig = useColorStateConfig();
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        card: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.listItemBg,
            ...colorStateConfig.highContrastBorder,
            minHeight: 100,
            borderRadius: 10,
            ...shadow,
            overflow: 'hidden',
            position: 'relative',
        },
        childrenBox: {
            padding: 10,
        },
        colorBox: {
            width: 100,
            height: 100,
            backgroundColor: colors.bg1,
            //rotate the box 45 degrees
            transform: [{ rotate: '-45deg' }],
            position: 'absolute',
            top: -50,
            left: -50,
        },
        colorRow1: {
            height: '70%',
            width: '100%',
            backgroundColor: colorGradientScheme[0],
            ...shadow,
        },
        colorRow2: {
            height: '15%',
            width: '100%',
            backgroundColor: colorGradientScheme[1],
            ...shadow,
        },
        colorRow3: {
            height: '15%',
            width: '100%',
            backgroundColor: colorGradientScheme[2],
            ...shadow,
        },
    });

    return (
        <View style={styles.card}>
            <View style={styles.colorBox}>
                <View style={styles.colorRow1} />
                <View style={styles.colorRow2} />
                <View style={styles.colorRow3} />
            </View>
            <View style={styles.childrenBox}>{children}</View>
        </View>
    );
};
