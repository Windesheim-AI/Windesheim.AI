export type Stage = {
    id: string;
    title: string;
    description: Block[];
};

export type Block = {
    blockType: BlockType;
    id: string;
    content: TextOptions & AIOptions; //json string or AIOptions
};

export type AIOptions = {
    prompt: string;
    provider: string;
};

export type TextOptions = {
    text: string;
};

export enum BlockType {
    Text = 'text',
    AIGenerated = 'ai',
}
