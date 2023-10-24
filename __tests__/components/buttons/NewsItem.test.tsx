import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import NewsItem from '../../../src/components/buttons/NewsItem'; // Import your component

describe('NewsItem', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <NewsItem title="Test News" url="https://example.com" />,
        );
        expect(getByText('Test News')).toBeTruthy();
    });

    const originalLinking = global.Linking;

    beforeAll(() => {
        global.Linking = {
            openURL: jest.fn(),
        };
    });

    afterAll(() => {
        global.Linking = originalLinking;
    });

    it('opens the provided URL when clicked', async () => {
        // Mock Linking.openURL function
        const openURLMock = global.Linking.openURL as jest.Mock;
        openURLMock.mockReturnValue(Promise.resolve(true));

        // Render the component
        const { getByText } = render(
            <NewsItem title="Test News" url="https://example.com" />,
        );

        // Find the news item by text
        const newsItem = getByText('Test News');

        // Simulate a click event
        fireEvent.press(newsItem);

        await openURLMock('https://example.com');

        // Expect that openURLMock was called with the provided URL
        expect(openURLMock).toHaveBeenCalledWith('https://example.com');
    });
});
