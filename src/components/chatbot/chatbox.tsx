import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { fetchChatResponse } from '../../api/chatbot';
import { useTypingEffect } from './useTypingEffect';
import { useColorConfig } from '../../lib/constants/Colors';
import Markdown from 'react-native-markdown-display';
import selectableMarkdownRules from './selectableMarkdownRules'; // Rules to make markdown text selectable
import { TypingAnimation } from './typingAnimation'; // Import the typing animation component

type Message = { role: 'user' | 'assistant'; content: string };

export default function Chatbot() {
    const colors = useColorConfig(); // ✅ Hook inside component
    const styles = createStyles(colors); // ✅ Style creator

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [responseToType, setResponseToType] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);

    const typedResponse = useTypingEffect(responseToType || '', 20, () => {
        if (responseToType) {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: responseToType },
            ]);
        }
        setIsTyping(false);
        setResponseToType(null);

        // Ensure scroll happens after layout updates
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 50); // 50ms delay helps wait for render pass
    });

    const handleSend = async () => {
        if (!input.trim()) return;

        const updatedMessages: Message[] = [
            ...messages,
            { role: 'user', content: input },
        ];
        setMessages(updatedMessages);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);

        try {
            setIsLoading(true);
            const fullResponse = await fetchChatResponse(updatedMessages);
            setResponseToType(fullResponse);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching response:', err);
            setIsTyping(false);
        }
    };

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    useEffect(() => {
        if (typedResponse) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [typedResponse]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 20}
        >
            <View style={styles.chatboxContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    style={{ flex: 1, paddingRight: 10 }}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {messages.map((msg, index) => (
                        <View
                            key={index}
                            style={[
                                styles.messageContainer,
                                msg.role === 'user'
                                    ? styles.userMessage
                                    : styles.assistantMessage,
                            ]}
                        >
                            <Markdown
                                rules={selectableMarkdownRules}
                                style={{
                                    text: {
                                        ...styles.messageText,
                                        ...(msg.role === 'user'
                                            ? styles.userText
                                            : styles.assistantText),
                                    },
                                    body: {
                                        ...styles.messageText,
                                        ...(msg.role === 'user'
                                            ? styles.userText
                                            : styles.assistantText),
                                    },
                                }}
                            >
                                {msg.content}
                            </Markdown>
                        </View>
                    ))}

                    {isLoading && (
                        <View style={{ padding: 10 }}>
                            <TypingAnimation color={colors.text} />
                        </View>
                    )}

                    {isTyping && responseToType && (
                        <View
                            style={[
                                styles.assistantMessage,
                                styles.messageContainer,
                            ]}
                        >
                            <Markdown
                                rules={selectableMarkdownRules}
                                style={{
                                    text: {
                                        ...styles.messageText,
                                        ...styles.assistantText,
                                    },
                                    body: {
                                        ...styles.messageText,
                                        ...styles.assistantText,
                                    },
                                }}
                            >
                                {typedResponse}
                            </Markdown>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.inputRow}>
                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder="Typ uw bericht"
                        placeholderTextColor={colors.text}
                        style={styles.textInput}
                        multiline
                    />
                    <TouchableOpacity
                        onPress={handleSend}
                        style={styles.sendButton}
                    >
                        <Text style={styles.sendButtonText}>Sturen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

// 🧼 Styles wrapped in a factory to accept hook values
const createStyles = (colors: ReturnType<typeof useColorConfig>) =>
    StyleSheet.create({
        chatboxContainer: {
            flex: 1,
            backgroundColor: colors.background,
            paddingBottom: 40,
        },
        scrollContainer: {
            paddingBottom: 40,
        },
        messageContainer: {
            marginTop: 10,
            padding: 10,
            borderRadius: 15,
            marginBottom: 5,
            maxWidth: '90%',
            minWidth: '20%',
            minHeight: 20,
            overflow: 'hidden',
            flexShrink: 1,
            alignSelf: 'stretch',
        },
        userMessage: {
            backgroundColor: '#F5A61A',
            alignSelf: 'flex-end',
        },
        assistantMessage: {
            backgroundColor: 'transparent',
            alignSelf: 'flex-start',
            marginBottom: 30,
            paddingBottom: 0,
            paddingRight: 0,
        },
        messageText: {
            fontSize: 16,
            lineHeight: 20,
        },
        userText: {
            color: colors.text,
        },
        assistantText: {
            color: colors.text,
        },
        inputRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            borderTopWidth: 1,
            borderColor: '#ccc',
        },
        textInput: {
            flex: 1,
            color: colors.text,
            borderWidth: 1,
            borderColor: colors.borderColor,
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginRight: 10,
            fontSize: 16,
            maxHeight: 100,
        },
        sendButton: {
            backgroundColor: '#F5A61A',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 20,
        },
        sendButtonText: {
            color: colors.text,
            fontWeight: 'bold',
        },
    });
