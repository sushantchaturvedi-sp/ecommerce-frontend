import React, { createContext, useState, useContext } from "react";
import Toast from "../components/toast/index";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showToast = (msg, type = "success") => {
    setMessage({ msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && <Toast message={message} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
