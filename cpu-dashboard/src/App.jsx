import { useState } from 'react';
import './App.css'
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [connected, setConnected] = useState(false)
  const [room, setRoom] = useState("none")
  const [database, setDatabase] = useState(null);

  return (
    <>
      {connected? (
        <Dashboard database={database}/>
        ) : (
        <Login  
          setConnected={setConnected}  
          room={room} 
          setRoom={setRoom} 
          setDatabase={setDatabase}/>
        )}
    </>
  )
}

export default App;
