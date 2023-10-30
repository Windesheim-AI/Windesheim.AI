import React, { useEffect } from 'react';

import LoadingScreen from './LoadingScreen';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/Store';
import { setLoading } from '../../redux/slices/LoadingSlice';
import SplashScreenOrApp from '../splashscreen/SplashScreenOrApp';

const AppLoader = () => {
    const loadingState = useAppSelector((state: RootState) => state.loading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (loadingState) {
            console.log('Loading state set to true');
            dispatch(setLoading(false));
        }
        // Simulate a delay
        setTimeout(() => {
            console.log('Loading state set to false');
        }, 2000);
    }, [dispatch, loadingState]);

    console.log('Current loading state:', loadingState);

    return loadingState ? <LoadingScreen /> : <SplashScreenOrApp />;
};

export default AppLoader;
