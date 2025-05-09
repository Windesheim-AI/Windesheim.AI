import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  SafeAreaView,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsButton } from '../components/general/buttons/SettingButton';
import { GoBackButton } from '../components/general/buttons/GoBackButton';
import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';

interface Answer {
  id: number;
  answer: string;
}

interface Question {
  id: number;
  question: string;
  question_title: string;
  answers: Answer[];
  correct_answer_id: number;
}

interface QuizData {
  id: number;
  title: string;
  questions: Question[];
}

type RootStackParamList = {
  Quizhome: undefined;
  Quizzes: { quizId: number };
  Results: {
    score: number;
    total: number;
    questions: Question[];
    answers: Record<number, number>;
  };
};

type QuizRouteProp = RouteProp<RootStackParamList, 'Quizzes'>;
type QuizNavigationProp = StackNavigationProp<RootStackParamList, 'Quizzes'>;

const Quizzes: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(780); // time for the quiz
  const [timeExpired, setTimeExpired] = useState(false);

  const route = useRoute<QuizRouteProp>();
  const navigation = useNavigation<QuizNavigationProp>();
  const answersOpacity = useRef(new Animated.Value(0)).current;

  const currentTheme = useCurrentTheme();
  const colors = useColorConfig();
  const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';

  const fetchQuizData = async () => {
    setIsLoading(true);
    setLoadError(false);

    try {
      const fallbackQuizId = 2;
      const quizId = route?.params?.quizId ?? fallbackQuizId;

      const response = await fetch(`https://windesheim.ai/wp-json/getnewquiz/v1/quizzes/2`);
      const data: QuizData = await response.json();

      if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('No valid questions returned');
      }

      const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);
      const shuffledQuestions = shuffleArray(data.questions).map((q) => ({
        ...q,
        question: (q.question ?? '').replace(/undefined/g, '').replace(/\\/g, '').trim(),
        question_title: (q.question_title ?? '').replace(/\\/g, '').trim(),
        answers: shuffleArray(q.answers.map((a) => ({
          ...a,
          answer: (a.answer ?? '').replace(/\\/g, '').trim(),
        }))),
      }));

      setQuizData({ ...data, questions: shuffledQuestions });
      setCurrentQuestion(0);
    } catch (error) {
      console.error('Error loading quiz:', error);
      setLoadError(true);
      setQuizData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [route.params?.quizId]);

  useEffect(() => {
    if (!quizData) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizData]);

  useEffect(() => {
    if (timeExpired && quizData) {
      const timeout = setTimeout(() => {
        const score = quizData.questions.reduce((count, q) => {
          return answers[q.id] === q.correct_answer_id ? count + 1 : count;
        }, 0);

        navigation.navigate('Results', {
          score,
          total: quizData.questions.length,
          questions: quizData.questions,
          answers,
        });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [timeExpired]);

  const currentQ = quizData?.questions?.[currentQuestion];

  useEffect(() => {
    if (!currentQ || typeof currentQ.question !== 'string') {
      setTypedText('');
      return;
    }

    const raw = currentQ.question || '';
    const cleaned = raw.replace(/undefined/g, '').replace(/\\/g, '').trim();

    if (!cleaned) {
      setTypedText('');
      return;
    }

    let index = 0;
    let cancelled = false;
    let buffer = '';

    setTypedText('');
    setShowAnswers(false);
    answersOpacity.setValue(0);

    const interval = setInterval(() => {
      if (cancelled) return;

      if (index < cleaned.length) {
        buffer += cleaned.charAt(index);
        setTypedText(buffer);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (!cancelled) {
            setShowAnswers(true);
            Animated.timing(answersOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }
        }, 300);
      }
    }, 15);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [currentQ?.id]);

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = () => {
    if (!quizData) return;

    const allAnswered = quizData.questions.every((q) => answers[q.id] !== undefined);
    if (!allAnswered) return;

    const score = quizData.questions.reduce((count, q) => {
      return answers[q.id] === q.correct_answer_id ? count + 1 : count;
    }, 0);

    navigation.navigate('Results', {
      score,
      total: quizData.questions.length,
      questions: quizData.questions,
      answers,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Image
          key={`loader-${Date.now()}`}
          source={require('../assets/images/Icon/loading.gif')}
          style={styles.loadingGif}
        />
        <Text>Loading quiz...</Text>
      </View>
    );
  }

  if (loadError || !quizData) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', marginBottom: 10 }}>Failed to load quiz data.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchQuizData}>
          <Text style={{ color: '#fff' }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const totalQuestions = quizData.questions.length;
  const allAnswered = quizData.questions.every((q) => answers[q.id] !== undefined);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSide}>
          <GoBackButton />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/Icon/favicon.png')}
            style={styles.logo}
          />
          <Text style={[styles.logoText, { color: logoTextColor }]}>WINDESHEIM.AI</Text>
        </View>
        <View style={styles.headerSide}>
          <SettingsButton />
        </View>
      </View>

      <View style={{ height: 10 }} />

      <View style={styles.quizHeader}>
        <Text style={styles.quizTitle}>{quizData?.title || 'Quiz'}</Text>
        <Text style={styles.questionCounter}>
          Question {currentQuestion + 1} of {totalQuestions} | Time Left: {formatTime(timeLeft)}
        </Text>
      </View>

      {currentQ && (
        <View style={styles.questionBubbleWrapper}>
          <View style={styles.questionBubble}>
            {!!currentQ.question_title?.trim() && (
              <Text style={styles.questionTitle}>{currentQ.question_title.trim()}</Text>
            )}
            <Text style={styles.questionText}>{typedText}</Text>
          </View>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.answerContainer}>
        {showAnswers &&
          currentQ?.answers?.map((answer) => (
            <Animated.View
              key={answer.id}
              style={[styles.answerBubbleWrapper, { opacity: answersOpacity }]}
            >
              <TouchableOpacity
                style={[
                  styles.answerBubble,
                  answers[currentQ.id] === answer.id && styles.selectedAnswer,
                ]}
                onPress={() => handleAnswerSelect(currentQ.id, answer.id)}
              >
                <Text style={styles.answerText}>{answer.answer}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${((currentQuestion + 1) / totalQuestions) * 100}%` },
            ]}
          />
        </View>

        <View style={styles.navButtons}>
          <TouchableOpacity
            onPress={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
            disabled={currentQuestion === 0}
            style={styles.navButton}
          >
            <Text style={styles.navButtonText}>Vorige</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1))
            }
            disabled={currentQuestion === totalQuestions - 1}
            style={styles.navButton}
          >
            <Text style={styles.navButtonText}>Volgende</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.submitButton, !allAnswered && styles.disabledSubmit]}
          disabled={!allAnswered}
        >
          <Text style={styles.submitButtonText}>Verstuur</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  quizHeader: { marginBottom: 10, paddingHorizontal: 20 },
  quizTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  questionCounter: { fontSize: 16, textAlign: 'center', color: '#666' },
  questionTitle: { fontSize: 20, marginBottom: 10 },
  questionText: { fontSize: 18 },
  questionBubbleWrapper: {
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  questionBubble: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    maxWidth: '85%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
  },
  answerContainer: {
    alignItems: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  answerBubbleWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  answerBubble: {
    backgroundColor: '#FFE4B3',
    padding: 15,
    maxWidth: '85%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
  },
  selectedAnswer: { backgroundColor: '#FFFBDC' },
  answerText: { fontSize: 16 },
  footer: { marginTop: 20, alignItems: 'center', paddingHorizontal: 20 },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#d1d1d1',
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 15,
  },
  progressBar: { height: 10, backgroundColor: '#FFCB05' },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  navButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFE4B3',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  navButtonText: { fontSize: 16 },
  submitButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#FFF0B8',
    borderRadius: 10,
    width: '100%',
  },
  submitButtonText: { fontSize: 18, color: '#000', textAlign: 'center' },
  disabledSubmit: { backgroundColor: '#cccccc' },
  retryButton: {
    backgroundColor: '#F5A61A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loadingGif: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#FFFFF0',
  },
  headerSide: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 37, height: 37, resizeMode: 'contain' },
  logoText: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
});

export default Quizzes;
