import {
    estimateTime,
    estimateTimeToRead,
} from '../../../../src/lib/utility/estimateTime';
import {
    CourseStageBlock,
    CourseStageBlockType,
    TextOptions,
} from '../../../../src/types/CourseStageBlock';

describe('estimateTime', () => {
    test('it should return 0 for empty blocks', () => {
        const blocks: CourseStageBlock[] = [];
        const result = estimateTime(blocks);
        expect(result).toBe(0);
    });

    test('it should calculate the estimated time correctly for text blocks', () => {
        const blocks: CourseStageBlock[] = [
            {
                id: 'block-id-1',
                blockType: CourseStageBlockType.Text,
                content: {
                    courseId: 'course-id',
                    stageId: 'stage-id',
                    text: 'This is a sample text.',
                } as TextOptions,
            },
            {
                id: 'block-id',
                blockType: CourseStageBlockType.Text,
                content: {
                    courseId: 'course-id',
                    stageId: 'stage-id',
                    text: 'Another sample text.',
                } as TextOptions,
            },
        ];
        // Assuming 4 words in the first text and 4 words in the second text
        // Total words = 8, so estimated time = 8 / 200 + (8 * 0.3) = 0.4 + 2.4 = 2.8
        const result = estimateTime(blocks);
        expect(result).toBe(1.9);
    });
});

describe('estimateTimeToRead', () => {
    test('it should return the estimated time with "min" suffix', () => {
        const blocks: CourseStageBlock[] = [
            {
                id: 'block-id-1',
                blockType: CourseStageBlockType.Text,
                content: {
                    courseId: 'course-id',
                    stageId: 'stage-id',
                    text: 'This is a sample text.',
                } as TextOptions,
            },
            {
                id: 'block-id',
                blockType: CourseStageBlockType.Text,
                content: {
                    courseId: 'course-id',
                    stageId: 'stage-id',
                    text: 'Another sample text.',
                } as TextOptions,
            },
        ];
        const result = estimateTimeToRead(blocks);
        expect(result).toMatch(/^\d+(\.\d+)? min$/);
    });
});
