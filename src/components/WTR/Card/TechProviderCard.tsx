import { LinearGradient } from 'expo-linear-gradient';
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
import { TextTranslated } from '../../general/text/TextTranslated';
import { InteractiveView } from '../../general/views/InteractiveView';

type Props = {
    name: string;
    techProviderImage: ImageSourcePropType;
    techProviderSlug: string;
    style?: ViewStyle;
};

export function TechProviderCard({
    name,
    techProviderImage,
    techProviderSlug,
    style,
}: Props) {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 12,
            padding: 5,
            marginBottom: 16,
            marginHorizontal: 5,
            height: 110,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        circle: {
            width: 75,
            height: 75,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            ...fonts.h3,
            color: colors.titleDefault,
            fontWeight: 'bold',
        },
        contentContainer: {
            justifyContent: 'center',
        },
        image: {
            height: 50,
            width: 50,
        },
        container: {
            alignItems: 'center',
        },
    });

    return (
        <InteractiveView
            style={[styles.card, style]}
            testID="tech-provider-card"
            onPress={() => {
                HapticFeedback(HapticForces.Light);
                navigation.navigate(Routes.WindesheimTechRadarContent, {
                    page: techProviderSlug,
                });
            }}
        >
            <View
                style={styles.container}
                testID={`tech-provider-${techProviderSlug}-button`}
            >
                <LinearGradient
                    colors={colors.techProviderGradient}
                    style={styles.circle}
                >
                    <Image source={techProviderImage} style={styles.image} />
                </LinearGradient>

                <View style={styles.contentContainer}>
                    <TextTranslated style={styles.title} text={name} />
                </View>
            </View>
        </InteractiveView>
    );
}
