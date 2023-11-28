import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

export interface ThemeState {
    theme: 'light' | 'dark';
    isHighContrastEnabled: boolean;
}

const initialState: ThemeState = {
    theme: Appearance.getColorScheme() ?? 'light',
    isHighContrastEnabled: false,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (
            state,
            action: PayloadAction<{
                theme: 'light' | 'dark';
            }>,
        ) => {
            state.theme = action.payload.theme;
        },
        toggleHighContrast: (state) => {
            state.isHighContrastEnabled = !state.isHighContrastEnabled;
        },
        setHighContrastEnabled: (
            state,
            action: PayloadAction<{
                isEnabled: boolean;
            }>,
        ) => {
            state.isHighContrastEnabled = action.payload.isEnabled;
        },
    },
});

export const themeActions = themeSlice.actions;
