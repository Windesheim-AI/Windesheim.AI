import { Stage, StageDataMapped } from './Stage';

//saved in wordpress
export type Course = {
    title: string;
    id: string;
    description: string;
    stages: Stage[];
};

//brought to UI
export type CourseDataMapped = {
    courseId: string;
    title: string;
    description: string;
    stages: StageDataMapped[];
};
