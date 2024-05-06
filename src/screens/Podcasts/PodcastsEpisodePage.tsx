/* eslint-disable complexity */
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

import AudioPlayer from '../../components/audioPlayer/audioPlayer';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
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
            borderRadius: 30,
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

    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
    let episodeImageSource: ImageSourcePropType = require('../../assets/images/bgImages/robot.png');
    if (
        episode.imageLink !== undefined &&
        episode.imageLink !== null &&
        episode.imageLink.length > 0 &&
        episode.imageLink !== '' &&
        episode.imageLink !== ' ' &&
        episode.imageLink !== 'null' &&
        episode.imageLink !== '0'
    ) {
        episodeImageSource = {
            uri: episode.imageLink,
        };
    }

    let episodeAudioSource = '';
    if (
        episode.audioLink !== undefined &&
        episode.audioLink !== null &&
        episode.audioLink.length > 0 &&
        episode.audioLink !== '' &&
        episode.audioLink !== ' ' &&
        episode.audioLink !== 'null' &&
        episode.audioLink !== '0'
    ) {
        episodeAudioSource = episode.audioLink;
    }

    return (
        <PageView>
            {/* TODO: add back button */}
            <Text style={styles.title}>{episode.title}</Text>
            <Text style={styles.date}>{episode.date}</Text>
            <Image style={styles.image} source={episodeImageSource} />
            <AudioPlayer audioUrl={episodeAudioSource} />
            {/* TODO: add episode description text */}
        </PageView>
    );
}
