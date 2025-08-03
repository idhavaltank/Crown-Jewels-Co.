// LogoutIcon.tsx
import React from "react";

const LogoutIcon = () => (
  <svg
    width="24"
    height="24"
    fill="currentColor"
    aria-label="Logout"
    viewBox="0 0 24 24"
  >
    {/* Door frame */}
    <rect
      x="3"
      y="4"
      width="12"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    {/* Arrow */}
    <path
      d="M16 12h5m0 0l-2-2m2 2l-2 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default LogoutIcon;
