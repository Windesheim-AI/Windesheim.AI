import { TextStyle } from 'react-native';

import { useColorConfig } from './Colors';
import { RootState, useAppSelector } from '../redux/Hooks';

export const MaxSize = 40;
export const MinSize = 12;
export const StepSize = 1;
export const DefaultSize = 24;

// Fonts work as follows;
// The setting is the font ratio; MaxSize is max, MinSize is min, StepSize is the step size, and DefaultSize is the default size.
// If the h1 size is 20 on default (12), then on font size 20 it is 33 on the largest size.

type TextStyling = {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    h4: TextStyle;
    h5: TextStyle;
    h6: TextStyle;
    icon: TextStyle;
    p: TextStyle;
    small: TextStyle;
    description: TextStyle;
    accent: TextStyle;
    button: TextStyle;
};

export function useFonts() {
    const colors = useColorConfig();

    const fontMap: TextStyling = {
        h1: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.titleDefault,
        },
        h2: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
        },
        h3: {
            fontSize: 16,
        },
        h4: {
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.text,
        },
        h5: {
            fontSize: 12,
        },
        icon: {
            fontSize: 15,
        },
        description: {
            color: colors.subtext,
            fontSize: 14,
        },
        h6: {
            fontSize: 10,
        },
        p: {
            fontSize: 12,
            color: colors.background,
        },
        small: {
            fontSize: 10,
        },
        accent: {
            fontSize: 12,
            color: colors.descriptionDefault,
        },
        button: {
            fontSize: 16,
            fontWeight: 'bold',
        },
    };

    const fontState = useAppSelector((state: RootState) => state.fontSize);
    // normal size * (font size / default size)
    // for all of font map
    const keys = Object.keys(fontMap) as (keyof typeof fontMap)[];
    // new font map
    const newFontMap = {} as typeof fontMap;
    for (const key of keys) {
        const font = fontMap[key];
        if (font.fontSize) {
            newFontMap[key] = {
                ...font,
                fontSize: calculateNewSize(font.fontSize, fontState.fontSize),
                color: font.color ?? colors.text,
            };
        }
    }
    return newFontMap;
}

export const calculateNewSize = (size: number, fontState: number) => {
    return size * (fontState / DefaultSize);
};
