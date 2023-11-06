import React from 'react';

import AIGeneratedOutput from '../AIGeneratedOutput';
import { AIOptions } from '../../../types/Stage';

export default function AIRenderer({ options }: { options: AIOptions }) {
    return <AIGeneratedOutput text={options.prompt} prompt={options.prompt} />;
}
