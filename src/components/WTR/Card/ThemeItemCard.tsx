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
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { Routes } from '../../../routes/routes';
import { ReadMoreButton } from '../../general/buttons/ReadMoreButton';
import { TextTranslated } from '../../general/text/TextTranslated';
import { IntractableView } from '../../general/views/InteractableView';

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
    const navigation = useNavigation();

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
            height: 75,
            width: 75,
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
        <IntractableView
            style={[styles.card, style]}
            testID="theme-card"
            onPress={() => {
                HapticFeedback(HapticForces.Light);
                navigation.navigate(Routes.WindesheimTechRadarContent, {
                    page: themeSlug,
                });
            }}
        >
            <View style={styles.container}>
                <Image source={themeImage} style={styles.image} />
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
                            navigateToRoute={Routes.WindesheimTechRadarContent}
                            navigationParams={{ page: themeSlug }}
                            testID={`theme-${themeSlug}-button`}
                        />
                    </View>
                </View>
            </View>
        </IntractableView>
    );
}
