import { StyleSheet } from 'react-native';

import { useColorConfig } from './Colors';

export const useStyles = () => {
    const colors = useColorConfig();

    return StyleSheet.create({
        HeaderText: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.text,
        },
        Info: {
            fontSize: 15,
            color: colors.gray,
            marginBottom: 10,
            textAlign: 'center', //IOS
        },
        Info2: {
            fontSize: 15,
            color: colors.gray,
        },
        Info3: {
            fontSize: 16,
            color: colors.text,
            marginTop: 10,
            marginBottom: 10,
            textAlign: 'center', //IOS
        },
    });
};
