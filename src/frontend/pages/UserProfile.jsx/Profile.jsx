import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostContext } from '../../context/PostContext';
import { useContext } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useEffect } from 'react';
import { getAllUsers } from '../../server/userServer';
import Loader from '../../components/Loader/Loader';
import { getAllPost, getSortedPost, getUserPost } from '../../server/postServer';
import SideNavigationBar from '../UserFeed/SideNavigationBar';
import SearchSideBar from '../../components/SearchSideBar';
import UserDetailsCard from './UserDetailsCard';
import HomeFeed from '../../components/HomeFeed';

const Profile = () => {
  const {username} = useParams();
  const {userLoader,setUserLoader,setLoader,userPost, users, 
    postDispatch,activeSortType, loader, postsDb} = useContext(PostContext);
const navigate = useNavigate();
  const currentUser = users.find(user=>user.username === username )
console.log(currentUser);

const getCurrentUserPost = postsDb.filter(data=> data.username === username)

useEffect(()=>{
  getAllPost(setLoader, postDispatch);
  getAllUsers(setUserLoader, postDispatch);
},[postDispatch])


// useEffect(()=>{
//     getUserInfo(userID, postDispatch);
//   },[username])


  useEffect(()=>{
    getUserPost(currentUser?.username, postDispatch);
  },[username])


// console.log(currentUser);
// console.log(userPost);


  return (
        <div className="layout-container">
          <div className="top-navbar">
          <div onClick={() => navigate(-1)}>
                <ArrowBack/>
              
              </div>
              <div>
              <h1>{currentUser?.fullName}</h1>
              <p>{userPost?.length} posts</p>
              </div>
          </div>
          <div className="navigation">
            <SideNavigationBar/>
          </div>
          <div className="content-area">
            
      
                <div className='user-profile-header'>
                 { userLoader?<Loader/>:         
     currentUser  && 
                  <UserDetailsCard {...currentUser}/>}
                </div>
               
                <div className="user-post">
                {userLoader ? <Loader/> : userPost.isLoading ? <Loader/> : 
                 userPost?.length > 0 &&  
                 currentUser ? getSortedPost(activeSortType, userPost)?.map((post)=>
                 <HomeFeed {...post} key={post._id}/>
                 ) :
                 <h2>No post </h2>}
                </div>


            
            </div>

          <div className="searchBar">
              <SearchSideBar />
            </div>
            <div className="footer">footer</div>
          
      
      </div>
      )

}

export default Profile