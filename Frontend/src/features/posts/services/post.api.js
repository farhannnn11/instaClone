import axios from "axios"

const api  = axios.create({
    baseURL:"https://instaclone-buhh.onrender.com",
    withCredentials:true
})

export const getPostFeedApi = async()=>{
   const response  = await api.get("/api/post/feed")
   return response.data
} 

export const createPostApi = async (imageFile,caption)=>{
    const formData = new FormData()
    formData.append("image",imageFile)
    formData.append("caption",caption)
  const response =  await api.post("/api/post",formData)
  return response.data

}

export const likePostApi = async(postId)=>{
  
  const response = await api.post(`api/post/like/${postId}` )
  return response.data
}
export const unlikePostApi = async(postId)=>{
  const response = await api.post(`api/post/unlike/${postId}` )
  return response.data
}





