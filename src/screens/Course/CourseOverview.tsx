import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import { StageItem } from './StageItem';
import { Button } from '../../components/buttons/Button';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { stateColorSchemes } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useCourseWithData } from '../../hooks/useCourseWithData';
import { useAppDispatch } from '../../redux/Hooks';
import { setLoading } from '../../redux/slices/LoadingSlice';
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

    const { data, isLoading } = useCourseWithData(courseId);

    const storeDispatcher = useAppDispatch();
    useEffect(() => {
        storeDispatcher(setLoading(isLoading));
    }, [isLoading, storeDispatcher]);

    const course = data[0] ?? undefined;
    if (isLoading) {
        return null;
    }

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
                <Text>
                    <TextTranslated text="Course Overview" />
                </Text>

                <Button
                    buttonText="Back to Courses"
                    colorGradientScheme={stateColorSchemes.primary}
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
