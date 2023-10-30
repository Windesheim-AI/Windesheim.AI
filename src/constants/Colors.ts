import { hasKeyInMap } from '../lib/utility/data';
import { RootState, useAppSelector } from '../redux/Store';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export type ColorSchemeType = {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    text: string;
    background: string;
    tint: string;
    gray: string;
    black: string;
    tabIconDefault: string;
    tabIconSelected: string;
    titleDefault: string;
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
    borderColor: string;
    listItemBg: string;
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
        gray: '#919191',
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
        titleDefault: '#000',
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
        borderColor: '#ccc',
        listItemBg: '#DCDCDC',
        black: '#000000',
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
        gray: '#919191',
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
        titleDefault: '#fff',
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
        borderColor: '#ccc',
        listItemBg: '#373737',
        black: '#000000',
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

export function useCurrentTheme() {
    return useAppSelector((state: RootState) => state.theme).theme;
}

export function useColorConfig() {
    const theme = useCurrentTheme();
    if (hasKeyInMap(colorMap, theme)) return colorMap[theme];
    return colorMap.dark;
}
