import { mapCourseToData } from './mapCourse';
import { RootState, useAppSelector } from '../../redux/Hooks';
import { Course, CourseDataMapped } from '../../types/Course';

export function useMapMultipleCoursesToData(
    courses: Course[] | undefined,
): CourseDataMapped[] | undefined {
    const courseDataState = useAppSelector(
        (state: RootState) => state.courseData,
    );
    if (!courses) return [];

    return courses.map((course) => mapCourseToData(course, courseDataState));
}
