import { Store, configureStore, UnknownAction } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';

import { PageScrollView } from '../../../src/components/general/views/PageScrollView';
import { useAppDispatch } from '../../../src/lib/redux/Hooks';

const mockStore = (initialState: any) =>
    configureStore({ reducer: () => initialState });

jest.useFakeTimers();

(useAppDispatch as jest.Mock).mockReturnValue(jest.fn());

describe('PageScrollView component', () => {
    // @ts-ignore
    let store: Store<unknown, UnknownAction>;

    beforeEach(() => {
        store = mockStore({
            navigation: {
                showNavBar: true,
            },
        });
    });

    it('renders correctly', () => {
        const { toJSON } = render(
            <Provider store={store}>
                <PageScrollView title="Test Title">test</PageScrollView>
            </Provider>,
        );

        expect(toJSON()).toMatchSnapshot();
    });

    it('renders children correctly', () => {
        // @ts-ignore
        const text = <Text>Test Child</Text>;
        const { getByText } = render(
            <Provider store={store}>
                <PageScrollView title="Test Title">{text}</PageScrollView>
            </Provider>,
        );

        expect(getByText('Test Child')).toBeTruthy();
    });
});
