import React from 'react';

import { WhSelectDropdown } from './WhSelectDropdown';
import { useTextTranslate } from '../../../translations/hooks';

type Props = {
    label: string;
    selectableValues: string[];
    defaultValueIndex: number;
    onSelect: (selectedItem: string) => void;
    testId?: string;
    width?: string;
};

export const SelectValuesInput = ({
    label,
    selectableValues,
    defaultValueIndex,
    onSelect,
    testId,
    width,
}: Props) => {
    return (
        <WhSelectDropdown<string>
            data={selectableValues}
            label={useTextTranslate(label)}
            searchText={useTextTranslate('Search...')}
            defaultValue={selectableValues[defaultValueIndex]}
            onSelect={(selectedItem) => onSelect(selectedItem)}
            testID={testId}
            width={width}
        />
    );
};
