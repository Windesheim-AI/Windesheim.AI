export const MaxSize = 20;
export const MinSize = 8;
export const StepSize = 1;
export const DefaultSize = 12;

// Fonts work as follows;
// The setting is the font ratio; MaxSize is max, MinSize is min, StepSize is the step size, and DefaultSize is the default size.
// If the h1 size is 20 on default (12), then on font size 20 it is 33 on the largest size.

const fontMap = {
    h1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    h3: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    h4: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    h5: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    h6: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    p: {
        fontSize: 12,
    },
    small: {
        fontSize: 10,
    },
};

export function useFontSize() {
    
}
