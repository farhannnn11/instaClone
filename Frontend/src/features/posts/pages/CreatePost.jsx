import React, { useRef, useState } from 'react'
import "../style/createPost.scss"
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {
 
  const [caption,setCaption]  = useState("")
 const postImgInput = useRef(null)
  const {loading,createPostHandler} = usePost()
  const navigate = useNavigate()
 
  const submitHandler = async (e)=>{
        e.preventDefault()
        const file =  postImgInput.current.files[0]
        setCaption("")
      await createPostHandler(file,caption)
      navigate("/feed")
    }

    if(loading){
      return <h1>creating post...</h1>
    }
    
  return (
    <main>
      <form onSubmit={(e)=>{
          submitHandler(e)
      }}>
        <h1>Create Post</h1>
        <label className='post-upload' htmlFor="postUpload">Select Image</label>
        <input ref={postImgInput} hidden type="file" name="postUpload" id="postUpload" />
        <input required value={caption} onChange={(e)=>{
            setCaption(e.target.value)
        }} className='post-caption' type="text" placeholder='caption' />
        <button className='button primaryButton' >Upload Post</button>
      </form>
    </main>
  )
}

export default CreatePost