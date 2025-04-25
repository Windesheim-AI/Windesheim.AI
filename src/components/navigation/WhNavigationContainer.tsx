import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch } from '../../lib/redux/Hooks';
import { NavigationState } from '@react-navigation/routers';

import { navigationActions } from '../../lib/redux/slices/NavigationSlice';
import { navigationBarLinks } from '../../routes/navigation';
import { HomeScreen } from '../../screens/Home';
import Quizzes from '../../screens/Quizzes';
import Results from '../../screens/Results';
import { Articles } from '../../screens/Articles'; // ✅ added this import

type Answer = {
  id: number;
  answer: string;
  correct: boolean;
};

type Question = {
  id: number;
  question: string;
  question_title: string;
  answers: Answer[];
};

export type RootStackParamList = {
  Home: undefined;
  Quizzes: { quizId: number };
  Results: {
    score: number;
    total: number;
    questions: Question[];
    answers: Record<number, number>;
  };
  Articles: undefined; // ✅ added
};

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  children: React.ReactNode;
};

export default function WhNavigationContainer({ children }: Props) {
  const storeDispatcher = useAppDispatch();

  function onStateChange(state: NavigationState | undefined) {
    const currentRoute = state?.routes[state.index].name;
    if (!currentRoute) return;

    const isNavBarRoute = navigationBarLinks.some(
      (link) => link.route === currentRoute
    );

    if (isNavBarRoute) {
      storeDispatcher(
        navigationActions.updateSelectedNavBarRoute(currentRoute)
      );
    }
  }

  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Quizzes"
          component={Quizzes}
          options={{ headerShown: true, title: 'Quiz' }}
        />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Articles" component={Articles} />
      </Stack.Navigator>
  
      {children}
    </>
  );
  
}
