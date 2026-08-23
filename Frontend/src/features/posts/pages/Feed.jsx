import React, { useEffect } from "react";
import "../style/feed.scss"
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Nav from "../../shared/components/Nav";

const Feed = () => {
  const {loading,feed,post,getPostFeedHandler,postLikeHandler,postUnLikeHandler}  = usePost()
  
  useEffect(() => {
    
    getPostFeedHandler()
     
  }, [])
  if(loading || !feed){
    return <h1>Loading....</h1>
  }  

  

  
  
  return (
    <main className="feed-page">
      
    <Nav />

      <div className="feed">
        <div className="posts" >
          {
            feed.map((post)=>{
      
              return <Post user={post.userId} post={post} loading={loading} postLikeHandler={postLikeHandler} postUnLikeHandler={postUnLikeHandler}/>
            })
          }


        </div>         
         

      </div>
    </main>
  );
};

export default Feed;
