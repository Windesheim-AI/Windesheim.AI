import React from 'react';
import { Text } from 'react-native';

import AIRenderer from './stages/ai';
import TextRenderer from './stages/text';
import { Block, BlockType, Stage } from '../../types/Stage';

const blockRenderers = [
    { blockType: BlockType.AIGenerated, component: AIRenderer },
    { blockType: BlockType.Text, component: TextRenderer },
];

export default function StageRenderer({ stage }: { stage: Stage }) {
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
                return <Component key={block.id} options={block.content} />;
            })}
        </>
    );
}
