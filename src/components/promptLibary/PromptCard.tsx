import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import {
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { Prompt } from '../../types/Prompt';
import { ReadMoreButton } from '../general/buttons/ReadMoreButton';
import { TextTranslated } from '../general/text/TextTranslated';
import { InteractiveView } from '../general/views/InteractiveView';

type Props = {
    prompt: Prompt;
};

const maximumDescriptionLength = 100;

export function PromptCard({ prompt }: Props) {
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
        imageContainer: {
            alignItems: 'center',
        },
        toolText: {
            ...fonts.h3,
            marginTop: 5,
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

    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
    let promptImageSource: ImageSourcePropType = require('../../assets/images/bgImages/robot.png');
    if (
        prompt.imageLink !== undefined &&
        prompt.imageLink !== null &&
        prompt.imageLink.length > 0 &&
        prompt.imageLink !== '' &&
        prompt.imageLink !== ' ' &&
        prompt.imageLink !== 'null' &&
        prompt.imageLink !== '0'
    ) {
        promptImageSource = {
            uri: prompt.imageLink,
        };
    }

    return (
        <InteractiveView
            style={styles.card}
            testID="prompt-card"
            onPress={() => {
                HapticFeedback(HapticForces.Light);
                navigation.navigate(Routes.PromptView, {
                    promptId: prompt.id,
                });
            }}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={promptImageSource} style={styles.image} />
                    <TextTranslated
                        style={styles.toolText}
                        text={prompt.tool}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <TextTranslated style={styles.title} text={prompt.title} />
                    <TextTranslated
                        style={styles.description}
                        text={
                            prompt.description.slice(
                                0,
                                maximumDescriptionLength,
                            ) + '...'
                        }
                    />

                    <View style={styles.buttonContainer}>
                        <ReadMoreButton
                            buttonStyle={styles.button}
                            buttonTextStyle={styles.buttonText}
                            navigateToRoute={Routes.PromptView}
                            navigationParams={{ promptId: prompt.id }}
                            testID={`prompt-${prompt.id}-button`}
                        />
                    </View>
                </View>
            </View>
        </InteractiveView>
    );
}
