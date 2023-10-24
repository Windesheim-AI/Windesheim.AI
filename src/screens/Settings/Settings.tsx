import * as React from 'react';

import { SettingCard } from '../../components/card/SettingCard';
import { PageView } from '../../components/general/PageView';
import { ThemeSwitcher } from '../../components/settings/ThemeSwitcher';

export const SettingsScreen = () => {
    return (
        <PageView title="Settings">
            <SettingButton
                icon="globe"
                title="Language"
                description="Change the language that the app uses."
                screenName={Routes.LanguageSettings}
            />
            <SettingCard icon="cog" title="Enable dark mode">
                <ThemeSwitcher />
            </SettingCard>
        </PageView>
    );
};
