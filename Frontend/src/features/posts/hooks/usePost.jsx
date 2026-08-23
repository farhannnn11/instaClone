import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import {         getPostFeedApi, likePostApi, unlikePostApi } from "../services/post.api";
import { createPostApi } from "../services/post.api";

export const usePost  =  ()=>{
    const context  = useContext(PostContext)
    const {loading,setLoading,post,setPost,feed,setFeed} = context

   const getPostFeedHandler = async ()=>{
        setLoading(true)
        const response   = await getPostFeedApi()
        setFeed(response.post.reverse())
        setLoading(false)
    }

    const createPostHandler = async (imageFile,caption)=>{
        setLoading(true)
        const response = await createPostApi(imageFile,caption)
        setFeed([response.post,...feed])
        
        setLoading(false)
    }


    const postLikeHandler = async(post)=>{
        setLoading(true)
        const response  = await likePostApi(post)
        await getPostFeedHandler()
        setLoading(false)        
    }    

    const postUnLikeHandler = async(post)=>{
        const response  = await unlikePostApi(post)
        console.log(response);
        
        await getPostFeedHandler()
    }    


    const followHandler = async (username)=>{
        await followApi(username)
    }
       useEffect(()=>{
        getPostFeedHandler()
    },[]) 
    return  {loading,feed,post,getPostFeedHandler,createPostHandler,postLikeHandler,
            postUnLikeHandler,followHandler}
    
}
