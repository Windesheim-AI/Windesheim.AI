import React from 'react';

import { aiFamiliarity } from './DataList';
import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { setAiFamiliarity } from '../../lib/redux/slices/BackgroundInformationSlice';
import { usePreparedTranslator } from '../../lib/translations/hooks';
import { SettingCard } from '../general/card/SettingCard';
import {
    SelectableItem,
    SelectDropdown,
} from '../general/input/SelectDropdown';

export const EditAiFamiliarityCard = () => {
    const t = usePreparedTranslator();

    const storeDispatcher = useAppDispatch();
    const backgroundInformation = useAppSelector(
        (state) => state.backgroundInformation,
    );

    const selectableOptions: SelectableItem[] = aiFamiliarity.map((item) => {
        return {
            label: t(item.name),
            value: item.name,
        };
    });

    return (
        <SettingCard
            title="Familiarity with AI"
            icon="briefcase"
            isFlexEnabled={false}
        >
            <SelectDropdown
                label="AI familiarity"
                data={selectableOptions}
                defaultValue={backgroundInformation.familiarity}
                onSelect={(selectedItem) => {
                    storeDispatcher(setAiFamiliarity(selectedItem.label));
                }}
                width="100%"
                testID="ai-familiarity-select"
            />
        </SettingCard>
    );
};
