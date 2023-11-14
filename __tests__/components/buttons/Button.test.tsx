import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Button } from '../../../src/components/general/buttons/Button';

jest.useFakeTimers();

describe('Button Component', () => {
    it('renders button text correctly', () => {
        const onPressHandler = jest.fn();
        const buttonText = 'Click Me';

        // Check that the `Button` component is correctly set up.
        const { getByText } = render(
            <Button
                buttonText={buttonText}
                colorGradientScheme={['#FFF', '#CCC', '#333']}
                onPress={onPressHandler}
            />,
        );

        // Ensure the `render` method is being called before querying the component.
        expect(getByText(buttonText)).toBeDefined();
    });

    it('calls the provided onPress function when clicked', () => {
        const mockOnPress = jest.fn();
        const { getByText } = render(
            <Button
                buttonText="Click Me"
                onPress={mockOnPress}
                colorGradientScheme={['#FFF', '#CCC', '#333']}
            />,
        );

        fireEvent.press(getByText('Click Me'));
        expect(mockOnPress).toHaveBeenCalled();
    });
});
