import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { ChipFilter } from '../../components/general/base/ChipFilters';
import { DataWrapper } from '../../components/general/base/DataWrapper';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PromptCard } from '../../components/promptLibary/PromptCard';
import { useColorStateConfig } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import usePromptLibrary from '../../lib/repositories/promptLibrary/usePromptLibrary';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { Sector } from '../../types/Prompt';

export function PromptLibrary() {
    const fonts = useFonts();
    const navigation = useNavigation();
    const colorStateConfig = useColorStateConfig();

    const { data, isLoading, error } = usePromptLibrary();
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);

    const styles = StyleSheet.create({
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
                                colorGradientScheme={
                                    colorStateConfig.colors.primary
                                }
                                textColorScheme={colorStateConfig.text?.primary}
                            />

                            <ChipFilter
                                activeList={selectedSectors}
                                filterList={usedSectors}
                                setActiveList={setSelectedSectors}
                                colorGradientScheme={
                                    colorStateConfig.colors.success
                                }
                                textColorScheme={colorStateConfig.text?.success}
                            />
                        </View>
                    </>
                ) : null}
                {filteredPrompts?.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
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
