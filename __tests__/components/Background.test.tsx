import * as React from 'react';
import renderer from 'react-test-renderer';

import { Background } from '../../src/components/Background';

jest.useFakeTimers();

test('renders correctly', () => {
    const tree = renderer.create(<Background />).toJSON();
    expect(tree).toMatchSnapshot();
});
