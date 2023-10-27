import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { defaultLanguageCode, LanguageCode } from '../../constants/Languages';

export interface LanguageState {
    langCode: LanguageCode;
}

const initialState: LanguageState = {
    langCode: defaultLanguageCode,
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
