import React from 'react';

import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { languageActions } from '../../lib/redux/slices/LanguageSlice';
import { languageOptions } from '../../lib/translations/languageOptions';
import {
    SelectableItem,
    SelectDropdown,
} from '../general/input/SelectDropdown';

export const LanguageSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const languageState = useAppSelector((state) => state.language);

    const selectableLanguages: SelectableItem[] = Object.keys(
        languageOptions,
    ).map((key) => ({
        label: languageOptions[key],
        value: key,
    }));

    return (
        <SelectDropdown
            label="Select language"
            data={selectableLanguages}
            defaultValue={languageState.langCode}
            onSelect={(selectedItem) => {
                storeDispatcher(
                    languageActions.changeLanguage({
                        langCode: selectedItem.value,
                    }),
                );
            }}
            testID="language-switcher"
        />
    );
};
