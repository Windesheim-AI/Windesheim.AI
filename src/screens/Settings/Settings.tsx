import * as React from 'react';

import { SettingCard } from '../../components/card/SettingCard';
import { PageView } from '../../components/general/PageView';
import { ThemeSwitcher } from '../../components/settings/ThemeSwitcher';

export const SettingsScreen = () => {
    return (
        <PageView title="Settings">
            <SettingCard icon="cog" title="Enable dark mode">
                <ThemeSwitcher />
            </SettingCard>
        </PageView>
    );
};
