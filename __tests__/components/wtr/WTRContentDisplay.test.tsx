import React from 'react';
import { act, render, waitFor } from '@testing-library/react-native';
import { WTRContentDisplay } from '../../../src/components/WTR/WTRContentDisplay';
import configureStore from 'redux-mock-store';
import { useAppDispatch } from '../../../src/redux/Hooks';
import { Provider } from 'react-redux';

jest.mock('../../../src/lib/fetcher/WTRPageFetcher', () => ({
    useFetchWTRPage: jest.fn(() => ({
        content: '<div>Mock HTML Content</div>',
        hasContent: true,
        isLoading: false,
    })),
}));

jest.useFakeTimers();

const mockStore = configureStore([]);

(useAppDispatch as jest.Mock).mockReturnValue(jest.fn());

describe('WTRContentDisplay', () => {
    // @ts-ignore
    let store: Store<unknown, AnyAction>;
    let consoleSpy: any;

    beforeEach(() => {
        store = mockStore({
            navigation: {
                showNavBar: true,
            },
        });

        if (typeof consoleSpy === 'function') {
            consoleSpy.mockRestore();
        }
    });

    test('renders HTML content when hasContent is true', async () => {
        consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

        const { findByText } = render(
            <Provider store={store}>
                <WTRContentDisplay page="mock-page" />
            </Provider>,
        );
        await waitFor(() => findByText('Mock HTML Content'));
        expect(findByText('Mock HTML Content')).toBeTruthy();
    });

    test('renders page not found when there is no data', async () => {
        // Mock isLoading to be true
        jest.spyOn(
            require('../../../src/lib/fetcher/WTRPageFetcher'),
            'useFetchWTRPage',
        ).mockImplementation(() => ({
            content: '',
            hasContent: false,
            isLoading: true,
        }));

        consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

        const { findByText } = render(
            <Provider store={store}>
                <WTRContentDisplay page="mock-page" />
            </Provider>,
        );
        await waitFor(() => findByText('Page not found'));
        expect(findByText('Page not found')).toBeTruthy();
    });
});
