import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BackgroundState {
    position: string;
    interestedKeyword: string;
    howMuchFamiliar: string;
    isFirstTimeUser: boolean;
}

const initialState: BackgroundState = {
    position: '',
    interestedKeyword: '',
    howMuchFamiliar: '',
    isFirstTimeUser: false,
};

export const bgCollectSlice = createSlice({
    name: 'background',
    initialState,
    reducers: {
        setPosition: (state, action: PayloadAction<string>) => {
            state.position = action.payload;
        },
        setInterestedKeyword: (state, action: PayloadAction<string>) => {
            state.interestedKeyword = action.payload;
        },
        setHowMuchFamiliar: (state, action: PayloadAction<string>) => {
            state.howMuchFamiliar = action.payload;
        },
        setIsFirstTimeUser: (state, action: PayloadAction<boolean>) => {
            state.isFirstTimeUser = action.payload;
        },
    },
});

export const {
    setPosition,
    setInterestedKeyword,
    setHowMuchFamiliar,
    setIsFirstTimeUser,
} = bgCollectSlice.actions;

export default bgCollectSlice.actions;
