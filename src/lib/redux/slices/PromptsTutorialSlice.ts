import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PromptsTutorialState {
    currentStep: number;
    tutorialCompleted: boolean;
}

const initialState: PromptsTutorialState = {
    currentStep: 0,
    tutorialCompleted: false,
};

export const promptsTutorialSlice = createSlice({
    name: 'promptsTutorial',
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

export const { nextStep, setCompleted, previousStep } =
    promptsTutorialSlice.actions;

export default promptsTutorialSlice.reducer;
