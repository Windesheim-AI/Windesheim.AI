import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, shadow } from 'react-native-paper';

import { ColorGradientScheme } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';

export type ChipFilterProps<T extends ReactNode> = {
    activeList: T[];
    filterList: T[];
    setActiveList: (list: T[]) => void;
    colorGradientScheme: ColorGradientScheme;
};

export function ChipFilter<T extends ReactNode>({
    activeList,
    filterList,
    setActiveList,
    colorGradientScheme,
}: ChipFilterProps<T>) {
    const fonts = useFonts();
    const styles = StyleSheet.create({
        tagContainer: {
            flexDirection: 'row',
            marginBottom: 5,
        },
    });

    function getStyleForChip(isToolSelected: boolean) {
        return {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: isToolSelected
                ? colorGradientScheme[1]
                : colorGradientScheme[0], // Use colors.secondary instead of randomColor()
            ...shadow,
        };
    }

    function handleChipLongPress(filter: T) {
        // toggle all off but the one pressed
        setActiveList([filter]);
    }

    function toggleOption(filter: T) {
        if (activeList.includes(filter)) {
            setActiveList(activeList.filter((item) => item !== filter));
        } else {
            setActiveList([...activeList, filter]);
        }
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tagContainer}>
                {filterList.map((filter) => (
                    <Chip
                        key={filter?.toString()}
                        style={getStyleForChip(activeList.includes(filter))}
                        textStyle={fonts.description}
                        icon={activeList.includes(filter) ? 'check' : 'close'}
                        onPress={() => toggleOption(filter)}
                        onLongPress={() => handleChipLongPress(filter)}
                    >
                        {filter}
                    </Chip>
                ))}
            </View>
        </ScrollView>
    );
}
