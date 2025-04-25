import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/api';
import './index.scss';

function ChangePassword() {
  const params = useParams();
  const token = params.token;

  // const [validToken, setValidToken] = useState(null);
  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // const [tokenValid, setTokenValid] = useState(null);

  // useEffect(() => {
  //   // Call API to validate token on page load
  //   const checkToken = async () => {
  //     try {
  //       await validateToken(token); // This should be a GET request to backend
  //       setLoading(false);
  //     } catch (err) {
  //       setError('Invalid or expired token.');
  //       setLoading(false);
  //     }
  //   };

  //   checkToken();
  // }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await changePassword(token, password);
      setSuccess('Password changed successfully! Redirecting to login...');
      setError('');

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setSuccess('');
    }
  };

  // if (validToken === null) {
  //   return <p>Verifying token...</p>;
  // }

  // if (!validToken) {
  //   return <p>Invalid or expired token</p>; 
  // }

  return (
    <div className="loginContainer">
      <h2>Change Your Password</h2>

      {error && <p className="error">{error}</p>}

      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="inputGroup">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="loginButton">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
