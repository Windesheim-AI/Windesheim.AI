import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { languageActions } from '../../lib/redux/slices/LanguageSlice';
import { useTextTranslate } from '../../lib/translations/hooks';
import {
    LanguageCode,
    getLanguageCodeByTranslation,
    languageLabels,
    languageOptions,
} from '../../lib/translations/languageOptions';
import { WhSelectDropdown } from '../general/input/WhSelectDropdown';

export const LanguageSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const languageState = useAppSelector((state) => state.language);
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(
        languageState.langCode,
    );

    const selectableLanguages = languageLabels();
    const selectedLanguageTranslation = languageOptions[selectedLanguage];

    return (
        <WhSelectDropdown<string>
            data={selectableLanguages}
            label={useTextTranslate('Select language')}
            searchText={useTextTranslate('Search...')}
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
