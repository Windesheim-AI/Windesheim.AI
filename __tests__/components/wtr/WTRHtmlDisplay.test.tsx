import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

import WTRHtmlDisplay from '../../../src/components/WTR/html/WTRHtmlDisplay';
import { colorMap } from '../../../src/lib/constants/Colors';

test('renders WTRHtmlDisplay component without crashing', () => {
    const html = '<div>Hello, World!</div>';
    const colors = colorMap.light;
    render(<WTRHtmlDisplay html={html} colors={colors} />);
});

test('displays HTML content correctly', () => {
    const html = '<div>Hello, World!</div>';
    const colors = colorMap.light;
    const { getByText } = render(
        <WTRHtmlDisplay html={html} colors={colors} />,
    );
    expect(getByText('Hello, World!')).toBeTruthy();
});

test('applies custom renderers correctly', async () => {
    const html = '<div><img src="some-image.jpg" /></div>';
    const colors = colorMap.light;

    const { findByTestId } = render(
        <WTRHtmlDisplay html={html} colors={colors} />,
    );

    await waitFor(() => findByTestId('custom-image'));
    const customImage = findByTestId('custom-image');
    // Add assertions for custom image rendering as needed
    expect(customImage).toBeTruthy();
});
