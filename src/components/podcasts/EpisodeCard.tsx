import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageSourcePropType,
    Text,
} from 'react-native';

import {
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
            borderRadius: 12,
            padding: 10,
            marginBottom: 14,
            marginHorizontal: 4,
            width: 320,
            ...colorStateConfig.highContrastBorder,
        },
        headContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        image: {
            borderRadius: 10,
            height: 60,
            width: 60,
            resizeMode: 'cover',
            marginRight: 10,
        },
        titleText: {
            flex: 1,
            ...fonts.h3,
            fontSize: 15,
            color: colors.titleDefault,
        },
        durationContainer: {
            marginTop: 6,
            backgroundColor: colors.completedProgressBar,
            alignSelf: 'flex-start',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 5,
            ...colorStateConfig.highContrastBorder,
        },
        durationText: {
            fontSize: 11,
            color: colors.text,
        },
    });

    // Image fallback
    let episodeImageSource: ImageSourcePropType = require('../../assets/images/bgImages/robot.png');
    if (episode.imageLink?.trim() && episode.imageLink !== 'null' && episode.imageLink !== '0') {
        episodeImageSource = { uri: episode.imageLink };
    }

    const episodeDurationtext =
        episode.duration?.trim() && episode.duration !== 'null' && episode.duration !== '0'
            ? episode.duration
            : '';

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
                <View style={{ flex: 1 }}>
                    <TextTranslated
                        style={styles.titleText}
                        text={episode.title}
                        numberOfLines={2}
                    />
                    {episodeDurationtext.length > 0 && (
                        <View style={styles.durationContainer}>
                            <Text style={styles.durationText}>{episodeDurationtext}</Text>
                        </View>
                    )}
                </View>
            </View>
        </InteractiveView>
    );
}
