import { render } from '@testing-library/react-native';
import * as React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import { SettingCard } from '../../../src/components/card/SettingCard';

jest.useFakeTimers();

jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
        ...ActualReactRedux,
        useSelector: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
});

it('renders title and description', () => {
    // @ts-ignore
    const text = <Text>Test Child</Text>;
    const { getByText } = render(
        <SettingCard
            title="Test Title"
            description="Test Description"
            icon="test-icon"
        >
            {text}
        </SettingCard>,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByText('Test Child')).toBeTruthy();
});

it('renders only title if no description is provided', () => {
    // @ts-ignore
    const text = <Text>Test Child</Text>;
    const { getByText, queryByText } = render(
        <SettingCard title="Test Title" icon="test-icon">
            {text}
        </SettingCard>,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(queryByText('Test Description')).toBeNull();
    expect(getByText('Test Child')).toBeTruthy();
});

test('renders correctly', () => {
    const tree = renderer
        .create(
            <SettingCard title="test" icon="test2" description="test">
                test
            </SettingCard>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
