import { useNavigation as useReactNavigation } from '@react-navigation/native';

import { Routes } from '../../../routes/routes';

export function useNavigation() {
    const navigation = useReactNavigation();

    return {
        navigate(screen: Routes | string, params?: unknown) {
            //@ts-ignore
            navigation.navigate(screen, params);
        },
        addEventListener: navigation.addListener,
        goBack: navigation.goBack,
    };
}
