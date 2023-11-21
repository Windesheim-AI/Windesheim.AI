import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { StageItem } from './StageItem';
import { DataWrapper } from '../../components/base/DataWrapper';
import { Button } from '../../components/general/buttons/Button';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
import { stateColorSchemes } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import useSingleCourse from '../../lib/fetcher/useSingleCourse';
import { Routes } from '../../routes/routes';
import { Stage } from '../../types/Stage';
import { useMapSingleCourseToData } from '../../util/data/mapSingleCourseToData';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';

type StageOverviewPageProps = {
    courseId: string;
    stageId: string;
};

export type StageItemProps = {
    stage: Stage;
};

export default function StageOverview() {
    const fonts = useFonts();

    const route = useRoute();
    const navigator = useNavigation();
    const params = route.params as StageOverviewPageProps;
    const courseId = params.courseId;

    const { data, isLoading, error } = useSingleCourse(courseId);
    const course = useMapSingleCourseToData(data);

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
        },
        courseStageContainer: {
            marginTop: 10,
        },
    });

    function navigateBackToCourses() {
        navigator.navigate(Routes.Courses.toString());
    }

    return (
        <DataWrapper error={error} isLoading={isLoading}>
            <PageView>
                <View style={styles.container}>
                    <TextTranslated style={fonts.h1} text="Course Overview" />

                    {/* map the stages of the course */}
                    <View style={styles.courseStageContainer}>
                        {course?.stageData?.map((stage) => {
                            return (
                                <StageItem
                                    key={stage.id}
                                    title={stage.title}
                                    id={stage.id}
                                    blocks={stage.blocks}
                                    isCompletedByUser={stage.isCompletedByUser}
                                    courseId={course.courseId}
                                />
                            );
                        })}
                    </View>

                    <Button
                        buttonText="Back to Courses"
                        colorGradientScheme={stateColorSchemes.primary}
                        onPress={navigateBackToCourses}
                        testId="back-to-courses-button"
                    />
                </View>
            </PageView>
        </DataWrapper>
    );
}
