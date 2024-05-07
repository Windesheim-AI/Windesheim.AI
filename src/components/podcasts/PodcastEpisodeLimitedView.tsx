import React from 'react';
import { FlatList } from 'react-native';

import { EpisodeCard } from './EpisodeCard';
import { useFonts } from '../../lib/constants/Fonts';
import usePodcastEpisodes from '../../lib/repositories/podcast/usePodcastEpisodes';
import { getRandomLimitedItemsFromArray } from '../../lib/utility/data';
import { PodcastEpisode } from '../../types/PodcastEpisode';
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

    if (selectedEpisodes?.length === 0) {
        return (
            <TextTranslated style={fonts.h1} text="No podcasts where found!" />
        );
    }

    const renderEpisodeCards = ({ item }: { item: PodcastEpisode }) => (
        <EpisodeCard key={item.id} episode={item} />
    );

    return (
        <FlatList
            horizontal
            data={selectedEpisodes}
            renderItem={renderEpisodeCards}
        />
    );
}
