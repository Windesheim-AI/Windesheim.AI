import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch } from '../../lib/redux/Hooks';
import { NavigationState } from '@react-navigation/routers';

import { navigationActions } from '../../lib/redux/slices/NavigationSlice';
import { navigationBarLinks } from '../../routes/navigation';
import Quizhome from '../../screens/Quizhome';
import Quizzes from '../../screens/Quizzes';
import Results from '../../screens/Results';

// ✅ Define Answer & Question types
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

// ✅ Define navigation stack types
export type RootStackParamList = {
  Quizhome: undefined;
  Quizzes: { quizId: number };
  Results: { score: number; total: number; questions: Question[]; answers: Record<number, number> };
};

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  children: React.ReactNode;
};

export default function WhNavigationContainer({ children }: Props) {
  const storeDispatcher = useAppDispatch();

  // ✅ Handle state changes for navigation
  function onStateChange(state: NavigationState | undefined) {
    const currentRoute = state?.routes[state.index].name;
    if (!currentRoute) return;

    const isNavBarRoute =
      navigationBarLinks.some((link) => link.route === currentRoute);

    if (isNavBarRoute) {
      storeDispatcher(navigationActions.updateSelectedNavBarRoute(currentRoute));
    }
  }

  return (
    <>
      <Stack.Navigator initialRouteName="Quizhome">
        <Stack.Screen name="Quizhome" component={Quizhome} />
        <Stack.Screen name="Quizzes" component={Quizzes} />
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
      {children}
    </>
  );
}
