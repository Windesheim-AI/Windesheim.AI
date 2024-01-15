import {
    CourseStageBlock,
    CourseStageBlockType,
} from '../../types/CourseStageBlock';

export function estimateTimeToRead(blocks: CourseStageBlock[]) {
    const totalReadTime = estimateTime(blocks);
    return `${totalReadTime} min`;
}

export function estimateTime(blocks: CourseStageBlock[]): number {
    if (blocks.length < 1) {
        return 0;
    }

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

    return readTime + thinkingTime;
}
