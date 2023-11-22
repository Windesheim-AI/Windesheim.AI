import { Stage, StageDataMapped } from './Stage';

//saved in WordPress
export type Course = {
    title: string;
    id: string;
    description: string;
    stages: Stage[];
};

//brought to UI
export type CourseDataMapped = {
    courseId: string;
    title: string | undefined;
    description: string | undefined;
    stageData: StageDataMapped[];
};
