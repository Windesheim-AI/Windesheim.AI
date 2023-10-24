import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { Button } from '../../../src/components/buttons/Button';

jest.mock('@expo-google-fonts/inter', () => ({
    useFonts: () => [true, null],
    Inter_500Medium: {},
}));

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

describe('Button Component', () => {
    it('renders button text correctly', () => {
        const onPressHandler = jest.fn();
        const buttonText = 'Click Me';
        const { getByText } = render(
            <Button
                buttonText={buttonText}
                colorGradientScheme={['#FFF', '#CCC', '#333']}
                onPress={onPressHandler}
            />,
        );
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
