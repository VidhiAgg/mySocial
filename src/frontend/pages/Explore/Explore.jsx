
import React from 'react'
import Navigation from '../../components/Navigation';
import SideNavigationBar from '../UserFeed/SideNavigationBar'

import "../../layout.css";
import '../UserFeed/style.css'
import { PostContext } from '../../context/PostContext';
import { useContext } from 'react';
import SearchSideBar from '../../components/SearchSideBar';
import Loader from '../../components/Loader/Loader';
import SortPost from '../../components/SortPost';
import HomeFeed from '../../components/HomeFeed';
import { getSortedPost } from '../../server/postServer';

const ExplorePage = () => {
  const {loader,activeSortType, users, postsDb} = 
  useContext(PostContext);
const sortedPost = getSortedPost(activeSortType, postsDb);

  return (
    <div className="layout-container">
    <div className="top-navbar"><Navigation/></div>
    <div className="navigation"><SideNavigationBar /></div>
    <div className="content-area">
    <div className="header">
          <h1>Explore</h1>
        </div>
        <SortPost />

        <div className="feed-container">
              {
                loader ? <Loader /> : (
                 
                  postsDb?.length > 0 && users?.length > 0 ? sortedPost?.map((post)=>
                  <HomeFeed {...post} key={post._id}/>
                  ) :
                  <h2>Nothing to show up</h2>
                )
               }
            </div>
        </div>
        <div className="searchBar"><SearchSideBar /></div>
      {/* <div className="footer">footer</div> */}
        </div>
  )
}

export default ExplorePage