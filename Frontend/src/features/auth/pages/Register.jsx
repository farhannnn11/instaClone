import React, { useState } from 'react'
import { Link } from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Register = () => {
    const {loading,user,registerHandler}= useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword]= useState("")
    const navigate  = useNavigate()
    const submitHandler = async(e)=>{
        e.preventDefault()
        console.log("sub");
        await registerHandler(username,email,password)
        navigate("/login")
        setUsername("")
        setEmail("")
        setPassword("")
    }

    if(loading){
        return <h1>Loading...</h1>
    }
  return (
    <main>
     <div className='form-container'>
        <h3>Register</h3>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <input value={username} onChange={(e)=>{
                setUsername(e.target.value)
            }} type="username" placeholder='Enter username' />
            <input value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }} type="email" placeholder='Enter email'/>
            <input value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }} type="password" placeholder='Enter password' />

            <button className='button primaryButton'>Submit</button>
        </form>
        <p>Already have an account? <Link className='nav' to={"/login"} >Login</Link></p>
    </div>
    </main>

  )
}

export default Register