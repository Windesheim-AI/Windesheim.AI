import * as React from 'react';
import { useEffect, useState } from 'react';

import { SettingButton } from '../../components/buttons/SettingButton';
import { SettingCard } from '../../components/card/SettingCard';
import { PageView } from '../../components/general/PageView';
import { LanguageSwitcher } from '../../components/settings/LanguageSwitcher';
import { ThemeSwitcher } from '../../components/settings/ThemeSwitcher';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/Store';
import { setLoading } from '../../redux/slices/LoadingSlice';
import { Routes } from '../../routes/routes';

export const SettingsScreen = () => {
    const storeDispatch = useAppDispatch();
    const loadingState = useAppSelector((state: RootState) => state.loading);
    const [isLoading, setIsLoading] = useState(false);

    const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);
    useEffect(() => {
        if (!isLoading && !isLoadingCompleted) {
            storeDispatch(setLoading(true));
            setIsLoading(true);
        }

        if (isLoadingCompleted) {
            return;
        }

        // Simulate a delay
        setTimeout(() => {
            storeDispatch(setLoading(false));
            setIsLoading(false);
            setIsLoadingCompleted(true);
        }, 500);
    }, [storeDispatch, isLoading, isLoadingCompleted, loadingState]);

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
