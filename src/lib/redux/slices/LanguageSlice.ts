import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LanguageCode } from '../../translations/languageOptions';

export interface LanguageState {
    langCode: LanguageCode;
}

const initialState: LanguageState = {
    langCode: 'nl',
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<LanguageState>) => {
            state.langCode = action.payload.langCode;
        },
    },
});

export const languageActions = languageSlice.actions;
