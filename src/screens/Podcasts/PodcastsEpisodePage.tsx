import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';

import AudioPlayer from '../../components/audioPlayer/audioPlayer';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { TitleSimple } from '../../components/general/text/TitleSimple';
import { PageView } from '../../components/general/views/PageView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
import { useFonts } from '../../lib/constants/Fonts';
import useSinglePodcastEpisode from '../../lib/repositories/podcast/useSinglePodcastEpisode';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';

export type EpisodePageProps = {
    episodeId: string;
};

export function PodcastsEpisodePage() {
    const fonts = useFonts();
    const navigation = useNavigation();

    const route = useRoute();
    const params = route.params as EpisodePageProps;
    const episodeId = params.episodeId;

    const { data, isLoading, error } = useSinglePodcastEpisode(episodeId);
    const episode = data;

    const styles = StyleSheet.create({
        title: {
            ...fonts.h1,
            textAlign: 'center',
        },
        date: {
            ...fonts.description,
            textAlign: 'center',
        },
        image: {
            alignSelf: 'center',
            borderRadius: 60,
            height: 300,
            width: 300,
            marginTop: 20,
            marginBottom: 10,
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
                    buttonText="Home"
                    onPress={() => navigation.navigate(Routes.Home)}
                />
            </PageView>
        );
    }

    if (!episode?.title) {
        return (
            <PageView>
                <TextTranslated style={styles.title} text="No episode found!" />

                <GoBackButton
                    buttonText="Home"
                    onPress={() => navigation.navigate(Routes.Home)}
                />
            </PageView>
        );
    }

    return (
        <PageView>
            <TitleSimple titleText="Podcasts" />
            <Text style={styles.title}>{episode.title}</Text>
            <Text style={styles.date}>{episode.date}</Text>
            {/* <Image style={styles.image} source={{ uri: podcast.imageUrl }} /> */}
            {/* <AudioPlayer audioUrl={podcast.audioUrl} /> */}
        </PageView>
    );
}
