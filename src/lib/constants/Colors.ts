import { ViewStyle } from 'react-native';

import { useAppSelector } from '../redux/Hooks';
import { hasKeyInMap } from '../utility/data';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export type ColorSchemeType = {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    enabled: string;
    danger: string;
    disabled: string;
    link: string;
    text: string;
    textLight: string;
    textHighlight: string;
    background: string;
    backgroundHighlight: string;
    backgroundModal: string;
    tint: string;
    gray: string;
    black: string;
    white: string;
    blue: string;
    attentionYellow: string;
    disclaimerText: string;
    yellowCards: string;
    lightGrey: string;
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
        itemBackgroundColor: string;
        activeItemBackgroundColor: string;
        color: string;
        activeColor: string;
    };
    subTitle: string;
    borderColor: string;
    listItemBg: string;
    opacityLayer: string;
    accentTitle: string;
    progressbarBg: string;
    completedProgressBar: string;
    seeAllText: string;
    techProviderGradient: string[];
    subCard: string;
    previousButtonColor: string;
    continueButtonColor: string;
};

export const colorMap: Record<'dark' | 'light', ColorSchemeType> = {
    light: {
        primary: '#4695D3',
        secondary: '#fff377',
        success: '#45B97C',
        warning: '#ff7300',
        danger: '#EE3135',
        enabled: '#45B97C',
        disabled: '#999',
        buttonText: '#3F3f3f',
        link: '#ffcb05',
        text: '#010101',
        textLight: '#fff',
        textHighlight: '#fff',
        background: '#fafafa',
        backgroundHighlight: '#4695D3',
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
            backgroundColor: '#FFFFF0',
            itemBackgroundColor: '#FAFAFA',
            activeItemBackgroundColor: '#EEEEEE',
            color: '#2a2a2a',
            activeColor: '#000000',
        },
        borderColor: '#ccc',
        subTitle: '#2B2A2A',
        listItemBg: '#FFFFFF',
        white: '#FFFFFF',
        black: '#000000',
        blue: '#0000FF',
        attentionYellow: '#FFF377',
        disclaimerText: '#000000',
        yellowCards: 'FFFFF0',
        lightGrey: '#D3D3D3',
        opacityLayer: 'rgba(255,255,255,0.8)',
        accentTitle: '#757575',
        progressbarBg: '#f3f3f5',
        completedProgressBar: '#FFD949',
        seeAllText: '#1C1C1C',
        techProviderGradient: ['#1c4e7a', '#0080bf', '#5c8ebf'],
        subCard: '#f4f3fd',
        previousButtonColor: '#000000',
        continueButtonColor: '#ffcb05',
    },
    dark: {
        primary: '#4695D3',
        secondary: '#fff377',
        success: '#45B97C',
        warning: '#ff7300',
        danger: '#EE3135',
        enabled: '#45B97C',
        disabled: '#999',
        link: '#ffcb05',
        text: '#fff',
        textLight: '#fff',
        textHighlight: '#fff',
        buttonText: '#fff',
        background: '#2a2a2a',
        backgroundHighlight: '#4695D3',
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
            backgroundColor: '#2a2a2a',
            itemBackgroundColor: '#FFFFFF',
            activeItemBackgroundColor: '#3f3f3f',
            color: '#DADADA',
            activeColor: '#FFFFFF',
        },
        subTitle: '#c4c4c4',
        borderColor: '#ccc',
        listItemBg: '#373737',
        white: '#FFFFFF',
        black: '#000000',
        blue: '#0000FF',
        attentionYellow: '#86D2D9',
        disclaimerText: '#000000',
        yellowCards: 'FFFFF0',
        lightGrey: '#D3D3D3',
        opacityLayer: 'rgba(0,0,0,0.6)',
        accentTitle: '#757575',
        progressbarBg: '#373737',
        completedProgressBar: '#FFD949',
        seeAllText: '#FFFFFF',
        techProviderGradient: ['#1c4e7a', '#0080bf', '#5c8ebf'],
        subCard: '#252525',
        previousButtonColor: '#FFFFFF',
        continueButtonColor: '#4695d3',
    },
};

const highContrastColorMap: Record<'dark' | 'light', ColorSchemeType> = {
    light: {
        primary: '#0000FF',
        secondary: '#FFFF00',
        success: '#00FF00',
        warning: '#FFA500',
        danger: '#FF0000',
        enabled: '#00FF00',
        disabled: '#000000',
        buttonText: '#000000',
        link: '#FFFF00',
        text: '#000000',
        textLight: '#FFFFFF',
        textHighlight: '#FFFFFF',
        background: '#FFFFFF',
        backgroundHighlight: '#0000FF',
        backgroundModal: 'rgba(0, 0, 0, 0.4)',
        tint: '#0000FF',
        gray: '#000000',
        tabIconDefault: '#000000',
        tabIconSelected: '#0000FF',
        titleDefault: '#000000',
        descriptionDefault: '#000',
        bg1: '#fff377',
        bg2: '#ffd949',
        bg3: '#ffcb05',
        settingButtonBG: '#FFFFFF',
        modalBackground: 'rgba(0, 0, 0, 0.4)',
        subtext: '#000000',
        navBar: {
            backgroundColor: '#FFFFFF',
            itemBackgroundColor: '#FFFFFF',
            activeItemBackgroundColor: '#000000',
            color: '#000000',
            activeColor: '#FFFFFF',
        },
        borderColor: '#000000',
        subTitle: '#000000',
        listItemBg: '#FFFFFF',
        white: '#FFFFFF',
        black: '#000000',
        blue: '#0000FF',
        attentionYellow: '#D9C300',
        disclaimerText: '#000000',
        yellowCards: 'FFFFF0',
        lightGrey: '#D3D3D3',
        opacityLayer: 'rgba(255,255,255,0.9)',
        seeAllText: '#000000',
        progressbarBg: '#FFFFFF',
        completedProgressBar: '#00FF00',
        accentTitle: '#000000',
        techProviderGradient: ['#1c4e7a', '#0080bf', '#5c8ebf'],
        subCard: '#f4f3fd',
        previousButtonColor: '#000000',
        continueButtonColor: '#00FF00',
    },
    dark: {
        primary: '#0000FF',
        secondary: '#FFFF00',
        success: '#00FF00',
        warning: '#FFA500',
        danger: '#FF0000',
        enabled: '#00FF00',
        disabled: '#FFFFFF',
        link: '#FFFF00',
        text: '#FFFFFF',
        textLight: '#FFFFFF',
        textHighlight: '#FFFFFF',
        buttonText: '#FFFFFF',
        background: '#000000',
        backgroundHighlight: '#0000FF',
        backgroundModal: 'rgba(0,0,0,0.4)',
        tint: '#FFFFFF',
        gray: '#6e6e6e',
        tabIconDefault: '#FFFFFF',
        tabIconSelected: '#FFFFFF',
        titleDefault: '#FFFFFF',
        modalBackground: 'rgba(0,0,0,0.4)',
        descriptionDefault: '#fff',
        bg1: '#86d2d9',
        bg2: '#22bdc6',
        bg3: '#4695d3',
        settingButtonBG: '#000000',
        subtext: '#fff',
        navBar: {
            backgroundColor: '#000000',
            itemBackgroundColor: '#000000',
            activeItemBackgroundColor: '#FFFFFF',
            color: '#FFFFFF',
            activeColor: '#000000',
        },
        subTitle: '#FFFFFF',
        borderColor: '#FFFFFF',
        listItemBg: '#000000',
        white: '#FFFFFF',
        black: '#000000',
        blue: '#0000FF',
        attentionYellow: '#008B8B',
        disclaimerText: '#FFFFFF',
        yellowCards: 'FFFFF0',
        lightGrey: '#D3D3D3',
        opacityLayer: 'rgba(0,0,0,0.6)',
        seeAllText: '#FFFFFF',
        accentTitle: '#FFFFFF',
        progressbarBg: '#FFFFFF',
        completedProgressBar: '#0000FF',
        techProviderGradient: ['#1c4e7a', '#0080bf', '#5c8ebf'],
        subCard: '#1C1C1C',
        previousButtonColor: '#FFFFFF',
        continueButtonColor: '#0000FF',
    },
};

// box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
export const shadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
};

export const uppershadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: -4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
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

const highContrastStateColorSchemes: StateColorGradientSchemes = {
    primary: ['#0000FF', '#0000FF', '#0000FF'],
    info: ['#0000FF', '#0000FF', '#0000FF'],
    secondary: ['#FFFF00', '#FFFF00', '#FFFF00'],
    success: ['#00FF00', '#00FF00', '#00FF00'],
    warning: ['#FFA500', '#FFA500', '#FFA500'],
    danger: ['#FF0000', '#FF0000', '#FF0000'],
};

export type StateTextColorSchemes = {
    primary: string;
    info: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
};

const highContrastStateTextColorSchemes: StateTextColorSchemes = {
    primary: '#FFFFFF',
    info: '#FFFFFF',
    secondary: '#000000',
    success: '#000000',
    warning: '#000000',
    danger: '#FFFFFF',
};

export function useCurrentTheme(): 'dark' | 'light' {
    return useAppSelector((state) => state.theme).theme;
}

export function useCurrentHighContrastMode(): boolean {
    return useAppSelector((state) => state.theme).isHighContrastEnabled;
}

function useCurrentStateTextColorScheme(): StateTextColorSchemes | null {
    const isHighContrastEnabled = useCurrentHighContrastMode();
    if (isHighContrastEnabled) {
        return highContrastStateTextColorSchemes;
    }

    return null;
}

function useHighContrastBorderIfNecessary(): ViewStyle {
    const isHighContrastEnabled = useCurrentHighContrastMode();
    const theme = useCurrentTheme();
    if (isHighContrastEnabled) {
        return {
            borderColor:
                theme === 'dark' ? colorMap.dark.white : colorMap.light.black,
            borderWidth: 3,
            borderStyle: 'solid',
        };
    }

    return {};
}

function useCurrentStateColorScheme(): StateColorGradientSchemes {
    const isHighContrastEnabled = useCurrentHighContrastMode();
    if (isHighContrastEnabled) {
        return highContrastStateColorSchemes;
    }

    return stateColorSchemes;
}

type ColorStateConfig = {
    colors: ReturnType<typeof useCurrentStateColorScheme>;
    text: ReturnType<typeof useCurrentStateTextColorScheme>;
    highContrastBorder: ReturnType<typeof useHighContrastBorderIfNecessary>;
    isHighContrastEnabled: ReturnType<typeof useCurrentHighContrastMode>;
};

export function useColorStateConfig(): ColorStateConfig {
    return {
        colors: useCurrentStateColorScheme(),
        text: useCurrentStateTextColorScheme(),
        highContrastBorder: useHighContrastBorderIfNecessary(),
        isHighContrastEnabled: useCurrentHighContrastMode(),
    };
}

//mystery function
export function festive() {
    const newMap = colorMap;
    newMap.dark.bg1 = '#ff0000';
    newMap.dark.bg2 = '#228b22'; // Forest Green
    newMap.dark.bg3 = '#ff0000';
    newMap.light.bg1 = '#ff0000';
    newMap.light.bg2 = '#228b22'; // Forest Green
    newMap.light.bg3 = '#ff0000';
    return newMap;
}

export function useColorConfig(): ColorSchemeType {
    const theme = useCurrentTheme();
    const isHighContrastEnabled = useCurrentHighContrastMode();

    //check festive
    const currentDate = new Date();
    const isChristmas =
        currentDate.getMonth() === 11 &&
        currentDate.getDate() >= 24 &&
        currentDate.getDate() <= 26;
    if (isChristmas) {
        const map = festive();
        return hasKeyInMap(map, theme) ? map[theme] : map.dark; // Assuming you have a `festiveColorMap` defined
    }

    if (isHighContrastEnabled) {
        return hasKeyInMap(highContrastColorMap, theme)
            ? highContrastColorMap[theme]
            : highContrastColorMap.dark;
    }

    return hasKeyInMap(colorMap, theme) ? colorMap[theme] : colorMap.dark;
}
