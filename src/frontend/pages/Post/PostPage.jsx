import React from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getSinglePost, likedByLoginUser } from "../../server/postServer";
import { PostContext } from "../../context/PostContext";
import Loader from "../../components/Loader/Loader";
import "../../layout.css";
import SideNavigationBar from "../UserFeed/SideNavigationBar";
import SearchSideBar from "../../components/SearchSideBar";
import { ArrowBack, Bookmark, BookmarkBorder, ChatBubble, Delete, Edit, Favorite, FavoriteBorder, MoreHoriz } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { unFollowUser } from "../../server/unFollowUser";
import { addToBookMark, removeFromBookMark } from "../../server/userServer";
import EditPost from "../../features/Post/EditPost";
import { projectConstants } from "../../utility/MySocialUtil";
import CommentCard from "../../features/Comment/CommentCard";

const PostPage = () => {
  const navigate = useNavigate();
  const { postID } = useParams();
  const { postDispatch, postLoader, singlePost, users } =
    useContext(PostContext);
  const { loginUser } = useContext(AuthContext);
  const [showUnfollowModal, setUnFollowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);

  useEffect(() => {
    getSinglePost(postID, postDispatch);
  }, []);
  
 
  const getCurrentPostUser = users.find((user) => user.username === singlePost?.username);

  const getActiveUser = users?.find(
    ({ username }) => username === loginUser.user.username
  );

  const unfollowUser = () => {
    unFollowUser(loginUser.token, getCurrentPostUser.singlePost?._id, users, postDispatch);
  };
  const deletePostHandler = () => {
    deletePost(loginUser.token, singlePost?._id, postDispatch);
    setEditModal(false);
  };
  const isBookmarkedByUser = getActiveUser?.bookmarks?.some(
    (currentPost) => currentPost === singlePost?._id
  );
  const handleAddBookMark = () => {
    addToBookMark(loginUser.token, singlePost?._id, loginUser.user.username, postDispatch);
  };
  const handleRemoveBookMark = () => {
    removeFromBookMark(
      loginUser.token,
      singlePost?._id,
      loginUser.user.username,
      postDispatch
    );
  };

  return (
    <div>
      {postLoader ? (
        <Loader />
      ) : (
        <div className="layout-container">
          <div className="top-navbar">
<div onClick={() => navigate(-1)}>
                <ArrowBack />
                <h1>Post</h1>
              </div>
          </div>
          <div className="navigation">
            <SideNavigationBar />
          </div>

          <div className="content-area">
        
            <div>
              {singlePost !== null ? (
                <div className="singlepost">
                  <div className="post-display-header">
                    <div className="subHeaer">
                      <div className="post-userName">
                        {getCurrentPostUser?.fullName}
                      </div>
                      <div className="post-id">@{singlePost?.username}</div>
                      <div className="post-time">. {singlePost?.createdAt}</div>
                    </div>
                  </div>

                  <div
                    className="more-info"
                    style={{ border: "1px solid green", cursor: "pointer" }}
                  >
                    {singlePost?.username === loginUser.user.username ? (
                      <button onClick={() => setEditModal((prev) => !prev)}>
                        <MoreHoriz />
                      </button>
                    ) : (
                      <button onClick={() => setUnFollowModal((prev) => !prev)}>
                        <MoreHoriz />
                      </button>
                    )}
                    {showEditModal && (
                      <div className="edit-modal">
                        <button
                          onClick={() => setEditPostModal(!editPostModal)}
                        >
                          <Edit />
                          Edit
                        </button>
                        <button onClick={deletePostHandler}>
                          <Delete />
                          Delete
                        </button>
                      </div>
                    )}

                    {showUnfollowModal && (
                      <div className="edit-modal">
                        <button onClick={unfollowUser}>
                          <Edit />
                          Unfolow
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="content">
                    <p>{singlePost?.content}</p>
                    {singlePost?.postImage && <img src={singlePost?.postImage} alt="image" width="400px" height="500px"/>}
                  </div>
                  <div className="feedPost-btns">
                    <button
                      className="txt-btn"
                      onClick={() =>
                        likedByLoginUser(singlePost, singlePost?.username)
                          ? postDispatch({
                              type: projectConstants._DISLIKE_POST_,
                              payload: { postID: singlePost?._id, userName: singlePost?.username },
                            })
                          : postDispatch({
                              type: projectConstants._Like_POST_,
                              payload: { postID: singlePost?._id, userName: singlePost?.username },
                            })
                      }
                    >
                      {likedByLoginUser(singlePost, singlePost?.username) ? (
                        <Favorite/>
                      ) : (
                        <FavoriteBorder/>
                      )}
                    </button>
                    <span>{singlePost?.likes.likeCount > 0 && singlePost?.likes.likeCount}</span>
                    <button
                      className="txt-btn"
                      
                    >
                      <ChatBubble />
                    </button>

                    <span
                      className="span-editor"
                      
                    >
                      {singlePost?.comments.length > 0 && singlePost?.comments.length}
                    </span>
                    {isBookmarkedByUser ? (
                      <button
                        className="txt-btn"
                        onClick={handleRemoveBookMark}
                      >
                        <Bookmark />
                      </button>
                    ) : (
                      <button className="txt-btn" onClick={handleAddBookMark}>
                        <BookmarkBorder />
                      </button>
                    )}
                  </div>
                  {editPostModal && (
                    <EditPost
                      post={singlePost}
                      setEditPostModal={setEditPostModal}
                      setEditModal={setEditModal}
                    />
                  )}
<div>
  {
    singlePost?.comments.length >0 && singlePost.comments.map(comment=> 
      <CommentCard postID={singlePost._id} commentProp={comment} key={comment._id}/>

      )
  }
</div>

                </div>
              ) : (
                <Loader />
              )}
            </div>
            </div>
            <div className="searchBar">
              <SearchSideBar />
            </div>
            <div className="footer">footer</div>
          
        </div>
      )}
    </div>
  );
};

export default PostPage;
