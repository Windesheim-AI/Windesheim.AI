import React from 'react';

import LoadingScreen from '../loadingscreen/LoadingScreen';

export type DataWrapperProps = {
    error?: Error | undefined;
    isLoading?: boolean;
    children: React.ReactNode;
};

// This component is used to wrap data that is being fetched from the backend.
// It will show a loading screen while the data is being fetched.
export function DataWrapper({ error, isLoading, children }: DataWrapperProps) {
    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        throw error;
    }

    return children;
}
