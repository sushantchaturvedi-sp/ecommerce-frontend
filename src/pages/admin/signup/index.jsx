import React, { useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { signup } from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signup({ username, email, password });
      login(response.data.user);
      navigate('/');
    } catch (error) {
      if (error.response?.data?.message) {
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
          <Link to="/login" className="link">Sign In</Link>
        </p>

        {error && <p className="errorMessage">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="inputGroup passwordInput">
            <label>Password</label>
            <div className="passwordField">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eyeButton"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
