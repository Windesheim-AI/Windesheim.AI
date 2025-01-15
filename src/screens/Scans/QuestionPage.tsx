/* eslint-disable no-else/no-else */
import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, JSX } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Routes } from 'routes/routes';

import fetchScanQuestionRange from '../../lib/repositories/scans/fetchScanQuestionRange';
import useScanQuestionRange from '../../lib/repositories/scans/useScanQuestionRange';
import useSingleScan from '../../lib/repositories/scans/useSingleScan';
import {
    persistentStorageWrite,
    persistentStorageRead,
} from '../../lib/utility/persistentStorage';
import { ScanQuestion } from '../../types/Scan';

type QuestionPageProps = {
    scanId: string;
};

/**
 * The QuestionPage component displays a series of questions with navigation buttons.
 * @returns {JSX.Element} - The rendered component.
 */
export function QuestionPage(): JSX.Element {
    const route = useRoute();
    const params = route.params as QuestionPageProps;
    const scanId = params?.scanId;

    const navigator = useNavigation();

    const [currentQuestionIndex, setCurrentQuestionIndex] =
        React.useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = React.useState<
        ScanQuestion | undefined
    >(undefined);
    const [questions, setQuestions] = React.useState<ScanQuestion[]>([]);

    const [questionCache, setQuestionCache] = React.useState<ScanQuestion[]>(
        [],
    );

    const [descriptionVisible, setDescriptionVisible] = useState(false);

    const toggleDescription = () => {
        setDescriptionVisible(!descriptionVisible);
    };

    const {
        data: scanData,
        // isLoading: scanIsLoading,
        // error: scanError,
    } = useSingleScan(scanId ?? '');

    // Parse the questions from the scan data.
    // This doesnt include the question data fetched from the API.
    // This has Id, categoryId and index.
    // The rest if the data is fetched from the API when needed.
    const parsedQuestions: ScanQuestion[] = React.useMemo(() => {
        const q: ScanQuestion[] = [];
        if (scanData) {
            // Sort the categories by index.
            scanData.categories
                .slice()
                .sort((a, b) => parseInt(a.idx, 10) - parseInt(b.idx, 10))
                .forEach((category) => {
                    // Sort the questions by index.
                    category.questions
                        .slice()
                        .sort(
                            (a, b) => parseInt(a.idx, 10) - parseInt(b.idx, 10),
                        )
                        .forEach((question) => {
                            q.push(question);
                        });
                });
        }
        return q;
    }, [scanData]);

    const [answers, setAnswers] = useState<Record<string, number>>(() => {
        const initialAnswers: Record<string, number> = {};
        parsedQuestions.forEach((q) => {
            initialAnswers[q.id] = 1;
        });
        return initialAnswers;
    });

    // Load answers from persistent storage
    useEffect(() => {
        // eslint-disable-next-line no-void
        void persistentStorageRead('answers', (value) => {
            if (value) {
                setAnswers(JSON.parse(value) as Record<string, number>);
            }
        });
    }, []);

    /**
     * Fetches questions based on the current question ID.
     * @param {string} currentId - The ID of the current question.
     */
    const fetchQuestions = React.useCallback(
        (ids: string[]): void => {
            // If there are no IDs to fetch, return.
            if (ids.length === 0) return;

            // FetchScanQuestionRange is a function that fetches questions from the API.
            fetchScanQuestionRange(ids)
                .then((data: ScanQuestion[]) => {
                    if (!data) return;

                    // Adds the fetched questions to the question cache.
                    setQuestionCache((prevCache) => [
                        ...prevCache,
                        ...data
                            // Filter out questions that are already in the cache.
                            .filter(
                                (q) => !prevCache.some((qc) => qc.id === q.id),
                            )
                            // Add the category ID to the question.
                            .map((q) => ({
                                ...q,
                                categoryId: parsedQuestions.find(
                                    (pq) => pq.id === q.id,
                                )?.categoryId,
                            })),
                    ]);
                })
                .catch((error) => {
                    throw error;
                });
        },
        [parsedQuestions],
    );

    const fetchInitialQuestions = React.useCallback((): void => {
        const firstFiveIds = parsedQuestions.slice(0, 3).map((q) => q.id);
        fetchQuestions(firstFiveIds);
    }, [fetchQuestions, parsedQuestions]);

    const fetchAllQuestions = React.useCallback((): void => {
        const allIds = parsedQuestions.map((q) => q.id);
        fetchQuestions(allIds);
    }, [fetchQuestions, parsedQuestions]);

    useEffect(() => {
        if (parsedQuestions.length > 0) {
            fetchInitialQuestions();
        }
    }, [fetchInitialQuestions, parsedQuestions]);

    useEffect(() => {
        if (questionCache.length > 0 && questionCache.length <= 5) {
            fetchAllQuestions();
        }
    }, [fetchAllQuestions, questionCache]);

    // Fetch the first question when the component mounts.
    const firstId = parsedQuestions[0]?.id;
    const {
        data: firstQuestionData,
        // isLoading: firstQuestionIsLoading,
        // error: firstQuestionError,
    } = useScanQuestionRange([firstId]);

    if (firstQuestionData && questionCache.length === 0) {
        setQuestionCache(firstQuestionData);
        setCurrentQuestion(firstQuestionData[0]);
    }

    if (parsedQuestions.length > 0 && questions.length === 0) {
        setQuestions(parsedQuestions);
        setCurrentQuestionIndex(parseInt(parsedQuestions[0].id, 10));
    }

    /**
     * Displays the next question.
     */
    const showNextQuestion = (): void => {
        const nextIndex = currentQuestionIndex + 1;
        showQuestion(nextIndex);
    };

    /**
     * Displays the previous question.
     */
    const showPreviousQuestion = (): void => {
        const previousIndex = currentQuestionIndex - 1;
        showQuestion(previousIndex);
    };

    /**
     * Displays a question based on the given index. Used by showNextQuestion and showPreviousQuestion.
     * @param {number} index - The index of the question to display.
     */
    const showQuestion = (index: number): void => {
        if (index < 1) {
            //@ts-ignore
            navigator.navigate(Routes.ChooseCategories.toString(), { scanId });
        }

        if (index > parsedQuestions.length) {
            //@ts-ignore
            navigator.navigate(Routes.InformationPage.toString());
        }

        // Clamp the index to the range of the questions.
        const maxIndex = parsedQuestions.length;
        index = Math.max(1, Math.min(index, maxIndex));

        // Set the current question index and question.
        setCurrentQuestionIndex(index);
        setCurrentQuestion(
            questionCache.find((q) => q.id === index.toString()),
        );
    };

    // Fetch the next question when the current question changes to undefined.
    // This happens when the current question is not in the question cache.
    useEffect(() => {
        if (!currentQuestion && questionCache.length > 0) {
            const question = questionCache.find(
                (q) => q.id === currentQuestionIndex.toString(),
            );
            if (question) {
                setCurrentQuestion(question);
            }
        }
    }, [currentQuestion, questionCache, currentQuestionIndex]);

    interface Answer {
        questionId: string;
        answer: number;
    }

    interface CategoryAnswers {
        categoryId: string;
        answers: Answer[];
    }

    const processGivenAnswer = (id: string, value: number) => {
        const updatedAnswers = { ...answers, [id]: value };
        setAnswers(updatedAnswers);

        const formattedAnswers: CategoryAnswers[] = parsedQuestions.reduce(
            (acc: CategoryAnswers[], question) => {
                const category = acc.find(
                    (c) => c.categoryId === question.categoryId,
                );
                if (category) {
                    category.answers.push({
                        questionId: question.id,
                        answer: updatedAnswers[question.id],
                    });
                } else {
                    acc.push({
                        categoryId: question.categoryId ?? '',
                        answers: [
                            {
                                questionId: question.id,
                                answer: updatedAnswers[question.id],
                            },
                        ],
                    });
                }
                return acc;
            },
            [],
        );

        // eslint-disable-next-line no-void
        void persistentStorageWrite(
            'answers',
            JSON.stringify({ categories: formattedAnswers }),
        );
    };

    const getAnswer = (id: string): number => {
        return answers[id] || 1;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.progressText}>
                Question {currentQuestionIndex} of {parsedQuestions.length}
            </Text>
            <View style={styles.questionContainer}>
                {currentQuestion ? (
                    <>
                        <Text style={styles.questionText}>
                            {currentQuestion?.text}
                        </Text>
                        <TouchableOpacity onPress={toggleDescription}>
                            <Text style={styles.toggleDescription}>
                                {descriptionVisible
                                    ? 'Hide Description'
                                    : 'Show Description'}
                            </Text>
                        </TouchableOpacity>
                        {descriptionVisible ? (
                            <Text style={styles.descriptionText}>
                                {currentQuestion?.description}
                            </Text>
                        ) : null}
                        <Slider
                            style={styles.slider}
                            minimumValue={1}
                            maximumValue={5}
                            step={1}
                            renderStepNumber
                            onSlidingComplete={(value) =>
                                processGivenAnswer(currentQuestion.id, value)
                            }
                            value={getAnswer(currentQuestion.id)}
                        />
                    </>
                ) : (
                    <Text>Loading the next question for you...</Text>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={showPreviousQuestion}
                    style={styles.button}
                    disabled={!currentQuestion}
                >
                    <Text>Previous</Text>
                </Button>
                <Button
                    onPress={showNextQuestion}
                    style={styles.button}
                    disabled={!currentQuestion}
                >
                    <Text>Next</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    progressText: {
        textAlign: 'center',
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    toggleDescription: {
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 20,
    },
    slider: {
        marginTop: 32,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
});
