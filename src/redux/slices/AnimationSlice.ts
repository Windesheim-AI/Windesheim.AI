import { createSlice } from '@reduxjs/toolkit';
interface AnimationState {
    isEnabled: boolean;
}

const initialState: AnimationState = {
    isEnabled: true,
};

export const animationSlice = createSlice({
    name: 'animation',
    initialState,
    reducers: {
        toggleAnimation: (state) => {
            state.isEnabled = !state.isEnabled;
        },
    },
});

export const { toggleAnimation } = animationSlice.actions;
