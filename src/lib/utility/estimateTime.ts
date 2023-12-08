import {
    CourseStageBlock,
    CourseStageBlockType,
} from '../../types/CourseStageBlock';

export function estimateTimeToRead(blocks: CourseStageBlock[]) {
    let text = '';
    blocks.forEach((block) => {
        if (block.blockType === CourseStageBlockType.Text) {
            text += block.content as unknown as string;
        }
    });

    const wordsPerMinute = 200;
    const numberOfWords = text.split(' ').length;
    const minutes = numberOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);

    // Add thinking time based on the amount of text
    const thinkingTimePerWord = 0.3; // Adjust this value as needed
    const thinkingTime = numberOfWords * thinkingTimePerWord;
    const totalReadTime = readTime + thinkingTime;

    return `${totalReadTime} min`;
}
