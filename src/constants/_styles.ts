import { StyleSheet } from 'react-native';

import { useColorConfig } from './Colors';
import { useFonts } from '../constants/Fonts';

export const useStyles = () => {
    const colors = useColorConfig();
    const fonts = useFonts();

    return StyleSheet.create({
        HeaderText: {
            ...fonts.h1,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.text,
        },
        Info: {
            ...fonts.info,
            color: colors.gray,
            marginBottom: 10,
            textAlign: 'center', //IOS
        },
        Info2: {
            ...fonts.info,
            color: colors.gray,
        },
        Info3: {
            ...fonts.h3,
            color: colors.text,
            marginTop: 10,
            marginBottom: 10,
            textAlign: 'center', //IOS
        },
    });
};
