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

import { NavBar } from '../components/navigation/Navbar';
import { SettingsButton } from '../components/general/buttons/SettingButton';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { ArticleLimitedView } from '../components/articleLibrary/ArticleLimitedView';
import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';
import { useAppSelector } from '../lib/redux/Hooks';

type RootStackParamList = {
    TestScreen: undefined;
    ArticleScreen: { id: number };
    Quizhome: { quizId: number };
};

const screenWidth = Dimensions.get('window').width;

export const HomeScreen = () => {
    const currentTheme = useCurrentTheme();
    const colors = useColorConfig();
    const fontSize = useAppSelector((state) => state.fontSize.fontSize);

    const logoTextColor = colors.text;
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
            fontSize,
            fontWeight: 'bold',
            marginLeft: 10,
            color: logoTextColor,
        },
        scrollContent: {
            paddingBottom: 120,
        },
        bigCard: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginTop: 20,
            padding: 20,
            backgroundColor: colors.cardBackground || '#FFFF',
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
            fontSize: fontSize + 4,
            fontWeight: '600',
            marginBottom: 12,
            color: colors.text,
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
            fontSize,
        },
        bigCardImage: {
            width: 100,
            height: 100,
            borderRadius: 20,
        },
        spacer: {
            height: 80,
            width: '100%',
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
        sectionTitle: {
            fontSize: fontSize + 2,
            fontWeight: '700',
            marginTop: 30,
            marginHorizontal: 16,
            color: colors.text,
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
                <Animatable.Text
                    animation="fadeInUp"
                    duration={600}
                    delay={100}
                    style={styles.sectionTitle}
                >
                    AI startbekwaam test
                </Animatable.Text>

                <Animatable.View
                    animation="fadeInUp"
                    duration={600}
                    delay={200}
                    style={styles.bigCard}
                >
                    <View style={styles.bigCardText}>
                        <Text style={styles.bigCardTitle}>
                            Doe de AI startbekwaam test.
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Quizhome', { quizId: 1 })}
                            style={styles.testButton}
                        >
                            <Text style={styles.testButtonText}>Ga naar de test</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={require('../assets/images/bgImages/robot.png')}
                        style={styles.bigCardImage}
                    />
                </Animatable.View>

                <Animatable.Text
                    animation="fadeInUp"
                    duration={600}
                    delay={300}
                    style={styles.sectionTitle}
                >
                    Nieuwe artikelen
                </Animatable.Text>

                <Animatable.View
                    animation="fadeInUp"
                    duration={600}
                    delay={400}
                >
                    <ArticleLimitedView limit={3}/>
                     <Text
                          style={{
                            textAlign: 'center',
                            padding: 16,
                            color: currentTheme === 'dark' ? '#fff' : '#000',
                            fontSize: 14,
                          }}
                        >
                          Je vind meer artikelen op de Artikelen pagina.
                        </Text>
                </Animatable.View>

                <View style={styles.articlesWrapper}>
                    <View style={{ height: 130, backgroundColor: colors.background }} />
                </View>
            </PageScrollView>

            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
        </SafeAreaView>
    );
};
