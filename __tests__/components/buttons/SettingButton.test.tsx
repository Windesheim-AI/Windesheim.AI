import { act } from '@testing-library/react-native';
import React from 'react';
import { Pressable } from 'react-native';
import renderer from 'react-test-renderer';

import { SettingButton } from '../../../src/components/buttons/SettingButton';

jest.useFakeTimers();

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
        void act(() => {
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
        const pressable = instance.findByType(Pressable);

        void act(() => {
            pressable.props.onPress();
        });

        expect(mockProps.onPress).toHaveBeenCalled();
    });
});
