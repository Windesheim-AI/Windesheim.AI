import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavBar } from '../components/navigation/Navbar'; // ✅ navbar import
import { SettingsButton } from '../components/general/buttons/SettingButton';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';

type RootStackParamList = {
    TestScreen: undefined;
    ArticleScreen: { id: number };
    Quizzes: { quizId: number };
};

const screenWidth = Dimensions.get('window').width;

export const HomeScreen = () => {
    const currentTheme = useCurrentTheme();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';
    const colors = useColorConfig();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        bigCard: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginTop: 20,
            padding: 20,
            backgroundColor: '#F1F1F5',
            borderRadius: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
        },
        bigCardText: {
            flex: 1,
            marginRight: 16,
            justifyContent: 'center',
        },
        bigCardTitle: {
            fontSize: 24,
            fontWeight: '600',
            marginBottom: 12,
        },
        testButton: {
            backgroundColor: '#ffcb05',
            paddingVertical: 10,
            paddingHorizontal: 18,
            borderRadius: 16,
            alignSelf: 'flex-start',
        },
        testButtonText: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 16,
        },
        bigCardImage: {
            width: 100,
            height: 100,
            backgroundColor: '#D0D0D0',
            borderRadius: 20,
        },
        articleGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginTop: 30,
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
                    <Text style={styles.logoText}>
                        WINDESHEIM.AI
                    </Text>
                </View>
                <SettingsButton />
            </View>

            <PageScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Animatable.View
                    animation="fadeInUp"
                    duration={600}
                    delay={100}
                    style={styles.bigCard}
                >
                    <View style={styles.bigCardText}>
                        <Text style={styles.bigCardTitle}>Doe de AI literacy test.</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Quizzes', { quizId: 1 })}
                            style={styles.testButton}
                        >
                            <Text style={styles.testButtonText}>Ga naar de test</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bigCardImage} />
                </Animatable.View>

                <View style={styles.articleGrid}>
                    {[...Array(6)].map((_, i) => (
                        <Animatable.View
                            key={i}
                            animation="fadeInUp"
                            duration={500}
                            delay={200 + i * 100}
                            style={[
                                styles.articleCard,
                                { width: (screenWidth - 40 * 2 - 12) / 2 },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ArticleScreen', { id: i })}
                                style={{ width: '100%' }}
                            >
                                <View style={styles.articleImage} />
                                <Text style={styles.articleTitle}>Artikel {i + 1}</Text>
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
};
