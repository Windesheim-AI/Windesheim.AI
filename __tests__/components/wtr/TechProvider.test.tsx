import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TechProviders } from '../../../src/components/WTR/TechProviders'; // Import the component

describe('TechProviders Component', () => {
    it('renders the heading correctly', () => {
        const { getByText } = render(<TechProviders />);
        const heading = getByText('TechProviders');
        expect(heading).toBeTruthy();
    });

    it('renders all the tech providers', () => {
        const { getAllByTestId } = render(<TechProviders />);
        const techProviderButtons = getAllByTestId('techProviderButton');
        expect(techProviderButtons.length).toBe(12); // Change the number if there are more or fewer tech providers
    });

    it('navigates to the correct page when a tech provider button is pressed', () => {
        const { getByText } = render(<TechProviders />);
        const techProviderButton = getByText('Apple'); // Replace with the name of a tech provider
        fireEvent.press(techProviderButton);

        // You can add assertions here to verify that the navigation is triggered correctly.
        // For example, you can use a mock navigation function and assert that it's called with the right arguments.
    });
});
