import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

export interface ThemeState {
    theme: 'light' | 'dark';
}

const initialState: ThemeState = {
    theme: Appearance.getColorScheme() ?? 'light',
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<ThemeState>) => {
            state.theme = action.payload.theme;
        },
    },
});

export const themeActions = themeSlice.actions;
