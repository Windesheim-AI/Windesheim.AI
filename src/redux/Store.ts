import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { navigationSlice } from './slices/NavigationSlice';
import { themeSlice } from './slices/ThemeSlice';
import { deleteProperty } from '../lib/utility/data';

// convert object to string and store in localStorage
function saveToLocalStorage(state: object) {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('persistentState', serialisedState);
}

// load string from localStorage and convert back in to an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem('persistentState');
        if (serialisedState === null) return undefined;

        const result: unknown = JSON.parse(serialisedState);
        if (typeof result !== 'object' || result === null) return undefined;

        // Exclude navigation from persistent state.
        deleteProperty(result, 'navigation');

        return result;
    } catch (e) {
        return undefined;
    }
}

const store = configureStore({
    reducer: {
        navigation: navigationSlice.reducer,
        theme: themeSlice.reducer,
    },

    preloadedState: loadFromLocalStorage(),
});

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export { store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
