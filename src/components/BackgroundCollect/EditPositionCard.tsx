import React from 'react';

import { positions } from './DataList';
import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { setPosition } from '../../lib/redux/slices/BackgroundInformationSlice';
import { usePreparedTranslator } from '../../lib/translations/hooks';
import { SettingCard } from '../general/card/SettingCard';
import {
    SelectableItem,
    SelectDropdown,
} from '../general/input/SelectDropdown';

export const EditPositionCard = () => {
    const t = usePreparedTranslator();

    const storeDispatcher = useAppDispatch();
    const backgroundInformation = useAppSelector(
        (state) => state.backgroundInformation,
    );

    const selectablePositions: SelectableItem[] = positions.map((item) => {
        return {
            label: t(item.name),
            value: item.name,
        };
    });

    return (
        <SettingCard title="Position" icon="briefcase" isFlexEnabled={false}>
            <SelectDropdown
                label="Position"
                data={selectablePositions}
                defaultValue={backgroundInformation.position}
                onSelect={(selectedItem) => {
                    storeDispatcher(setPosition(selectedItem.label));
                }}
                width="100%"
                testID="position-select"
            />
        </SettingCard>
    );
};
