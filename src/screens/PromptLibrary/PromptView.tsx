import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { Chip } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TryButton } from '../../components/general/buttons/TryButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
import {
    useColorConfig,
    useColorStateConfig,
    useCurrentTheme,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import useSinglePrompt from '../../lib/repositories/promptLibrary/useSinglePrompt';
import { openBrowserPopup } from '../../lib/utility/browserPopup';
import { getEnvValue } from '../../lib/utility/env/env';
import { EnvOptions } from '../../lib/utility/env/env.values';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { removeSlashes } from '../../lib/utility/stringutils';
import { Routes } from '../../routes/routes';
import { Card } from '../../components/general/base/Card';
import { NavBar } from '../../components/navigation/Navbar';
import { SettingsButton } from '../../components/general/buttons/SettingButton';

export type PromptPageProps = {
    promptId: string;
};

const screenWidth = Dimensions.get('window').width;

export function PromptView() {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigation = useNavigation();
    const currentTheme = useCurrentTheme();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';
    const wordPressContentUrl = getEnvValue(EnvOptions.WordPressContentURL);
    const route = useRoute();
    const params = route.params as PromptPageProps;
    const promptId = params.promptId;

    const { data, isLoading, error } = useSinglePrompt(promptId);
    const prompt = data;

    const goBackToLibrary = () => {
        HapticFeedback(HapticForces.Light);
        navigation.navigate(Routes.PromptLibrary);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
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
            color: logoTextColor,
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
            paddingTop: 20,
        },
        title: {
            ...fonts.h1,
            textAlign: 'left',
            marginHorizontal: 16,
            marginBottom: 12,
            color: colors.text,
        },
        subtitle: {
            ...fonts.h2,
            marginBottom: 10,
        },
        description: {
            ...fonts.description,
            textAlign: 'left',
            marginTop: 6,
            color: colors.text,
        },
        tagContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 16,
            marginBottom: 20,
        },
        chip: {
            marginRight: 6,
            marginBottom: 8,
        },
    });

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error || !prompt?.title) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerSide}>
                        <GoBackButton onPress={goBackToLibrary} />
                    </View>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/Icon/favicon.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.logoText}>WINDESHEIM.AI</Text>
                    </View>
                    <View style={styles.headerSide}>
                        <SettingsButton />
                    </View>
                </View>
                <PageScrollView>
                    <TextTranslated style={styles.title} text="No prompt found!" />
                    <GoBackButton buttonText="Back" onPress={goBackToLibrary} />
                </PageScrollView>
                <View style={styles.navBarContainer}>
                    <NavBar />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.headerSide}>
                    <GoBackButton onPress={goBackToLibrary} />
                </View>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/Icon/favicon.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.logoText}>WINDESHEIM.AI</Text>
                </View>
                <View style={styles.headerSide}>
                    <SettingsButton />
                </View>
            </View>

            {/* Main content */}
            <PageScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>{removeSlashes(prompt.title)}</Text>

                <View style={styles.tagContainer}>
                    <Chip
                        style={[styles.chip, { backgroundColor: colors.toolTag }]}
                        textStyle={{ color: colors.tagText, ...fonts.chipText }}
                        icon="wrench"
                        mode="outlined"
                    >
                        {prompt.tool}
                    </Chip>
                    <Chip
                        style={[styles.chip, { backgroundColor: colors.sectorTag }]}
                        textStyle={{ color: colors.tagText, ...fonts.chipText }}
                        icon="briefcase"
                        mode="outlined"
                    >
                        {prompt.sector}
                    </Chip>
                    <Chip
                        style={[styles.chip, { backgroundColor: colors.patternTag }]}
                        textStyle={{ color: colors.tagText, ...fonts.chipText }}
                        icon="clipboard"
                        mode="outlined"
                    >
                        {prompt.promptPattern}
                    </Chip>
                </View>

                <Card style={colorStateConfig.highContrastBorder}>
                    <TextTranslated style={styles.subtitle} text="Description" />
                    <Text style={styles.description}>
                        {removeSlashes(prompt.description)}
                    </Text>
                </Card>

                <Card style={colorStateConfig.highContrastBorder}>
                    <TextTranslated style={styles.subtitle} text="Prompt" />
                    <Text style={styles.description}>
                        {removeSlashes(prompt.prompt)}
                    </Text>
                </Card>

                <View style={{ marginTop: 20 }}>
                    <TryButton
                        buttonText="Try it yourself!"
                        onPress={() => {
                            openBrowserPopup(
                                `${wordPressContentUrl}/prompts?id=${prompt.id}`,
                            );
                            HapticFeedback(HapticForces.Light);
                        }}
                        textColorScheme={
                            colorStateConfig.theme === 'dark' ? 'white' : 'black'
                        }
                    />
                </View>

                <View style={{ height: 140 }} />
            </PageScrollView>

            {/* Bottom Nav */}
            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
        </SafeAreaView>
    );
}
