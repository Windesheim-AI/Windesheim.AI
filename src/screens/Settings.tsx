import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

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
        top: 20,
        right: 20,
    };

    return (
        <PageScrollView title="SETTINGS">
            <TouchableOpacity
                onPress={goBack}
                style={buttonStyle}
                testID="settings-button"
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    size={30}
                    color={currentTheme === 'dark' ? '#FFFFFF' : 'black'}
                />
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
