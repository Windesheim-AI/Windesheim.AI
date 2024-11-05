import React from 'react';

import { ScansOverview } from '../../components/Scans/ScansOverview';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';

export function Scans() {
    const navigator = useNavigation();

    return (
        <PageScrollView title="Scans">

            <ScansOverview />
        </PageScrollView>
    );
}
