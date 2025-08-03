"use client";

import React, { useEffect, useState } from "react";
import "./feedbackToast.css";

import { FeedbackToastPropsType } from "./types";

const ToastColors = {
  success: "bg-green-500",
  error: "bg-red-600",
  info: "bg-blue-600",
};

const FeedBackToast = ({
  type,
  message,
  onClose,
  duration = 5000,
}: FeedbackToastPropsType) => {

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (duration === 0) return; // persistent toast if duration 0

    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!show) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={`fixed bottom-6 right-6 max-w-sm rounded shadow-lg text-white px-5 py-3 flex items-center space-x-4 z-50 transform transition-all duration-300 ease-in-out ${ToastColors[type]}`}
    >
      <span className="flex-grow break-words">{message}</span>
      <button
        aria-label="Close notification"
        onClick={() => {
          setShow(false);
          if (onClose) onClose();
        }}
        className="focus:outline-none focus:ring-2 focus:ring-white rounded"
      >
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
