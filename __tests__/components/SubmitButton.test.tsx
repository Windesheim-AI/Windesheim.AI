import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import SettingButton from '../../src/components/buttons/SettingButton'; // Adjust the import path based on your project structure
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');
describe('SettingButton', () => {
    const mockProps = {
        title: 'Test Title',
        description: 'Test Description',
        onPress: jest.fn(),
        icon: 'test-icon',
        screenName: 'test-screen',
    };

    it('renders correctly', async () => {
        let tree;
        // eslint-disable-next-line @typescript-eslint/require-await
        await act(async () => {
            tree = renderer.create(<SettingButton {...mockProps} />).toJSON();
        });
        expect(tree).toMatchSnapshot();
    });

    it('calls onPress when button is pressed', () => {
        const component = renderer.create(<SettingButton {...mockProps} />);
        const instance = component.root;
        const touchableOpacity = instance.findByType(TouchableOpacity);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            touchableOpacity.props.onPress();
        });
        expect(mockProps.onPress).toHaveBeenCalled();
    });

    it('throws an error when onPress and screenName are both undefined', () => {
        const originalError = console.error;
        console.error = jest.fn(); // Suppress error output

        // Render the component without onPress and screenName
        expect(() =>
            renderer.create(
                <SettingButton
                    title="Title"
                    description="Description"
                    icon="icon"
                />,
            ),
        ).toThrowError(
            'SettingButton requires either onPress or screenName to be defined',
        );

        console.error = originalError; // Restore original console.error
    });
});
