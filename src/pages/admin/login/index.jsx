import React, { useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { login as apiLogin } from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
      keepSignedIn,
    };

    try {
      const response = await apiLogin(loginData);
      login(response.data.data);

      const token = response.data.data.token;
      const role = response.data.data.role;

      localStorage.setItem('token', token);
      role === 'admin' ? navigate('/admin') : navigate('/');
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-box">
      <div className="loginContainer">
        <h1>Sign In</h1>
        <p>
          New to Our Product?{' '}
          <Link to="/signup" className="link">Create an Account</Link>
        </p>

        {error && <p className="errorMessage">{error}</p>}

        <form onSubmit={handleLogin}>
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

          <div className="inputGroup checkboxGroup">
            <input
              type="checkbox"
              id="keepSignedIn"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            <label htmlFor="keepSignedIn">Keep me signed in</label>
          </div>

          <div className="forgot-password-inputGroup">
            <Link to="/reset-password" className="link">Forgot your password?</Link>
          </div>

          <button type="submit" className="loginButton">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
