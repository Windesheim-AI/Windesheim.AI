import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';

import { courseDataSlice } from './slices/CourseDataSlice';
import { fontSlice } from './slices/FontSlice';
import { languageSlice } from './slices/LanguageSlice';
import { layoutSlice } from './slices/LayoutSlice';
import { navigationSlice } from './slices/NavigationSlice';
import { themeSlice } from './slices/ThemeSlice';

const persistConfig: PersistConfig<unknown> = {
    key: 'root',
    storage: AsyncStorage,
    version: 1,
    whitelist: [
        themeSlice.name,
        languageSlice.name,
        fontSlice.name,
        courseDataSlice.name,
    ],
};

export const rootReducer = combineReducers({
    navigation: navigationSlice.reducer,
    theme: themeSlice.reducer,
    language: languageSlice.reducer,
    layout: layoutSlice.reducer,
    fontSize: fontSlice.reducer,
    courseData: courseDataSlice.reducer,
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
