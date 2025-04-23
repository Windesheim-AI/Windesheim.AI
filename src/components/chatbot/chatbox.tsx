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
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { fetchChatResponse } from '../../api/chatbot';
import { useTypingEffect } from './useTypingEffect';
import { useColorConfig, shadow } from '../../lib/constants/Colors';
import Markdown from 'react-native-markdown-display';
import selectableMarkdownRules from './selectableMarkdownRules';
import { TypingAnimation } from './typingAnimation';
import { PromptCard } from './PromptCard';

type Message = { role: 'user' | 'assistant'; content: string };

export default function Chatbot() {
    const colors = useColorConfig();
    const styles = createStyles(colors);

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [responseToType, setResponseToType] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);
    const isAtBottomRef = useRef(true);
    const lastScrollPosition = useRef({ y: 0, height: 0 });

    const [hasUserSentMessage, setHasUserSentMessage] = useState(false);

    const [showPrompts, setShowPrompts] = useState(true);
    const promptSuggestions = [
        'Wat kun je voor mij doen?',
        'Wat is Windesheim.AI?',
        'Wat is ELSALON?',
        'Wat is generative AI?',
    ];

    const initialAssistantMessage: Message = {
        role: 'assistant',
        content:
            '👋 Hallo! Ik ben je AI-assistent. Stel me vragen over Windesheim.AI, ELSALON of generatieve AI. Gebruik een prompt hieronder of typ je vraag!',
    };

    const typedResponse = useTypingEffect(responseToType || '', 1, () => {
        if (responseToType) {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: responseToType },
            ]);
        }
        setIsTyping(false);
        setResponseToType(null);
    });

    const handleSend = async (customInput?: string) => {
        const message = customInput ?? input;
        if (!message.trim()) return;

        const updatedMessages: Message[] = [
            ...messages,
            { role: 'user', content: message },
        ];

        // Remove the welcome message if it's still there
        const filteredMessages = updatedMessages.filter(
            (msg) => msg.content !== initialAssistantMessage.content,
        );

        setMessages(filteredMessages);
        setInput('');
        setIsTyping(true);
        setShowPrompts(false);
        setHasUserSentMessage(true); // mark that the user has interacted

        try {
            setIsLoading(true);
            const fullResponse = await fetchChatResponse(filteredMessages);
            setResponseToType(fullResponse);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching response:', err);
            setIsTyping(false);
        }
    };

    // Detect if the user is at the bottom of the ScrollView
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } =
            event.nativeEvent;

        const isAtBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 50;

        isAtBottomRef.current = isAtBottom;
        setShowScrollButton(!isAtBottom);

        // Store for use in onContentSizeChange
        lastScrollPosition.current = {
            y: contentOffset.y,
            height: layoutMeasurement.height,
        };
    };

    // After content size changes, check if the user is at the bottom
    useEffect(() => {
        if (isAtBottomRef.current) {
            setShowScrollButton(false); // Hide button if at the bottom
        } else {
            setShowScrollButton(true); // Show button if not at the bottom
        }
    }, [messages]); // Trigger effect when new messages are added

    const handleContentSizeChange = (
        contentWidth: number,
        contentHeight: number,
    ) => {
        const { y, height } = lastScrollPosition.current;

        const isAtBottom = y + height >= contentHeight - 50;

        setShowScrollButton(!isAtBottom);
    };

    useEffect(() => {
        if (messages.length === 0 && !hasUserSentMessage) {
            setMessages([initialAssistantMessage]);
        }
    }, [hasUserSentMessage]);

    const hexToRGBA = (hex: string, opacity: number) => {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
        >
            <View style={styles.chatboxContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    style={{ flex: 1, paddingRight: 10, flexGrow: 1 }}
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    onScroll={handleScroll}
                    onContentSizeChange={handleContentSizeChange}
                    scrollEventThrottle={16}
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
                            <View style={{ flexShrink: 1, flexGrow: 1 }}>
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
                        </View>
                    )}
                </ScrollView>

                {showScrollButton && (
                    <TouchableOpacity
                        onPress={() => {
                            scrollViewRef.current?.scrollToEnd({
                                animated: true,
                            });
                        }}
                        style={[styles.scrollToBottomButton, shadow]}
                    >
                        <Text style={styles.scrollToBottomText}>↓</Text>
                    </TouchableOpacity>
                )}

                {showPrompts && (
                    <View style={styles.promptContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                        >
                            {promptSuggestions.map((prompt, index) => (
                                <PromptCard
                                    key={index}
                                    text={prompt}
                                    onPress={() => handleSend(prompt)}
                                />
                            ))}
                        </ScrollView>
                    </View>
                )}

                <View style={styles.inputRow}>
                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder="Typ uw bericht"
                        placeholderTextColor={hexToRGBA(colors.text, 0.5)}
                        style={styles.textInput}
                        multiline
                        editable={!isLoading && !isTyping}
                    />
                    <TouchableOpacity
                        onPress={() => handleSend()}
                        style={[
                            styles.sendButton,
                            (isLoading || isTyping) && { opacity: 0.5 },
                        ]} // 👀 Optional: fade out button
                        disabled={isLoading || isTyping} // 🔒 Disable button
                    >
                        <Text style={styles.sendButtonText}>↑</Text>
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
            alignSelf: 'flex-start',
            backgroundColor: 'transparent',
            flexDirection: 'column',
        },
        userMessage: {
            backgroundColor: colors.success,
            alignSelf: 'flex-end',
        },
        assistantMessage: {
            backgroundColor: 'transparent',
            alignSelf: 'flex-start',
        },
        messageText: {
            fontSize: 16,
            lineHeight: 20,
        },
        userText: {
            color: colors.black,
        },
        assistantText: {
            color: colors.text,
        },
        inputRow: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderColor: colors.borderColor,
            backgroundColor: colors.background,
            borderWidth: 1,
            borderBottomWidth: 0,
            borderRadius: 30,
        },
        textInput: {
            flex: 1,
            color: colors.text,
            paddingHorizontal: 5,
            paddingVertical: 5,
            marginRight: 10,
            fontSize: 16,
            maxHeight: '100%',
        },
        sendButton: {
            width: 40,
            height: 40,
            borderRadius: 20, // 👈 makes it a perfect circle
            backgroundColor: colors.success,
            justifyContent: 'center',
            alignItems: 'center',
        },
        sendButtonText: {
            color: colors.black,
            fontSize: 18,
            fontWeight: 'bold',
        },
        scrollToBottomButton: {
            position: 'absolute',
            bottom: 100,
            left: '50%',
            transform: [{ translateX: -25 }],
            width: 35,
            height: 35,
            borderRadius: 25,
            backgroundColor: colors.gray,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollToBottomText: {
            fontSize: 20,
            color: '#000',
            fontWeight: 'bold',
        },
        promptContainer: {
            marginBottom: 8,
        },
    });
