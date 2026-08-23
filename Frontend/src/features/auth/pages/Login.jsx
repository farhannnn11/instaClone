import React, { useState } from 'react'
import "../style/form.scss"
import { Link, useNavigate } from 'react-router'
import Register from './Register'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const navigate = useNavigate()
    const {loading,user,loginHandler} =useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler =  async(e)=>{
        e.preventDefault()
        console.log("Submitted");
        await loginHandler(email,password)
        console.log("user logged in");
        navigate("/feed")
        setEmail("")
        setPassword("")
    }
    if(loading){
        return <h1>Loading...</h1>
    }

  return (
    <main>
    <div className='form-container'>
        <h3>Login</h3>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <input value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }} type="email" placeholder='Enter the email' />
            
            <input value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }} type="password" placeholder='Enter password' />
            <button className='button primaryButton'>Submit</button>
        </form>

        <p>Don't have account? <Link className='nav' to={"/register"}>Register</Link></p>
    </div>

    </main>
  )
}

export default Login