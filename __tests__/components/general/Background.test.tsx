import * as React from 'react';
import renderer from 'react-test-renderer';

import { Background } from '../../../src/components/general/Background';

jest.useFakeTimers();

jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
        ...ActualReactRedux,
        useSelector: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
});

test('renders correctly', () => {
    const tree = renderer.create(<Background />).toJSON();
    expect(tree).toMatchSnapshot();
});
