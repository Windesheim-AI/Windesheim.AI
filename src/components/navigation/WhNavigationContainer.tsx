import { NavigationContainer as BaseNavigationContainer } from '@react-navigation/native';
import type { NavigationState } from '@react-navigation/routers';
import React from 'react';

import { useAppDispatch } from '../../lib/redux/Hooks';
import { navigationActions } from '../../lib/redux/slices/NavigationSlice';
import { navigationBarLinks } from '../../routes/navigation';
import { RouteLinking } from '../../routes/routeLinking';

type Props = {
    children: React.ReactNode;
};

export default function WhNavigationContainer({ children }: Props) {
    const storeDispatcher = useAppDispatch();

    function onStateChange(state: NavigationState | undefined) {
        const currentRoute = state?.routes[state.index].name;
        if (!currentRoute) return;

        const isNavBarRoute =
            navigationBarLinks.filter((link) => link.route === currentRoute)
                .length > 0;
        if (!isNavBarRoute) return;

        storeDispatcher(
            navigationActions.updateSelectedNavBarRoute(currentRoute),
        );
    }

    return (
        <BaseNavigationContainer
            linking={RouteLinking}
            onStateChange={onStateChange}
        >
            {children}
        </BaseNavigationContainer>
    );
}
