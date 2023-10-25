import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSplashVisible: true,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        hideSplashScreen: (state) => {
            state.isSplashVisible = false;
        },
        showSplashScreen: (state) => {
            state.isSplashVisible = true;
        },
    },
});

export const { hideSplashScreen, showSplashScreen } = layoutSlice.actions;
export default layoutSlice.reducer;
