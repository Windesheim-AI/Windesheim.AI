import { render } from '@testing-library/react-native';
import React from 'react';

import { themeItems, Themes } from '../../../src/components/WTR/Theme';

test('renders Themes component without crashing', () => {
    render(<Themes />);
});

test('displays all themes', () => {
    const { getByText } = render(<Themes />);

    themeItems.forEach((theme) => {
        const themeName = getByText(theme.name);
        expect(themeName).toBeTruthy();
    });
});
