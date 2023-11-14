import * as courseTestData from '../../../assets/courses/test.json';
import { useAppSelector, RootState } from '../../../redux/Hooks';
import { Course, CourseDataMapped } from '../../../types/Course';

export function useCourseWithData(courseId: string): CourseDataMapped {
    const course = courseTestData as unknown as Course;
    const courseDataState = useAppSelector(
        (state: RootState) => state.courseData,
    );

    const courseData = courseDataState.completedStages.filter(
        (stage) => stage.courseId === courseId,
    );

    return {
        courseId: course.id,
        title: course.title,
        description: course.description,
        stageData: course.stages.map((stage) => {
            const isCompletedByUser = courseData.some(
                (stageData) => stageData.stageId === stage.id,
            );

            return {
                id: stage.id,
                title: stage.title,
                description: stage.description,
                isCompletedByUser,
            };
        }),
    };
}
