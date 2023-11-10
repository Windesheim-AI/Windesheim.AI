import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { theme, Themes } from '../../../src/components/WTR/Theme';
import { Routes } from '../../../src/routes/routes';

test('renders Themes component without crashing', () => {
    render(<Themes />);
});

test('displays all themes', () => {
    const { getByText } = render(<Themes />);

    theme.forEach((theme) => {
        const themeName = getByText(theme.name);
        expect(themeName).toBeTruthy();
    });
});
