import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { resetPassword } from '../../../services/api';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await resetPassword(email);
      setMessage('Password reset instructions have been sent to your email.');
      setError('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to send reset email.');
      }
      setMessage('');
    }
  };

  return (
    <div className="reset-password-box">
      <div className="reset-passwordContainer">
        <h1>Reset Password</h1>
        <p>
          Remembered your password?{' '}
          <Link to="/login" className="link">
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}

          <button type="submit" className="loginButton">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
