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
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        pointerEvents: disabled ? "none" : "auto",
      }}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default LoadMoreBtn;
