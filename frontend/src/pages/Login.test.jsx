import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// Mock framer-motion to avoid animation issues in tests

// Hoisted mocks - must be defined before vi.mock() calls
const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const mockCreateAccount = vi.fn();
const mockLoginAsGuest = vi.fn();
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>
  }
}));

// Mock useNavigate

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


// Mock useAuth
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    loggedInUser: null,
    login: mockLogin,
    createAccount: mockCreateAccount,
        loginAsGuest: mockLoginAsGuest,
  }),
}));

// Helper function to render Login with Router
const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form by default', () => {
    renderLogin();
    
    expect(screen.getByText('GreenPort')).toBeInTheDocument();
    expect(screen.getByText('Monitor your digital carbon footprint')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders back to home button', () => {
    renderLogin();
    
    const backButton = screen.getByRole('button', { name: /back to home/i });
    expect(backButton).toBeInTheDocument();
  });

  it('navigates to home when back button is clicked', async () => {
    const user = userEvent.setup();
    renderLogin();
    
    const backButton = screen.getByRole('button', { name: /back to home/i });
    await user.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('switches to signup mode when create account is clicked', async () => {
    const user = userEvent.setup();
    renderLogin();
    
    const createAccountButton = screen.getByRole('button', { name: /create account/i });
    await user.click(createAccountButton);
    
    // In signup mode, the name field should appear
    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    });
    
    // Submit button text should change
    const createAccountButtons = screen.getAllByRole('button', { name: /create account/i });
    expect(createAccountButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('handles successful login', async () => {
    const user = userEvent.setup();
    mockLogin.mockReturnValue({ success: true });
    
    renderLogin();
    
    // Fill in the form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    // Verify login was called with correct credentials
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
    
    // Verify navigation to dashboard
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles successful signup', async () => {
    const user = userEvent.setup();
    mockCreateAccount.mockReturnValue({ success: true });
    
    renderLogin();
    
    // Switch to signup mode
    const createAccountButton = screen.getByRole('button', { name: /create account/i });
    await user.click(createAccountButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    });
    
    // Fill in the form
    await user.type(screen.getByLabelText(/full name/i), 'Test User');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit the form
    // Submit the form - get the submit button (not the tab button)
    // Find submit button by class
    const submitButton = document.querySelector('.submit-btn');
    await user.click(submitButton);
    
    // Verify createAccount was called with correct data
    await waitFor(() => {
      expect(mockCreateAccount).toHaveBeenCalledWith('Test User', 'test@example.com', 'password123');
    });
    
    // Verify navigation to dashboard
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
