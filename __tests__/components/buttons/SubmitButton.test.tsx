import { act } from '@testing-library/react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer'; // Import this if you're using react-test-renderer

import { SettingButton } from '../../../src/components/buttons/SettingButton';

jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

describe('SettingButton', () => {
    const mockProps = {
        title: 'Test Title',
        description: 'Test Description',
        onPress: jest.fn(),
        icon: 'test-icon',
        screenName: 'test-screen',
    };
    it('renders correctly', () => {
        let component;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            component = renderer.create(<SettingButton {...mockProps} />);
        });

        // @ts-ignore
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls onPress when button is pressed', () => {
        const component = renderer.create(<SettingButton {...mockProps} />);
        const instance = component.root;
        // @ts-ignore
        const touchableOpacity = instance.findByType(TouchableOpacity);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            touchableOpacity.props.onPress();
        });

        expect(mockProps.onPress).toHaveBeenCalled();
    });
});
