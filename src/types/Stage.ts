import { Block } from './Block';

// saved in wordpress
export type Stage = {
    id: string;
    title: string;
    description: Block[];
};

// brought to UI
export type StageDataMapped = {
    id: string;
    title: string;
    description: Block[];
    isCompletedByUser: boolean;
};
