import { useFetchCourseData } from './CourseDataFetcher';
import { useAppSelector, RootState } from '../../redux/Hooks';
import { Course, CourseDataMapped } from '../../types/Course';
import { StageDataMapped } from '../../types/Stage';

export type CourseDataResult = {
    data: CourseDataMapped[];
    isLoading: boolean;
};

export function useCourseWithData(courseId?: string): CourseDataResult {
    const { data: courses, isLoading } = useFetchCourseData(courseId);
    const courseDataState = useAppSelector(
        (state: RootState) => state.courseData,
    );

    const courseData = courseDataState.completedStages?.filter(
        (stage) => stage.courseId === courseId,
    );

    if (!courses) {
        return {
            data: [],
            isLoading: true,
        };
    }

    let useableData;
    if (Array.isArray(courses)) {
        useableData = courses;
    } else {
        useableData = [courses];
    }
    const coursesWithData = useableData.map(
        (course: Course): CourseDataMapped => {
            return {
                courseId: course.id,
                title: course.title,
                description: course.description,
                stageData: course.stages.map((stage): StageDataMapped => {
                    const isCompletedByUser = courseData.some(
                        (stageData) => stageData.stageId === stage.id,
                    );
                    return {
                        id: stage.id,
                        title: stage.title,
                        blocks: stage.blocks,
                        isCompletedByUser,
                    };
                }),
            };
        },
    );
    return {
        data: coursesWithData,
        isLoading,
    };
}
