import { CourseStageBlock } from './CourseStageBlock';

// saved in WordPress
export type Stage = {
    id: string;
    title: string;
    blocks: CourseStageBlock[];
};

// brought to UI
export type StageDataMapped = {
    id: string;
    title: string;
    blocks: CourseStageBlock[];
    isCompletedByUser: boolean;
};
