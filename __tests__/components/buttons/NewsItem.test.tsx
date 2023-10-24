import { render } from '@testing-library/react-native';
import React from 'react';

import NewsItem from '../../../src/components/buttons/NewsItem'; // Import your component

describe('NewsItem', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <NewsItem title="Test News" url="https://example.com" />,
        );
        expect(getByText('Test News')).toBeTruthy();
    });
});
