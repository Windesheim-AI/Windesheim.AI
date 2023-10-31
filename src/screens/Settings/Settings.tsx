import * as React from 'react';

import { SettingCard } from '../../components/card/SettingCard';
import { PageView } from '../../components/general/PageView';
import { FontSwitcher } from '../../components/settings/FontSwitcher';
import { LanguageSwitcher } from '../../components/settings/LanguageSwitcher';
import { ThemeSwitcher } from '../../components/settings/ThemeSwitcher';
import { useStaticLoading } from '../../lib/utility/loaderFunctions';
export const SettingsScreen = () => {
    useStaticLoading();
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
        </PageView>
    );
};
