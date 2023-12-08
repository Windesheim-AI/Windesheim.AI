import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { TextTranslated } from '../text/TextTranslated';

export type Props = {
    navigateToRoute: string;
};

export const SeeAllButton = ({ navigateToRoute }: Props) => {
    const colors = useColorConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        buttonContainer: {
            backgroundColor: colors.background,
            borderRadius: 8,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonText: {
            color: colors.text,
            ...fonts.button,
            marginRight: 8,
        },
    });

    return (
        <Pressable
            testID="SeeAllButton"
            style={styles.buttonContainer}
            onPress={() => navigation.navigate(navigateToRoute)}
        >
            <TextTranslated style={styles.buttonText} text="See All" />
            <FontAwesome5 name="arrow-right" size={17} color={colors.text} />
        </Pressable>
    );
};
