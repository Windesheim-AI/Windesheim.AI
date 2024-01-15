import { ColorTypes } from '../lib/constants/Colors';

export type CourseStageBlock = {
    blockType: CourseStageBlockType;
    id: string;
    content: TextOptions &
        AIOptions &
        ButtonOptions &
        ImageOptions &
        VideoOptions; //json string or AIOptions
};

export type CourseStageBlockOptions = {
    courseId: string;
    stageId: string;
};

export type AIOptions = {
    prompt: string;
    provider: string;
} & CourseStageBlockOptions;

export type TextOptions = {
    text: string;
} & CourseStageBlockOptions;

export type ImageOptions = {
    imageURL: string;
} & CourseStageBlockOptions;

export type VideoOptions = {
    videoURL: string;
} & CourseStageBlockOptions;

export type ButtonOptions = {
    text: string;
    colorOptions: ColorTypes;
    navigateToStageId?: string;
    url?: string;
} & CourseStageBlockOptions;

export enum CourseStageBlockType {
    Text = 'text',
    AIGenerated = 'ai',
    Image = 'image',
    Video = 'video',
    Button = 'button',
}
