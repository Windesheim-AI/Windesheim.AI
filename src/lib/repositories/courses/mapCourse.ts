import { CourseDataState } from '../../../redux/slices/CourseDataSlice';
import { Course, CourseDataMapped } from '../../../types/Course';
import { StageDataMapped } from '../../../types/Stage';

export function mapCourseToData(
    course: Course,
    courseDataState: CourseDataState,
): CourseDataMapped {
    const courseData = courseDataState.completedStages?.filter(
        (stage) => stage.courseId === course.id,
    );

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
}
