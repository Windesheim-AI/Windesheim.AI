/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { CustomScrollView } from '../../src/components/CustomScrollView';

const mockStore = configureStore([]);

describe('CustomScrollView component', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let store;

    beforeEach(() => {
        store = mockStore({
            navigation: {
                showNavBar: true,
            },
        });
    });

    it('renders children correctly', () => {
        const { getByText } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Provider store={store}>
                <CustomScrollView>
                    <Text>Test Child</Text>
                </CustomScrollView>
            </Provider>,
        );

        expect(getByText('Test Child')).toBeTruthy();
    });

    it('toggles the navigation bar when scrolling down', () => {
        const { getByTestId } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Provider store={store}>
                <CustomScrollView>
                    <Text>Scrollable Content</Text>
                </CustomScrollView>
            </Provider>,
        );

        const scrollView = getByTestId('custom-scroll-view');
        fireEvent.scroll(scrollView, {
            nativeEvent: {
                contentOffset: { y: 100 },
                contentSize: { height: 1000 },
            },
        });

        // Verify that the navigation bar is hidden (dispatch action "navigation/showNavBar" with payload false)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'navigation/showNavBar',
            payload: false,
        });
    });

    it('toggles the navigation bar when scrolling up', () => {
        const { getByTestId } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Provider store={store}>
                <CustomScrollView>
                    <Text>Scrollable Content</Text>
                </CustomScrollView>
            </Provider>,
        );

        const scrollView = getByTestId('custom-scroll-view');
        fireEvent.scroll(scrollView, {
            nativeEvent: {
                contentOffset: { y: 100 },
                contentSize: { height: 1000 },
            },
        });

        // Verify that the navigation bar is shown (dispatch action "navigation/showNavBar" with payload true)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'navigation/showNavBar',
            payload: true,
        });
    });
});
