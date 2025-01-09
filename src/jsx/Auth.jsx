// pages/Auth.jsx
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { useAuth } from './AuthContext';
import '../css/Auth.css';

const Auth = ({ defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode);
  const { user } = useAuth();

  // Redirect if user is already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      {mode === 'signin' ? (
        <div className="auth-container">
          <SignInForm />
          <p className="auth-switch">
            Don't have an account?{' '}
            <button onClick={() => setMode('signup')}>
              Create one
            </button>
          </p>
        </div>
      ) : (
        <div className="auth-container">
          <SignUpForm />
          <p className="auth-switch">
            Already have an account?{' '}
            <button onClick={() => setMode('signin')}>
              Sign in
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;