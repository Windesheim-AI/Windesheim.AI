import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchChatResponse } from "../../api/chatbot"; // Updated import
import { useTypingEffect } from "./useTypingEffect"; // Updated import

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [responseToType, setResponseToType] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  // Only pass a non-null and non-undefined response to the typing effect
  const typedResponse = useTypingEffect(
    responseToType || "", // Ensure it's always a string, even if null
    5,                   // Typing speed
    () => {
      if (responseToType) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: responseToType },
        ]);
      }
      setIsTyping(false);
      setResponseToType(null);
    },
    scrollViewRef
  );

  const handleSend = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    // Call scroll to bottom after message is sent
    scrollViewRef.current?.scrollToEnd({ animated: true });

    try {
      const fullResponse = await fetchChatResponse(updatedMessages);
      setResponseToType(fullResponse); // triggers useTypingEffect
    } catch (err) {
      console.error("Error fetching response:", err);
      setIsTyping(false);
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]); // Trigger whenever messages change

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
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
                msg.role === "user" ? styles.userMessage : styles.assistantMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.role === "user" ? styles.userText : styles.assistantText,
                ]}
              >
                {msg.content}
              </Text>
            </View>
          ))}

          {/* Only show assistant message if response is not null, undefined, or empty */}
          {isTyping && typedResponse && typedResponse !== "" && (
            <View style={styles.assistantMessage}>
              <Text style={[styles.messageText, styles.assistantText]}>
                {typedResponse}
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Input and Send Button */}
        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Typ uw bericht"
            style={styles.textInput}
            multiline
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Sturen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// 💄 Styles
const styles = StyleSheet.create({
  chatboxContainer: {
    flex: 1,
    backgroundColor: "transparent", // Chatbox background is transparent or blends with the underlying screen
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: "90%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    marginBottom: 5,
  },
  userMessage: {
    backgroundColor: "#F5A61A", // Blue for the user
    alignSelf: "flex-end", // Align to the right side
  },
  assistantMessage: {
    backgroundColor: "transparent", // Light gray for assistant
    alignSelf: "flex-start", // Align to the left side
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: "#fff", // White text for user message
  },
  assistantText: {
    color: "#000000", // Black text for assistant message
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#F5A61A",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
