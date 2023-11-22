import { RootState } from '../../redux/Hooks';
import { StageDataState } from '../../redux/slices/CourseDataSlice';
import { Course, CourseDataMapped } from '../../types/Course';
import { StageDataMapped } from '../../types/Stage';

export function mapCourseToData(
    course: Course,
    courseDataState: RootState['courseData'],
): CourseDataMapped {
    const courseData = courseDataState.completedStages?.filter(
        (stage: StageDataState) => stage.courseId === course.id,
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
