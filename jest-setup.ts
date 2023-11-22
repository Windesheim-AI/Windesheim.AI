// Import Jest Native matchers
import '@testing-library/jest-native/extend-expect';
import { useAppSelector } from './src/redux/Hooks';
import { ThemeState } from './src/redux/slices/ThemeSlice';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');
jest.mock('react-native-webview', () => 'WebView');

jest.mock('@react-native-async-storage/async-storage', () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@expo-google-fonts/inter', () => ({
    useFonts: () => [true, null],
    Inter_500Medium: {},
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

jest.mock('react-redux', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ActualReactRedux = jest.requireActual('react-redux');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        ...ActualReactRedux,
        useSelector: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
});

jest.mock('./src/redux/Hooks', () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
}));

const mockedState: ThemeState = { theme: 'light' };
(useAppSelector as jest.Mock).mockReturnValue(mockedState);

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translation hook can use it
    // without a warning being shown
    useTranslation: () => {
        return {
            t: (str: unknown) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));
