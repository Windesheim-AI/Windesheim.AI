import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { languageActions } from '../../lib/redux/slices/LanguageSlice';
import {
    LanguageCode,
    getLanguageCodeByTranslation,
    languageLabels,
    languageOptions,
} from '../../lib/translations/languageOptions';
import { SelectValuesInput } from '../general/input/SelectValuesInput';

export const LanguageSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const languageState = useAppSelector((state) => state.language);
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(
        languageState.langCode,
    );

    const selectableLanguages = languageLabels();
    const selectedLanguageIndex = selectableLanguages.findIndex((language) => {
        return language === languageOptions[selectedLanguage];
    });

    return (
        <SelectValuesInput
            label="Select language"
            selectableValues={selectableLanguages}
            defaultValueIndex={selectedLanguageIndex}
            onSelect={(selectedItem) => {
                const newSelectedLanguage: LanguageCode | undefined =
                    getLanguageCodeByTranslation(selectedItem);
                if (!newSelectedLanguage) {
                    return;
                }

                setSelectedLanguage(newSelectedLanguage);
                storeDispatcher(
                    languageActions.changeLanguage({
                        langCode: newSelectedLanguage,
                    }),
                );
            }}
            testId="language-switcher"
        />
    );
};
