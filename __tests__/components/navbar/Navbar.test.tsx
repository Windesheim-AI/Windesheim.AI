import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { NavBar } from '../../../src/components/navigation/Navbar';

jest.useFakeTimers();

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
        const component = renderer.create(
            <Provider store={store}>
                <NavBar />
            </Provider>,
        );
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
        const component = renderer.create(
            <Provider store={store}>
                <NavBar />
            </Provider>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
