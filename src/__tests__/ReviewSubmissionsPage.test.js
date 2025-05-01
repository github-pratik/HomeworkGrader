import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewSubmissionsPage from '../pages/ReviewSubmissionsPage';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock submission data
const mockSubmissions = [
  {
    id: 1,
    studentName: 'John Doe',
    studentId: 'S12345',
    assignment: 'JavaScript Basics',
    assignmentTitle: 'JavaScript Basics',
    submissionTime: '2023-11-10T14:30:00',
    status: 'submitted',
    grade: null,
    fileName: 'hw1_johndoe.pdf'
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    studentId: 'S12346',
    assignment: 'JavaScript Basics',
    assignmentTitle: 'JavaScript Basics',
    submissionTime: '2023-11-11T09:15:00',
    status: 'graded',
    grade: 85,
    fileName: 'hw1_janesmith.pdf'
  }
];

describe('ReviewSubmissionsPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders page title and submission list', () => {
    render(<ReviewSubmissionsPage submissions={mockSubmissions} />);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
  });

  it('displays submission details correctly', () => {
    render(<ReviewSubmissionsPage submissions={mockSubmissions} />);
    expect(screen.getAllByText('JavaScript Basics')[0]).toBeInTheDocument();
    expect(screen.getByText(/S12345/)).toBeInTheDocument();
    expect(screen.getByText(/S12346/)).toBeInTheDocument();
  });

  it('filters submissions by status', () => {
    render(<ReviewSubmissionsPage submissions={mockSubmissions} />);
    
    // Get status filter dropdown
    const statusSelect = screen.getByRole('combobox', { name: /Status/i });
    
    // Open dropdown and select "Submitted"
    fireEvent.mouseDown(statusSelect);
    const submittedOption = screen.getByRole('option', { name: /submitted/i });
    fireEvent.click(submittedOption);
    
    // Check filtered results
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.queryByText(/Jane Smith/)).not.toBeInTheDocument();
  });

  it('filters submissions by student name', () => {
    render(<ReviewSubmissionsPage submissions={mockSubmissions} />);
    
    // Use the search textbox
    const searchInput = screen.getByRole('textbox', { name: /Search/i });
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.queryByText(/Jane Smith/)).not.toBeInTheDocument();
  });

  it('navigates to grade submission page when clicking grade button', () => {
    render(<ReviewSubmissionsPage submissions={mockSubmissions} />);
    
    // Find the row with John Doe
    const johnDoeRow = screen.getByText(/John Doe/).closest('tr');
    const gradeButton = johnDoeRow.querySelector('button[type="button"]:last-child');
    fireEvent.click(gradeButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/grade-submissions', {
      state: { 
        selectedSubmission: mockSubmissions[0],
        showAiDialog: true
      }
    });
  });

  it('shows no submissions message when list is empty', () => {
    render(<ReviewSubmissionsPage submissions={[]} />);
    expect(screen.getByText(/No submissions available/i)).toBeInTheDocument();
  });

  it('shows submission details in modal when clicking view button', async () => {
    render(<ReviewSubmissionsPage submissions={mockSubmissions} />);
    
    // Find the row with John Doe
    const johnDoeRow = screen.getByText(/John Doe/).closest('tr');
    const viewButton = johnDoeRow.querySelector('button[type="button"]');
    fireEvent.click(viewButton);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Assignment:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/John Doe/)[0]).toBeInTheDocument();
    expect(screen.getByText(/hw1_johndoe.pdf/)).toBeInTheDocument();
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);
    
    // Wait for the modal to close
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
}); 