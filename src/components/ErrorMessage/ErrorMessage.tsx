import React from "react";

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return <p>{children}</p>;
};

export default ErrorMessage;
