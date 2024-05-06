import React from 'react';
import { View } from 'react-native';

import { EpisodeCard } from './EpisodeCard';
import { useFonts } from '../../lib/constants/Fonts';
import usePodcastEpisodes from '../../lib/repositories/podcast/usePodcastEpisodes';
import { getRandomLimitedItemsFromArray } from '../../lib/utility/data';
import { TextTranslated } from '../general/text/TextTranslated';

type Props = {
    limit?: number;
};

export function PodcastEpisodeLimitedView({ limit }: Props) {
    const fonts = useFonts();

    const { data, isLoading, error } = usePodcastEpisodes();
    const isLimited = limit !== undefined && limit > 0;

    const selectedEpisodes = isLimited
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

    //TODO: put in slidingbar

    return (
        <View>
            {selectedEpisodes?.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
            ))}
        </View>
    );
}
