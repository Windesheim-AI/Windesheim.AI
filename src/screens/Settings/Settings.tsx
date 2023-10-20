import * as React from 'react';

import { SettingButton } from '../../components/buttons/SettingButton';
import { PageView } from '../../components/general/PageView';
import { routes } from '../../routes/routes';

export const SettingsScreen = () => {
    return (
        <PageView title="Settings">
            <SettingButton
                icon="cog"
                title="Theme switcher"
                description="Change the theme to dark or light mode"
                screenName={routes.WTR}
            />
        </PageView>
    );
};
