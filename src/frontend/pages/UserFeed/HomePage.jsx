import React, { useContext, useState } from 'react'
import { PostContext} from '../../context/PostContext';
import { addNewPost, getSortedPost } from '../../server/postServer';
import { AuthContext } from '../../context/AuthContext';
import { uploadImage } from '../../utility/UploadImage';
import { projectConstants } from '../../utility/MySocialUtil';

import Navigation from '../../components/Navigation';
import SideNavigationBar from './SideNavigationBar';
import Loader from '../../components/Loader/Loader';
import HomeFeed from '../../components/HomeFeed';
import SortPost from '../../components/SortPost';
import SearchSideBar from '../../components/SearchSideBar';
import UserAvatar from '../../utility/UserAvatar';

import "../../layout.css";
import './style.css'

const HomePage = () => {
  const {loader,activeSortType, users, postsDb} = 
  useContext(PostContext);

const {loginUser} = useContext(AuthContext);

//add in context 

const getActiveUser =  users?.find(({username})=>  username === loginUser.user.username);
const postOfUser = postsDb?.filter(({username}) => username === getActiveUser?.username);

const followingUserPost = postsDb?.filter((post) => 
getActiveUser?.following?.some((followeingUser)=> followeingUser.username === post.username) )
const postOnFeed = [...postOfUser,...followingUserPost]




const sortedPost = getSortedPost(activeSortType, postOnFeed)
// const postIterate = allPost?.length > 0 ? allPost?.map((post)=>
// <HomeFeed {...post} key={post.id}/>
// ) :
// <h2>No post </h2>
 //console.log(postsDb);



  return (
    <div className="layout-container">
      <div className="top-navbar"><Navigation/></div>
      <div className="navigation"><SideNavigationBar /></div>
      <div className="content-area">
        <div className="header">
          <h1>Home</h1>
        </div>
            <div className="post-box">
              <div className="post-icon"> 
              <UserAvatar userProp={loginUser.user}/>
              </div>
              <div className="add-post">
                <AddPost />
              </div>
            </div>
<SortPost />
            <div className="feed-container">
              {
                loader ? <Loader /> : (
                  postOnFeed?.length > 0 ?
                  postsDb?.length > 0 && users?.length > 0 ? 
                  sortedPost?.map((post)=>
                  <HomeFeed {...post} key={post._id}/>
                  ) :
                  <h2>No post </h2>
                  :
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



const AddPost = ()=>{

  const {loginUser} = useContext(AuthContext);
  const{postDb,postDispatch} = useContext(PostContext);
  const [disablePostbtn, setDisablePostButton] = useState(true);
  const [addPost, setAddPost] = useState({
    content:"",
    username:loginUser?.user?.username,
    postImage: null,
  
  });
  const handleImageClick = async (e)=>{
    
    const image = e.target.files[0];
    const getImageURL = await uploadImage(image);
    setAddPost({...addPost, postImage:getImageURL.url});
    
  }


  const handleAddPostClick=(e)=>{
    e.preventDefault();
    addNewPost(addPost, loginUser.token,postDb,postDispatch,setDisablePostButton);
    setAddPost({
      content:"",
    username:loginUser?.user?.username,
    postImage: null,
    })
    setDisablePostButton(true);
  }
  return(
    <form className="post-main-box" onSubmit={handleAddPostClick}>
    <label >
     <input value = {addPost.content} placeholder="Write something special"className="post-content"
     onChange={(e)=>{e.stopPropagation();
      setAddPost({...addPost, content: e.target.value});
     setDisablePostButton(false);}}
     /> 
     
    </label>


    <div className="post-btns">
      <>
      <label htmlFor='file-input'>
       <i className="material-icons">add_photo_alternate</i>
       </label>
    <input  type='file' id='file-input'className='file-input'
     accept='.jpg, .jpeg, .png'
    onChange={handleImageClick}/>

{addPost.postImage &&
<img src={addPost.postImage} alt="post-img" width="100px" height="100px" />
}
    
      </>


       <button disabled={disablePostbtn} type='submit'>Post</button>

    </div>


   </form>
  )
}

export default HomePage