// src/screens/PromptLibrary.tsx
import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        titleSection: {
            marginBottom: 20,
        },
        titleText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: 'black', // Changed to black
        },
        explanationText: {
            fontSize: 16,
            color: currentTheme === 'dark' ? '#FFFFFF' : '#333333',
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
                <View style={styles.titleSection}>
                    <Text style={styles.titleText}>PROMPT LIBRARY</Text>
                    <Text style={styles.explanationText}>
                        Here you'll find a collection of prompts that you can use to easily navigate AI tools. You can filter by tools and sector to find the right prompt you need.
                    </Text>
                </View>

                <PromptsOverview />

                {isFirstTimeUser ? (
                    <BackgroundCollectForm />
                ) : null}

                {!isFirstTimeUser ? (
                    <PromptsTutorial />
                ) : null}
            </PageScrollView>

            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
        </SafeAreaView>
    );
}
