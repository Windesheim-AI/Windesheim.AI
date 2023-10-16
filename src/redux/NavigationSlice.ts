/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
