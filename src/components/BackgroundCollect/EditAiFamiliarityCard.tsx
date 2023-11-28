import React from 'react';
import { useTranslation } from 'react-i18next';

import { aiFamiliarity } from './DataList';
import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { setAiFamiliarity } from '../../lib/redux/slices/BackgroundInformationSlice';
import { translateText } from '../../lib/translations/hooks';
import { SettingCard } from '../general/card/SettingCard';
import { SelectValuesInput } from '../general/input/SelectValuesInput';

export const EditAiFamiliarityCard = () => {
    const language = useAppSelector((state) => state.language.langCode);
    const { t } = useTranslation();

    const storeDispatcher = useAppDispatch();

    const selectableOptions = aiFamiliarity.map((item) => {
        return translateText(t, item.name, language);
    });

    const backgroundInformation = useAppSelector(
        (state) => state.backgroundInformation,
    );
    const selectedValue = backgroundInformation.familiarity;
    const selectedValueIndex = aiFamiliarity.findIndex((item) => {
        return item.name === selectedValue;
    });

    return (
        <SettingCard
            title="Familiarity with AI"
            icon="briefcase"
            isFlexEnabled={false}
        >
            <SelectValuesInput
                label="AI familiarity"
                selectableValues={selectableOptions}
                defaultValueIndex={selectedValueIndex}
                onSelect={(_, index) => {
                    storeDispatcher(
                        setAiFamiliarity(aiFamiliarity[index].name),
                    );
                }}
                width="100%"
                testId="ai-familiarity-select"
            />
        </SettingCard>
    );
};
