'use client';

import { createContext, useState, useEffect } from "react";

// Create a context to share theme state and toggle function across the app
export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  // Theme state: defaults to 'light'
  const [theme, setTheme] = useState("dark");

  // On mount, ensure the 'light' theme is applied to the document
  useEffect(() => {
    document.documentElement.classList.add("dark"); // Remove dark mode if present
  }, []);

  // Function to toggle between light and dark mode manually
  const toggleTheme = () =>
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";

      // Update the <html> element to reflect the new theme
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return next;
    });

  // Provide theme state and toggle function to children
  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}