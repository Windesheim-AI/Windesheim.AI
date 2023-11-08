import { Block } from './Block';

export type Stage = {
    id: string;
    title: string;
    description: Block[];
};

export type StageData = {
    isCompletedByUser: boolean;
    stage: Stage;
};
