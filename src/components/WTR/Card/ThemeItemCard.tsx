import React from 'react';
import { StyleSheet, View, ViewStyle, Image } from 'react-native';

import { useColorConfig, shadow } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { Routes } from '../../../routes/routes';
import { ReadMoreButton } from '../../general/buttons/ReadMoreButton';
import { TextTranslated } from '../../general/text/TextTranslated';

type Props = {
    title: string;
    description: string;
    style?: ViewStyle;
    navigateToRoute: Routes;
    navigationParams?: Record<string, string>;
};

export function ThemeItemCard({
    title,
    description,
    style,
    navigateToRoute,
    navigationParams,
}: Props) {
    const colors = useColorConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            ...shadow,
        },
        container: {
            flexDirection: 'row',
        },
        title: {
            ...fonts.h2,
            color: colors.titleDefault,
        },
        contentContainer: {
            marginLeft: 16,
            flexWrap: 'wrap',
            flex: 1,
        },
        description: {
            ...fonts.description,
            flexWrap: 'wrap',
            fontSize: 10,
            flexShrink: 1,
        },
        button: {
            borderRadius: 8,
            padding: 0,
            flexDirection: 'row',
            alignItems: 'center',
        },
        image: {
            borderRadius: 15,
            height: 100,
            width: 100,
            resizeMode: 'cover',
        },
        buttonContainer: {
            marginLeft: 'auto',
            marginTop: 'auto',
            padding: 0,
            ...fonts.smallLink,
        },
        buttonText: {
            color: colors.text,
            ...fonts.description,
            marginRight: 8,
        },
    });

    return (
        <View style={[styles.card, style]}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: 'https://www.windesheim.tech/wp-content/uploads/2021/12/blg_inline_build_your_own_technology_radar_01.png',
                    }}
                    style={styles.image}
                />
                <View style={styles.contentContainer}>
                    <TextTranslated style={styles.title} text={title} />
                    <TextTranslated
                        style={styles.description}
                        text={description}
                    />

                    <View style={styles.buttonContainer}>
                        <ReadMoreButton
                            buttonStyle={styles.button}
                            buttonTextStyle={styles.buttonText}
                            navigateToRoute={navigateToRoute}
                            navigationParams={navigationParams}
                            testID={`theme-${title}-button`}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
