import React from 'react';

import AIRenderer from './stages/AIBlock';
import ButtonBlock from './stages/ButtonBlock';
import { ImageBlock } from './stages/ImageBlock';
import TextRenderer from './stages/TextBlock';
import { VideoBlock } from './stages/VideoBlock';
import { useFonts } from '../../constants/Fonts';
import {
    CourseStageBlock,
    CourseStageBlockType,
} from '../../types/CourseStageBlock';
import { Stage } from '../../types/Stage';
import { TextTranslated } from '../general/text/TextTranslated';

const blockRenderers = [
    { blockType: CourseStageBlockType.AIGenerated, component: AIRenderer },
    { blockType: CourseStageBlockType.Text, component: TextRenderer },
    { blockType: CourseStageBlockType.Button, component: ButtonBlock },
    { blockType: CourseStageBlockType.Image, component: ImageBlock },
    { blockType: CourseStageBlockType.Video, component: VideoBlock },
];

export default function StageRenderer({
    stage,
    courseId,
}: {
    stage: Stage;
    courseId: string;
}) {
    const fonts = useFonts();

    return (
        <>
            {stage.blocks.map((block: CourseStageBlock) => {
                const renderer = blockRenderers.find(
                    (e) => e.blockType === block.blockType,
                );
                const key = Math.random();

                if (!renderer) {
                    return (
                        <TextTranslated
                            style={fonts.default}
                            key={key}
                            text="Unknown block type"
                        />
                    );
                }

                const Component = renderer.component;
                const options = {
                    ...block.content,
                    courseId,
                    stageId: stage.id,
                };
                return <Component key={key} options={options} />;
            })}
        </>
    );
}
