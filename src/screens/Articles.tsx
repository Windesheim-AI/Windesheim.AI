import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

import { SettingsButton } from '../components/general/buttons/SettingButton';
import { NavBar } from '../components/navigation/Navbar';

import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';
import { useAppSelector } from '../lib/redux/Hooks';
import { PodcastEpisodeLimitedView } from '../components/podcasts/PodcastEpisodeLimitedView';
import { ArticleLimitedView } from '../components/articleLibrary/ArticleLimitedView';

const screenWidth = Dimensions.get('window').width;

export function Articles() {
    const currentTheme = useCurrentTheme();
    const colors = useColorConfig();
    const fontSize = useAppSelector((state) => state.fontSize.fontSize);
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
            fontSize: fontSize + 2,
            fontWeight: 'bold',
            marginLeft: 10,
            color: logoTextColor,
        },
        scrollContent: {
            paddingBottom: 100,
            alignItems: 'center',
        },
        sectionTitle: {
            fontSize: fontSize + 6,
            fontWeight: '600',
            marginTop: 20,
            marginBottom: 10,
            marginHorizontal: 20,
            color: colors.text,
            textAlign: 'center',
        },
        sectionSubtitle: {
            fontSize: fontSize,
            color: colors.text,
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

    const ListHeader = () => (
        <View style={styles.scrollContent}>
            <Animatable.Text
                animation="fadeInUp"
                duration={600}
                delay={100}
                style={styles.sectionTitle}
            >
                Podcasts
            </Animatable.Text>

            <Animatable.Text
                animation="fadeInUp"
                duration={600}
                delay={200}
                style={styles.sectionSubtitle}
            >
                Hier vind je de nieuwste afleveringen van de officiële Windesheim.AI podcast.
            </Animatable.Text>

            <Animatable.View animation="fadeInUp" duration={600} delay={300}>
                <PodcastEpisodeLimitedView />
            </Animatable.View>

            <Animatable.Text
                animation="fadeInUp"
                duration={600}
                delay={400}
                style={styles.sectionTitle}
            >
                Articles
            </Animatable.Text>

            <Animatable.Text
                animation="fadeInUp"
                duration={600}
                delay={500}
                style={styles.sectionSubtitle}
            >
                Een verzameling van artikelen op het gebied van de laatste AI trends. Elke is gelabeld met ELSA categorieën.
            </Animatable.Text>

            <Animatable.View
                animation="fadeInUp"
                duration={600}
                delay={600}
                style={styles.articlesWrapper}
            >
                <ArticleLimitedView limit={6} />
                <View style={{ height: 0, backgroundColor: colors.background }} />
            </Animatable.View>
        </View>
    );

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

            <FlatList
                data={[]}
                renderItem={null}
                keyExtractor={() => 'unused'}
                ListHeaderComponent={ListHeader}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
        </SafeAreaView>
    );
}
