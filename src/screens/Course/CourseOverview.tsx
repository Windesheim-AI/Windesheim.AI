import { useRoute, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { StageItem } from './StageItem';
import * as j from '../../assets/courses/test.json';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { Course } from '../../types/Course';
import { Stage } from '../../types/Stage';

type CourseOverviewPageProps = {
    courseId: string;
    stageId: string;
};

export type StageItemProps = {
    stage: Stage;
};

export default function CourseOverview() {
    const fonts = useFonts();

    const route = useRoute();
    const course = j as unknown as Course;
    const navigator = useNavigation();
    const params = route.params as CourseOverviewPageProps;

    const renderItem = ({ item }: { item: Stage }) => (
        <StageItem stage={item} isCompletedByUser courseId={course.id} />
    );

    return (
        <PageView>
            <View style={fonts.h1}>
                <TextTranslated text="Course Overview" />

                {/* map the stages of the course */}
                <FlatList
                    data={course.stages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </PageView>
    );
}
