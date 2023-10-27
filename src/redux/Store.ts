import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';

import { languageSlice } from './slices/LanguageSlice';
import { layoutSlice } from './slices/LayoutSlice';
import { navigationSlice } from './slices/NavigationSlice';
import { themeSlice } from './slices/ThemeSlice';
import { loadingSlice } from './slices/LoadingSlice';

const persistConfig: PersistConfig<unknown> = {
    key: 'root',
    storage: AsyncStorage,
    version: 1,
    whitelist: [themeSlice.name, languageSlice.name],
};

const rootReducer = combineReducers({
    navigation: navigationSlice.reducer,
    theme: themeSlice.reducer,
    language: languageSlice.reducer,
    layout: layoutSlice.reducer,
    loading: loadingSlice.reducer,
});
// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (middleware) =>
        middleware({
            serializableCheck: false,
        }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };

// Infer the `RootState` and `AppDispatch` types from the redux itself
export type RootState = ReturnType<typeof rootReducer>;
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
