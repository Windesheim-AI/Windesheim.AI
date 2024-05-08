/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable complexity */
import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
    Text,
    Image,
    StyleSheet,
    ImageSourcePropType,
    View,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

import arrowLeft from '../../assets/images/Icon/go_back_arrow.png';
import AudioPlayer from '../../components/audioPlayer/audioPlayer';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
import { useColorConfig, useCurrentTheme } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import useSinglePodcastEpisode from '../../lib/repositories/podcast/useSinglePodcastEpisode';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
export type EpisodePageProps = {
    episodeId: string;
};

export function PodcastsEpisodePage() {
    const fonts = useFonts();
    const navigation = useNavigation();
    const currentTheme = useCurrentTheme();
    const route = useRoute();
    const params = route.params as EpisodePageProps;
    const episodeId = params.episodeId;
    const colors = useColorConfig();
    const goBack = () => {
        HapticFeedback(HapticForces.Light);
        navigation.goBack();
    };
    const { data, isLoading, error } = useSinglePodcastEpisode(episodeId);
    const episode = data;
    const buttonStyle: ViewStyle = {
        position: 'absolute',
        top: 20,
        right: 20,
    };
    const iconStyle = {
        width: 30,
        height: 30,
        tintColor: currentTheme === 'dark' ? '#FFFFFF' : 'black',
    };
    const styles = StyleSheet.create({
        title: {
            ...fonts.h1,
            textAlign: 'left',
        },
        description: {
            ...fonts.description,
            textAlign: 'left',
            marginBottom: 10,
        },
        date: {
            textAlign: 'left',
            marginBottom: 16,
            fontStyle: 'italic',
            fontSize: 14,
            color: colors.text,
        },
        imageContainer: {
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 20,
        },
        image: {
            borderRadius: 30,
            height: 200,
            width: 200,
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

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let episodeImageSource: ImageSourcePropType = require('../../assets/images/bgImages/robot.png');
    if (
        episode.imageLink !== undefined &&
        episode.imageLink !== null &&
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
        episode.audioLink !== '' &&
        episode.audioLink !== ' ' &&
        episode.audioLink !== 'null' &&
        episode.audioLink !== '0'
    ) {
        episodeAudioSource = episode.audioLink;
    }

    const episodeDate = new Date(episode.date);
    const episodeDateSting = episodeDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <PageView>
            <TouchableOpacity onPress={goBack} style={buttonStyle}>
                <Image source={arrowLeft} style={iconStyle} />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={episodeImageSource} />
            </View>
            <Text style={styles.title}>{episode.title}</Text>
            <Text style={styles.date}>{episodeDateSting}</Text>
            <Text style={styles.description}>{episode.description}</Text>
            <AudioPlayer audioUrl={episodeAudioSource} />
        </PageView>
    );
}
