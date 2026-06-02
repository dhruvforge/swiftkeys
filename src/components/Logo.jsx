/**
 * SwiftKeys logo — keyboard + lightning bolt.
 * Used inline in the header so it inherits theme colours via CSS vars.
 */
export default function Logo({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SwiftKeys logo"
    >
      {/* Dark rounded background */}
      <rect width="48" height="48" rx="10" fill="#0e0d16" />
      <rect width="48" height="48" rx="10" fill="none" stroke="rgba(226,183,20,0.25)" strokeWidth="1" />

      {/* ── Keyboard body ── */}
      <rect x="5" y="17" width="38" height="23" rx="5"
        fill="rgba(226,183,20,0.07)" stroke="#e2b714" strokeWidth="1.8" />

      {/* Top-row keys — lit, half-lit, dim */}
      <rect x="8"  y="20.5" width="7" height="5" rx="1.5" fill="#e2b714" />
      <rect x="17" y="20.5" width="7" height="5" rx="1.5" fill="#e2b714" fillOpacity="0.55" />
      <rect x="26" y="20.5" width="7" height="5" rx="1.5" fill="#e2b714" fillOpacity="0.25" />
      <rect x="35" y="20.5" width="7" height="5" rx="1.5" fill="#e2b714" fillOpacity="0.15" />

      {/* Spacebar */}
      <rect x="13" y="29" width="22" height="5" rx="1.5" fill="#e2b714" fillOpacity="0.45" />

      {/* ── Lightning bolt — top-right corner ── */}
      {/* Bold arrow-head style bolt */}
      <path
        d="M38 4 L31 15 H36 L29 26 L43 12 H38 Z"
        fill="#e2b714"
        stroke="#0e0d16"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />

      {/* Subtle glow dot under first key (cursor) */}
      <circle cx="11.5" cy="23" r="1.5" fill="white" fillOpacity="0.6" />
    </svg>
  )
}
