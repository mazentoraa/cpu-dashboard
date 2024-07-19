import React, { useState } from 'react'

export default function Login({setConnected}) {
    const [loginPwd, setLoginPwd] = useState("")
    const [errMsg, setErrMsg] = useState("")
  const verifyLogin = () => {
    if(loginPwd == "cpudev20242025"){
        setConnected(true)
        setErrMsg("")
    }
    else if (loginPwd == "")
        setErrMsg("Please enter your key.")
    else{
        setErrMsg("Connection key is incorrect. Please verify")
        setLoginPwd("")
    }
  }
  const handleEnterKey = (e) => {if(e.key === 'Enter') verifyLogin()};
    
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
