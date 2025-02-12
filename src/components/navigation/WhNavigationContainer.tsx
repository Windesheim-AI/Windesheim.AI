import React, { useEffect, useRef } from 'react';
import { NavigationContainer as BaseNavigationContainer } from '@react-navigation/native';
import type { NavigationState } from '@react-navigation/routers';

import { useAppDispatch } from '../../lib/redux/Hooks';
import { navigationActions } from '../../lib/redux/slices/NavigationSlice';
import { navigationBarLinks } from '../../routes/navigation';
import { RouteLinking } from '../../routes/routeLinking';

type Props = {
  children: React.ReactNode;
};

export default function WhNavigationContainer({ children }: Props) {
  const storeDispatcher = useAppDispatch();

  const isNavigatorReady = useRef(false); // Track navigator readiness

  useEffect(() => {
    // Set isNavigatorReady to true once the navigator is mounted
    isNavigatorReady.current = true;
  }, []);

  const onStateChange = (state: NavigationState | undefined) => {
    if (!state || !isNavigatorReady.current) return; // Wait for the navigator to be ready

    const currentRoute = state.routes[state.index].name;

    if (!currentRoute) return;

    const isNavBarRoute = navigationBarLinks.some((link) => link.route === currentRoute);

    if (!isNavBarRoute) return;

    // Dispatch update only if the route is valid and the navigator is ready
    storeDispatcher(navigationActions.updateSelectedNavBarRoute(currentRoute));
  };

  return (
    <BaseNavigationContainer linking={RouteLinking} onStateChange={onStateChange}>
      {children}
    </BaseNavigationContainer>
  );
}
