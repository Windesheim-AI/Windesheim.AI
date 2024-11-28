import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';

import { NavBar } from '../../../src/components/navigation/Navbar';

jest.useFakeTimers();

const mockStore = (initialState: any) =>
    configureStore({ reducer: () => initialState });

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
        const { toJSON } = render(
            <Provider store={store}>
                <NavBar />
            </Provider>,
        );
        expect(toJSON()).toMatchSnapshot();
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

        const { toJSON } = render(
            <Provider store={store}>
                <NavBar />
            </Provider>,
        );
        expect(toJSON()).toMatchSnapshot();
    });
});
