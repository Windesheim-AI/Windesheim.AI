import { render } from '@testing-library/react-native';
import React from 'react';

import { WhSelectDropdown } from '../../../src/components/input/WhSelectDropdown';

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

// Mock a sample data array for testing
const sampleData = ['Option 1', 'Option 2', 'Option 3'];

describe('WhSelectDropdown', () => {
    it('renders the component with default values', () => {
        const { getByText, getByTestId, findByText } = render(
            <WhSelectDropdown
                data={sampleData}
                label="Select an option"
                testID="wh-select-dropdown"
            />,
        );

        // Ensure that the label is displayed
        expect(getByText('Select an option')).toBeTruthy();

        // Ensure the component is rendered
        expect(getByTestId('wh-select-dropdown')).toBeTruthy();

        // Wait for the first option to appear
        expect(findByText('Option 1')).toBeTruthy();
    });
});
