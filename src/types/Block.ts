import { ColorTypes } from '../constants/Colors';

export type Block = {
    blockType: BlockType;
    id: string;
    content: TextOptions & AIOptions & ButtonOptions; //json string or AIOptions
};

export type BlockOptions = {
    courseId: string;
    stageId: string;
};

export type AIOptions = {
    prompt: string;
    provider: string;
} & BlockOptions;

export type TextOptions = {
    text: string;
} & BlockOptions;

export type ImageOptions = {
    url: string;
} & BlockOptions;

export type VideoOptions = {
    url: string;
} & BlockOptions;

export type ButtonOptions = {
    text: string;
    colorOptions: ColorTypes;
    navigateToStageId?: string;
    url?: string;
} & BlockOptions;

export enum BlockType {
    Text = 'text',
    AIGenerated = 'ai',
    Image = 'image',
    Video = 'video',
    Button = 'button',
}
