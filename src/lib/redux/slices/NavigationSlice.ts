import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DefaultRoute } from '../../../routes/routes';

export interface NavigationSlice {
    showNavBar: boolean;
    selectedNavBarRoute: string;
}

const initialState: NavigationSlice = {
    showNavBar: true,
    selectedNavBarRoute: DefaultRoute,
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        showNavBar: (state, action: PayloadAction<boolean>) => {
            state.showNavBar = action.payload;
        },
        updateSelectedNavBarRoute: (state, action: PayloadAction<string>) => {
            state.selectedNavBarRoute = action.payload;
        },
    },
});

export const navigationActions = navigationSlice.actions;
