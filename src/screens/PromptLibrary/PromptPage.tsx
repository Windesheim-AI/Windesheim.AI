import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View, Linking } from 'react-native';
import { Chip } from 'react-native-paper';

import { Card } from '../../components/base/Card';
import { DataWrapper } from '../../components/base/DataWrapper';
import { Button } from '../../components/general/buttons/Button';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import {
    shadow,
    stateColorSchemes,
    useColorConfig,
} from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import useSinglePrompt from '../../lib/repositories/promptLibrary/useSinglePrompt';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';

export type PromptPageProps = {
    promptId: string;
};

export function PromptPage() {
    const colors = useColorConfig();
    const fonts = useFonts();
    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params as PromptPageProps;
    const promptId = params.promptId;
    const { data, isLoading, error } = useSinglePrompt(promptId);
    const prompt = data;
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
            backgroundColor: stateColorSchemes.success[1],
            borderColor: stateColorSchemes.success[1],
            color: colors.white,
            ...shadow,
        },
        toolTag: {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: stateColorSchemes.primary[1],
            borderColor: stateColorSchemes.primary[1],
            color: colors.white,
            ...shadow,
        },
        promptPatternTag: {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: stateColorSchemes.danger[1],
            borderColor: stateColorSchemes.danger[1],
            color: colors.white,
            ...shadow,
        },
        chipText: {
            color: colors.white,
            ...fonts.description,
        },
    });

    return (
        <DataWrapper isLoading={isLoading} error={error}>
            <PageView>
                <TextTranslated
                    id="prompt-library"
                    style={styles.title}
                    text={prompt?.title}
                />
                <GoBackButton
                    onPress={() => navigation.navigate(Routes.PromptLibrary)}
                    buttonText="Prompt Library"
                />
                <View style={styles.tagContainer}>
                    <Chip
                        style={styles.toolTag}
                        mode="outlined"
                        textStyle={styles.chipText}
                        icon="wrench"
                    >
                        {prompt?.tool}
                    </Chip>
                    <Chip
                        style={styles.sectorTag}
                        mode="outlined"
                        textStyle={fonts.description}
                        icon="briefcase"
                    >
                        {prompt?.sector}
                    </Chip>
                    <Chip
                        style={styles.promptPatternTag}
                        mode="outlined"
                        textStyle={fonts.description}
                        icon="clipboard"
                    >
                        {prompt?.promptPattern}
                    </Chip>
                </View>
                <Card>
                    <Text style={styles.subtitle}>Description</Text>
                    <Text style={styles.cardDescription}>
                        {prompt?.description}
                    </Text>
                </Card>
                <Card>
                    <Text style={styles.subtitle}>Prompt</Text>
                    <Text style={styles.cardDescription}>{prompt?.prompt}</Text>
                </Card>

                {/* link to the tool open URL in app */}
                <Button
                    buttonText="Open Tool"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onPress={() => Linking.openURL(prompt?.toolLink ?? '')}
                    colorGradientScheme={stateColorSchemes.primary}
                />
            </PageView>
        </DataWrapper>
    );
}
