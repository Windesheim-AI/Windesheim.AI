import {
    saveToLocalStorage,
    loadFromLocalStorage,
    store,
} from '../../../src/redux/Store';

describe('Local Storage and Redux Setup', () => {
    beforeAll(() => {
        // Mock localStorage functions for testing
        const localStorageMock = (function () {
            // @ts-ignore
            let mockStore: Record<string, string> = {};

            return {
                getItem(key: string) {
                    return mockStore[key] || null;
                },
                setItem(key: string, value: string) {
                    mockStore[key] = value;
                },
                removeItem(key: string) {
                    delete mockStore[key];
                },
                clear() {
                    mockStore = {};
                },
            };
        })();

        // @ts-ignore
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
        });
    });

    it('should save state to local storage', () => {
        const state = { test: 'data' };
        saveToLocalStorage(state);

        // @ts-ignore
        const storedData = localStorage.getItem('persistentState');
        // @ts-ignore
        expect(storedData).toEqual(JSON.stringify(state));
    });

    it('should load state from local storage', () => {
        const state = { test: 'data' };
        // @ts-ignore
        localStorage.setItem('persistentState', JSON.stringify(state));

        const loadedState = loadFromLocalStorage();
        expect(loadedState).toEqual(state);
    });

    it('should configure the Redux store', () => {
        expect(store.getState()).toBeDefined();
    });
});
