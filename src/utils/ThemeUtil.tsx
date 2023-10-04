import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';

const useTheme = () => {
    const colorScheme = useColorScheme();

    const backgroundColor =
        colorScheme === 'dark'
            ? Colors.dark.background
            : Colors.light.background;

    const bar1Color =
        colorScheme === 'dark' ? Colors.dark.bg_1 : Colors.light.bg_1;

    const bar2Color =
        colorScheme === 'dark' ? Colors.dark.bg_2 : Colors.light.bg_2;

    const bar3Color =
        colorScheme === 'dark' ? Colors.dark.bg_3 : Colors.light.bg_3;

    return {
        backgroundColor,
        bar1Color,
        bar2Color,
        bar3Color,
    };
};

export default useTheme;
