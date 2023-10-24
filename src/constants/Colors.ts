import { ColorSchemeName, useColorScheme } from 'react-native';

import { hasKeyInMap } from '../lib/utility/data';
import { ThemeSlice } from '../redux/slices/ThemeSlice';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

type ColorSchemeType = {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    text: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    descriptionDefault: string;
    bg1: string;
    bg2: string;
    bg3: string;
    settingButtonBG: string;
    subtext: string;
    navBar: {
        backgroundColor: string;
        color: string;
    };
};
export const colorMap: Record<'dark' | 'light', ColorSchemeType> = {
    light: {
        primary: '#4695D3',
        secondary: '#fff377',
        success: '#45B97C',
        warning: '#ff7300',
        danger: '#EE3135',
        text: '#000',
        background: '#fff',
        tint: tintColorLight,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
        descriptionDefault: 'gray',
        bg1: '#fff377',
        bg2: '#ffd949',
        bg3: '#ffcb05',
        settingButtonBG: '#fffffff',
        subtext: '#a8a7a7',
        navBar: {
            backgroundColor: '#FAFAFA',
            color: '#2B2A2A',
        },
    },
    dark: {
        primary: '#4695D3',
        secondary: '#fff377',
        success: '#45B97C',
        warning: '#ff7300',
        danger: '#EE3135',
        text: '#fff',
        background: '#2a2a2a',
        tint: tintColorDark,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
        descriptionDefault: 'gray',
        bg1: '#86d2d9',
        bg2: '#22bdc6',
        bg3: '#4695d3',
        settingButtonBG: '#373737',
        subtext: '#a8a7a7',
        navBar: {
            backgroundColor: '#090A0A',
            color: '#c4c4c4',
        },
    },
};
export type ColorGradientScheme = [string, string, string];
export type ColorTypes =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning';

export type ColorGradientSchemes = Record<ColorTypes, ColorGradientScheme>;

export const buttonColorSchemes: ColorGradientSchemes = {
    secondary: ['#FFCB05', '#FFD949', '#FFF377'],
    success: ['#45B97C', '#B1D249', '#D5E05B'],
    primary: ['#4695D3', '#22BDC6', '#86D2D9'],
    danger: ['#EE3135', '#F16682', '#F287B7'],
    warning: ['#ff7300', '#f59e56', '#ffcc66'],
};

export function useColorConfig(theme: 'light' | 'dark') {
    if (hasKeyInMap(colorMap, theme)) return colorMap[theme];
    return colorMap.dark;
}
