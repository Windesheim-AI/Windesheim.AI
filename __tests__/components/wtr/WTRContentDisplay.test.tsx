import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { WTRContentDisplay } from '../../../src/components/WTR/WTRContentDisplay';
import { useAppDispatch } from '../../../src/redux/Hooks';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
});
