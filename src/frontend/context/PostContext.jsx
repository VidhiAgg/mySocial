import React, { createContext, useEffect, useReducer, useState } from 'react'
import { getAllPost } from '../server/postServer';
import { intialState, postReducer } from '../reducer/PostReducer';
import { getAllUsers } from '../server/userServer';

export const PostContext = createContext();
// export const usePost = useContext(PostContext);
const PostContextProvider = ({children}) => {
    const[loader, setLoader] = useState(false);
    const[userLoader, setUserLoader] = useState(false);
    const[allPost, setAllPost] = useState(null);
    const[activeSortType, setactiveSortType] = useState("Latest"); 
    const[state, postDispatch] = useReducer(postReducer,intialState)
    const[users,setUsers] = useState(null);

    useEffect(()=>{
        getAllPost(setLoader, postDispatch);
        getAllUsers(setUserLoader, postDispatch);

    },[])

const searchedUsers = state?.searchUser?.length > 0 ?
state.users.data?.filter(user=> user.username.toLowerCase().includes(state?.searchUser.toLowerCase()))
: ""


const singlePostData = state?.singlePost.data

console.log(singlePostData);

  return (

    <PostContext.Provider value={{loader,allPost,setAllPost,
    setLoader,
    activeSortType,setactiveSortType, 
    setUsers, users: state?.users.data, 
    searchUserInput: state.searchUser,
     setUserLoader, userLoader,
    postsDb: state?.posts.data, 
    postDispatch, comments: state?.comments,
    searchedUsers, postLoader: state?.singlePost.isLoading, 
    singlePost: state?.singlePost.data,
    profileLoader: state?.singleUser.isLoading,
    userInfo : state?.singleUser.data,

    profilePostLoader: state?.userPost.isLoading,
    userPost : state?.userPost.data,
    }}> 
        {children}
    </PostContext.Provider>
  
  )
}

export default PostContextProvider