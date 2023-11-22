import { mapCourseToData } from './mapCourse';
import { RootState, useAppSelector } from '../../redux/Hooks';
import { Course, CourseDataMapped } from '../../types/Course';

export function useMapSingleCourseToData(
    course: Course | undefined,
): CourseDataMapped {
    const courseDataState = useAppSelector(
        (state: RootState) => state.courseData,
    );
    if (!course) return {} as CourseDataMapped;

    return mapCourseToData(course, courseDataState);
}
