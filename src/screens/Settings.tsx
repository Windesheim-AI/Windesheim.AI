import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, ViewStyle, Image, View } from 'react-native';

import arrowLeft from '../assets/images/Icon/go_back_arrow.png';
import { EditBackgroundInformationButton } from '../components/BackgroundCollect/EditBackgroundInformationButton';
import { SettingCard } from '../components/general/card/SettingCard';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { AnimationToggle } from '../components/settings/AnimationToggle';
import { FontSwitcher } from '../components/settings/FontSwitcher';
import { HighContrastSwitcher } from '../components/settings/HighContrastSwitcher';
import { LanguageSwitcher } from '../components/settings/LanguageSwitcher';
import { ThemeSwitcher } from '../components/settings/ThemeSwitcher';
import { TutorialRedoButton } from '../components/tutorial/TutorialRedoButton';
import { useCurrentTheme } from '../lib/constants/Colors';

export const SettingsScreen = () => {
    const navigation = useNavigation();
    const currentTheme = useCurrentTheme();

    const goBack = () => {
        navigation.goBack();
    };

    const buttonStyle: ViewStyle = {
        position: 'absolute',
        top: 0,
        right: 10,
    };
    const iconStyle = {
        width: 37,
        height: 37,
        tintColor: currentTheme === 'dark' ? '#FFFFFF' : 'black',
    };
    const titleSpacer = {
        height: 10,
    };
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    return (
        <PageScrollView title="SETTINGS">
            <View style={titleSpacer} />
            <TouchableOpacity onPress={goBack} style={buttonStyle}>
                <Image source={arrowLeft} style={iconStyle} />
            </TouchableOpacity>
            <SettingCard
                icon="moon"
                title="Enable dark mode"
                testID="Theme switcher"
            >
                <ThemeSwitcher />
            </SettingCard>

            <SettingCard
                icon="language"
                title="Language"
                testID="Language switcher"
            >
                <LanguageSwitcher />
            </SettingCard>

            <SettingCard icon="font" title="Font" testID="font switcher">
                <FontSwitcher />
            </SettingCard>

            <SettingCard
                icon="hand-sparkles"
                title="Animations"
                testID="Animation Toggle"
            >
                <AnimationToggle />
            </SettingCard>

            <SettingCard
                icon="eye"
                title="Enable high contrast"
                testID="High contrast mode switcher"
            >
                <HighContrastSwitcher />
            </SettingCard>

            <SettingCard icon="redo" title="Tutorial" testID="tutorial reset">
                <TutorialRedoButton />
            </SettingCard>

            <SettingCard
                icon="user-edit"
                title="Background"
                testID="Background"
            >
                <EditBackgroundInformationButton />
            </SettingCard>
        </PageScrollView>
    );
};
