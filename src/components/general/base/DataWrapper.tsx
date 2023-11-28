import React, { ReactNode } from 'react';

import { useFonts } from '../../../constants/Fonts';
import LoadingScreen from '../../loadingscreen/LoadingScreen';
import { TextTranslated } from '../text/TextTranslated';
import { PageView } from '../views/PageView';

export type Props = {
    error?: Error | undefined;
    isLoading?: boolean;
    children: ReactNode;
};

// This component is used to wrap data that is being fetched from the backend.
// It will show a loading screen while the data is being fetched.
export function DataWrapper({ error, isLoading, children }: Props) {
    const fonts = useFonts();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <PageView>
                <TextTranslated
                    style={fonts.h1}
                    text="An error occurred while loading the data"
                />
            </PageView>
        );
    }

    return children;
}
