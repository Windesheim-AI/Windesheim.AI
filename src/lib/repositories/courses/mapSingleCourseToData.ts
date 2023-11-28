import { mapCourseToData } from './mapCourse';
import { useAppSelector } from '../../../redux/Hooks';
import { Course, CourseDataMapped } from '../../../types/Course';

export function useMapSingleCourseToData(
    course: Course | undefined,
): CourseDataMapped {
    const courseDataState = useAppSelector((state) => state.courseData);
    if (!course) return {} as CourseDataMapped;

    return mapCourseToData(course, courseDataState);
}
