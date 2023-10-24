import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeSlice {
    theme: 'light' | 'dark';
}

const initialState: ThemeSlice = {
    theme: 'light',
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<ThemeSlice>) => {
            state.theme = action.payload.theme;
        },
    },
});

export const themeActions = themeSlice.actions;
