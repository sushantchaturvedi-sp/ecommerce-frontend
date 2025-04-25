import React from "react";
import "./index.scss";

const Toast = ({ message }) => {
  return (
    <div className={`toast ${message.type}`}>
      {message.msg}
    </div>
  );
};

export default Toast;
