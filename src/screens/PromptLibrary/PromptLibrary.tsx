import React from 'react';

import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PromptsOverview } from '../../components/promptLibary/PromptsOverview';

export function PromptLibrary() {
    return (
        <PageScrollView title="PROMPT LIBRARY">
            <PromptsOverview />
        </PageScrollView>
    );
}
