import * as React from 'react';
import { Text } from 'react-native';

import { GoBackButton } from '../../components/buttons/GoBackButton';
import { PageView } from '../../components/general/PageView';

export const ThemeSwitcherScreen = () => {
    return (
        <PageView title="Settings > Theme switcher">
            <Text>test</Text>
            <GoBackButton />
        </PageView>
    );
};
