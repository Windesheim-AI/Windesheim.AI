import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { TextTranslated } from '../text/TextTranslated';

export type ButtonProps = {
    onPress?: () => void;
    screenName?: string;
    buttonText?: string;
    width?: number;
    icon?: string;
    testId?: string;
};

export const ListButton = ({
    onPress,
    buttonText,
    screenName,
    width,
    icon,
    testId,
}: ButtonProps) => {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const navigation = useNavigation();

    if (!onPress) {
        if (!screenName) {
            throw new Error(
                'CustomButton requires either onPress or screenName to be defined',
            );
        }
        onPress = () => {
            HapticFeedback(HapticForces.Light);
            navigation.navigate(screenName);
        };
    }

    const minWidth = 70;
    const baseWidth = width ? width : minWidth;
    const checkedWidth: number = baseWidth > minWidth ? baseWidth : minWidth;
    const buttonWidth =
        checkedWidth > minWidth ? checkedWidth * 3 : minWidth * 3;
    const height = 60;

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            backgroundColor: colors.previousButton,
            borderRadius: 40,
            flexDirection: 'row',
            height,
            margin: 10,
            maxHeight: 90,
            width: buttonWidth,
            // center
            ...colorStateConfig.highContrastBorder,
        },
        icon: {
            fontSize: 15,
            position: 'absolute',
            color: colors.text,
        },
        text: {
            position: 'absolute',
            color: colors.text,
            textAlign: 'center',
            marginLeft: 20,
        },
        textStyle: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        iconStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            right: -200,
        },
    });

    return (
        <Pressable style={styles.button} onPress={onPress} testID={testId}>
            <View style={styles.textStyle}>
                <TextTranslated style={styles.text} text={buttonText ?? ''} />
            </View>
            <View style={styles.iconStyle}>
                <FontAwesome5
                    name={icon ?? 'arrow-right'}
                    style={styles.icon}
                />
            </View>
        </Pressable>
    );
};
