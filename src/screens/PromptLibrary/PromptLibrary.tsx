import React from 'react';

import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PromptsOverview } from '../../components/promptLibary/PromptsOverview';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';

export function PromptLibrary() {
    const navigation = useNavigation();

    return (
        <PageScrollView title="Prompt Library">
            <GoBackButton
                onPress={() => navigation.navigate(Routes.Study)}
                buttonText="Study"
            />

            <PromptsOverview />
        </PageScrollView>
    );
}
