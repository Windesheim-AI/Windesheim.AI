import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
} from 'react-native';
import { getBotResponse } from '../api/chatbot';

const { height, width } = Dimensions.get('window');

const ChatBotScreen: React.FC = () => {
    const [messages, setMessages] = useState<
        { role: string; content: string }[]
    >([]);
    const [inputMessage, setInputMessage] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);

    // Handle sending a message
    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // Add user message to the message array
        const userMessage = { role: 'user', content: inputMessage };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Get the chatbot's response
        try {
            const botResponse = await getBotResponse(inputMessage);
            const assistantMessage = {
                role: 'assistant',
                content: botResponse,
            };
            setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.error('Error getting chatbot response:', error);
        }

        setInputMessage('');
    };

    // Scroll to the bottom whenever the messages array is updated
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.innerContainer}>
                    {/* Scrollable Chat */}
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={styles.chatContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        {messages.map((message, index) => (
                            <View
                                key={index}
                                style={
                                    message.role === 'user'
                                        ? styles.userMessage
                                        : styles.assistantMessage
                                }
                            >
                                <Text style={styles.messageText}>
                                    {message.content}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Input Section */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message"
                            value={inputMessage}
                            onChangeText={setInputMessage}
                        />
                        <Button title="Send" onPress={handleSendMessage} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between', // Push input field to the bottom
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        padding: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#A0A0A0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        maxWidth: '80%', // Limit message width to 80% of screen width
    },
    assistantMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffcb05', // Assistant's message background color
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        maxWidth: '80%', // Limit message width to 80% of screen width
    },
    messageText: {
        color: 'black', // Change text color for better contrast with yellow
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
        width: '100%', // Ensure the input field takes the full width
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
    },
});

export default ChatBotScreen;
