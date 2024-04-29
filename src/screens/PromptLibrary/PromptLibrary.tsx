import React from 'react';

import { TitleSimple } from '../../components/general/text/TitleSimple';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PromptsOverview } from '../../components/promptLibary/PromptsOverview';

export function PromptLibrary() {
    return (
        <PageScrollView>
            <TitleSimple
                titleText="Prompt library"
                explainationText="Here you'll find a collection of prompts that you can use to easily navigate AI tools. You can filter by tools and sector to find the right prompt you need."
            />
            <PromptsOverview />
        </PageScrollView>
    );
}
