import { createContext, useContext, useState, ReactNode } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
} from "@mui/material";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#3d3c3c",
      },
      secondary: {
        main: "#9c27b0",
      },
    },
    components: {
        MuiButtonBase: {
        styleOverrides: {
            root: {
            "&:focus": {
              outline: "none !important", // Rimuove il bordo focus
            },
            "&:focus-visible": {
                outline: "none !important",
            },
            },
        },
    },
    },
});

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
