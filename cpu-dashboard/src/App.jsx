import { useState } from 'react';
import './App.css'
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';

function App() {
  const [connected, setConnected] = useState(false)

  return (
    <>
      {connected?  <Dashboard/>: <Login  setConnected={setConnected}/>}
    </>
  )
}

export default App;
