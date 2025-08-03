"use client";

// 1. React core libraries
import React, { useEffect, useState } from "react";

// 2. Styles
import "./feedbackToast.css";

// 3. Types
import { FeedbackToastPropsType } from "./types";

// Mapping toast types to tailwind background color classes
const ToastColors = {
  success: "bg-green-500",
  error: "bg-red-600",
  info: "bg-blue-600",
};

const FeedBackToast = ({
  // 1. Props destructuring with default duration 5000ms
  type,
  message,
  onClose,
  duration = 5000,
}: FeedbackToastPropsType) => {
  // 2. Local state to control visibility of toast
  const [show, setShow] = useState(true);

  // 3. useEffect to auto-dismiss toast after `duration` ms
  useEffect(() => {
    // If duration is 0, keep toast visible indefinitely (persistent)
    if (duration === 0) return;

    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, duration);

    // Cleanup timeout on unmount or duration/onClose change
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // 4. If not visible, render nothing
  if (!show) return null;

  // 5. Render toast container with accessibility attributes
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={`fixed bottom-6 right-6 max-w-sm rounded shadow-lg text-white px-5 py-3 flex items-center space-x-4 z-50 transform transition-all duration-300 ease-in-out ${ToastColors[type]}`}
    >
      {/* Toast message text with wrapping support */}
      <span className="flex-grow break-words">{message}</span>

      {/* Close button to manually dismiss the toast */}
      <button
        aria-label="Close notification"
        onClick={() => {
          setShow(false);
          if (onClose) onClose();
        }}
        className="focus:outline-none focus:ring-2 focus:ring-white rounded"
      >
        {/* Close icon (X) SVG */}
        <svg
          className="h-5 w-5 text-white hover:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default FeedBackToast;
