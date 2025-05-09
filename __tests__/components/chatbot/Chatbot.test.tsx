import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Chatbot from '../../../src/components/chatbot/chatbox'; // Adjust path as needed
import * as api from '../../../src/api/chatbot'; // Adjust path as needed

// Mock fetchChatResponse
jest.mock('../api/chatbot', () => ({
  fetchChatResponse: jest.fn(),
}));

describe('Chatbot Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the initial assistant message', () => {
    const { getByText } = render(<Chatbot />);
    expect(
      getByText(/Hallo! Ik ben je AI-assistent/i),
    ).toBeTruthy();
  });

  it('sends a message and shows assistant response', async () => {
    const mockResponse = 'Dit is een antwoord van de AI.';
    (api.fetchChatResponse as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { getByPlaceholderText, getByText, queryByText } = render(<Chatbot />);

    const input = getByPlaceholderText('Typ uw bericht');
    fireEvent.changeText(input, 'Wat is generatieve AI?');

    const sendButton = getByText('↑');
    fireEvent.press(sendButton);

    // Check user message appears
    await waitFor(() => {
      expect(getByText('Wat is generatieve AI?')).toBeTruthy();
    });

    // Check typing animation appears
    expect(queryByText('...')).toBeTruthy(); // Simple match

    // Wait for the assistant response to appear
    await waitFor(() => {
      expect(getByText(mockResponse)).toBeTruthy();
    });
  });

  it('does not send empty messages', () => {
    const { getByText } = render(<Chatbot />);
    const sendButton = getByText('↑');
    fireEvent.press(sendButton);

    expect(api.fetchChatResponse).not.toHaveBeenCalled();
  });
});
