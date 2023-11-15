import {
    useFonts as useExpoFonts,
    Inter_600SemiBold,
    Inter_400Regular,
    Inter_300Light,
    Inter_500Medium,
} from '@expo-google-fonts/inter';
import { TextStyle } from 'react-native';

import { useColorConfig } from './Colors';
import { useAppSelector } from '../redux/Hooks';

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
    info: TextStyle;
    default: TextStyle;
    p: TextStyle;
    description: TextStyle;
    link: TextStyle;
    small: TextStyle;
    quote: TextStyle;
    accent: TextStyle;
    alert: TextStyle;
    button: TextStyle;
    buttonLarger: TextStyle;
    courseTitle: TextStyle;
    courseSubTitle: TextStyle;
};

// eslint-disable-next-line complexity
export function useFonts() {
    const colors = useColorConfig();

    const [areFontsLoaded] = useExpoFonts({
        Inter_600SemiBold,
        Inter_500Medium,
        Inter_400Regular,
        Inter_300Light,
    });

    const fontMap: TextStyling = {
        h1: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.titleDefault,
            fontFamily: areFontsLoaded
                ? 'Inter_600SemiBold'
                : 'sans-serif-medium',
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
            color: colors.text,
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'sans-serif',
        },
        h5: {
            fontSize: 13,
        },
        h6: {
            fontSize: 12,
        },
        icon: {
            fontSize: 15,
        },
        info: {
            fontSize: 15,
        },
        default: {
            fontSize: 16,
            color: colors.text,
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'sans-serif',
        },
        description: {
            color: colors.text,
            fontSize: 14,
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'sans-serif',
        },
        quote: {
            color: colors.text,
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'sans-serif',
            fontSize: 16,
            fontStyle: 'italic',
        },
        link: {
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 10,
            color: colors.text,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: colors.link,
        },
        p: {
            fontSize: 12,
            color: colors.subtext,
        },
        small: {
            fontSize: 10,
        },
        accent: {
            fontSize: 12,
            color: colors.descriptionDefault,
        },
        alert: {
            color: colors.text,
            fontFamily: areFontsLoaded
                ? 'Inter_500Medium'
                : 'sans-serif-medium',
            fontSize: 16,
            fontWeight: 'bold',
        },
        button: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.buttonText,
        },
        buttonLarger: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.buttonText,
        },
        courseTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
            fontFamily: areFontsLoaded
                ? 'Inter_600SemiBold'
                : 'sans-serif-medium',
        },
        courseSubTitle: {
            fontSize: 12,
            fontStyle: 'italic',
            color: colors.subTitle,
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'sans-serif',
        },
    };

    const fontState = useAppSelector((state) => state.fontSize);
    // normal size * (font size / default size)
    // for all font map
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
