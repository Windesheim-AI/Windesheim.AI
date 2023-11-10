import { useRoute } from '@react-navigation/native';
import React from 'react';
import { WTRContentDisplay } from '../../components/WTR/WTRContentDisplay';

export type WTRSContentScreenProps = {
    page: string;
};

export const WTRContentScreen = () => {
    const route = useRoute();
    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();

    return <WTRContentDisplay page={page} />;
};
