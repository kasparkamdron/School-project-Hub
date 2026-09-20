import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeName = "frost" | "chalk";

export const THEMES: { id: ThemeName; label: string; hint: string }[] = [
  { id: "frost", label: "Frost", hint: "Light, soft colour wash" },
  { id: "chalk", label: "Chalk", hint: "Dark ink with coral accent" },
];

const STORAGE_KEY = "hub-theme";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "frost",
  setTheme: () => {},
  toggleTheme: () => {},
});

function apply(theme: ThemeName) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "chalk");
  root.dataset["theme"] = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("frost");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: ThemeName =
      stored === "chalk" || stored === "frost" ? stored : "frost";
    setThemeState(initial);
    apply(initial);
  }, []);

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next);
    apply(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "frost" ? "chalk" : "frost");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
