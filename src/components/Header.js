import { Icon } from '@iconify/react'
import themeLightDark from '@iconify/icons-mdi/theme-light-dark';
import { Navbar } from 'react-bootstrap'
import { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import { LastTodo } from '../contexts/LastTodoContext'

const Header = ({ setTheme }) => {
    const theme = useContext(ThemeContext)
    const lastTodo = useContext(LastTodo)

    return (
        <Navbar className="navbar" bg={theme === "light" ? "light" : "dark"}>
            <h4 className="mb-0">react-todos</h4>
            <div className="last-todo">{lastTodo ? `Last added todo: ${lastTodo}` : `You haven't added any todos`}</div>
            <div className="theme-switcher">
                <Icon icon={themeLightDark} className="theme-icon" onClick={() => theme === "light" ? setTheme('dark') : setTheme('light')} />
            </div>
        </Navbar>
    )
}

export default Header