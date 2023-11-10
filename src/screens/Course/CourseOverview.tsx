import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import {
    buttonColorSchemes,
    shadow,
    useColorConfig,
} from './../../constants/Colors';
import { StageItem } from './StageItem';
import { Button } from '../../components/buttons/Button';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { useFonts } from '../../constants/Fonts';
import { useCourseWithData } from '../../hooks/useCourseWithData';
import { Routes } from '../../routes/routes';
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
    const navigator = useNavigation();
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

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            ...fonts.h1,
        },
    });

    function navigateBackToCourses() {
        //@ts-ignore
        navigator.navigate(Routes.Courses.toString());
    }
    return (
        <PageView>
            <View style={styles.container}>
                <TextTranslated text="Course Overview" />

                <Button
                    buttonText="Back to Courses"
                    colorGradientScheme={buttonColorSchemes.primary}
                    onPress={navigateBackToCourses}
                />
                {/* map the stages of the course */}
                <View>
                    <FlatList
                        data={course.stageData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </PageView>
    );
}
