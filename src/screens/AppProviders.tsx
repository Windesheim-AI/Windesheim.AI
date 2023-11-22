import React from 'react';

import AppBehavior from './AppBehavior';

type AppProvidersProps = {
    children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
    return <AppBehavior>{children}</AppBehavior>;
}
