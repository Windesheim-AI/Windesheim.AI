import { Store, configureStore, UnknownAction } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';

import { WhScrollView } from '../../../src/components/general/views/WhScrollView';
import { useAppDispatch } from '../../../src/lib/redux/Hooks';

jest.useFakeTimers();

(useAppDispatch as jest.Mock).mockReturnValue(jest.fn());

describe('WhScrollView component', () => {
    // @ts-ignore
    let store: Store<unknown, UnknownAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                navigation: (state = { showNavBar: true }) => state,
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
