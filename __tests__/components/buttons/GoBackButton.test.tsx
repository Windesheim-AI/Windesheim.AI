import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import {
    GoBackButton,
    GoBackButtonProps,
} from '../../../src/components/buttons/GoBackButton';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
        ...ActualReactRedux,
        useSelector: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
});

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
