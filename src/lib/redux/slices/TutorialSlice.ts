import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TutorialState {
    currentStep: number;
    tutorialCompleted: boolean;
}

const initialState: TutorialState = {
    currentStep: 0,
    tutorialCompleted: false,
};

export const tutorialSlice = createSlice({
    name: 'tutorial',
    initialState,
    reducers: {
        nextStep: (state) => {
            state.currentStep += 1;
        },
        setCompleted: (state, action: PayloadAction<boolean>) => {
            state.tutorialCompleted = action.payload;
            state.currentStep = 0;
        },
        previousStep: (state) => {
            state.currentStep -= 1;
        },
    },
});

export const { nextStep, setCompleted, previousStep } = tutorialSlice.actions;

export default tutorialSlice.reducer;
