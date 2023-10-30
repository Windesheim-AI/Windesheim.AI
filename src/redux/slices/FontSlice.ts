import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DefaultSize } from '../../constants/Fonts';

export interface FontState {
    fontSize: number;
}

const initialState: FontState = {
    fontSize: DefaultSize,
};

export const fontSlice = createSlice({
    name: 'fontSize',
    initialState,
    reducers: {
        changeFont: (state, action: PayloadAction<FontState>) => {
            state.fontSize = action.payload.fontSize;
        },
    },
});

export const fontActions = fontSlice.actions;
