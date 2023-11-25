import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { Card } from '../../components/general/base/Card';
import { ChipFilter } from '../../components/general/base/ChipFilters';
import { DataWrapper } from '../../components/general/base/DataWrapper';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { stateColorSchemes } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import usePromptLibrary from '../../lib/repositories/promptLibrary/usePromptLibrary';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { Sector } from '../../types/Prompt';

export function PromptLibrary() {
    const fonts = useFonts();
    const navigation = useNavigation();
    const { data, isLoading, error } = usePromptLibrary();
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);

    const styles = StyleSheet.create({
        card: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        leftContent: {
            flex: 1,
        },
        rightContent: {
            flex: 1,
            alignItems: 'flex-end',
        },
        title: {
            ...fonts.h1,
            marginBottom: 10,
        },
        filterContainer: {
            marginBottom: 10,
            marginTop: 10,
        },
    });

    const usedTools = Array.from(new Set(data?.map((prompt) => prompt.tool)));
    const usedSectors = Array.from(
        new Set(data?.map((prompt) => prompt.sector)),
    );

    const filteredPrompts = data?.filter(
        (prompt) =>
            (selectedTools.length > 0
                ? selectedTools.includes(prompt.tool)
                : true) &&
            (selectedSectors.length > 0
                ? selectedSectors.includes(prompt.sector)
                : true),
    );

    return (
        <DataWrapper isLoading={isLoading} error={error}>
            <PageScrollView>
                <TextTranslated
                    id="prompt-library"
                    style={styles.title}
                    text="Prompt Library"
                />
                <GoBackButton
                    onPress={() => navigation.navigate(Routes.Study)}
                    buttonText="Study"
                />
                {filteredPrompts && filteredPrompts.length > 0 ? (
                    <>
                        <TextTranslated
                            style={fonts.description}
                            text="Filter by tool and sector, hold long on a tag to select only that one."
                        />
                        <View style={styles.filterContainer}>
                            <ChipFilter
                                activeList={selectedTools}
                                filterList={usedTools}
                                setActiveList={setSelectedTools}
                                colorGradientScheme={stateColorSchemes.primary}
                            />

                            <ChipFilter
                                activeList={selectedSectors}
                                filterList={usedSectors}
                                setActiveList={setSelectedSectors}
                                colorGradientScheme={stateColorSchemes.success}
                            />
                        </View>
                    </>
                ) : null}
                {filteredPrompts?.map((prompt) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate(Routes.Prompt, {
                                promptId: prompt.id,
                            });
                        }}
                        key={prompt.id}
                    >
                        <Card style={styles.card}>
                            <View style={styles.leftContent}>
                                <Text style={fonts.h3}>{prompt.title}</Text>
                                <Text style={fonts.accent}>
                                    {prompt.promptPattern}
                                </Text>
                            </View>
                            <View style={styles.rightContent}>
                                <Text style={fonts.h2}>{prompt.tool}</Text>
                            </View>
                        </Card>
                    </Pressable>
                ))}

                {filteredPrompts?.length === 0 ? (
                    <TextTranslated
                        id="no-prompts-found"
                        style={fonts.description}
                        text="No prompts found!"
                    />
                ) : null}
            </PageScrollView>
        </DataWrapper>
    );
}
