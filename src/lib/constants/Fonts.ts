/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFonts as useExpoFonts } from '@expo-google-fonts/inter';
import { TextStyle } from 'react-native';

import { useColorConfig } from './Colors';
import { useAppSelector } from '../redux/Hooks';

// import the font files from the assets folder

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
    chipText: TextStyle;
    smallLink: TextStyle;
};

// eslint-disable-next-line complexity
export function useFonts() {
    const colors = useColorConfig();

    const [areFontsLoaded] = useExpoFonts({
        Inter_100Thin: require('../../assets/fonts/Inter/Inter-Thin.ttf'),
        Inter_200ExtraLight: require('../../assets/fonts/Inter/Inter-ExtraLight.ttf'),
        Inter_300Light: require('../../assets/fonts/Inter/Inter-Light.ttf'),
        Inter_400Regular: require('../../assets/fonts/Inter/Inter-Regular.ttf'),
        Inter_500Medium: require('../../assets/fonts/Inter/Inter-Medium.ttf'),
        Inter_600SemiBold: require('../../assets/fonts/Inter/Inter-SemiBold.ttf'),
        Inter_700Bold: require('../../assets/fonts/Inter/Inter-Bold.ttf'),
        Inter_800ExtraBold: require('../../assets/fonts/Inter/Inter-ExtraBold.ttf'),
        Inter_900Black: require('../../assets/fonts/Inter/Inter-Black.ttf'),

        // OPEN SANS
        OpenSans_300Light: require('../../assets/fonts/OpenSans/OpenSans-Light.ttf'),
        OpenSans_400Regular: require('../../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
        OpenSans_600SemiBold: require('../../assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
        OpenSans_700Bold: require('../../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
        OpenSans_800ExtraBold: require('../../assets/fonts/OpenSans/OpenSans-ExtraBold.ttf'),
    });

    const fontMap: TextStyling = {
        h1: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.titleDefault,
            fontFamily: areFontsLoaded ? 'Inter_600SemiBold' : 'System',
        },
        h2: {
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: areFontsLoaded ? 'OpenSans_700Bold' : 'System',
            color: colors.text,
        },
        h3: {
            fontSize: 16,
        },
        h4: {
            fontSize: 14,
            color: colors.text,
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'System',
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
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'System',
        },
        description: {
            color: colors.text,
            fontSize: 14,
            fontFamily: areFontsLoaded ? 'OpenSans_400Regular' : 'System',
        },
        quote: {
            color: colors.text,
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'System',
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
            fontFamily: areFontsLoaded ? 'Inter_500Medium' : 'System',
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
            fontFamily: areFontsLoaded ? 'Inter_600SemiBold' : 'System',
        },
        courseSubTitle: {
            fontSize: 12,
            fontStyle: 'italic',
            color: colors.subTitle,
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'System',
        },
        chipText: {
            fontSize: 14,
            fontFamily: areFontsLoaded ? 'Inter_400Regular' : 'System',
        },
        smallLink: {
            fontSize: 13,
            fontFamily: areFontsLoaded ? 'OpenSans_400Regular' : 'System',
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
