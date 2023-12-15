import React from 'react';
import { View } from 'react-native';

import { useFonts } from '../../lib/constants/Fonts';
import usePromptLibrary from '../../lib/repositories/promptLibrary/usePromptLibrary';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../general/text/TextTranslated';
import { TitleWithSeeAll } from '../general/text/TitleWithSeeAll';
import { PromptCard } from '../promptLibary/PromptCard';

/**
 * This is a component that displays 5 random prompts from the prompt library
 * It is used on the home screen
 */
export function HomePrompts() {
    const fonts = useFonts();
    const { data, isLoading, error } = usePromptLibrary();

    const selectedPrompts = data
        // eslint-disable-next-line etc/no-assign-mutated-array
        ?.sort(() => Math.random() - Math.random())
        .slice(0, 3);

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
        <View>
            <TitleWithSeeAll
                title="Useful Prompts"
                navigateToRoute={Routes.PromptLibrary}
            />

            {selectedPrompts?.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
            ))}
        </View>
    );
}
