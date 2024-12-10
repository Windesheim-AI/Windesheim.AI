//saved in WordPress
export type Scan = {
    id: string;
    name: string;
    description: string;
    content: string;
    scanType: string;
    difficulty: string;
    imageUrl: any;
    categories: Category[];
};

type Category = {
    id: string;
    idx: string;
    name: string;
    description: string;
    questions: ScanQuestion[];
};

export type ScanQuestion = {
    id: string;
    idx: string;
    categoryId?: string;
    text?: string;
    description?: string;
    difficulty: string;
    scanType: string;
    imageUrl: string;
};

//brought to UI
export type ScanDataMapped = {
    scanId: string;
    name: string | undefined;
    description: string | undefined;
    content: string | undefined;
    difficulty: string | undefined;
    scanType: string | undefined;
    imageUrl: string | undefined;
};