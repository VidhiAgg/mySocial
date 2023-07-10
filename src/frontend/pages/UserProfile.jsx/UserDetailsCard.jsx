
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Language, LogoutOutlined } from '@mui/icons-material'
import EditProfile from './EditProfile'

import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext'
import { followUser, unFollowUser } from '../../server/unFollowUser'
import FollowUnFollow from '../../features/Profile/FollowUnFollow'


const UserDetailsCard = (userInfo) => {
    const {users, postDispatch} = useContext(PostContext);
    const {loginUser} = useContext(AuthContext);
    const {_id,fullName, username,website, password,bio,profilePhoto, 
        following, followers
    } = userInfo
const getLogInUserDetails = users.find(user=> user.username === loginUser.user.username);
//will give unfollow button
const authUserFollowing = getLogInUserDetails.following.some(user => user.username === username);


//for floowo or FollowBack

const authUserFollower = getLogInUserDetails.followers.some(user => user.username === username);


 const [showFollowers, setFollowers] = useState(false);
const [followModel, setFollowModel] = useState({
    title:"",
    show:false,
    list:[]
});
const [editModal, setEditModal] = useState(false);
// console.log(getLogInUserDetails);
// console.log(authUserFollower);
// console.log(userInfo);
// console.log(authUserFollowing);
  return (
    <div>
     <div className="user-content">
 <div className='user-profile-image'>
<img src={profilePhoto} alt="image-profile" width="200px" height="300px"/>
    </div>
    <div className="user-name-section">
        <h2>{fullName}</h2>
        <p>@{username}</p>
    </div>
    <div className="user-detail-section">
        <h4>{bio}</h4>
        {website && 
       <span>
        <Language /> 
        <a href={website}></a>
       </span> }
    </div>
    <div className="user-meta-section">
          <div className="follow" onClick={(e)=>{
            e.stopPropagation();
            setFollowModel({
                title:" Following",
                show:true,
                list:[...following]
            })
          }}>
        <span >{following.length}</span>
        <span>Following</span>
       </div>

       <div className="follow"  onClick={(e)=>{
            e.stopPropagation();
            setFollowModel({
                title:" Followers",
                show:true,
                list:[...followers]
            })
          }}>
        <span >{followers.length}</span>
        <span>Followers</span>
       </div>
        
        
        
    </div>
    </div>
    <div className="edit-section">
       {getLogInUserDetails.username === username ?  
       <button onClick={()=>setEditModal(true) }>Edit Profile</button> :
       <button
        onClick = {(e)=>{
            e.stopPropagation();
            e.preventDefault();
            authUserFollowing ? 
            unFollowUser(loginUser.token,_id, 
                users,postDispatch )

            :

            followUser(loginUser.token, 
                users, _id, postDispatch)
        }}
       
       
       >{authUserFollowing ?  
        "Unfollow" :  "Follow"}</button>
    
     } 
        <button><LogoutOutlined/></button>
    </div>
    {
        editModal && <EditProfile  open={editModal} closeModal = {setEditModal}/>
    }
    {
        followModel.show && 
        <div className="followModal-container">
            <FollowUnFollow followModel ={followModel}
        setFollowModel={setFollowModel}
            /> 
        </div>
    }
    </div>
   
   
  )
}

export default UserDetailsCard