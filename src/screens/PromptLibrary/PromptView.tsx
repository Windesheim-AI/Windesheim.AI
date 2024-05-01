/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ViewStyle,
    Image,
} from 'react-native';
import { Chip } from 'react-native-paper';

import arrowLeft from '../../assets/images/Icon/go_back_arrow.png';
import { Card } from '../../components/general/base/Card';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TryButton } from '../../components/general/buttons/TryButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PageView } from '../../components/general/views/PageView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
import {
    shadow,
    useColorConfig,
    useColorStateConfig,
    useCurrentTheme,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import useSinglePrompt from '../../lib/repositories/promptLibrary/useSinglePrompt';
import { openBrowserPopup } from '../../lib/utility/browserPopup';
import { getEnvValue } from '../../lib/utility/env/env';
import { EnvOptions } from '../../lib/utility/env/env.values';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { removeSlashes } from '../../lib/utility/stringutils';
import { Routes } from '../../routes/routes';
export type PromptPageProps = {
    promptId: string;
};

export function PromptView() {
    const colors = useColorConfig();
    const fonts = useFonts();
    const navigation = useNavigation();
    const colorStateConfig = useColorStateConfig();
    const route = useRoute();
    const params = route.params as PromptPageProps;
    const promptId = params.promptId;
    const currentTheme = useCurrentTheme();
    const { data, isLoading, error } = useSinglePrompt(promptId);
    const prompt = data;
    const wordPressContentUrl = getEnvValue(EnvOptions.WordPressContentURL);

    const goBack = () => {
        HapticFeedback(HapticForces.Light);
        navigation.goBack();
    };
    const buttonContainerStyle: ViewStyle = {
        position: 'absolute',
        top: 0,
        right: 10,
        marginLeft: 20,
    };
    const iconStyle = {
        width: 37,
        height: 37,
        tintColor: currentTheme === 'dark' ? '#FFFFFF' : 'black',
    };
    const styles = StyleSheet.create({
        title: {
            ...fonts.h1,
            marginBottom: 10,
        },
        subtitle: {
            ...fonts.h2,
            marginBottom: 10,
        },
        cardDescription: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: colors.text,
        },
        tagContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
            marginBottom: 10,
        },
        sectorTag: {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: colors.sectorTag,
            borderColor: colors.sectorTag,
            color: colors.tagText,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        toolTag: {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: colors.toolTag,
            borderColor: colors.toolTag,
            color: colors.tagText,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        promptPatternTag: {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: colors.patternTag,
            borderColor: colors.patternTag,
            color: colors.tagText,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        chipText: {
            ...fonts.chipText,
        },
        container: {
            marginTop: 'auto',
            marginBottom: 'auto',
            alignItems: 'center',
        },
    });

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <PageView>
                <TextTranslated
                    style={styles.title}
                    text="An error occurred while loading the data"
                />

                <GoBackButton
                    buttonText="Prompts"
                    onPress={() => navigation.navigate(Routes.PromptLibrary)}
                />
            </PageView>
        );
    }

    if (!prompt?.title) {
        return (
            <PageView>
                <TextTranslated
                    id="prompt-library"
                    style={styles.title}
                    text="No prompt found!"
                />

                <GoBackButton
                    buttonText="Prompts"
                    onPress={() => navigation.navigate(Routes.PromptLibrary)}
                />
            </PageView>
        );
    }

    return (
        <PageScrollView
            title={
                prompt.title.length > 24
                    ? prompt.title
                    : removeSlashes(prompt.title)
            }
        >
            <TouchableOpacity onPress={goBack} style={buttonContainerStyle}>
                <Image source={arrowLeft} style={iconStyle} />
            </TouchableOpacity>
            <View style={styles.tagContainer}>
                <Chip
                    style={styles.toolTag}
                    mode="outlined"
                    textStyle={{
                        ...styles.chipText,
                        color: colors.tagText,
                    }}
                    icon="wrench"
                    theme={{ colors: { primary: 'black' } }}
                >
                    {prompt.tool}
                </Chip>
                <Chip
                    style={styles.sectorTag}
                    mode="outlined"
                    textStyle={{
                        ...styles.chipText,
                        color: colors.tagText,
                    }}
                    icon="briefcase"
                    theme={{ colors: { primary: 'black' } }}
                >
                    {prompt.sector}
                </Chip>
                <Chip
                    style={styles.promptPatternTag}
                    mode="outlined"
                    textStyle={{
                        ...styles.chipText,
                        color: colors.tagText,
                    }}
                    icon="clipboard"
                    theme={{ colors: { primary: 'black' } }}
                >
                    {prompt.promptPattern}
                </Chip>
            </View>
            <Card style={{ ...colorStateConfig.highContrastBorder }}>
                <TextTranslated style={styles.subtitle} text="Description" />
                <Text style={styles.cardDescription}>
                    {removeSlashes(prompt.description)}
                </Text>
            </Card>
            <Card style={{ ...colorStateConfig.highContrastBorder }}>
                <TextTranslated style={styles.subtitle} text="Prompt" />
                <Text style={styles.cardDescription}>
                    {removeSlashes(prompt.prompt)}
                </Text>
            </Card>
            <View style={styles.container}>
                {/* link to the tool open URL in app */}
                <TryButton
                    buttonText="Try it yourself !"
                    onPress={() => {
                        openBrowserPopup(
                            `${wordPressContentUrl}/prompts?id=${prompt.id}`,
                        );
                    }}
                    textColorScheme={
                        colorStateConfig.theme === 'dark' ? 'white' : 'black'
                    }
                />
            </View>
        </PageScrollView>
    );
}
