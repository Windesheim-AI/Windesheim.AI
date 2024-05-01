import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { TextTranslated } from '../text/TextTranslated';
import { InteractiveView } from '../views/InteractiveView';

export type ButtonProps = {
    onPress?: () => void;
    screenName?: string;
    buttonText?: string;
    textColorScheme: string | undefined;
};

export const TryButton = ({
    onPress,
    buttonText,
    textColorScheme,
    screenName,
}: ButtonProps) => {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    if (!onPress) {
        /* istanbul ignore next */
        if (!screenName) {
            throw new Error(
                'CustomButton requires either onPress or screenName to be defined',
            );
        }

        /* istanbul ignore next */
        onPress = () => {
            HapticFeedback(HapticForces.Light);
            navigation.navigate(screenName);
        };
    }

    const styles = StyleSheet.create({
        tryItYourselfContainer: {
            backgroundColor: colors.previousButton,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            ...colorStateConfig.highContrastBorder,
            textAlign: 'center',
            marginBottom: 20,
        },
        text: {
            fontSize: 16,
            color: textColorScheme ? textColorScheme : fonts.button.color,
            fontWeight: 'bold',
        },
    });

    return (
        <InteractiveView onPress={onPress}>
            <View style={styles.tryItYourselfContainer}>
                <TextTranslated style={styles.text} text={buttonText} />
            </View>
        </InteractiveView>
    );
};
