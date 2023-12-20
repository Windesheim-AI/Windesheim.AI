import React from 'react';

import { keywords } from './DataList';
import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { setInterestedKeyword } from '../../lib/redux/slices/BackgroundInformationSlice';
import { usePreparedTranslator } from '../../lib/translations/hooks';
import { SettingCard } from '../general/card/SettingCard';
import {
    SelectableItem,
    SelectDropdown,
} from '../general/input/SelectDropdown';

export const EditInterestedKeywordCard = () => {
    const t = usePreparedTranslator();

    const storeDispatcher = useAppDispatch();
    const backgroundInformation = useAppSelector(
        (state) => state.backgroundInformation,
    );

    const selectableKeywords: SelectableItem[] = keywords.map((item) => {
        return {
            label: t(item.name),
            value: item.name,
        };
    });

    return (
        <SettingCard title="Interest in" icon="lightbulb" isFlexEnabled={false}>
            <SelectDropdown
                label="AI interest"
                data={selectableKeywords}
                defaultValue={backgroundInformation.interestedKeyword}
                onSelect={(selectedItem) => {
                    storeDispatcher(setInterestedKeyword(selectedItem.label));
                }}
                width="100%"
                testID="edit-interested-keyword-select"
            />
        </SettingCard>
    );
};
