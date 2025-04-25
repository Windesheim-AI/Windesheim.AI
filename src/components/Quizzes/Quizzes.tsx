import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Type definitions
interface Answer {
  id: number;
  answer: string;
  correct: boolean;
}

interface Question {
  id: number;
  question: string;
  question_title: string;
  answers: Answer[];
}

interface QuizData {
  id: number;
  title: string;
  questions: Question[];
}

const Quizzes: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const route = useRoute();  // Get route prop from React Navigation
  const navigation = useNavigation();  // Get navigation prop from React Navigation

  const { quizId } = route.params as { quizId: number }; // Access quizId from params

  useEffect(() => {
    // Fetch the quiz data using quizId from API here
    const fetchQuizData = async () => {
      const response = await fetch(`https://yourwebsite.com/wp-json/getnewquiz/v1/quizzes/${quizId}`);
      const data: QuizData = await response.json();
      setQuizData(data);
    };
    fetchQuizData();
  }, [quizId]);

  return (
    <View>
      <Text>{quizData ? quizData.title : 'Loading...'}</Text>
      {/* Render quiz questions and answers here */}
      {quizData?.questions.map((question) => (
        <View key={question.id}>
          <Text>{question.question_title}</Text>
          <Text>{question.question}</Text>
          <View>
            {question.answers.map((answer) => (
              <Button
                key={answer.id}
                title={answer.answer}
                onPress={() => {
                  // Handle answer selection (can be done later)
                }}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Quizzes;
