import React from 'react'
import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import { editPost } from '../../server/postServer';

const CommentModal = ({postId,setCommentModal }) => {
    const [disablePostbtn, setDisablePostButton] = useState(true);
     const {postDispatch} = useContext(PostContext);
    const {loginUser} = useContext(AuthContext);
    const [comment, setComment] = useState();
const handleAddComment=(e)=>{
    e.preventDefault();
    editPost(loginUser.token,comment,postId,postDispatch );
    setCommentModal(false);
}
  return (
    <div className='comment-modal'>
        <div className="avatar-image-container">
        <img src="" alt="" />
        </div>
        <form className="content-conatiner" onSubmit={handleAddComment}>
            <div className="input-container">
            <input value = {comment} placeholder='Post your reply'
            className="comment-content"
     onChange={(e)=>{setComment(e.target.value)
     setDisablePostButton(false);}} />
            </div>
           <div className="action-btns">
            <button onClick={()=> setCommentModal(false)} className='cacnel-btn'>Cancel</button>
            <button disabled={disablePostbtn}type='submit' className='post-btn'>Post</button>
           </div>
           </form>
        </div>

   
  )
}

export default CommentModal