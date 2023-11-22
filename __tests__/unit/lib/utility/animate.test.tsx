import { renderHook } from '@testing-library/react-native';

import { useAnimatedValue } from '../../../../src/lib/utility/animate';

// ... (import statements)

describe('useAnimatedValue', () => {
    test('should initialize with the provided initial value', () => {
        const initialValue = 0;
        const { result } = renderHook(() => useAnimatedValue(initialValue));
        const [animatedValue] = result.current;
        expect(animatedValue).toMatchObject({
            __getValue: expect.any(Function),
        });
    });

    // test('should animate to the provided value with the specified duration', async () => {
    //     const initialValue = 0;
    //     const { result } = renderHook(() => useAnimatedValue(initialValue));
    //     const [animatedValue, animateToValue] = result.current;

    //     void act(() => {
    //         animateToValue(100, 500); // Animate to 100 with a duration of 500ms
    //     });

    //     expect(animatedValue).toBe(initialValue); // Animation hasn't started yet

    //     await waitFor(() => {
    //         jest.advanceTimersByTime(500); // Advance timers by 500ms to simulate animation completion
    //     });

    //     expect(animatedValue).toBe(100); // Animation should be completed, and value should be 100
    // });

    // test('should not animate if animation state is disabled', () => {
    //     const initialValue = 0;
    //     const { result } = renderHook(() => useAnimatedValue(initialValue));
    //     const [animatedValue, animateToValue] = result.current;

    //     void act(() => {
    //         animateToValue(100, 500); // Animate to 100 with a duration of 500ms
    //     });

    //     expect(animatedValue).toBe(initialValue); // Animation hasn't started yet

    //     void act(() => {
    //         animateToValue(200, 500); // Animate to 200 with a duration of 500ms
    //     });

    //     expect(animatedValue).toBe(200); // Animation should not be performed, and value should be directly set to 200
    // });
});
