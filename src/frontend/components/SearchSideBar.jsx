import React, { useContext,useState } from 'react'
import './navigation.css'
import { PostContext } from '../context/PostContext'
import SearchModal from './SearchModal';
import { projectConstants } from '../utility/MySocialUtil';
import { AuthContext } from '../context/AuthContext';
import { followUser } from '../server/unFollowUser';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../utility/UserAvatar';

const SearchSideBar = () => {
  const navigate = useNavigate();
const {loginUser} = useContext(AuthContext);
  const {postDispatch,searchUserInput, users} = useContext(PostContext);
  const[showSearchMoal, setSearchModal] = useState(false);
  const handleSearch = (event)=>{
    event.target.value.length === 0 ? setSearchModal(false) : setSearchModal(true)
    postDispatch({type:projectConstants._ADD_SEARCH_INPUT_, payload:event.target.value})
  }
  const getActiveUser =  users?.find(({username})=>  username === loginUser.user.username);

// const getUnfollowedUsers = users?.filter(user=> user.username !== getActiveUser?.username)?.
// filter(user=> user.following?.find(followeingUser=> followeingUser.username !== user.username))

const getUnfollowedUsers = users?.
filter(user=> user.username !== getActiveUser?.username)?.
filter(user=> !getActiveUser?.following?.some(followeingUser=> followeingUser.username === user.username))


const handleFollowBtnClick = (followerId) =>
followUser (loginUser.token, users, followerId, postDispatch );

   return (
    <div>
      <div className="">
            <input type='text' placeholder="Search User"
            value={searchUserInput} onChange={handleSearch} />

            {
              showSearchMoal && <SearchModal setSearchModal={setSearchModal}/>
            }
        </div>
        <div className="suggeste-container">
          <h1>Suggested User</h1>
          {
            getUnfollowedUsers?.map(user=> 
              <div key={user._id} onClick={(e)=>{
              navigate(`profile/${user.username}`)}}>
<div  className="avatar-conatiner">
<UserAvatar  userProp={user}/>
</div>
<div  className="name-conatiner">
              <h5>{user.fullName}</h5>
              <p>@{user.username}</p>
          </div>
          <div>
            <button onClick={(e)=>{e.stopPropagation();
              handleFollowBtnClick(user._id)}}>Follow User</button>
          </div>
              </div>
              
              
              )
          }
          
        </div>

    </div>
  )
}

export default SearchSideBar