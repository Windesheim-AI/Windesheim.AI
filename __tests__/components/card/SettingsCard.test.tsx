import { render } from '@testing-library/react-native';
import * as React from 'react';
import { Text } from 'react-native';

import { SettingCard } from '../../../src/components/general/card/SettingCard';

jest.mock('@expo/vector-icons', () => ({
    FontAwesome5: 'mocked-FontAwesome5',
}));

jest.useFakeTimers();

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
    const { getByText, queryByText } = render(
        <SettingCard title="Test Title" icon="test-icon">
            Test Child
        </SettingCard>,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(queryByText('Test Description')).toBeNull();
});

it('renders correctly', () => {
    const { toJSON } = render(
        <SettingCard title="test" icon="test2" description="test">
            test
        </SettingCard>,
    );
    expect(toJSON()).toMatchSnapshot();
});
