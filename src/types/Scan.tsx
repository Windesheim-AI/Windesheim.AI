import { Stage, StageDataMapped } from './Stage';

//saved in WordPress
export type Scan = {
    id: string;
    name: string;
    description: string;
};

//brought to UI
export type ScanDataMapped = {
    scanId: string;
    name: string | undefined;
    description: string | undefined;
};
