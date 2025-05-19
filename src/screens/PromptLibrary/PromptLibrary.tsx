import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

import { useAppSelector } from '../../lib/redux/Hooks';
import { TitleSimple } from '../../components/general/text/TitleSimple';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PromptsOverview } from '../../components/promptLibary/PromptsOverview';
import { PromptsTutorial } from '../../components/promptsTutorial/PromptsTutorial';
import BackgroundCollectForm from '../UserBackground/BackgroundCollectForm';
import { NavBar } from '../../components/navigation/Navbar';
import { SettingsButton } from '../../components/general/buttons/SettingButton';
import { useColorConfig, useCurrentTheme } from '../../lib/constants/Colors';

const screenWidth = Dimensions.get('window').width;

export function PromptLibrary() {
    const isFirstTimeUser = useAppSelector(
        (state) => state.backgroundInformation.isFirstTimeUser,
    );
    const fontSize = useAppSelector((state) => state.fontSize.fontSize);
    const colors = useColorConfig();
    const currentTheme = useCurrentTheme();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : '#000000';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollContent: {
            paddingBottom: 100,
            paddingTop: 10,
        },
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
            fontSize: fontSize,
            fontWeight: 'bold',
            marginLeft: 10,
            color: logoTextColor,
        },
        titleSection: {
            marginBottom: 20,
        },
        titleText: {
            fontSize: fontSize + 4,
            fontWeight: 'bold',
            color: colors.text,
        },
        explanationText: {
            fontSize: fontSize,
            color: colors.text,
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
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/Icon/favicon.png')}
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
                <Animatable.View animation="fadeInUp" delay={100} duration={600} style={styles.titleSection}>
                    <Text style={styles.titleText}>PROMPT LIBRARY</Text>
                    <Text style={styles.explanationText}>
                        Hier vind je een verzameling prompts die je kan gebruiken om makkelijk met AI tools overweg te gaan.
                    </Text>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={200} duration={600}>
                    <PromptsOverview />
                </Animatable.View>

                {isFirstTimeUser ? (
                    <Animatable.View animation="fadeInUp" delay={300} duration={600}>
                        <BackgroundCollectForm />
                    </Animatable.View>
                ) : null}

                {!isFirstTimeUser ? (
                    <Animatable.View animation="fadeInUp" delay={300} duration={600}>
                        {/* <PromptsTutorial /> */}
                                                <BackgroundCollectForm />
                    </Animatable.View>
                ) : null}
            </PageScrollView>

            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
        </SafeAreaView>
    );
}
