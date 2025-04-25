import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsButton } from '../components/general/buttons/SettingButton';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { NavBar } from '../components/navigation/Navbar';

import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';
import { PodcastEpisodeLimitedView } from '../components/podcasts/PodcastEpisodeLimitedView';
import { ArticleLimitedView } from '../components/articleLibrary/ArticleLimitedView'; // Import ArticleLimitedView

const screenWidth = Dimensions.get('window').width;

type RootStackParamList = {
    ArticleScreen: { id: number };
};

export function Articles() {
    const currentTheme = useCurrentTheme();
    const colors = useColorConfig();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';
    const navigation = useNavigation<any>();

    // State to store the articles
    const [articles, setArticles] = useState<any[]>([]);

    useEffect(() => {
        // Assuming ArticleLimitedView fetches articles, we load them here
        // Example: fetchArticles() or some logic to fetch articles
        // Replace with your actual logic for fetching articles
        const fetchArticles = async () => {
            const fetchedArticles = [
                { id: 1, title: 'Article 1', imageUrl: '' },
                { id: 2, title: 'Article 2', imageUrl: '' },
                { id: 3, title: 'Article 3', imageUrl: '' },
                { id: 4, title: 'Article 4', imageUrl: '' },
                { id: 5, title: 'Article 5', imageUrl: '' },
                { id: 6, title: 'Article 6', imageUrl: '' },
            ];
            setArticles(fetchedArticles); // Update the state with fetched articles
        };

        fetchArticles();
    }, []);

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
            position: 'relative',
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
        },
        sectionTitle: {
            fontSize: 24,
            fontWeight: '600',
            marginTop: 20,
            marginBottom: 10,
            marginHorizontal: 20,
            color: colors.text,
        },
        sectionSubtitle: {
            fontSize: 15,
            color: '#555',
            marginHorizontal: 20,
            marginBottom: 10,
        },
        articleGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginTop: 10,
        },
        articleCard: {
            backgroundColor: '#F4F4F6',
            borderRadius: 20,
            marginBottom: 20,
            padding: 12,
            alignItems: 'center',
        },
        articleImage: {
            width: '100%',
            height: 90,
            backgroundColor: '#CCC',
            borderRadius: 14,
            marginBottom: 10,
        },
        articleTitle: {
            fontSize: 15,
            fontWeight: '500',
            color: '#333',
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

                <View style={styles.articleGrid}>
                    {articles.map((article, i) => (
                        <Animatable.View
                            key={article.id}
                            animation="fadeInUp"
                            duration={500}
                            delay={200 + i * 100}
                            style={[styles.articleCard, { width: (screenWidth - 40 * 2 - 12) / 2 }]}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ArticleScreen', { id: article.id })}
                                style={{ width: '100%' }}
                            >
                                <View style={styles.articleImage} />
                                <Text style={styles.articleTitle}>{article.title}</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    ))}
                </View>
            </PageScrollView>

            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
        </SafeAreaView>
    );
}
