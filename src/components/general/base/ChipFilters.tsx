import * as Haptics from 'expo-haptics';
import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, shadow } from 'react-native-paper';

import {
    ColorGradientScheme,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';

export type ChipFilterProps<T extends ReactNode> = {
    activeList: T[];
    filterList: T[];
    setActiveList: (list: T[]) => void;
    colorGradientScheme: ColorGradientScheme;
    textColorScheme?: string;
};

export function ChipFilter<T extends ReactNode>({
    activeList,
    filterList,
    setActiveList,
    colorGradientScheme,
    textColorScheme,
}: ChipFilterProps<T>) {
    const colorStateConfig = useColorStateConfig();
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
            ...colorStateConfig.highContrastBorder,
        };
    }

    function getStyleForChipText() {
        if (textColorScheme) {
            return {
                ...fonts.chipText,
                color: textColorScheme,
            };
        }

        return fonts.chipText;
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
                        textStyle={getStyleForChipText()}
                        icon={activeList.includes(filter) ? 'check' : 'close'}
                        onPress={() => {
                            // eslint-disable-next-line no-void
                            void Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light,
                            );
                            toggleOption(filter);
                        }}
                        onLongPress={() => {
                            // eslint-disable-next-line no-void
                            void Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Heavy,
                            );
                            handleChipLongPress(filter);
                        }}
                        testID={`chip-${filter?.toString()}`}
                    >
                        {filter}
                    </Chip>
                ))}
            </View>
        </ScrollView>
    );
}
