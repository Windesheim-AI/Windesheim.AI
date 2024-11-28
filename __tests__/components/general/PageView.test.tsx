import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { PageView } from '../../../src/components/general/views/PageView';

jest.useFakeTimers();

describe('PageView component', () => {
    it('renders correctly', () => {
        const { toJSON } = render(<PageView title="Test Title">test</PageView>);

        const tree = toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders children correctly', () => {
        const text = <Text>Test Child</Text>;
        const { getByText } = render(
            <PageView title="Test Title">{text}</PageView>,
        );

        expect(getByText('Test Child')).toBeTruthy();
    });
});
