import {
    navigationActions,
    navigationSlice,
} from '../../../../src/redux/slices/NavigationSlice';

const { showNavBar } = navigationActions;

describe('navigationSlice', () => {
    it('should have the correct initial state', () => {
        const initialState = navigationSlice.reducer(undefined, {
            type: undefined,
        });
        expect(initialState).toEqual({ showNavBar: true });
    });

    it('should handle showing the navigation bar', () => {
        const initialState = { showNavBar: true };
        const nextState = navigationSlice.reducer(
            initialState,
            showNavBar(false),
        );

        expect(nextState.showNavBar).toEqual(false);
    });
});
