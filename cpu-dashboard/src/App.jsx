import { useState } from 'react';
import './App.css'
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [connected, setConnected] = useState(false)

  return (
    <>
      {connected?  <Dashboard/>: <Login  setConnected={setConnected}/>}
    </>
  )
}

export default App;
