// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { changePassword } from '../../services/api';
// import './index.scss';

// function ChangePassword() {
//   const params = useParams();
//   const token = params.token;

//   const navigate = useNavigate();

//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');

//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     if (newPassword !== confirmNewPassword) {
//       setErrorMessage('Passwords do not match.');
//       return;
//     }

//     try {
//       await changePassword(token, newPassword);

//       setSuccessMessage('Password changed successfully! Redirecting...');
//       setErrorMessage('');

//       setTimeout(() => {
//         navigate('/login');
//       }, 3000);
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage('Something went wrong. Please try again.');
//       }

//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div className="loginContainer">
//       <h1>Set a New Password</h1>

//       {errorMessage && <p className="error">{errorMessage}</p>}

//       {successMessage && <p className="success">{successMessage}</p>}

//       <form onSubmit={handleFormSubmit}>
//         <div className="inputGroup">
//           <label>New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div className="inputGroup">
//           <label>Confirm New Password</label>
//           <input
//             type="password"
//             value={confirmNewPassword}
//             onChange={(e) => setConfirmNewPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="loginButton">
//           Change Password
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ChangePassword;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/api';
import './index.scss';

function ChangePassword() {
  const params = useParams();
  const token = params.token;

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

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
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setSuccess('');
    }
  };

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
