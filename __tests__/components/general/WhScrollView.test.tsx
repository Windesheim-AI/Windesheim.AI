import { Store, AnyAction } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { WhScrollView } from '../../../src/components/general/WhScrollView';
import { useAppDispatch } from '../../../src/redux/Hooks';

jest.useFakeTimers();

const mockStore = configureStore([]);

(useAppDispatch as jest.Mock).mockReturnValue(jest.fn());

describe('WhScrollView component', () => {
    // @ts-ignore
    let store: Store<unknown, AnyAction>;

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
            <Provider store={store}>
                <WhScrollView>{text}</WhScrollView>
            </Provider>,
        );

        expect(getByText('Test Child')).toBeTruthy();
    });
});
