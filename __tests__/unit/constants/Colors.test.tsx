// Mock the Redux and useSelector
import { colorMap, useColorConfig } from '../../../src/lib/constants/Colors';
import { useAppSelector } from '../../../src/lib/redux/Hooks';
import { ThemeState } from '../../../src/lib/redux/slices/ThemeSlice';

jest.mock('../../../src/lib/redux/Store', () => ({
    useAppSelector: jest.fn(),
}));

describe('useColorConfig', () => {
    it('should return the light color configuration when the theme is "light"', () => {
        const mockedState: ThemeState = {
            theme: 'light',
            isHighContrastEnabled: false,
        };
        (useAppSelector as jest.Mock).mockReturnValue(mockedState);
        const colorConfig = useColorConfig();
        expect(colorConfig).toEqual(colorMap.light);
    });

    it('should return the dark color configuration when the theme is "dark"', () => {
        const mockedState: ThemeState = {
            theme: 'dark',
            isHighContrastEnabled: false,
        };
        (useAppSelector as jest.Mock).mockReturnValue(mockedState);
        const colorConfig = useColorConfig();
        expect(colorConfig).toEqual(colorMap.dark);
    });

    it('should return the dark color configuration by default when the theme is not recognized', () => {
        const mockedState: ThemeState = {
            // @ts-ignore
            theme: 'unknown-theme',
            isHighContrastEnabled: false,
        };
        (useAppSelector as jest.Mock).mockReturnValue(mockedState);
        const colorConfig = useColorConfig();
        expect(colorConfig).toEqual(colorMap.dark);
    });
});
