import { mapCourseToData } from './mapCourse';
import { Course, CourseDataMapped } from '../../../types/Course';
import { useAppSelector } from '../../redux/Hooks';

export function useMapMultipleCoursesToData(
    courses: Course[] | undefined,
): CourseDataMapped[] | undefined {
    const courseDataState = useAppSelector((state) => state.courseData);
    if (!courses) return [];

    return courses.map((course) => mapCourseToData(course, courseDataState));
}
