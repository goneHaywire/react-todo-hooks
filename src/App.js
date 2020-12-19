import { Container } from 'react-bootstrap'
import Todos from './components/Todos'
import Header from './components/Header'
import useTheme from './use/useTheme'
import ThemeContext from './contexts/ThemeContext'
import { LastTodo, LastTodoSetter } from './contexts/LastTodoContext'
import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [theme, setTheme] = useTheme('light')
  const [lastTodo, setLastTodo] = useState(null)

  return (
    <>
      <LastTodoSetter.Provider value={setLastTodo}>
        <LastTodo.Provider value={lastTodo}>
          <ThemeContext.Provider value={theme}>
            <div className={`App pb-4 main-bg-${theme === "dark" ? "dark" : "light"}`}>
              <Header setTheme={setTheme} />
              <Container>
                <Todos />
              </Container>
            </div>
          </ThemeContext.Provider>
        </LastTodo.Provider>
      </LastTodoSetter.Provider>
    </>
  );
}

export default App;