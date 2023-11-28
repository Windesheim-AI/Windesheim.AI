import React from 'react';

import { EditAiFamiliarityCard } from '../../components/BackgroundCollect/EditAiFamiliarityCard';
import { EditInterestedKeywordCard } from '../../components/BackgroundCollect/EditInterestedKeywordCard';
import { EditPositionCard } from '../../components/BackgroundCollect/EditPositionCard';
import { PageView } from '../../components/general/views/PageView';

export const BackgroundInfo = () => {
    return (
        <PageView title="Background Information">
            <EditPositionCard />
            <EditInterestedKeywordCard />
            <EditAiFamiliarityCard />
        </PageView>
    );
};
