import React, { useState, useContext } from 'react';
import { login as apiLogin } from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState('');

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
      keepSignedIn: keepSignedIn,
    };

    try {
      const response = await apiLogin(loginData);
      login(response.data.data);

      const token = response.data.data.token;
      const role = response.data.data.role;

      localStorage.setItem('token', token);
      if (role == 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="login-box">
      <div className="loginContainer">
        <h1>Sign In</h1>
        <p>
          New to Our Product?{' '}
          <Link to="/signup" className="link">
            Create an Account
          </Link>
        </p>

        {error && <p className="errorMessage">{error}</p>}

        <form onSubmit={handleLogin}>
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

          <div className="inputGroup">
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={(event) => setKeepSignedIn(event.target.checked)}
            />
            <label>Keep me signed in</label>
          </div>

          <div className="inputGroup">
            <Link to="/reset-password" className="link">
              Forgot your password?
            </Link>
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
