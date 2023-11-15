import React from 'react';

import { SettingCard } from '../../components/general/card/SettingCard';
import { PageView } from '../../components/general/views/PageView';
import { FontSwitcher } from '../../components/settings/FontSwitcher';
import { LanguageSwitcher } from '../../components/settings/LanguageSwitcher';
import { ThemeSwitcher } from '../../components/settings/ThemeSwitcher';
import { TutorialRedoButton } from '../../components/tutorial/TutorialRedoButton';

export const SettingsScreen = () => {
    return (
        <PageView title="Settings">
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
                icon="redo"
                title="Redo tutorial"
                testID="tutorial reset"
            >
                <TutorialRedoButton />
            </SettingCard>
        </PageView>
    );
};
