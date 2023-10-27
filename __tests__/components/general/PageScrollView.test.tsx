import { Store, AnyAction } from '@reduxjs/toolkit';
import { act, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { PageScrollView } from '../../../src/components/general/PageScrollView';
import { useAppDispatch } from '../../../src/redux/Store';

const mockStore = configureStore([]);

jest.useFakeTimers();

(useAppDispatch as jest.Mock).mockReturnValue(jest.fn());

describe('PageScrollView component', () => {
    // @ts-ignore
    let store: Store<unknown, AnyAction>;

    beforeEach(() => {
        store = mockStore({
            navigation: {
                showNavBar: true,
            },
        });
    });

    it('renders correctly', () => {
        let component;
        void act(() => {
            component = renderer.create(
                <Provider store={store}>
                    <PageScrollView title="Test Title">test</PageScrollView>
                </Provider>,
            );
        });

        // @ts-ignore
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
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
