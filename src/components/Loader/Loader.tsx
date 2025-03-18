import React from "react";

interface LoadMoreBtnProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <div
      onClick={onClick}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};

export default LoadMoreBtn;
