import React from 'react'
// import "./button.scss"
import "../nav.scss"
import { useNavigate } from 'react-router'
const Nav = () => {

    const navigate = useNavigate()
  return (
    <nav >
        <p>Instagram</p>
        <button onClick={()=>
            navigate("/createpost")
        } className='button primaryButton'>Create Post</button>
    </nav>
  )
}

export default Nav
