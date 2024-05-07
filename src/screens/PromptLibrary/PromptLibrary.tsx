import React from 'react';

import { TitleSimple } from '../../components/general/text/TitleSimple';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PromptsOverview } from '../../components/promptLibary/PromptsOverview';
import { PromptsTutorial } from '../../components/promptsTutorial/PromptsTutorial';
import { useAppSelector } from '../../lib/redux/Hooks';
import BackgroundCollectForm from '../UserBackground/BackgroundCollectForm';
export function PromptLibrary() {
    const isFirstTimeUser = useAppSelector(
        (state) => state.backgroundInformation.isFirstTimeUser,
    );
    return (
        <PageScrollView>
            <TitleSimple
                titleText="Prompt library"
                explainationText="Here you'll find a collection of prompts that you can use to easily navigate AI tools. You can filter by tools and sector to find the right prompt you need."
            />
            <PromptsOverview />
            {isFirstTimeUser ? <BackgroundCollectForm /> : null}
            {!isFirstTimeUser ? <PromptsTutorial /> : null}
        </PageScrollView>
    );
}
