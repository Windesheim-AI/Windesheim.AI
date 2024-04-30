import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PromptCard } from './PromptCard';
import {
    useColorStateConfig,
    useCurrentHighContrastMode,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import usePromptLibrary from '../../lib/repositories/promptLibrary/usePromptLibrary';
import { Sector } from '../../types/Prompt';
import { ChipFilter } from '../general/base/ChipFilters';
import { TextTranslated } from '../general/text/TextTranslated';

// eslint-disable-next-line complexity
export function PromptsOverview() {
    const { data, isLoading, error } = usePromptLibrary();
    const fonts = useFonts();
    const colorStateConfig = useColorStateConfig();
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);
    const isHighContrastEnabled = useCurrentHighContrastMode();

    const styles = StyleSheet.create({
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

    if (isLoading) {
        return <TextTranslated style={fonts.default} text="Loading..." />;
    }

    if (error) {
        return (
            <TextTranslated
                style={fonts.h1}
                text="An error occurred while loading the data"
            />
        );
    }

    return (
        <View testID="prompts-overview">
            {filteredPrompts ? (
                <View style={styles.filterContainer}>
                    <ChipFilter
                        activeList={selectedTools}
                        filterList={usedTools}
                        setActiveList={setSelectedTools}
                        colorGradientScheme={
                            colorStateConfig.theme === 'dark'
                                ? colorStateConfig.colors.secondary
                                : colorStateConfig.colors.primary
                        }
                        textColorScheme={
                            colorStateConfig.theme === 'dark' &&
                            isHighContrastEnabled
                                ? 'white'
                                : 'black'
                        }
                    />

                    <ChipFilter
                        activeList={selectedSectors}
                        filterList={usedSectors}
                        setActiveList={setSelectedSectors}
                        colorGradientScheme={
                            colorStateConfig.theme === 'dark'
                                ? colorStateConfig.colors.warning
                                : colorStateConfig.colors.success
                        }
                        textColorScheme={
                            colorStateConfig.theme === 'dark' &&
                            isHighContrastEnabled
                                ? 'white'
                                : 'black'
                        }
                    />
                </View>
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
        </View>
    );
}
