import React from 'react';
import { useTranslation } from 'react-i18next';

import { keywords } from './DataList';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { setInterestedKeyword } from '../../redux/slices/BackgroundInformationSlice';
import { translateText } from '../../translations/hooks';
import { SettingCard } from '../general/card/SettingCard';
import { SelectValuesInput } from '../general/input/SelectValuesInput';

export const EditInterestedKeywordCard = () => {
    const language = useAppSelector((state) => state.language.langCode);
    const { t } = useTranslation();

    const storeDispatcher = useAppDispatch();

    const selectableKeywords = keywords.map((item) => {
        return translateText(t, item.name, language);
    });

    const backgroundInformation = useAppSelector(
        (state) => state.backgroundInformation,
    );
    const selectedKeyword = backgroundInformation.interestedKeyword;
    const selectedKeywordIndex = keywords.findIndex((item) => {
        return item.name === selectedKeyword;
    });

    return (
        <SettingCard title="Interest in" icon="lightbulb" isFlexEnabled={false}>
            <SelectValuesInput
                label="AI interest"
                selectableValues={selectableKeywords}
                defaultValueIndex={selectedKeywordIndex}
                onSelect={(_, index) => {
                    storeDispatcher(setInterestedKeyword(keywords[index].name));
                }}
                width="100%"
                testId="edit-interested-keyword-select"
            />
        </SettingCard>
    );
};
