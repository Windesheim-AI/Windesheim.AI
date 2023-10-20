import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { WhScrollView } from '../../../src/components/general/WhScrollView';

const mockStore = configureStore([]);

describe('WhScrollView component', () => {
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
        // @ts-ignore
        const text = <Text>Test Child</Text>;
        const { getByText } = render(
            // @ts-ignore
            <Provider store={store}>
                <WhScrollView>{text}</WhScrollView>
            </Provider>,
        );

        expect(getByText('Test Child')).toBeTruthy();
    });

    it('toggles the navigation bar when scrolling down', () => {
        const { getByTestId } = render(
            // @ts-ignore
            <Provider store={store}>
                <WhScrollView>
                    <>Scrollable Content</>
                </WhScrollView>
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
        // @ts-ignore
        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'navigation/showNavBar',
            payload: false,
        });
    });

    it('toggles the navigation bar when scrolling up', () => {
        const { getByTestId } = render(
            // @ts-ignore
            <Provider store={store}>
                <WhScrollView>
                    <>Scrollable Content</>
                </WhScrollView>
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
        // @ts-ignore
        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'navigation/showNavBar',
            payload: true,
        });
    });
});
