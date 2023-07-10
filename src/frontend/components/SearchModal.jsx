import React from 'react'
import { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import UserAvatar from '../utility/UserAvatar';
import { useNavigate } from 'react-router-dom';

const SearchModal = (setSearchModal) => {
    const {searchedUsers} = useContext(PostContext);
const navigate = useNavigate();
  return (
    <div className='search-container'>
        
       { searchedUsers?.length>0 ? 
       searchedUsers.map(user=>
        <div className="search-content" onClick={(e)=> navigate(`profile/${user.username}`)}>
            <div className="profile-icon">
            <UserAvatar  userProp={user}/>
            </div>
            <div className='name-conatiner'>
                <h4>{user.fullName}</h4>
                <p>@{user.username}</p>
            </div>
        </div>
        )
       
       :

       <p>No user Found</p>
       
       }

    </div>
  )
}

export default SearchModal