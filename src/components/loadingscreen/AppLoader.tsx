import React, { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/Store';
import { setLoading } from '../../redux/slices/LoadingSlice';
import SplashScreenOrApp from '../splashscreen/SplashScreenOrApp';

const AppLoader = () => {
    const loadingState = useAppSelector((state: RootState) => state.loading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Set loading state to true within the useEffect
        dispatch(setLoading(true));
        console.log('Loading state set to true');

        // Simulate a delay
        setTimeout(() => {
            // Set loading state to false after the delay
            dispatch(setLoading(false));
            console.log('Loading state set to false');
        }, 2000);
    }, [dispatch]);

    console.log('Current loading state:', loadingState);

    return loadingState ? <LoadingScreen /> : <SplashScreenOrApp />;
};

export default AppLoader;
