import React from 'react';
import { useTranslation } from 'react-i18next';

import { positions } from './DataList';
import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { setPosition } from '../../lib/redux/slices/BackgroundInformationSlice';
import { translateText } from '../../lib/translations/hooks';
import { SettingCard } from '../general/card/SettingCard';
import { SelectValuesInput } from '../general/input/SelectValuesInput';

export const EditPositionCard = () => {
    const language = useAppSelector((state) => state.language.langCode);
    const { t } = useTranslation();

    const storeDispatcher = useAppDispatch();

    const selectablePositions = positions.map((item) => {
        return translateText(t, item.name, language);
    });

    const backgroundInformation = useAppSelector(
        (state) => state.backgroundInformation,
    );
    const selectedPosition = backgroundInformation.position;
    const selectedPositionIndex = positions.findIndex((item) => {
        return item.name === selectedPosition;
    });

    return (
        <SettingCard title="Position" icon="briefcase" isFlexEnabled={false}>
            <SelectValuesInput
                label="Position"
                selectableValues={selectablePositions}
                defaultValueIndex={selectedPositionIndex}
                onSelect={(_, index) => {
                    storeDispatcher(setPosition(positions[index].name));
                }}
                width="100%"
                testId="position-select"
            />
        </SettingCard>
    );
};
