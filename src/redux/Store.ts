import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';

import { fontSlice } from './slices/FontSlice';
import { languageSlice } from './slices/LanguageSlice';
import { layoutSlice } from './slices/LayoutSlice';
import { loadingSlice } from './slices/LoadingSlice';
import { navigationSlice } from './slices/NavigationSlice';
import { notificationSlice } from './slices/NotificationSlice';
import { themeSlice } from './slices/ThemeSlice';

const persistConfig: PersistConfig<unknown> = {
    key: 'root',
    storage: AsyncStorage,
    version: 1,
    whitelist: [themeSlice.name, languageSlice.name, fontSlice.name],
};

const rootReducer = combineReducers({
    notification: notificationSlice.reducer,
    navigation: navigationSlice.reducer,
    theme: themeSlice.reducer,
    language: languageSlice.reducer,
    layout: layoutSlice.reducer,
    loading: loadingSlice.reducer,
    fontSize: fontSlice.reducer,
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
