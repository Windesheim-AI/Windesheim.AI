import { render } from '@testing-library/react-native';
import React from 'react';

import Translator from '../../../../src/lib/translation/Translator';

// Mock Translator Factory module
jest.mock(
    '../../../../src/lib/translation/translators/TranslatorFactory',
    () => ({
        create: jest.fn(() => ({
            translate: jest.fn((text) => Promise.resolve(text)),
        })),
    }),
);

// Mock Constants module
jest.mock('../../../../src/constants/Languages', () => ({
    defaultLanguageCode: 'en',
}));

describe('Translator component', () => {
    const googleApiKey = 'your-api-key';

    it('renders without crashing', () => {
        render(
            <Translator to="fr" from="en" googleApiKey={googleApiKey}>
                <div>Test</div>
            </Translator>,
        );
    });
});
