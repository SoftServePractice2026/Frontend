import { createContext } from "react";
import type { Theme } from "../model/types";

export interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);