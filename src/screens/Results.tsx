import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

interface Answer {
  id: number;
  answer: string;
}

interface Question {
  id: number;
  question: string;
  correct_answer_id: number;
  answers: Answer[];
  category: string; // <-- Needed for category breakdown
}

type RootStackParamList = {
  Results: {
    score: number;
    total: number;
    questions: Question[];
    answers: Record<number, number>;
  };
  Quizzes: { quizId: number };
};

type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;

const Results: React.FC = () => {
  const route = useRoute<ResultsScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { score, total, questions, answers } = route.params;

  const percentage = (score / total) * 100;
  const passed = percentage >= 90;

  const handleCertificate = () => {
    Linking.openURL('https://www.windesheim.ai/quiz-result-test/');
  };

  // Build category performance
  const categoryStats: Record<string, { correct: number; total: number }> = {};

  questions.forEach((q) => {
    const category = q.category || 'Onbekend';
    const userAnswerId = answers[q.id];
    const isCorrect = userAnswerId === q.correct_answer_id;

    if (!categoryStats[category]) {
      categoryStats[category] = { correct: 0, total: 0 };
    }

    categoryStats[category].total += 1;
    if (isCorrect) {
      categoryStats[category].correct += 1;
    }
  });

  const sortedCategories = Object.entries(categoryStats)
    .map(([category, { correct, total }]) => ({
      category,
      correct,
      total,
      percentage: (correct / total) * 100,
    }))
    .sort((a, b) => a.percentage - b.percentage); // lowest performance first

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz Results</Text>
      <Text style={styles.score}>
        Score: {score} / {total} ({percentage.toFixed(2)}%)
      </Text>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          {passed ? 'Gehaald' : 'Niet gehaald'}
        </Text>
        <Ionicons
          name={passed ? 'checkmark-circle' : 'close-circle'}
          size={24}
          color={passed ? '#4CAF50' : '#F44336'}
          style={{ marginLeft: 8 }}
        />
      </View>

      {passed ? (
        <TouchableOpacity style={styles.certButton} onPress={handleCertificate}>
          <Text style={styles.certButtonText}>🎓 Krijg certificaat</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.navigate('Quizzes', { quizId: Math.floor(Math.random() * 100000) })}
        >
          <Text style={styles.retryButtonText}>🔁 Herstart test</Text>
        </TouchableOpacity>
      )}

      {questions.map((q, index) => {
        const userAnswerId = answers[q.id];
        const userAnswer = q.answers.find((a) => a.id === userAnswerId);
        const correctAnswer = q.answers.find((a) => a.id === q.correct_answer_id);
        const isCorrect = userAnswerId === q.correct_answer_id;

        return (
          <View
            key={q.id}
            style={[
              styles.questionContainer,
              isCorrect ? styles.correctBox : styles.incorrectBox,
            ]}
          >
            <Text style={styles.questionTitle}>Vraag {index + 1}</Text>
            <Text style={styles.questionText}>{q.question}</Text>
            <Text style={styles.categoryText}>Categorie: {q.category || 'Onbekend'}</Text>
            <Text
              style={[
                styles.answerText,
                isCorrect ? styles.correct : styles.incorrect,
              ]}
            >
              Jouw antwoord: {userAnswer?.answer || 'Geen antwoord'}
            </Text>
            {!isCorrect && correctAnswer && (
              <Text style={styles.correctAnswer}>
                Juiste antwoord: {correctAnswer.answer}
              </Text>
            )}
          </View>
        );
      })}

      <View style={styles.improvementContainer}>
        <Text style={styles.improvementTitle}>📊 Verbeterpunten per categorie</Text>
        {sortedCategories.map(({ category, correct, total, percentage }) => (
          <Text key={category} style={styles.improvementText}>
            {category}: {correct}/{total} goed ({percentage.toFixed(0)}%)
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
  },
  certButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  certButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4,
    color: '#555',
  },
  answerText: {
    fontSize: 16,
    marginBottom: 4,
  },
  correctAnswer: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  correct: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  incorrect: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  correctBox: {
    backgroundColor: '#e6f9ed',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  incorrectBox: {
    backgroundColor: '#fdecea',
    borderColor: '#F44336',
    borderWidth: 1,
  },
  improvementContainer: {
    marginTop: 24,
    width: '100%',
    padding: 12,
    backgroundColor: '#eef6ff',
    borderRadius: 10,
  },
  improvementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e3a8a',
  },
  improvementText: {
    fontSize: 16,
    marginBottom: 6,
    color: '#1e40af',
  },
});

export default Results;
