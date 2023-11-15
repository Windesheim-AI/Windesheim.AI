import React from 'react';

import AIRenderer from './stages/AIBlock';
import ButtonBlock from './stages/ButtonBlock';
import TextRenderer from './stages/TextBlock';
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
];

export default function StageRenderer({
    stage,
    courseId,
}: {
    stage: Stage;
    courseId: string;
}) {
    return (
        <>
            {stage.description.map((block: CourseStageBlock) => {
                const renderer = blockRenderers.find(
                    (e) => e.blockType === block.blockType,
                );
                const key = Math.random();

                if (!renderer) {
                    return (
                        <TextTranslated key={key} text="Unknown block type" />
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
