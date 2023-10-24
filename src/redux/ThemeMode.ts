import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeMode {
    theme: 'light' | 'dark';
}

const initialState: ThemeMode = {
    theme: 'light',
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.theme = action.payload.theme;
        },
    },
});
