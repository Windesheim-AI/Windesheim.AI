import { act, renderHook } from '@testing-library/react-native';

import {
    useDynamicLoading,
    useStaticLoading,
} from '../../src/lib/utility/loaderFunctions'; // Import your module
import { useAppDispatch, useAppSelector } from '../../src/redux/Hooks'; // Import your module
import { setLoading } from '../../src/redux/slices/LoadingSlice';

// Mock the setLoading Redux action
const setLoadingMock = jest.fn();
jest.useFakeTimers(); // Mock timers
// Mock dependencies
jest.mock('../../src/redux/Hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));
// Provide the implementation for useAppDispatch
(useAppDispatch as jest.Mock).mockReturnValue(setLoadingMock);

describe('useStaticLoading', () => {
    it('should set loading to true and then to false after a delay', () => {
        // Mock the isLoading value in the Redux state
        (useAppSelector as jest.Mock).mockReturnValue(false);

        // Mock the setLoading action
        const dispatchMock = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);

        // Call the useStaticLoading hook to ensure it's invoked
        renderHook(() => useStaticLoading());

        // Verify that the setLoading action has been dispatched with the expected payloads
        expect(dispatchMock).toHaveBeenCalledWith({
            type: setLoading.type,
            payload: true,
        });

        // Advance the timer by a certain amount (e.g., 3000ms)
        void act(() => {
            jest.advanceTimersByTime(3000);
        });

        // Verify that the isLoading state is set to false
        const state = useAppSelector((state) => state.loading.isLoading);
        expect(state).toBe(false);
    });
});

describe('useDynamicLoading', () => {
    it('should set loading to true and then to false after an asynchronous callback', async () => {
        // Mock the isLoading value in the Redux state
        (useAppSelector as jest.Mock).mockReturnValue(false);
        // Mock the setLoading action
        const dispatchMock = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
        // Define an asynchronous callback function
        const asyncCallback = async () => {
            // Simulate an asynchronous operation (e.g., fetching data)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        };
        // Call the useDynamicLoading hook with the asynchronous callback
        renderHook(() => useDynamicLoading(asyncCallback));
        // Verify that the setLoading action has been dispatched with the expected payloads
        expect(dispatchMock).toHaveBeenCalledWith({
            type: setLoading.type,
            payload: true,
        });
        // Advance the timer to simulate the asynchronous operation completion
        jest.advanceTimersByTime(1000);
        // Verify that the isLoading state is set to false after the asynchronous callback
        const state = useAppSelector((state) => state.loading.isLoading);
        expect(state).toBe(false);
    });
});
