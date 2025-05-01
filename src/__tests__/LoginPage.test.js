import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../pages/LoginPage';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('LoginPage', () => {
  beforeEach(() => {
    // Clear mock data before each test
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('shows validation error for empty email', async () => {
    render(<LoginPage />);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(signInButton);
    
    const emailInput = screen.getByLabelText(/Email Address/i);
    expect(emailInput).toBeRequired();
  });

  it('shows validation error for empty password', async () => {
    render(<LoginPage />);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(signInButton);
    
    const passwordInput = screen.getByLabelText(/^Password/i);
    expect(passwordInput).toBeRequired();
  });

  it('shows validation error for invalid email format', () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
  });

  it('navigates to home page on successful login', async () => {
    render(<LoginPage />);
    
    // Fill in valid credentials
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'user@gmail.com' }
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'user123' }
    });
    
    // Select course
    const courseSelect = screen.getByLabelText(/Select Course/i);
    fireEvent.mouseDown(courseSelect);
    const courseOption = screen.getByRole('option', { name: /SWE 632 - User Interface Design and Development/i });
    fireEvent.click(courseOption);
    
    // Submit form
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(signInButton);
    
    // Check if navigation was called
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(localStorage.getItem('currentCourse')).toBe('swe632');
  });

  it('shows error message for invalid credentials', async () => {
    render(<LoginPage />);
    
    // Fill in invalid credentials
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'wrong@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'wrongpassword' }
    });
    
    // Select course
    const courseSelect = screen.getByLabelText(/Select Course/i);
    fireEvent.mouseDown(courseSelect);
    const courseOption = screen.getByRole('option', { name: /SWE 632 - User Interface Design and Development/i });
    fireEvent.click(courseOption);
    
    // Submit form
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(signInButton);
    
    // Check for error message
    expect(await screen.findByText(/Invalid email or password/i)).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<LoginPage />);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });
    
    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click toggle button
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Click toggle button again
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
}); 