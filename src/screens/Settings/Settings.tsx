import React from 'react';

import { EditBackgroundInformationButton } from '../../components/BackgroundCollect/EditBackgroundInformationButton';
import { SettingCard } from '../../components/general/card/SettingCard';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { AnimationToggle } from '../../components/settings/AnimationToggle';
import { FontSwitcher } from '../../components/settings/FontSwitcher';
import { HighContrastSwitcher } from '../../components/settings/HighContrastSwitcher';
import { LanguageSwitcher } from '../../components/settings/LanguageSwitcher';
import { ThemeSwitcher } from '../../components/settings/ThemeSwitcher';
import { TutorialRedoButton } from '../../components/tutorial/TutorialRedoButton';

export const SettingsScreen = () => {
    return (
        <PageScrollView title="Settings">
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
