import React from 'react';
import { useColorConfig } from '../../lib/constants/Colors';
import { LanguageSwitcher } from '../../components/settings/LanguageSwitcher';

export const StyledLanguageSwitcher = () => {
    const colors = useColorConfig();

    const customStyle = {
        backgroundColor: colors.previousButton,
        color: colors.text,
        borderColor: colors.text,
        borderRadius: 18,
    };

    const customDropdownStyle = {
        backgroundColor: colors.previousButton,
        borderRadius: 18,
        borderColor: colors.text,
    };

    return (
        <LanguageSwitcher
            style={customStyle}
            dropdownContainerStyle={customDropdownStyle}
        />
    );
};
