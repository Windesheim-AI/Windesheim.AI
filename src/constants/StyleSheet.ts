import { StyleSheet } from 'react-native';

import { colorMap } from './Colors';

const colors = colorMap.dark;

const WindesheimColorBackground = StyleSheet.create({
    bar: {
        backgroundColor: colors.bg1,
        flex: 1,
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    bar2: {
        backgroundColor: colors.bg2,
        height: '200%',
        left: '10%',
        position: 'absolute',
        top: '-50%',
        transform: [{ rotate: '22.365deg' }],
        width: '72%',
    },
    bar3: {
        backgroundColor: colors.bg3,
        height: '200%',
        left: '55%',
        position: 'absolute',
        top: '-20%',
        transform: [{ rotate: '22.365deg' }],
        width: '100%',
    },
    container: {
        flex: 1,
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
    },
});

export const styleMap = {
    WindesheimColorBackground,
};
