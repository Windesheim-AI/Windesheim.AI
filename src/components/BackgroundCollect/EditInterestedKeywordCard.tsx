import React from 'react';

import { keywords } from './DataList';
import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { setInterestedKeyword } from '../../lib/redux/slices/BackgroundInformationSlice';
import { usePreparedTranslator } from '../../lib/translations/hooks';
import { SettingCard } from '../general/card/SettingCard';
import { SelectValuesInput } from '../general/input/SelectValuesInput';

export const EditInterestedKeywordCard = () => {
    const t = usePreparedTranslator();

    const storeDispatcher = useAppDispatch();

    const selectableKeywords = keywords.map((item) => {
        return t(item.name);
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
