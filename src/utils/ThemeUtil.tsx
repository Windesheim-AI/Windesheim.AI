import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';

const useTheme = () => {
    const colorScheme = useColorScheme();

    const useBackgroundColor = () => {
        return colorScheme === 'dark'
            ? Colors.dark.background
            : Colors.light.background;
    };

    const useBar1Color = () => {
        return colorScheme === 'dark' ? Colors.dark.bg_1 : Colors.light.bg_1;
    };

    const useBar2Color = () => {
        return colorScheme === 'dark' ? Colors.dark.bg_2 : Colors.light.bg_2;
    };

    const useBar3Color = () => {
        return colorScheme === 'dark' ? Colors.dark.bg_3 : Colors.light.bg_3;
    };

    return { useBackgroundColor, useBar1Color, useBar2Color, useBar3Color };
};

export default useTheme;
