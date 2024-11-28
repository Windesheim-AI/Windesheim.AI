import React from 'react';

import { ScansOverview } from '../../components/Scans/ScansOverview';
import { PageScrollView } from '../../components/general/views/PageScrollView';

export function Scans() {
    return (
        <PageScrollView title="Scans">
            <ScansOverview />
        </PageScrollView>
    );
}
