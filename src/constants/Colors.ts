import { hasKeyInMap } from '../lib/utility/data';
import { RootState, useAppSelector } from '../redux/Hooks';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export type ColorSchemeType = {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    link: string;
    text: string;
    textLight: string;
    background: string;
    backgroundModal: string;
    tint: string;
    gray: string;
    black: string;
    white: string;
    blue: string;
    tabIconDefault: string;
    tabIconSelected: string;
    titleDefault: string;
    descriptionDefault: string;
    buttonText: string;
    bg1: string;
    bg2: string;
    bg3: string;
    settingButtonBG: string;
    modalBackground: string;
    subtext: string;
    navBar: {
        backgroundColor: string;
        color: string;
    };
    subTitle: string;
    borderColor: string;
    listItemBg: string;
    opacityLayer: string;
};
export const colorMap: Record<'dark' | 'light', ColorSchemeType> = {
    light: {
        primary: '#4695D3',
        secondary: '#fff377',
        success: '#45B97C',
        warning: '#ff7300',
        danger: '#EE3135',
        buttonText: '#3F3f3f',
        link: '#ffcb05',
        text: '#000',
        textLight: '#fff',
        background: '#fff',
        backgroundModal: 'rgba(0, 0, 0, 0.8)',
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
        modalBackground: 'rgba(0,0,0,0.5)',
        subtext: '#a8a7a7',
        navBar: {
            backgroundColor: '#FAFAFA',
            color: '#2B2A2A',
        },
        borderColor: '#ccc',
        subTitle: '#2B2A2A',
        listItemBg: '#DCDCDC',
        white: '#FFFFFF',
        black: '#000000',
        blue: '#0000FF',
        opacityLayer: 'rgba(255,255,255,0.8)',
    },
    dark: {
        primary: '#4695D3',
        secondary: '#fff377',
        success: '#45B97C',
        warning: '#ff7300',
        danger: '#EE3135',
        link: '#ffcb05',
        text: '#fff',
        textLight: '#fff',
        buttonText: '#3F3f3f',
        background: '#2a2a2a',
        backgroundModal: 'rgba(0, 0, 0, 0.8)',
        tint: tintColorDark,
        gray: '#919191',
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
        titleDefault: '#fff',
        modalBackground: 'rgba(0,0,0,0.5)',
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
        subTitle: '#c4c4c4',
        borderColor: '#ccc',
        listItemBg: '#373737',
        white: '#FFFFFF',
        black: '#000000',
        blue: '#0000FF',
        opacityLayer: 'rgba(0,0,0,0.6)',
    },
};

export const shadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 5,
        height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
};

export type ColorGradientScheme = [string, string, string];
export type ColorTypes =
    | 'primary'
    | 'info'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning';

export type ColorIconMapping = {
    [key in ColorTypes]: string;
};

export const colorIconMapping: ColorIconMapping = {
    primary: 'info',
    info: 'info',
    secondary: 'square',
    success: 'check-circle',
    danger: 'times-circle',
    warning: 'exclamation-triangle',
};

export type ColorGradientSchemes = Record<ColorTypes, ColorGradientScheme>;

export type StateColorGradientSchemes = {
    primary: ColorGradientScheme;
    info: ColorGradientScheme;
    secondary: ColorGradientScheme;
    success: ColorGradientScheme;
    warning: ColorGradientScheme;
    danger: ColorGradientScheme;
};

export const stateColorSchemes: StateColorGradientSchemes = {
    primary: ['#4695D3', '#22BDC6', '#86D2D9'],
    info: ['#4695D3', '#22BDC6', '#86D2D9'],
    secondary: ['#FFCB05', '#FFD949', '#FFF377'],
    success: ['#45B97C', '#B1D249', '#D5E05B'],
    warning: ['#ff7300', '#f59e56', '#ffcc66'],
    danger: ['#EE3135', '#F16682', '#F287B7'],
};

export function useCurrentTheme(): 'dark' | 'light' {
    return useAppSelector((state) => state.theme).theme;
}

export function useColorConfig(): ColorSchemeType {
    const theme = useCurrentTheme();

    return hasKeyInMap(colorMap, theme) ? colorMap[theme] : colorMap.dark;
}
