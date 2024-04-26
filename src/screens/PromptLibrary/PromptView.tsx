import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

import { Card } from '../../components/general/base/Card';
import { Button } from '../../components/general/buttons/Button';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PageView } from '../../components/general/views/PageView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
import {
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
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

    const { data, isLoading, error } = useSinglePrompt(promptId);
    const prompt = data;
    const wordPressContentUrl = getEnvValue(EnvOptions.WordPressContentURL);

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
            backgroundColor: colorStateConfig.colors.success[1],
            borderColor: colorStateConfig.colors.success[1],
            color: colorStateConfig.text?.success ?? colors.white,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        toolTag: {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: colorStateConfig.colors.primary[1],
            borderColor: colorStateConfig.colors.primary[1],
            color: colorStateConfig.text?.primary ?? colors.white,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        promptPatternTag: {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: colorStateConfig.colors.danger[1],
            borderColor: colorStateConfig.colors.danger[1],
            color: colorStateConfig.text?.danger ?? colors.white,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        chipText: {
            ...fonts.chipText,
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
        <PageScrollView title={removeSlashes(prompt.title)}>
            <GoBackButton
                onPress={() => navigation.navigate(Routes.PromptLibrary)}
                buttonText="Prompt Library"
            />
            <View style={styles.tagContainer}>
                <Chip
                    style={styles.toolTag}
                    mode="outlined"
                    textStyle={{
                        ...styles.chipText,
                        color: colorStateConfig.text?.primary,
                    }}
                    icon="wrench"
                >
                    {prompt.tool}
                </Chip>
                <Chip
                    style={styles.sectorTag}
                    mode="outlined"
                    textStyle={{
                        ...styles.chipText,
                        color: colorStateConfig.text?.success,
                    }}
                    icon="briefcase"
                >
                    {prompt.sector}
                </Chip>
                <Chip
                    style={styles.promptPatternTag}
                    mode="outlined"
                    textStyle={{
                        ...styles.chipText,
                        color: colorStateConfig.text?.danger,
                    }}
                    icon="clipboard"
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

            {/* link to the tool open URL in app */}
            <Button
                buttonText="Try it yourself"
                onPress={() => {
                    openBrowserPopup(
                        `${wordPressContentUrl}/prompts?id=${prompt.id}`,
                    );
                }}
                colorGradientScheme={colorStateConfig.colors.primary}
                textColorScheme={colorStateConfig.text?.primary}
            />
        </PageScrollView>
    );
}
