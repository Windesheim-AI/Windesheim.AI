import * as React from 'react';

import { SettingButton } from '../../components/buttons/SettingButton';
import { PageView } from '../../components/general/PageView';

export const SettingsScreen = () => {
    return (
        <PageView title="Settings">
            <SettingButton
                icon="cog"
                title="Theme switcher"
                description="Change the theme to dark or light mode"
                screenName="WTR"
            />
        </PageView>
    );
};
