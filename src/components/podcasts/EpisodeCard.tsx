/* eslint-disable complexity */
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageSourcePropType,
    Text,
} from 'react-native';

import {
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { PodcastEpisode } from '../../types/PodcastEpisode';
import { TextTranslated } from '../general/text/TextTranslated';
import { InteractiveView } from '../general/views/InteractiveView';

type Props = {
    episode: PodcastEpisode;
};

export function EpisodeCard({ episode }: Props) {
    const colors = useColorConfig();
    const navigation = useNavigation();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            marginTop: 10,
            marginLeft: 5,
            marginRight: 10,
            width: 300,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
            position: 'relative',
        },
        headContainer: {
            flex: 1,
            alignItems: 'flex-start',
            flexDirection: 'row',
        },
        image: {
            borderRadius: 15,
            height: 75,
            width: 75,
            resizeMode: 'cover',
            marginRight: 5,
            marginBottom: 4,
        },
        titleText: {
            width: '80%',
            ...fonts.alert,
            color: colors.titleDefault,
            marginBottom: 7,
        },
        descriptionText: {
            ...fonts.description,
            flexWrap: 'wrap',
            fontSize: 10,
            flexShrink: 1,
        },
        imageContainer: {
            marginRight: 5,
            marginBottom: 4,
        },
        contentContainer: {
            flex: 1,
        },
        episodeDurationContainer: {
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: colors.completedProgressBar,
            paddingVertical: 2,
            paddingHorizontal: 2,
            borderRadius: 5,
            ...colorStateConfig.highContrastBorder,
        },
        episodeDurationText: {
            fontSize: 11,
            color: colors.text,
        },
    });

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

    let episodeDurationtext = '';
    if (
        episode.duration !== undefined &&
        episode.duration !== null &&
        episode.duration.length > 0 &&
        episode.duration !== '' &&
        episode.duration !== ' ' &&
        episode.duration !== 'null' &&
        episode.duration !== '0'
    ) {
        episodeDurationtext = episode.duration;
    }

    return (
        <InteractiveView
            style={styles.card}
            testID="episode-card"
            onPress={() => {
                HapticFeedback(HapticForces.Light);
                navigation.navigate(Routes.PodcastsEpisodePage, {
                    episodeId: episode.id,
                });
            }}
        >
            <View style={styles.episodeDurationContainer}>
                <Text style={styles.episodeDurationText}>
                    {episodeDurationtext}
                </Text>
            </View>
            <View style={styles.headContainer}>
                <View style={styles.imageContainer}>
                    <Image source={episodeImageSource} style={styles.image} />
                </View>
                <View style={styles.contentContainer}>
                    <TextTranslated
                        style={styles.titleText}
                        text={episode.title}
                        numberOfLines={1}
                    />
                    <TextTranslated
                        style={styles.descriptionText}
                        text={episode.description}
                        numberOfLines={3}
                    />
                </View>
            </View>
        </InteractiveView>
    );
}
