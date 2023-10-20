import * as React from 'react';

import { SettingButton } from '../../components/buttons/SettingButton';
import { PageView } from '../../components/general/PageView';

export const SettingsScreen = () => {
    return (
        <PageView title="Settings">
            <SettingButton
                icon="chart-bar"
                title="Data"
                description="Your score, progress, timeline etc.."
                screenName="Data"
            />
            <SettingButton
                icon="globe"
                title="Language"
                description="Change the language that the app uses."
                screenName="Language"
            />
            <SettingButton
                icon="cog"
                title="Theme switcher"
                description="Change the theme to dark or light mode"
                screenName="WTR"
            />

            <SettingButton
                icon="volume-up"
                title="Notifications"
                description="Change the notification settings"
                screenName="WTR"
            />

            <SettingButton
                icon="exclamation"
                title="Information"
                description="Change the theme to dark or light mode"
                screenName="WTR"
            />
            <SettingButton
                icon="bug"
                title="Report"
                description="Change the theme to dark or light mode"
                screenName="WTR"
            />
        </PageView>
    );
};
