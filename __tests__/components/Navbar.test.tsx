/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { act } from 'react-dom/test-utils'; // Import the act function
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'; // Import the renderer
import configureStore from 'redux-mock-store'; // Import the store configuration utility

import { NavBar } from '../../src/components/Navbar';

const mockStore = configureStore([]);

test('NavBar renders with the correct text', async () => {
    let component;

    const store = mockStore({
        navigation: {
            showNavBar: true,
        },
    });

    act(() => {
        component = renderer.create(
            <Provider store={store}>
                <NavBar />
            </Provider>,
        );
    });

    await new Promise((resolve) => setTimeout(resolve, 300)); // Adjust the timeout as needed

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

test('NavBar not visible', async () => {
    let component;

    const store = mockStore({
        navigation: {
            showNavBar: false,
        },
    });

    act(() => {
        component = renderer.create(
            <Provider store={store}>
                <NavBar />
            </Provider>,
        );
    });

    await new Promise((resolve) => setTimeout(resolve, 300)); // Adjust the timeout as needed

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});
