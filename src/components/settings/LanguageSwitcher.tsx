import React, { useContext, useEffect, useState } from 'react';

import {
    getLanguageCodeByTranslation,
    LanguageCode,
    languageLabels,
    languages,
} from '../../constants/Languages';
import { TranslateContext } from '../../lib/translation/Translator';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { languageActions } from '../../redux/slices/LanguageSlice';
import { WhSelectDropdown } from '../input/WhSelectDropdown';

export const LanguageSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const languageState = useAppSelector((state) => state.language);
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(
        languageState.langCode,
    );
    const handleTranslate = useContext(TranslateContext);
    const [selectLanguageText, setSelectLanguageText] =
        useState('Select language');
    const [searchText, setSearchText] = useState('Search...');

    const selectableLanguages = languageLabels();
    const selectedLanguageTranslation = languages[selectedLanguage];

    useEffect(() => {
        handleTranslate(selectLanguageText, setSelectLanguageText);
        handleTranslate(searchText, setSearchText);
    }, [handleTranslate, searchText, selectLanguageText]);

    return (
        <WhSelectDropdown<string>
            data={selectableLanguages}
            label={selectLanguageText}
            searchText={searchText}
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
