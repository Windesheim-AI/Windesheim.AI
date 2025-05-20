import React, { useEffect, useRef } from 'react';
import {
    Text,
    Image,
    StyleSheet,
    View,
    Animated,
    Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { useColorConfig, useCurrentTheme } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { Routes } from '../../routes/routes';
import useSinglePodcastEpisode from '../../lib/repositories/podcast/useSinglePodcastEpisode';

import { PageScrollView } from '../../components/general/views/PageScrollView';
import { SettingsButton } from '../../components/general/buttons/SettingButton';
import { NavBar } from '../../components/navigation/Navbar';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import AudioPlayer from '../../components/audioPlayer/audioPlayer';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';

export type EpisodePageProps = {
    episodeId: string;
};

const screenWidth = Dimensions.get('window').width;

export function PodcastsEpisodePage() {
    const fonts = useFonts();
    const navigation = useNavigation();
    const currentTheme = useCurrentTheme();
    const route = useRoute();
    const params = route.params as EpisodePageProps;
    const episodeId = params.episodeId;
    const colors = useColorConfig();

    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';

    const goBackToArticles = () => {
        HapticFeedback(HapticForces.Light);
        navigation.navigate(Routes.Articles);
    };

    const { data, isLoading, error } = useSinglePodcastEpisode(episodeId);
    const episode = data;

    // Animation
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        if (episode) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [episode]);

    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: colors.background,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5',
        },
        headerSide: {
            width: 50,
            alignItems: 'center',
        },
        logoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        logo: {
            width: 37,
            height: 37,
            resizeMode: 'contain',
        },
        logoText: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
        },
        navBarContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
        },
        scrollContent: {
            paddingBottom: 120,
        },
        imageContainer: {
            alignSelf: 'center',
            marginTop: 30,
            marginBottom: 20,
        },
        image: {
            borderRadius: 30,
            height: 200,
            width: 200,
        },
        title: {
            ...fonts.h1,
            textAlign: 'left',
            marginHorizontal: 16,
            marginTop: 10,
        },
        date: {
            textAlign: 'left',
            marginHorizontal: 16,
            marginTop: 4,
            fontStyle: 'italic',
            fontSize: 14,
            color: colors.text,
        },
        description: {
            ...fonts.description,
            textAlign: 'left',
            marginHorizontal: 16,
            marginTop: 12,
            marginBottom: 20,
        },
    });

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error || !episode?.title) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerSide}>
                        <GoBackButton onPress={goBackToArticles} />
                    </View>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/Icon/favicon.png')}
                            style={styles.logo}
                        />
                        <Text style={[styles.logoText, { color: logoTextColor }]}>WINDESHEIM.AI</Text>
                    </View>
                    <View style={styles.headerSide}>
                        <SettingsButton />
                    </View>
                </View>
                <PageScrollView>
                    <TextTranslated style={styles.title} text="Episode niet gevonden!" />
                    <GoBackButton buttonText="Back" onPress={goBackToArticles} />
                </PageScrollView>
                <View style={styles.navBarContainer}>
                    <NavBar />
                </View>
            </SafeAreaView>
        );
    }

    let episodeImageSource = require('../../assets/images/bgImages/robot.png');
    if (
        episode.imageLink &&
        episode.imageLink.trim() !== '' &&
        episode.imageLink !== 'null' &&
        episode.imageLink !== '0'
    ) {
        episodeImageSource = { uri: episode.imageLink };
    }

    let episodeAudioSource = '';
    if (
        episode.audioLink &&
        episode.audioLink.trim() !== '' &&
        episode.audioLink !== 'null' &&
        episode.audioLink !== '0'
    ) {
        episodeAudioSource = episode.audioLink;
    }

    const episodeDate = new Date(episode.date);
    const episodeDateString = episodeDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.headerContainer}>
                <View style={styles.headerSide}>
                    <GoBackButton onPress={goBackToArticles} />
                </View>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/Icon/favicon.png')}
                        style={styles.logo}
                    />
                    <Text style={[styles.logoText, { color: logoTextColor }]}>WINDESHEIM.AI</Text>
                </View>
                <View style={styles.headerSide}>
                    <SettingsButton />
                </View>
            </View>

            <PageScrollView contentContainerStyle={styles.scrollContent}>
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                >
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={episodeImageSource} />
                    </View>

                    <Text style={styles.title}>{episode.title}</Text>
                    <Text style={styles.date}>{episodeDateString}</Text>
                    <Text style={styles.description}>{episode.description}</Text>

                    <AudioPlayer audioUrl={episodeAudioSource} />
                </Animated.View>
                <View style={{ height: 140 }} />
            </PageScrollView>

            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
        </SafeAreaView>
    );
}
