export type Prompt = {
    id: number;
    title: string;
    prompt: string;
    description: string;
    tool: string;
    toolLink?: string;
    promptPattern: PromptPattern;
    sector: Sector;
    imageLink?: string;
};

export enum PromptPattern {
    PersonaPattern,
}

export enum Sector {
    Education,
    Health,
    Finance,
    Retail,
    Manufacturing,
}
