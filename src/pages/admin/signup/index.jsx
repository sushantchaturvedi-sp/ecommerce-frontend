import React, { useState, useContext } from 'react';
import { signup } from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const signupData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await signup(signupData);
      login(response.data.user);
      navigate('/');
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('Signup failed');
      }
    }
  };

  return (
    <div className="signup-box">
      <div className="signupContainer">
        <h1>Create an Account</h1>
        <p>
          Have an account?{' '}
          <Link to="/login" className="link">
            Sign In
          </Link>
        </p>

        {error && <p className="errorMessage">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="submitButton">
            Create Account
          </button>
        </form>

        <p className="terms">
          By creating an account, you agree to our{' '}
          <span className="link">Terms of Service</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
