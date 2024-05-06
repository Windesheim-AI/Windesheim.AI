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
            marginRight: 15,
            width: 300,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        headContainer: {
            flex: 1,
            alignItems: 'center',
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
            ...fonts.h2,
            color: colors.titleDefault,
        },
        descriptionText: {
            ...fonts.description,
            flexWrap: 'wrap',
            fontSize: 10,
            flexShrink: 1,
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
            <View style={styles.headContainer}>
                <Image source={episodeImageSource} style={styles.image} />
                <TextTranslated style={styles.titleText} text={episode.title} />
            </View>
            <Text>{episodeDurationtext}</Text>
            <TextTranslated
                style={styles.descriptionText}
                text={episode.description}
                numberOfLines={1}
            />
        </InteractiveView>
    );
}
