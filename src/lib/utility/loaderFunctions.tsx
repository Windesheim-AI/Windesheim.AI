import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch, RootState } from '../../redux/Hooks';
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

export function useDynamicLoading<T>(callback: () => T) {
    const storeDispatch = useAppDispatch();
    const loadingState = useAppSelector((state) => state.loading);

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

        try {
            const result = callback(); // Execute the provided callback function

            if (result instanceof Promise) {
                // If the callback returns a promise, wait for it to resolve
                result
                    .then(() => {
                        storeDispatch(setLoading(false));
                        setIsLoading(false);
                        setIsLoadingCompleted(true);
                    })
                    .catch((error) => {
                        console.error(error);
                        storeDispatch(setLoading(false));
                        setIsLoading(false);
                        setIsLoadingCompleted(true);
                    });
            } else {
                // For synchronous callbacks, update loading state immediately
                storeDispatch(setLoading(false));
                setIsLoading(false);
                setIsLoadingCompleted(true);
            }
        } catch (error) {
            // Handle synchronous errors here
            console.error(error);
            storeDispatch(setLoading(false));
            setIsLoading(false);
            setIsLoadingCompleted(true);
        }
    }, [storeDispatch, isLoading, isLoadingCompleted, loadingState, callback]);
}
