// selectableMarkdownRules.ts
import React from 'react';
import { Text, View } from 'react-native';
import { MarkdownProps } from 'react-native-markdown-display';

const selectableMarkdownRules: MarkdownProps['rules'] = {
    paragraph: (node, children, parent, styles) => (
        <Text key={node.key} style={styles.paragraph} selectable>
            {children}
        </Text>
    ),

    text: (node, children, parent, styles) => (
        <Text key={node.key} style={styles.text} selectable>
            {node.content}
        </Text>
    ),

    strong: (node, children, parent, styles) => (
        <Text key={node.key} style={styles.strong} selectable>
            {children}
        </Text>
    ),

    em: (node, children, parent, styles) => (
        <Text key={node.key} style={styles.em} selectable>
            {children}
        </Text>
    ),

    code_inline: (node, children, parent, styles) => (
        <Text key={node.key} style={styles.codeInline} selectable>
            {node.content}
        </Text>
    ),

    code_block: (node, children, parent, styles) => (
        <View key={node.key} style={styles.codeBlock}>
            <Text style={styles.codeBlockText} selectable>
                {node.content}
            </Text>
        </View>
    ),

    fence: (node, children, parent, styles) => (
        <View key={node.key} style={styles.fence}>
            <Text style={styles.fenceText} selectable>
                {node.content}
            </Text>
        </View>
    ),
};

export default selectableMarkdownRules;
