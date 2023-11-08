import React from 'react';
import { Text } from 'react-native';

import AIRenderer from './stages/AIBlock';
import ButtonBlock from './stages/ButtonBlock';
import TextRenderer from './stages/TextBlock';
import { Block, BlockType } from '../../types/Block';
import { Stage } from '../../types/Stage';

const blockRenderers = [
    { blockType: BlockType.AIGenerated, component: AIRenderer },
    { blockType: BlockType.Text, component: TextRenderer },
    { blockType: BlockType.Button, component: ButtonBlock },
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
            {stage.description.map((block: Block) => {
                const renderer = blockRenderers.find(
                    (e) => e.blockType === block.blockType,
                );

                if (!renderer) {
                    // eslint-disable-next-line react/jsx-key
                    return <Text>Unknown block type</Text>;
                }
                const Component = renderer.component;
                const options = {
                    ...block.content,
                    courseId,
                    stageId: stage.id,
                };
                return <Component key={Math.random()} options={options} />;
            })}
        </>
    );
}
