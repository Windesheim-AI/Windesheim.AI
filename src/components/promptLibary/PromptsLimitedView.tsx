import React from 'react';
import { View } from 'react-native';

import { PromptCard } from './PromptCard';
import { useFonts } from '../../lib/constants/Fonts';
import usePromptLibrary from '../../lib/repositories/promptLibrary/usePromptLibrary';
import { getRandomLimitedItemsFromArray } from '../../lib/utility/data';
import { TextTranslated } from '../general/text/TextTranslated';

type Props = {
    limit?: number;
};

export function PromptsLimitedView({ limit }: Props) {
    const fonts = useFonts();
    const { data, isLoading, error } = usePromptLibrary();
    const isLimited = limit !== undefined && limit > 0;

    const selectedPrompts = isLimited
        ? getRandomLimitedItemsFromArray(data, limit)
        : data;

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
            {selectedPrompts?.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
            ))}
        </View>
    );
}
