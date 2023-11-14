import React from 'react';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../constants/Colors';

export type WhSelectDropdownProps<T> = {
    data: T[];
    onSelect?: (selectedItem: T, index: number) => void;
    label: string;
    searchText: string;
    width?: number;
    defaultValueByIndex?: number;
    defaultValue?: string;
    testID?: string;
};

export function WhSelectDropdown<T>({
    data,
    onSelect,
    label,
    searchText,
    width,
    defaultValueByIndex,
    defaultValue,
    testID,
}: WhSelectDropdownProps<T>) {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            width: width ?? '50%',
        },
        dropdown2BtnStyle: {
            width: '100%',
            height: 50,
            backgroundColor: colors.background,
            borderRadius: 8,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: colors.text,
        },
        dropdown2BtnTxtStyle: {
            color: colors.text,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        dropdown2DropdownStyle: {
            backgroundColor: colors.background,
            borderRadius: 12,
        },
        dropdown2RowStyle: {
            backgroundColor: colors.background,
            borderBottomColor: colors.borderColor,
        },
        dropdown2RowTxtStyle: {
            color: colors.text,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        dropdown2SelectedRowStyle: { backgroundColor: colors.background },
        dropdown2searchInputStyleStyle: {
            paddingLeft: 30,
            backgroundColor: colors.background,
            borderBottomWidth: 1,
            borderBottomColor: colors.borderColor,
        },
    });

    return (
        <View testID={testID} style={styles.container}>
            <SelectDropdown
                data={data}
                defaultValueByIndex={defaultValueByIndex}
                defaultValue={defaultValue}
                // @ts-ignore
                onSelect={onSelect}
                defaultButtonText={label}
                buttonTextAfterSelection={(selectedItem) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return selectedItem;
                }}
                rowTextForSelection={(item) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return item;
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={(isOpened) => (
                    <FontAwesome5
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={colors.text}
                        size={14}
                    />
                )}
                dropdownIconPosition="right"
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
                selectedRowStyle={styles.dropdown2SelectedRowStyle}
                search
                searchInputStyle={styles.dropdown2searchInputStyleStyle}
                searchPlaceHolder={searchText}
                searchPlaceHolderColor={colors.text}
                searchInputTxtColor={colors.text}
                renderSearchInputLeftIcon={() => (
                    <FontAwesome5 name="search" color={colors.text} size={14} />
                )}
            />
        </View>
    );
}
