import { useContext } from 'react'
import { Button } from 'react-bootstrap'

import ThemeContext from '../../../services/themeContext/ThemeContext'
import { THEME } from '../../../services/themeContext/ThemeContext.const';

const ToggleTheme = () => {
    const { theme, onChangeTheme } = useContext(ThemeContext);

    const handleToggleTheme = () => {
        onChangeTheme()
    }

    return (
        <div className='text-center mb-3'>
            <Button onClick={handleToggleTheme} className='w-75'> Cambiar a tema {theme === THEME.LIGHT ? 'oscuro' : 'claro'}</Button>
        </div>
    )
}

export default ToggleTheme