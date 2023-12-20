import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../lib/redux/Hooks';
import { navigationActions } from '../lib/redux/slices/NavigationSlice';
import { useNavigation } from '../lib/utility/navigation/useNavigation';

type AppProvidersProps = {
    children: React.ReactNode;
};

export default function AppBehavior({ children }: AppProvidersProps) {
    const storeDispatcher = useAppDispatch();
    const navigationState = useAppSelector((state) => state.navigation);
    const isFirstTimeUser = useAppSelector(
        (state) => state.backgroundInformation,
    ).isFirstTimeUser;
    const navigation = useNavigation();

    useEffect(() => {
        const stateEventListener = navigation.addEventListener('state', () => {
            if (navigationState.showNavBar || isFirstTimeUser) {
                return;
            }

            storeDispatcher(navigationActions.showNavBar(true));
        });

        return () => {
            stateEventListener();
        };
    }, [
        navigation,
        navigationState.showNavBar,
        storeDispatcher,
        isFirstTimeUser,
    ]);

    return children;
}
