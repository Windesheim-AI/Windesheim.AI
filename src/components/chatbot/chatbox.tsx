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

type Message = { role: 'user' | 'assistant'; content: string };

export default function Chatbot() {
    const colors = useColorConfig(); // ✅ Hook inside component
    const styles = createStyles(colors); // ✅ Style creator

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [responseToType, setResponseToType] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);

    const typedResponse = useTypingEffect(
        responseToType || '',
        5,
        () => {
            if (responseToType) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: responseToType },
                ]);
            }
            setIsTyping(false);
            setResponseToType(null);
        },
        scrollViewRef
    );

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
            const fullResponse = await fetchChatResponse(updatedMessages);
            setResponseToType(fullResponse);
        } catch (err) {
            console.error('Error fetching response:', err);
            setIsTyping(false);
        }
    };

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

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
                            <Text
                                style={[
                                    styles.messageText,
                                    msg.role === 'user'
                                        ? styles.userText
                                        : styles.assistantText,
                                ]}
                            >
                                {msg.content}
                            </Text>
                        </View>
                    ))}

                    {isTyping && typedResponse && typedResponse !== '' && (
                        <View style={styles.assistantMessage}>
                            <Text
                                style={[
                                    styles.messageText,
                                    styles.assistantText,
                                ]}
                            >
                                {typedResponse}
                            </Text>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.inputRow}>
                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder="Typ uw bericht"
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
            paddingBottom: 20,
        },
        messageContainer: {
            maxWidth: '90%',
            marginTop: 10,
            marginVertical: 5,
            padding: 10,
            borderRadius: 15,
            marginBottom: 5,
        },
        userMessage: {
            backgroundColor: '#F5A61A',
            alignSelf: 'flex-end',
            marginBottom: 40,
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
            color: '#fff',
        },
        assistantText: {
            color: '#000000',
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
            borderWidth: 1,
            borderColor: '#ccc',
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
            color: '#fff',
            fontWeight: 'bold',
        },
    });
