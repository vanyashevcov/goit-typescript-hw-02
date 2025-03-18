import React from "react";

interface LoadMoreBtnProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, disabled, children }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default LoadMoreBtn;