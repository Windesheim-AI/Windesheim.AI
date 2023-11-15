import React from 'react';
import { Text } from 'react-native';

import CaseStudyList from '../../components/caseStudies/CaseStudyList';
import { Usecase } from '../../components/general/buttons/UsecaseButton';
import HorizontalScroll from '../../components/general/views/HorizontalScroll';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { useStyles } from '../../constants/_styles';
import { Routes } from '../../routes/routes';

export const UsecaseScreen = () => {
    const styles = useStyles();
    return (
        <PageScrollView title="UseCase">
            {/* "description" */}
            <Text style={styles.Info2}>Inspiration library: Case studies</Text>

            {/* "description2" */}
            <Text style={styles.Info3}>
                These case studies or use cases are a collection, inspiration,
                of projects carried out by Windesheim students, by by the
                professorships and by the Technology Providers.
            </Text>

            {/* "Case Study" */}
            <Text style={styles.HeaderText}>Case Study</Text>

            {/* "CaseStudyList" */}
            <HorizontalScroll>
                <CaseStudyList />
            </HorizontalScroll>

            {/* "Information" */}
            <Text style={styles.HeaderText}>Information</Text>

            {/* "Button" */}
            <Usecase buttonText="EX" screenName={Routes.Usecase} width={100} />
            {/* "Button" */}
            <Usecase buttonText="EX" screenName={Routes.Usecase} width={100} />
        </PageScrollView>
    );
};
