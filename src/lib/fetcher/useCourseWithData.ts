import { useFetchCourseData } from './CourseDataFetcher';
import { useAppSelector, RootState } from '../../redux/Hooks';
import { Course, CourseDataMapped } from '../../types/Course';

export type CourseDataResult = {
    data: CourseDataMapped[];
    isLoading: boolean;
};

export function useCourseWithData(courseId?: string): CourseDataResult {
    const { data: courses, isLoading } = useFetchCourseData(courseId);
    const courseDataState = useAppSelector(
        (state: RootState) => state.courseData,
    );

    const courseData = courseDataState.completedStages.filter(
        (stage) => stage.courseId === courseId,
    );

    if (!courses)
        return {
            data: [],
            isLoading: true,
        };

    const coursesWithData = courses.map((course: Course) => {
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
    });
    return {
        data: coursesWithData,
        isLoading,
    };
}
