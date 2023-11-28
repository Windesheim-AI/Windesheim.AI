import {
    themeActions,
    themeSlice,
    ThemeState,
} from '../../../../src/lib/redux/slices/ThemeSlice';

const { changeTheme, setHighContrastEnabled } = themeActions;

describe('themeSlice', () => {
    it('should have the correct initial state', () => {
        const initialState: ThemeState = themeSlice.reducer(undefined, {
            type: undefined,
        });
        expect(initialState).toEqual({
            theme: 'light',
            isHighContrastEnabled: false,
        });
    });

    it('should handle changing the theme', () => {
        const initialState: ThemeState = {
            theme: 'light',
            isHighContrastEnabled: false,
        };
        const nextState = themeSlice.reducer(
            initialState,
            changeTheme({ theme: 'dark' }),
        );

        expect(nextState.theme).toEqual('dark');
    });

    it('should handle changing the high contrast mode', () => {
        const initialState: ThemeState = {
            theme: 'light',
            isHighContrastEnabled: false,
        };
        const nextState = themeSlice.reducer(
            initialState,
            setHighContrastEnabled({ isEnabled: true }),
        );

        expect(nextState.isHighContrastEnabled).toBeTruthy();
    });
});
