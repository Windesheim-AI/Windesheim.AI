import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';

import fetchScanQuestionRange from '../../lib/repositories/scans/fetchScanQuestionRange';
import useScanQuestionRange from '../../lib/repositories/scans/useScanQuestionRange';
import useSingleScan from '../../lib/repositories/scans/useSingleScan';
import { ScanQuestion } from '../../types/Scan';

/**
 * The QuestionPage component displays a series of questions with navigation buttons.
 * @returns {JSX.Element} - The rendered component.
 */
export function QuestionPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] =
        React.useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = React.useState<
        ScanQuestion | undefined
    >(undefined);
    const [questions, setQuestions] = React.useState<ScanQuestion[]>([]);

    const [questionCache, setQuestionCache] = React.useState<ScanQuestion[]>(
        [],
    );

    const scanId = '1';

    const {
        data: scanData,
        // isLoading: scanIsLoading,
        // error: scanError,
    } = useSingleScan(scanId);

    const parsedQuestions: ScanQuestion[] = [];

    if (scanData && parsedQuestions.length === 0) {
        // Sort the categories by index.
        scanData.categories
            .slice()
            .sort((a, b) => parseInt(a.idx, 10) - parseInt(b.idx, 10))
            .forEach((category) => {
                // Sort the questions by index.
                category.questions
                    .slice()
                    .sort((a, b) => parseInt(a.idx, 10) - parseInt(b.idx, 10))
                    .forEach((question) => {
                        parsedQuestions.push(question);
                    });
            });
    }

    /**
     * Fetches questions based on the current question ID.
     * @param {string} currentId - The ID of the current question.
     */
    const fetchQuestions = (currentId: string): void => {
        const currentIndex = parsedQuestions.findIndex(
            (q) => q.id === currentId,
        );

        // Creates an array with the indexes of the questions to fetch.
        // The starting index is the current index minus 1.
        const indexes = Array.from(
            { length: 6 },
            (_, i) => currentIndex - 1 + i,
        ).filter((index) => index >= 0 && index < parsedQuestions.length);

        // Creates an array with the IDs of the questions to fetch, based on the indexes.
        const ids = indexes
            .map((index) => parsedQuestions[index]?.id)
            .filter((id) => id && !questionCache.some((q) => q.id === id));

        // If there are no IDs to fetch, return.
        if (ids.length === 0) return;

        // FetchScanQuestionRange is a function that fetches questions from the API.
        fetchScanQuestionRange(ids)
            .then((data: ScanQuestion[]) => {
                if (data) {
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
                }
            })
            .catch((error) => {
                throw error;
            });
    };

    const firstId = parsedQuestions[0]?.id;
    const {
        data: firstQuestionData,
        // isLoading: firstQuestionIsLoading,
        // error: firstQuestionError,
    } = useScanQuestionRange([firstId]);

    if (firstQuestionData && questionCache.length === 0) {
        setQuestionCache(firstQuestionData);
        setCurrentQuestion(firstQuestionData[0]);
        fetchQuestions(firstId);
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
        // Clamp the index to the range of the questions.
        const maxIndex = parsedQuestions.length;
        index = Math.max(1, Math.min(index, maxIndex));

        // Set the current question index and question.
        setCurrentQuestionIndex(index);
        setCurrentQuestion(
            questionCache.find((q) => q.id === index.toString()),
        );

        // Check if the question is in the question list.
        if (!parsedQuestions[index]) return;

        // Fetch the questions based on the current question.
        fetchQuestions(parsedQuestions[index].id);
    };

    /**
     * Calculates the progress of the current question.
     * @returns {number} fraction - The progress as a fraction ranging from 0 to 1.
     */
    const getProgress = (): number => {
        const maxIndex = parsedQuestions.length;
        const currentIndex = currentQuestionIndex;

        return currentIndex / maxIndex;
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

    return currentQuestion ? (
        <View>
            <ProgressBar progress={getProgress()} />
            <Text>ID: {currentQuestion?.id}</Text>
            <Text>CategoryID: {currentQuestion?.categoryId}</Text>
            <Text>Index: {currentQuestion?.idx}</Text>
            <Text>Question: {currentQuestion?.text}</Text>
            <Text>Description: {currentQuestion?.description}</Text>
            <Button onPress={showPreviousQuestion}>
                <Text>Previous</Text>
            </Button>
            <Button onPress={showNextQuestion}>
                <Text>Next</Text>
            </Button>
        </View>
    ) : (
        <View>
            <Text>Loading the next question for you...</Text>
        </View>
    );
}
