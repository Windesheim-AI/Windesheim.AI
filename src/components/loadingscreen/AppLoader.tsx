import React from 'react';

import LoadingScreen from './LoadingScreen';
import { RootState, useAppSelector } from '../../redux/Store';

const AppLoader = () => {
    const loadingState = useAppSelector((state: RootState) => state.loading);

    return loadingState.isLoading ? <LoadingScreen /> : null;
};

export default AppLoader;
