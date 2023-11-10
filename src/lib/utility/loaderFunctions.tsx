import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/Hooks';
import { setLoading } from '../../redux/slices/LoadingSlice';

export function useStaticLoading(delay: number, canExecute = true) {
    const storeDispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);

    useEffect(() => {
        if (!canExecute) return;

        if (!isLoading && !isLoadingCompleted) {
            storeDispatch(setLoading(true));
            setIsLoading(true);
        }

        if (isLoadingCompleted) {
            return;
        }
        // Simulate a delay
        setTimeout(() => {
            storeDispatch(setLoading(false));
            setIsLoading(false);
            setIsLoadingCompleted(true);
        }, delay);
    }, [storeDispatch, isLoading, isLoadingCompleted, delay, canExecute]);
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
                        storeDispatch(setLoading(false));
                        setIsLoading(false);
                        setIsLoadingCompleted(true);
                        throw error;
                    });
            } else {
                // For synchronous callbacks, update loading state immediately
                storeDispatch(setLoading(false));
                setIsLoading(false);
                setIsLoadingCompleted(true);
            }
        } catch (error) {
            // Handle synchronous errors here
            storeDispatch(setLoading(false));
            setIsLoading(false);
            setIsLoadingCompleted(true);
            throw error;
        }
    }, [storeDispatch, isLoading, isLoadingCompleted, loadingState, callback]);
}
