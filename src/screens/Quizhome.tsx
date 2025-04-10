import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Quizhome: undefined;
  Quizzes: { quizId: number };
};

type QuizhomeNavigationProp = StackNavigationProp<RootStackParamList, 'Quizhome'>;

const Quizhome: React.FC = () => {
  const navigation = useNavigation<QuizhomeNavigationProp>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Test Versie Quiz</Text>
      <Button title="Start Quiz" onPress={() => navigation.navigate('Quizzes', { quizId: 1 })} />
    </View>
  );
};

export default Quizhome;
