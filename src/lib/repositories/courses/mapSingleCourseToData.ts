import { mapCourseToData } from './mapCourse';
import { Course, CourseDataMapped } from '../../../types/Course';
import { useAppSelector } from '../../redux/Hooks';

export function useMapSingleCourseToData(
    course: Course | undefined,
): CourseDataMapped {
    const courseDataState = useAppSelector((state) => state.courseData);
    if (!course) return {} as CourseDataMapped;

    return mapCourseToData(course, courseDataState);
}
