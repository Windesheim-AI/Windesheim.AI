import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Chatbot from '../../../src/components/chatbot/chatbox';
import { fetchChatResponse } from '../../../src/api/chatbot';

// Mock API response with delay to simulate animation
jest.mock('../../../src/api/chatbot', () => ({
  fetchChatResponse: jest.fn(() =>
    new Promise((resolve) => {
      setTimeout(() => resolve('Dit is een antwoord van de AI.'), 500);
    })
  ),
}));

describe('Chatbot Component', () => {
  it('renders initial assistant message', () => {
    const { getByText } = render(<Chatbot />);
    expect(
      getByText(/Hallo! Ik ben je AI-assistent/i)
    ).toBeTruthy();
  });

  it('sends user message and shows typing animation', async () => {
    const { getByPlaceholderText, getByText, queryByTestId, findByText } = render(<Chatbot />);

    // Type a message
    fireEvent.changeText(getByPlaceholderText('Typ uw bericht'), 'Wat is generatieve AI?');
    fireEvent.press(getByText('↑'));

    // Typing animation should show up
    await waitFor(() => {
      expect(queryByTestId('typing-animation')).toBeTruthy();
    });

    // Wait for the assistant's reply
    const response = await findByText('Dit is een antwoord van de AI.');
    expect(response).toBeTruthy();
  });

  it('sends prompt message and receives response', async () => {
    const { getByText, queryByTestId, findByText } = render(<Chatbot />);

    // Tap on a suggested prompt
    fireEvent.press(getByText('Wat is generative AI?'));

    // Typing animation should show
    await waitFor(() => {
      expect(queryByTestId('typing-animation')).toBeTruthy();
    });

    // Wait for assistant response
    const response = await findByText('Dit is een antwoord van de AI.');
    expect(response).toBeTruthy();
  });
});
