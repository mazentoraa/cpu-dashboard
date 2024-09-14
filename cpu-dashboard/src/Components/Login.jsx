import React, { useState } from 'react'
import { databaseSenior, databasePublic } from '../firebase';

export default function Login({setConnected, room, setRoom, setDatabase}) {
    const [loginPwd, setLoginPwd] = useState("")
    const [errMsg, setErrMsg] = useState("")
  const verifyLogin = () => {
    if(loginPwd === "cpudev20242025"){
        setConnected(true)
        setRoom("senior")
        setDatabase(databaseSenior);
        setErrMsg("")
    }
    else if(loginPwd === "cpupsc2425"){
        setConnected(true)
        setRoom("actif")
        setDatabase(databasePublic);
        setErrMsg("")
    }
    else if (loginPwd == "")
        setErrMsg("Please enter your key.")
    else{
        setErrMsg("Connection key is incorrect. Please verify")
        setLoginPwd("")
      }
    }
    const handleEnterKey = (e) => {
      if(e.key === 'Enter') verifyLogin()
      };
    
    const db = (room==="senior"?databaseSenior:databasePublic)
    setDatabase(db)
    return (
      <div className='login-page'>
      <h1>Welcome to CPU Dashboard</h1>
      <h3>Please enter the connection key to login</h3>
      <input 
      type="password" 
      value={loginPwd} 
      onChange={(e)=>{
        setLoginPwd(e.target.value)
        setErrMsg("")
      }}
      onKeyDown={handleEnterKey}>
        </input>
      <button onClick={verifyLogin}>Enter</button>
      <p className='login-error-message'>{errMsg}</p>
    </div>
  )
}