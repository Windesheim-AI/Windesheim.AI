import { ColorSchemeName, useColorScheme } from 'react-native';

import { hasKeyInMap } from '../lib/utility/data';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

type ColorSchemeType = {
    text: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    bg_1: string;
    bg_2: string;
    bg_3: string;
};

const colorMap: Record<'dark' | 'light', ColorSchemeType> = {
    light: {
        text: '#000',
        background: '#fff',
        tint: tintColorLight,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
        bg_1: '#fff377',
        bg_2: '#ffd949',
        bg_3: '#ffcb05',
    },
    dark: {
        text: '#fff',
        background: '#2a2a2a',
        tint: tintColorDark,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
        bg_1: '#86d2d9',
        bg_2: '#22bdc6',
        bg_3: '#4695d3',
    },
};

export function useColorConfig() {
    const scheme: ColorSchemeName = useColorScheme();
    if (scheme && hasKeyInMap(colorMap, scheme)) return colorMap[scheme];
    return colorMap.dark;
}
