import { render, fireEvent } from '@testing-library/react-native';

import React from 'react';

import { PromptCard } from '../../../src/components/chatbot/PromptCard';

describe('PromptCard', () => {
  it('renders the prompt text and responds to press', () => {
    const mockPressHandler = jest.fn();
    const { getByText } = render(
      <PromptCard text="Test prompt" onPress={mockPressHandler} />
    );

    // Check that the text is rendered
    const textElement = getByText('Test prompt');
    expect(textElement).toBeTruthy();

    // Simulate press
    fireEvent.press(textElement);
    expect(mockPressHandler).toHaveBeenCalled();
  });
});
