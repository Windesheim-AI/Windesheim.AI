import React from "react";
import { SafeAreaView } from "react-native";
import Chatbot from "../components/chatbot/chatbox";

export default function ChatScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Chatbot />
    </SafeAreaView>
  );
}
