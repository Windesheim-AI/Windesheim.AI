import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

import {
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { openBrowserPopup } from '../../../lib/utility/browserPopup';
import { TextTranslated } from '../../general/text/TextTranslated';
import { InteractiveView } from '../../general/views/InteractiveView';

type Props = {
    title: string;
    description: string;
    themeImage: ImageSourcePropType;
    themeSlug: string;
    style?: ViewStyle;
};

export function ThemeItemCard({
    title,
    description,
    themeImage,
    themeSlug,
    style,
}: Props) {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
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
            flex: 1,
        },
        description: {
            ...fonts.description,
            flexWrap: 'wrap',
            fontSize: 13,
            flexShrink: 1,
        },
        image: {
            borderRadius: 15,
            height: 75,
            width: 75,
            resizeMode: 'cover',
        },
    });

    return (
        <InteractiveView
            style={[styles.card, style]}
            testID="theme-card"
            onPress={() => {
                HapticFeedback(HapticForces.Light);
                openBrowserPopup(
                    'https://www.windesheim.tech/technologie-trends/' +
                        themeSlug,
                );
            }}
        >
            <View style={styles.container}>
                <Image
                    source={
                        themeImage ??
                        require('../../../assets/images/bgImages/robot.png')
                    }
                    style={styles.image}
                />
                <View style={styles.contentContainer}>
                    <TextTranslated style={styles.title} text={title} />
                    <TextTranslated
                        style={styles.description}
                        text={description}
                    />
                </View>
            </View>
        </InteractiveView>
    );
}
