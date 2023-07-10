import React from 'react'
import { useContext } from 'react'
import { PostContext } from '../../context/PostContext'
import "./commentCard.css"
import { useNavigate } from 'react-router-dom'

const CommentCard = ({postID, commentProp}) => {
    const navigate = useNavigate();
    const {users} = useContext(PostContext);
    const {_id,comment,username,fullName,profileAvatar,createdAt,updatedAt} = commentProp
const findUser = users?.find(user=> user.username === username);
  return (
    <div className='comment-container'onClick={()=>navigate(`/profile/${findUser.username}`)}>
        <div className="image-container" >
            <img src={profileAvatar} alt="img"/>
        </div>
        <div className="comment-content">
<p className="header">
    <span><strong>{fullName}</strong></span>{" "}
    <span className='sub-details'> . </span>
    <span className='sub-details'>{createdAt}</span>
</p>
<p>{username}</p>
<p>{comment}</p>

        </div>
    </div>
  )
}

export default CommentCard