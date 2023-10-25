import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavigationSlice {
    showNavBar: boolean;
}

const initialState: NavigationSlice = {
    showNavBar: true,
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        showNavBar: (state, action: PayloadAction<boolean>) => {
            state.showNavBar = action.payload;
        },
    },
});

export const navigationActions = navigationSlice.actions;
