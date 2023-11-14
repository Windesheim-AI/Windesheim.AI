import { loadingSlice } from '../../../../src/redux/slices/LoadingSlice';

const { setLoading } = loadingSlice.actions;

describe('loadingSlice', () => {
    it('should have the correct initial state', () => {
        const initialState = loadingSlice.reducer(undefined, {
            type: undefined,
        });
        expect(initialState).toEqual({ isLoading: false });
    });

    it('should handle loading state changes', () => {
        const initialState = { isLoading: false };

        expect(
            loadingSlice.reducer(initialState, setLoading(true)).isLoading,
        ).toEqual(true);

        expect(
            loadingSlice.reducer(initialState, setLoading(false)).isLoading,
        ).toEqual(false);
    });
});
