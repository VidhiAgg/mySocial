import React from 'react'
import "../../layout.css";
import '../UserFeed/style.css'

import SideNavigationBar from '../UserFeed/SideNavigationBar'
import Navigation from '../../components/Navigation'
import { PostContext } from '../../context/PostContext';
import { useContext } from 'react';
import { getSortedPost } from '../../server/postServer';
import { addToBookMark, removeFromBookMark } from '../../server/userServer';
import { AuthContext } from '../../context/AuthContext';
import SearchSideBar from '../../components/SearchSideBar';
import HomeFeed from '../../components/HomeFeed';

const BookmarkPage = () => {

  const {loader,activeSortType, users, postsDb} = 
  useContext(PostContext);
  const { loginUser } = useContext(AuthContext);
  const getActiveUser =  users?.find(({username})=>  username === loginUser.user.username);

//   const getBookMarkList = getActiveUser?.bookmarks

// const sortedPost = getSortedPost(activeSortType, postsDb);

// const handleAddBookMark = (id)=>{
//   addToBookMark(loginUser.token, id,
//     getActiveUser.username, postDispatch)
// }
// const handleRemoveBookMark = (id)=> {
//   removeFromBookMark(loginUser.token, id, 
//     getActiveUser.username, postDispatch) 
// }


  return (
    <div className="layout-container">
    <div className="top-navbar"><Navigation/></div>
    <div className="navigation"><SideNavigationBar /></div>
    <div className="content-area">
    <div className="header">
          <h1>BookMark</h1>
          </div>
          <div className="feed-container">
            {
              getActiveUser?.bookmarks?.length > 0 ?  
              postsDb?.length > 0 && users?.length > 0 &&
              getActiveUser?.bookmarks?.map((post)=>
              <HomeFeed {...post} key={post._id}/>
              ) :(
                <h3>No Bookmarks Added</h3>
              )
               



            }
            </div>
            </div>  
            <div className="searchBar"><SearchSideBar /></div>
            </div>  
  )
}

export default BookmarkPage