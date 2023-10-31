import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch, RootState } from '../../redux/Store';
import { setLoading } from '../../redux/slices/LoadingSlice';

export function useStaticLoading() {
    const storeDispatch = useAppDispatch();
    const loadingState = useAppSelector((state: RootState) => state.loading);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);

    useEffect(() => {
        if (!isLoading && !isLoadingCompleted) {
            storeDispatch(setLoading(true));
            setIsLoading(true);
        }

        if (isLoadingCompleted) {
            return;
        }
        
        const delay = 500;
        // Simulate a delay
        setTimeout(() => {
            storeDispatch(setLoading(false));
            setIsLoading(false);
            setIsLoadingCompleted(true);
        }, delay);
    }, [storeDispatch, isLoading, isLoadingCompleted, loadingState]);
}

export function useDynamicLoading(apiCall: (() => Promise<any>)) {
    const storeDispatch = useAppDispatch();
    const loadingState = useAppSelector((state: RootState) => state.loading);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);

    useEffect(() => {
        if (!isLoading && !isLoadingCompleted) {
            storeDispatch(setLoading(true));
            setIsLoading(true);
        }

        if (isLoadingCompleted) {
            return;
        }

        // Use the provided API call to fetch the dynamic delay
        apiCall()
            .then((delay) => {
                // Simulate a delay
                setTimeout(() => {
                    storeDispatch(setLoading(false));
                    setIsLoading(false);
                    setIsLoadingCompleted(true);
                }, delay);
            })
            .catch((error) => {
                console.error('Error fetching delay:', error);
                // In case of an error, set loading to false to prevent the loading screen from persisting
                storeDispatch(setLoading(false));
            });
    }, [storeDispatch, isLoading, isLoadingCompleted, loadingState]);
}
