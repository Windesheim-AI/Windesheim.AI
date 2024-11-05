import React from 'react';

import { CoursesOverview } from '../../components/course/CoursesOverview';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';

export function Scans() {
    const navigator = useNavigation();

    return (
        <PageScrollView title="Scans">
            <GoBackButton />
        </PageScrollView>
    );
}
