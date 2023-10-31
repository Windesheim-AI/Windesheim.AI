import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import {
    GoBackButton,
    GoBackButtonProps,
} from '../../../src/components/buttons/GoBackButton';

jest.useFakeTimers();

describe('GoBackButton', () => {
    const mockOnPress = jest.fn();

    const defaultProps: GoBackButtonProps = {
        onPress: mockOnPress,
        buttonText: 'Go Back',
    };

    it('renders correctly with default props', () => {
        const { getByText } = render(<GoBackButton {...defaultProps} />);

        expect(getByText('Go Back')).toBeTruthy();
    });

    it('triggers onPress when clicked', () => {
        const { getByText } = render(<GoBackButton {...defaultProps} />);
        fireEvent.press(getByText('Go Back'));

        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
