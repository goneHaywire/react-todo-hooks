import React from 'react'
import { Container } from 'react-bootstrap'
import Todos from './components/Todos'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <div className="App my-4">
      <Container>
        <Todos />
      </Container>
    </div>
  );
}

export default App;