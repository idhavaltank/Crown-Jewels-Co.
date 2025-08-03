// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         background: 'var(--color-background)',
//         card: 'var(--color-card)',
//         text: 'var(--color-text)',
//         error: 'var(--color-error)',
//         cta: 'var(--color-cta)',
//         primary: 'var(--color-primary)',
//         secondary: 'var(--color-secondary)',
//         highlight: 'var(--color-highlight)',
//         muted: 'var(--color-muted)',
//         success: 'var(--color-success)',
//         border: 'var(--color-border)',
//         // Add any additional tokens as needed
//       },
//       boxShadow: {
//         // if you want custom named shadows
//         card: "0 2px 18px 0 rgba(30, 41, 59, 0.06)",
//       },
//       fontFamily: {
//         sans: 'var(--font-sans)',
//       },
//     },
//   },
//   // Optional: enable JIT to pick up every class dynamically
//   plugins: [],
// };

module.exports = {
  theme: {
    extend: {
      colors: {
        background: "#21314D", // dark_blue
        card: "#2A3A58", // dark_gray_blue
        text: "#BFA35B", // gold (for headings or highlight)
        error: "#BFA35B", // gold (you can swap for red as needed)
        cta: "#364C78", // medium_blue
        primary: "#21314D", // dark_blue
        secondary: "#506B9C", // light_blue
        highlight: "#BFA35B", // gold
        muted: "#2A3A58", // dark_gray_blue
        success: "#506B9C", // light_blue
        border: "#364C78", // medium_blue
        // Add any additional tokens as needed
      },
      boxShadow: {
        // if you want custom named shadows
        card: "0 2px 18px 0 rgba(30, 41, 59, 0.06)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
      },
    },
  },
  // Optional: enable JIT to pick up every class dynamically
  plugins: [],
};
