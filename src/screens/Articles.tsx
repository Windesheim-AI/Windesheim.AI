import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsButton } from '../components/general/buttons/SettingButton';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { NavBar } from '../components/navigation/Navbar';

import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';
import { PodcastEpisodeLimitedView } from '../components/podcasts/PodcastEpisodeLimitedView';
import { ArticleLimitedView } from '../components/articleLibrary/ArticleLimitedView';

const screenWidth = Dimensions.get('window').width;

export function Articles() {
    const currentTheme = useCurrentTheme();
    const colors = useColorConfig();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';

    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: colors.background,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5',
        },
        logoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
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
            color: logoTextColor,
        },
        scrollContent: {
            paddingBottom: 100,
            alignItems: 'center',
        },
        sectionTitle: {
            fontSize: 24,
            fontWeight: '600',
            marginTop: 20,
            marginBottom: 10,
            marginHorizontal: 20,
            color: colors.text,
            textAlign: 'center',
        },
        sectionSubtitle: {
            fontSize: 15,
            color: '#555',
            marginHorizontal: 20,
            marginBottom: 10,
            textAlign: 'center',
        },
        articlesWrapper: {
            width: '100%',
            maxWidth: 500,
            paddingHorizontal: 12,
        },
        navBarContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
        },
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/Icon/favicon.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.logoText}>WINDESHEIM.AI</Text>
                </View>
                <SettingsButton />
            </View>

            <PageScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.sectionTitle}>Podcasts</Text>
                <Text style={styles.sectionSubtitle}>
                    Here you can find the newest episodes of the official Windesheim.AI podcast.
                </Text>
                <PodcastEpisodeLimitedView />

                <Text style={styles.sectionTitle}>Articles</Text>
                <Text style={styles.sectionSubtitle}>
                    A collection of articles highlighting the latest AI trends. Each is tagged with ELSA categories.
                </Text>

                <View style={styles.articlesWrapper}>
                    <ArticleLimitedView limit={6} />
                </View>
            </PageScrollView>

            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
        </SafeAreaView>
    );
}
