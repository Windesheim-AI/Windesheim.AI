import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoadingState = {
    isLoading: boolean;
};

const initialState: LoadingState = {
    isLoading: false,
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = loadingSlice.actions;
