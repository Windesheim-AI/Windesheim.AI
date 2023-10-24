import {
    themeActions,
    themeSlice,
    ThemeState,
} from '../../../../src/redux/slices/ThemeSlice';

const { changeTheme } = themeActions;

describe('themeSlice', () => {
    it('should have the correct initial state', () => {
        const initialState: ThemeState = themeSlice.reducer(undefined, {
            type: undefined,
        });
        expect(initialState).toEqual({ theme: 'light' });
    });

    it('should handle changing the theme', () => {
        const initialState: ThemeState = { theme: 'light' };
        const nextState = themeSlice.reducer(
            initialState,
            changeTheme({ theme: 'dark' }),
        );

        expect(nextState.theme).toEqual('dark');
    });
});
