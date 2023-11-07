import { Stage } from './Stage';

export type Course = {
    title: string;
    id: string;
    description: string;
    stages: Stage[];
};
