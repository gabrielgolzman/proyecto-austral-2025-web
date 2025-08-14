import { createContext } from "react";
import { THEME } from "./ThemeContext.const";

const ThemeContext = createContext({
    theme: THEME.LIGHT,
    onChangeTheme: () => { }
});

export default ThemeContext;