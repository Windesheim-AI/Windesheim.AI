import { act, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import { PageView } from '../../../src/components/general/PageView';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
        ...ActualReactRedux,
        useSelector: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
});

describe('PageView component', () => {
    it('renders correctly', () => {
        let component;
        void act(() => {
            component = renderer.create(
                <PageView title="Test Title">test</PageView>,
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
            // @ts-ignore
            <PageView title="Test Title">{text}</PageView>,
        );

        expect(getByText('Test Child')).toBeTruthy();
    });
});
