import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import DefineHomeworkPage from '../pages/DefineHomeworkPage';

// Mock the react-router-dom hooks
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('DefineHomeworkPage', () => {
  // Cleanup after each test
  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  it('renders the page title', () => {
    render(<DefineHomeworkPage />);
    expect(screen.getByText(/Define Homework Assignment/i)).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<DefineHomeworkPage />);
    expect(screen.getByLabelText(/Assignment Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Assignment Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();
  });

  it('form validation shows required fields', async () => {
    render(<DefineHomeworkPage />);
    const submitButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(submitButton);
    
    const titleInput = screen.getByLabelText(/Assignment Title/i);
    expect(titleInput).toBeRequired();
  });

  it('successful form submission', async () => {
    render(<DefineHomeworkPage />);
    
    fireEvent.change(screen.getByLabelText(/Assignment Title/i), {
      target: { value: 'Test Homework' },
    });
    fireEvent.change(screen.getByLabelText(/Assignment Description/i), {
      target: { value: 'Test Description' },
    });
    
    const submitButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.queryByDisplayValue('Test Homework')).toBeNull();
    }, { timeout: 1000 });
  });

  it('renders rubric section', () => {
    render(<DefineHomeworkPage />);
    expect(screen.getByText(/Grading Rubric/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Criterion/i)).toBeInTheDocument();
  });

  it('can add rubric criterion', async () => {
    render(<DefineHomeworkPage />);
    const addButton = screen.getByText(/Add Criterion/i);
    fireEvent.click(addButton);
    
    await waitFor(() => {
      const criterionInputs = screen.getAllByRole('textbox', { name: /criterion/i });
      const pointsInputs = screen.getAllByRole('spinbutton', { name: /points/i });
      expect(criterionInputs.length).toBeGreaterThan(0);
      expect(pointsInputs.length).toBeGreaterThan(0);
    }, { timeout: 1000 });
  });
}); 