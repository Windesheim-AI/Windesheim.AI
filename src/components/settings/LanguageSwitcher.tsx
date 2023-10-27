import React, { useState } from 'react';

import {
    getLanguageCodeByTranslation,
    LanguageCode,
    languageLabels,
    languages,
} from '../../constants/Languages';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/Store';
import { languageActions } from '../../redux/slices/LanguageSlice';
import { WhSelectDropdown } from '../input/WhSelectDropdown';

export const LanguageSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const languageState = useAppSelector((state: RootState) => state.language);
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(
        languageState.langCode,
    );

    const selectableLanguages = languageLabels();
    const selectedLanguageTranslation = languages[selectedLanguage];

    return (
        <WhSelectDropdown<string>
            data={selectableLanguages}
            label="Select language"
            defaultValue={selectedLanguageTranslation}
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
            testID="language-switcher"
        />
    );
};
