import { useEffect, useState } from "react"
import { THEME } from "./ThemeContext.const"
import ThemeContext from "./ThemeContext";

const originalTheme = localStorage.getItem('theme-austral-2025');

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(originalTheme ?? THEME.LIGHT);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme])

    const handleToggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === THEME.LIGHT ?
                THEME.DARK : THEME.LIGHT;

            localStorage.setItem('theme-austral-2025', newTheme)
            document.documentElement.setAttribute('data-bs-theme', newTheme);

            return newTheme;

        })
    }

    return (
        <ThemeContext value={{
            theme,
            onChangeTheme: handleToggleTheme
        }}>
            {children}
        </ThemeContext>
    )
}

export default ThemeContextProvider