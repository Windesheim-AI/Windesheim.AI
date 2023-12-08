import React from 'react';
import { StyleSheet, View, ViewStyle, Image, Pressable } from 'react-native';

import { useColorConfig, shadow } from '../../../lib/constants/Colors';

import { techProviderItems, TechProviders } from '../../WTR/TechProviders';
import { TextTranslated } from '../text/TextTranslated';
import { useFonts } from '../../../lib/constants/Fonts';
import { GoBackButton } from '../buttons/GoBackButton';
import { ReadMoreButton } from '../buttons/ReadMoreButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export type ThemeItemCardProps = {
    title: string;
    description: string;
    style?: ViewStyle;
    // add links to theme
};

export function ThemeItemCard({
    title,
    description,
    style,
}: ThemeItemCardProps) {
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
            marginLeft: 'auto',
            marginTop: 'auto',
            padding: 0,
            ...fonts.smallLink,
        },
        image: {
            borderRadius: 15,
            height: 100,
            width: 100,
            resizeMode: 'cover',
        },
        buttonContainer: {
            borderRadius: 8,
            padding: 0,
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonText: {
            color: colors.text,
            ...fonts.description,
            marginRight: 8,
        },
    });

    function onPress() {
        // TODO; add navigation
        console.log('pressed');
    }

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
                    <View style={styles.button}>
                        <Pressable
                            testID="GoBackButton"
                            style={styles.buttonContainer}
                            onPress={onPress}
                        >
                            <TextTranslated
                                style={styles.buttonText}
                                text="View more"
                            />
                            <FontAwesome5
                                name="arrow-right"
                                size={16}
                                color={colors.text}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}
