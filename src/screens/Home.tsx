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

import { SettingsButton } from '../components/general/buttons/SettingButton';
import { DisclaimerCard } from '../components/general/card/DisclaimerCard';
import { Introduction } from '../components/general/card/Introduction';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';

// 👇 Add Quizzes screen to navigation type
type RootStackParamList = {
    TestScreen: undefined;
    ArticleScreen: { id: number };
    Quizzes: undefined;  // Add this line for Quizzes
};

// Screen width
const screenWidth = Dimensions.get('window').width;

export const HomeScreen = () => {
    const currentTheme = useCurrentTheme();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';
    const colors = useColorConfig();

    // 👇 Correctly typed navigation
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingLeft: 10,
            backgroundColor: colors.background,
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
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
        },
        flexGrow: {
            flexGrow: 1,
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
    });

    return (
        <>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/images/Icon/favicon.png')}
                    style={styles.logo}
                />
                <Text style={[styles.logoText, { color: logoTextColor }]}>
                    WINDESHEIM.AI
                </Text>
                <View style={styles.flexGrow} />
                <SettingsButton />
            </View>

            <PageScrollView showsVerticalScrollIndicator={false}>
                <Animatable.View
                    animation="fadeInUp"
                    duration={600}
                    delay={100}
                    style={styles.bigCard}
                >
                    <View style={styles.bigCardText}>
                        <Text style={styles.bigCardTitle}>Doe de AI literacy test.</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Quizzes')}  // Updated to navigate to Quizzes
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
        </>
    );
};
