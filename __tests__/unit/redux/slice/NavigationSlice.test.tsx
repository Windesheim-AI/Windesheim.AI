import {
    navigationActions,
    NavigationSlice,
    navigationSlice,
} from '../../../../src/lib/redux/slices/NavigationSlice';
import { DefaultRoute } from '../../../../src/routes/routes';

const { showNavBar, updateSelectedNavBarRoute } = navigationActions;

describe('navigationSlice', () => {
    it('should have the correct initial state', () => {
        const initialState = navigationSlice.reducer(undefined, {
            type: undefined,
        });
        expect(initialState).toEqual({
            showNavBar: true,
            selectedNavBarRoute: DefaultRoute,
        });
    });

    it('should handle showing the navigation bar', () => {
        const initialState: NavigationSlice = {
            showNavBar: true,
            selectedNavBarRoute: DefaultRoute,
        };
        const nextState = navigationSlice.reducer(
            initialState,
            showNavBar(false),
        );

        expect(nextState.showNavBar).toEqual(false);
        expect(nextState.selectedNavBarRoute).toEqual(DefaultRoute);
    });

    it('should handle changing the selected navBar route', () => {
        const initialState: NavigationSlice = {
            showNavBar: true,
            selectedNavBarRoute: DefaultRoute,
        };
        const nextState = navigationSlice.reducer(
            initialState,
            updateSelectedNavBarRoute('About'),
        );

        expect(nextState.showNavBar).toEqual(true);
        expect(nextState.selectedNavBarRoute).toEqual('About');
    });
});
