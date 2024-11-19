import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Background } from '../../../src/components/general/background/Background';

jest.useFakeTimers();

it('renders correctly', () => {
    const { toJSON } = render(<Background />);
    expect(toJSON()).toMatchSnapshot();
});
