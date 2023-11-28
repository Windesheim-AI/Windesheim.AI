import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface BackgroundState {
    position: string;
    interestedKeyword: string;
    familiarity: string;
    isFirstTimeUser: boolean;
}

const initialState: BackgroundState = {
    position: '',
    interestedKeyword: '',
    familiarity: '',
    isFirstTimeUser: true,
};

export const backgroundInformationSlice = createSlice({
    name: 'backgroundInformation',
    initialState,
    reducers: {
        setPosition: (state, action: PayloadAction<string>) => {
            state.position = action.payload;
        },
        setInterestedKeyword: (state, action: PayloadAction<string>) => {
            state.interestedKeyword = action.payload;
        },
        setAiFamiliarity: (state, action: PayloadAction<string>) => {
            state.familiarity = action.payload;
        },
        setIsFirstTimeUser: (state, action: PayloadAction<boolean>) => {
            state.isFirstTimeUser = action.payload;
        },
    },
});

export const {
    setPosition,
    setInterestedKeyword,
    setAiFamiliarity,
    setIsFirstTimeUser,
} = backgroundInformationSlice.actions;

export default backgroundInformationSlice.reducer;
