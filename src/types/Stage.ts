import { CourseStageBlock } from './CourseStageBlock';

// saved in WordPress
export type Stage = {
    id: string;
    title: string;
    description: CourseStageBlock[];
};

// brought to UI
export type StageDataMapped = {
    id: string;
    title: string;
    description: CourseStageBlock[];
    isCompletedByUser: boolean;
};
