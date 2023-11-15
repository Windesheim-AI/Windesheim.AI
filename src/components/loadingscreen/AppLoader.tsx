import React from 'react';

import LoadingScreen from './LoadingScreen';
import { useAppSelector } from '../../redux/Hooks';

const AppLoader = () => {
    const loadingState = useAppSelector((state) => state.loading);

    return loadingState.isLoading ? <LoadingScreen /> : null;
};

export default AppLoader;
