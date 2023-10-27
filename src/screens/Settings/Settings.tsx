import * as React from 'react';

import { SettingButton } from '../../components/buttons/SettingButton';
import { SettingCard } from '../../components/card/SettingCard';
import { PageView } from '../../components/general/PageView';
import { LanguageSwitcher } from '../../components/settings/LanguageSwitcher';
import { ThemeSwitcher } from '../../components/settings/ThemeSwitcher';
import { Routes } from '../../routes/routes';

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

            <SettingButton
                icon="server"
                title="Test"
                description="This is a test setting."
                screenName={Routes.TestSettings}
            />
        </PageView>
    );
};
