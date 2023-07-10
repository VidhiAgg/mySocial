import React, { useContext, useEffect, useState } from "react";
import "./homefeed.css";
import {Bookmark, BookmarkBorder, ChatBubble, Delete, Edit, Favorite, FavoriteBorder, MoreHoriz,
} from "@mui/icons-material";
import { PostContext } from "../context/PostContext";
import { checkLoginUserComment, deletePost, likedByLoginUser } from "../server/postServer";
import { projectConstants } from "../utility/MySocialUtil";
import { AuthContext } from "../context/AuthContext";
import { unFollowUser } from "../server/unFollowUser";
import { useNavigate } from "react-router-dom";
import EditPost from "../features/Post/EditPost";
import { addToBookMark, removeFromBookMark } from "../server/userServer";
import UserAvatar from "../utility/UserAvatar";

const HomeFeed = (post) => {
  const { users, postDispatch } = useContext(PostContext);
  const { loginUser } = useContext(AuthContext);
  const [showUnfollowModal, setUnFollowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const navigate = useNavigate();

  const { _id, content, username, postImage, comments, createdAt, likes } =
    post;

  const getCurrentPostUser = users.find((user) => user.username === username);

   const getActiveUser =  users?.find(({username})=>  username === loginUser.user.username);

  const userAlreadyFollowing = getCurrentPostUser?.followers.find(
    (follower) => follower.username === loginUser.user.username
  );


const unfollowUser = ()=>{

  unFollowUser(loginUser.token,getCurrentPostUser._id, users,postDispatch );

}

const deletePostHandler = ()=>{
  deletePost(loginUser.token, _id, postDispatch);
  setEditModal(false);
}

const iSBookmarkedByUser = getActiveUser.bookmarks?.some(currentPost => currentPost === _id)
 
const handleAddBookMark = ()=>{
  addToBookMark(loginUser.token, _id,loginUser.user.username, postDispatch)
}
const handleRemoveBookMark = ()=> {
  removeFromBookMark(loginUser.token, _id,loginUser.user.username, postDispatch) 
}

  //  console.log(iSBookmarkedByUser);
  return (
    <div className="post-box">
      <div className="post-icon">
      <div  className="avatar-conatiner">
<UserAvatar  userProp={getCurrentPostUser}/>
</div>
      </div>
      <div className="post-content">
        <div className="post-display-header">
          <div className="subHeaer" onClick={()=> navigate(`profile/${getCurrentPostUser.username}`)}>
            <div className="post-userName">{getCurrentPostUser?.fullName}</div>
            <div className="post-id">@{username}</div>
            <div className="post-time">. {createdAt}</div>
          </div>

          <div className="more-info" style={{ border:"1px solid green", cursor: "pointer" }}>
            {username === loginUser.user.username ? (
              <button onClick={() => setEditModal((prev) => !prev)}>
                <MoreHoriz />
              </button>
            ) : (
              <button onClick={() => setUnFollowModal((prev) => !prev)}>
                <MoreHoriz />
              </button>
            )
            }
            {
              showEditModal && <div className="edit-modal">
                <button onClick={()=>setEditPostModal(!editPostModal)}><Edit/>Edit</button>
                <button onClick = {deletePostHandler}><Delete/>Delete</button>
              </div>
            }

            {
              showUnfollowModal && <div className="edit-modal">
                <button onClick={unfollowUser}><Edit/>Unfolow</button>
              </div>
            }


          </div>
        </div>
        <div className="content" style={{cursor:"pointer"}} onClick={()=>navigate(`/post/${_id}`)}>
          <p>{content}</p>
          {postImage && <img src={postImage} alt="image" width="350px" height="350px"/>}
        </div>
        <div className="feedPost-btns">
          <button
            className="txt-btn"
            onClick={() =>
              likedByLoginUser(post, username)
                ? postDispatch({
                    type: projectConstants._DISLIKE_POST_,
                    payload: { postID: _id, userName: username },
                  })
                : postDispatch({
                    type: projectConstants._Like_POST_,
                    payload: { postID: _id, userName: username },
                  })
            }
          >
            {likedByLoginUser(post, username) ? (
              <Favorite />
            ) : (
              <FavoriteBorder />
            )}
          </button>
          <span>{likes.likeCount > 0 && likes.likeCount}</span>
          <button className="txt-btn" onClick={()=>navigate(`/post/${_id}`)} >
          <ChatBubble /> 
          {/* onClick={()=>setCommentModal((prev)=> !prev)}> */}
            {/* {
              checkLoginUserComment(post, username) ?  <ChatBubble /> :
              <AddCommentOutlined />

            }   */}
          </button>
          {/* {
            showCommentModal && <CommentModal postId={_id} setCommentModal={setCommentModal} />
          } */}
          <span className="span-editor" onClick={()=>navigate(`/post/${_id}`)}>{comments.length > 0 && comments.length}</span>
          {iSBookmarkedByUser ?
          <button className="txt-btn" onClick={handleRemoveBookMark}>
           <Bookmark />
          </button> 
          :
          <button className="txt-btn" onClick={handleAddBookMark}>
           <BookmarkBorder />
          </button>
}
        </div>
      </div>
     { editPostModal && <EditPost post={post} setEditPostModal={setEditPostModal} setEditModal= {setEditModal}/>}
  </div>
  );
};

export default HomeFeed;
