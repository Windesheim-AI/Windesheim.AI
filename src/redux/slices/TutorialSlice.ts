import { createSlice } from '@reduxjs/toolkit';

interface TutorialState {
    currentStep: number;
}

const initialState: TutorialState = {
    currentStep: 0,
};

export const tutorialSlice = createSlice({
    name: 'tutorial',
    initialState,
    reducers: {
        nextStep: (state) => {
            state.currentStep += 1;
        },
    },
});

export const { nextStep } = tutorialSlice.actions;
