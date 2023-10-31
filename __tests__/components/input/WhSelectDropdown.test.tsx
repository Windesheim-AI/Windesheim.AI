import { render } from '@testing-library/react-native';
import React from 'react';

import { WhSelectDropdown } from '../../../src/components/input/WhSelectDropdown';

// Mock a sample data array for testing
const sampleData = ['Option 1', 'Option 2', 'Option 3'];

describe('WhSelectDropdown', () => {
    it('renders the component with default values', () => {
        const { getByText, getByTestId } = render(
            <WhSelectDropdown
                data={sampleData}
                label="Select an option"
                searchText="Search"
                testID="wh-select-dropdown"
            />,
        );

        // Ensure that the label is displayed
        expect(getByText('Select an option')).toBeTruthy();

        // Ensure the component is rendered
        expect(getByTestId('wh-select-dropdown')).toBeTruthy();
    });
});
