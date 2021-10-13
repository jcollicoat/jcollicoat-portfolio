import { useState, createContext } from "react";

const ThemeContext = createContext();

const ThemeStore = ({ children }) => {
  const [theme, setTheme] = useState({
    background: "#111111",
    text: "#ffffff",
    easeout: "cubic-bezier(0.2, 0.65, 0.3, 0.9)",
    padding: {
      sm: "var(--padding-sm)",
      md: "var(--padding-md)",
      lg: "var(--padding-lg)",
    },
  });

  const switchTheme = (theme) => setTheme(theme);

  return (
    <ThemeContext.Provider value={{ switchTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeStore, ThemeContext };
