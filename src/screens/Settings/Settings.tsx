import * as React from 'react';

import { SettingButton } from '../../components/buttons/SettingButton';
import { PageView } from '../../components/general/PageView';
import { Routes } from '../../routes/routes';

export const SettingsScreen = () => {
    return (
        <PageView title="Settings">
            <SettingButton
                icon="globe"
                title="Language"
                description="Change the language that the app uses."
                screenName={Routes.LanguageSettings}
            />
            <SettingButton
                icon="cog"
                title="Theme switcher"
                description="Change the theme to dark or light mode"
                screenName={Routes.SettingsThemeSwitcher}
            />
        </PageView>
    );
};
