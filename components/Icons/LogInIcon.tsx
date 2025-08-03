const LoginIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="Login"
    viewBox="0 0 24 24"
  >
    {/* Door frame */}
    <rect x="3" y="5" width="14" height="14" rx="2" ry="2" />
    {/* Arrow pointing in (Login) */}
    <path d="M17 12H7" />
    <path d="M14 9l3 3-3 3" />
  </svg>
);

export default LoginIcon;
