import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { editPost } from '../../server/postServer';
import { useState } from 'react';
import { PostContext } from '../../context/PostContext';

const EditPost = ({post, setEditPostModal, setEditModal }) => {
  const { _id, content,} = post;
  
  const[postContent, setPostContent] = useState({content: content || ""})
  const {loginUser} = useContext(AuthContext);
  const {users, postDispatch} = useContext(PostContext);

  const getActiveUser = 
   users?.find(({username})=>  username === loginUser.user.username);
const handleCloseClik =()=>{
  setEditPostModal(false);
    setEditModal(false);
}

  const handleEditPostClick = (e)=>{
    e.preventDefault();

    editPost(loginUser.token,{...post,content: postContent},_id,postDispatch );
    setEditPostModal(false);
    setEditModal(false)
  }
  return (
   
    <div className='pop-modal'>
        <div className="avatar-image-container">
        <img src="" alt="" />
        </div>
        {console.log(postContent.content)}
        <form className="content-conatiner" onSubmit={handleEditPostClick}>
            <div className="input-container">
            <input value = {postContent.content} className="post-txt-content"
     onChange={(e)=>{setPostContent(e.target.value)}} />
            </div>
           <div className="action-btns">
            <button onClick={handleCloseClik} className='cacnel-btn'>Cancel</button>
            <button type='submit' className='post-btn'>Save</button>
           </div>
           </form>
        </div>
  )
}

export default EditPost