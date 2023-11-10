import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, FlatList } from 'react-native';

import { StageItem } from './StageItem';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { useFonts } from '../../constants/Fonts';
import { useCourseWithData } from '../../hooks/useCourseWithData';
import { Stage, StageDataMapped } from '../../types/Stage';

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
    const params = route.params as CourseOverviewPageProps;
    const courseId = params.courseId;

    const course = useCourseWithData(courseId);

    const renderItem = ({ item }: { item: StageDataMapped }) => (
        <StageItem
            title={item.title}
            id={item.id}
            description={item.description}
            isCompletedByUser={item.isCompletedByUser}
            courseId={course.courseId}
        />
    );

    return (
        <PageView>
            <View style={fonts.h1}>
                <TextTranslated text="Course Overview" />

                {/* map the stages of the course */}
                <FlatList
                    data={course.stageData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </PageView>
    );
}
