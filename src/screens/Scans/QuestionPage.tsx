import React from 'react';
import { View, Text } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';

import fetchScanQuestionRange from '../../lib/repositories/scans/fetchScanQuestionRange';
import useScanQuestionRange from '../../lib/repositories/scans/useScanQuestionRange';
import useSingleScan from '../../lib/repositories/scans/useSingleScan';
import { ScanQuestion } from '../../types/Scan';

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
        scanData.categories
            .sort((a, b) => parseInt(a.idx, 10) - parseInt(b.idx, 10))
            .forEach((category) => {
                category.questions
                    .sort((a, b) => parseInt(a.idx, 10) - parseInt(b.idx, 10))
                    .forEach((question) => {
                        parsedQuestions.push(question);
                    });
            });
    }

    const fetchQuestions = (currentId: string) => {
        const currentIndex = parsedQuestions.findIndex(
            (q) => q.id === currentId,
        );

        const indexes = [
            currentIndex - 1,
            currentIndex,
            currentIndex + 1,
            currentIndex + 2,
            currentIndex + 3,
            currentIndex + 4,
        ];

        const ids: string[] = [];

        indexes.forEach((index) => {
            if (parsedQuestions.length === 0) {
                if (index >= 0) {
                    ids.push(index.toString());
                }
                return;
            }

            const question = parsedQuestions.find(
                (q) => q.id === index.toString(),
            );

            if (question && !questionCache.find((q) => q.id === question.id)) {
                ids.push(question.id);
            }
        });

        if (ids.length === 0) return;

        fetchScanQuestionRange(ids)
            .then((data: ScanQuestion[]) => {
                if (!data) return;

                const newQuestionCache = [...questionCache];
                data.forEach((q) => {
                    if (!newQuestionCache.find((qc) => qc.id === q.id)) {
                        newQuestionCache.push(q);
                    }
                });
                setQuestionCache(newQuestionCache);

                if (currentQuestion === undefined) {
                    setCurrentQuestion(data.find((q) => q.id === currentId));
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

    const showNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        showQuestion(nextIndex);
    };

    const showPreviousQuestion = () => {
        const previousIndex = currentQuestionIndex - 1;
        showQuestion(previousIndex);
    };

    const showQuestion = (index: number) => {
        const maxIndex = parsedQuestions.length;

        if (index < 1) {
            index = 1;
        }

        if (index > maxIndex) {
            index = maxIndex;
        }

        setCurrentQuestionIndex(index);
        setCurrentQuestion(
            questionCache.find((q) => q.id === index.toString()),
        );

        if (!parsedQuestions[index]) return;

        try {
            fetchQuestions(parsedQuestions[index].id);
        } catch (error) {
            console.log(error);
            fetchQuestions(parsedQuestions[index].id);
        }
    };

    const getProgress = () => {
        const maxIndex = parsedQuestions.length;
        const currentIndex = currentQuestionIndex;

        return currentIndex / maxIndex;
    };

    return (
        <View>
            <ProgressBar progress={getProgress()} />
            <Text>Question: {currentQuestion?.text}</Text>
            <Text>Description: {currentQuestion?.description}</Text>
            <Button onPress={showPreviousQuestion}>
                <Text>Previous</Text>
            </Button>
            <Button onPress={showNextQuestion}>
                <Text>Next</Text>
            </Button>
        </View>
    );
}
