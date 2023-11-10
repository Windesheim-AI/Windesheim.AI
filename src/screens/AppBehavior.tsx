import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/Hooks';
import { navigationActions } from '../redux/slices/NavigationSlice';

type AppProvidersProps = {
    children: React.ReactNode;
};

export default function AppBehavior({ children }: AppProvidersProps) {
    const storeDispatcher = useAppDispatch();
    const navigationState = useAppSelector((state) => state.navigation);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            if (navigationState.showNavBar) {
                return;
            }

            storeDispatcher(navigationActions.showNavBar(true));
        });

        return () => {
            unsubscribe();
        };
    }, [navigation, navigationState.showNavBar, storeDispatcher]);

    return children;
}
