import React, { useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { usePreparedTranslator } from '../../../lib/translations/hooks';
import { handleError } from '../../../lib/utility/errorHandler';

export interface SelectableItem {
    label: string;
    value: string;
}

export type Props = {
    data: SelectableItem[];
    onSelect?: (selectedItem: SelectableItem) => void;
    label: string;
    defaultValue?: string;
    width?: number | string;
    testID?: string;
};

export function SelectDropdown({
    data,
    onSelect,
    label,
    defaultValue,
    width,
    testID,
}: Props) {
    const windowDimensions = useWindowDimensions();
    const screenWidth = windowDimensions.width;
    const colors = useColorConfig();
    const fonts = useFonts();
    const t = usePreparedTranslator();
    const [value, setValue] = useState(defaultValue);

    const dropdownWidth = 300;
    const dropdownLeft = (screenWidth - dropdownWidth) / 2;
    const dropdownRight = (screenWidth - dropdownWidth) / 2;

    const styles = StyleSheet.create({
        container: {
            // @ts-ignore
            width: width ?? '50%',
        },
        dropdownContainer: {
            borderRadius: 8,
            borderColor: colors.text,
            borderWidth: 1,
            left: dropdownLeft,
            right: dropdownRight,
            width: dropdownWidth,
            backgroundColor: colors.background,
            shadowColor: colors.black,
            shadowOpacity: 1,
            shadowRadius: 100,
            elevation: 100,
        },
        dropdown: {
            height: 50,
            backgroundColor: colors.background,
            padding: 12,
            borderRadius: 8,
            borderColor: colors.text,
            borderWidth: 1,
        },
        item: {
            padding: 17,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        selectedItem: {
            padding: 17,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.backgroundHighlight,
        },
        textItem: {
            flex: 1,
            ...fonts.default,
        },
        textSelectedItem: {
            flex: 1,
            ...fonts.default,
            color: colors.black,
        },
        placeholderStyle: {
            ...fonts.default,
        },
        selectedTextStyle: {
            ...fonts.default,
            height: 20,
            overflow: 'hidden',
        },
        iconStyle: {
            width: 30,
            height: 30,
        },
        inputSearchStyle: {
            width: '96%',
            height: 50,
            ...fonts.default,
            borderRadius: 8,
            borderColor: colors.gray,
        },
    });

    const handleOnSelect = (selectedItem: SelectableItem) => {
        setValue(selectedItem.value);
        if (!onSelect) {
            handleError('WhSelectDropdown onSelect is not implemented');
            return;
        }

        HapticFeedback(HapticForces.Light);
        onSelect(selectedItem);
    };

    const renderItem = (item: SelectableItem, selected?: boolean) => {
        return (
            <View style={selected ? styles.selectedItem : styles.item}>
                <Text
                    style={selected ? styles.textSelectedItem : styles.textItem}
                >
                    {item.label}
                </Text>
            </View>
        );
    };

    return (
        <View testID={testID} style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                // @ts-ignore
                iconStyle={styles.iconStyle}
                data={data}
                search
                labelField="label"
                valueField="value"
                placeholder={t(label)}
                searchPlaceholder={t('Search...')}
                searchPlaceholderTextColor={colors.black}
                value={value}
                onChange={(item: SelectableItem) => handleOnSelect(item)}
                renderItem={renderItem}
            />
        </View>
    );
}
