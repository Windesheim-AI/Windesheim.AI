import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { NavBar } from '../../../src/components/navigation/Navbar';

jest.useFakeTimers();

jest.mock('@expo-google-fonts/inter', () => 'useFonts');

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

const mockStore = configureStore([]);

describe('NavBar Component', () => {
    let store = mockStore({});

    beforeEach(() => {
        store = mockStore({
            navigation: {
                showNavBar: true,
            },
            theme: {
                theme: 'light',
            },
        });
    });

    it('renders with showNavBar=true', () => {
        let component;

        act(() => {
            component = renderer.create(
                <Provider store={store}>
                    <NavBar />
                </Provider>,
            );
        });
        // @ts-ignore
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with showNavBar=false', () => {
        store = mockStore({
            navigation: {
                showNavBar: false,
            },
            theme: {
                theme: 'light',
            },
        });

        let component;

        act(() => {
            component = renderer.create(
                <Provider store={store}>
                    <NavBar />
                </Provider>,
            );
        });
        // @ts-ignore
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
