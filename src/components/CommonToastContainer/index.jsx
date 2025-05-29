import React from 'react';
import {
  Bounce,
  ToastContainer as ReactToastifyContainer,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

const CommonToastContainer = () => {
  return (
    <ReactToastifyContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default CommonToastContainer;
