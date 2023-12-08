import React from 'react';
import { View } from 'react-native';

import usePromptLibrary from '../../lib/repositories/promptLibrary/usePromptLibrary';
import { Routes } from '../../routes/routes';
import { DataWrapper } from '../general/base/DataWrapper';
import { TitleWithSeeAll } from '../general/text/TitleWithSeeAll';
import { PromptCard } from '../promptLibary/PromptCard';

/**
 * This is a component that displays 5 random prompts from the prompt library
 * It is used on the home screen
 */
export function HomePrompts() {
    const { data, isLoading, error } = usePromptLibrary();

    const selectedPrompts = data
        // eslint-disable-next-line etc/no-assign-mutated-array
        ?.sort(() => Math.random() - Math.random())
        .slice(0, 3);

    return (
        <View>
            <TitleWithSeeAll
                title="Useful Prompts"
                navigateToRoute={Routes.PromptLibrary}
            />

            <DataWrapper isLoading={isLoading} error={error}>
                {selectedPrompts?.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                ))}
            </DataWrapper>
        </View>
    );
}
