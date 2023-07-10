import { projectConstants } from "../utility/MySocialUtil";

export const intialState = {
  users: { isLoading: false, isError: null, data: [] },
  posts: { isLoading: false, isError: null, data: [] },
  searchUser: "",
  comments:[],
  singlePost: { isLoading: false, isError: null, data: null },
  singleUser:{isLoading: false, isError: null, data: null},
  userPost :{isLoading: false, isError: null, data: []
  }
};
export const postReducer = (state, action) => {
  switch (action.type) {
    case projectConstants._GET_ALL_USERS: {
      // return getAllUsers(); --> wrong,
      //returning w/o invoking it returns the function reference instead of the fetched users.

    return { ...state, users: { ...state.users, data: [...action.payload] } };
    }
    case projectConstants._GET_ALL_POSTS: {
      console.log({
        ...state,
        posts: { ...state.posts, data: [...action.payload] },
      });
      return { ...state, posts: { ...state.posts, data: [...action.payload] } };
    }

    case projectConstants._Like_POST_: {
      const { postID, userName } = action.payload;
      if (state.posts.data.length > 0) {
        const updatePost = state.posts.data.map((post) => {
          // console.log(post)
          if (post._id === postID) {

            const updatedDislikeList =  post.likes.dislikedBy?.filter(data => data !== userName) 
        
              return {
              ...post,likes: {
                ...post.likes,
                likeCount: post.likes.likeCount++,
                likedBy: [...post.likes.likedBy, userName],
                dislikedBy:updatedDislikeList

              },
            };
          } else {
            return post;
          }

          // const updatedLikes = {
          //     ...post.likes,
          //     likeCount: post.likes.likeCount + 1,
          //     likedBy: [...post.likes.likedBy, userName],
          //   };

          //   return {
          //     ...post,
          //     likes: updatedLikes,
          //   };
          // }
          // return post;
        });
        //  console.log(updatePost);
        return { ...state, posts: { ...state.posts, data: [...updatePost] } };
      } else {
        return state;
      }
    }


    case projectConstants._DISLIKE_POST_: {
      const { postID, userName } = action.payload;

      if (state.posts.data.length > 0) {
        const updatePost = state.posts.data.map((post) => {
          if (post._id === postID) {
            const updatedLikeList = 
            // post.likes.likedBy?.map(
            //   likedName => likedName === userName ? 
              post.likes.likedBy?.filter(data => data !== userName) 
              // : likedName)


            return {
              ...post,
              likes: {...post.likes, likeCount: post.likes.likeCount--, 
                likedBy:updatedLikeList,
                dislikedBy: [...post.likes.dislikedBy, userName],
              },
            };
          } else {
            return post;
          }
        });
        return { ...state, posts: { ...state.posts, data: [...updatePost] } };
      } else {
        return state;
      }
    }


case projectConstants._intialize_Comments_ : 
return {
  ...state, comments : [...state.posts.comments]
}

// case "EDIT_POST_":{
//   const {token, postID, post, updatedContent} = action.payload;

//   const upDatedPost = {...post,content: updatedContent}
//   return editPost(token, post._id, post)
  
// }

case projectConstants._UPDATE_BOOKMARK_ : {
  const{username, bookmark} = action.payload

  const upDateWithBookmark = state.users.data.map((currUser)=> 
  currUser.username === username ? 
  {...currUser, bookmarks: bookmark}
  : currUser)
  return  {
    ...state,
    users: { ...state.users, data: [...upDateWithBookmark] },
  };
}

case projectConstants._ADD_SEARCH_INPUT_ : {
return{
  ...state, searchUser:action.payload
}
}

case projectConstants._SET_LOADING_STATUS_POST_:
  //console.log( {...state, singlePost : {...state.singlePost, isLoading:action.payload}});
  return {
    ...state, singlePost : {...state.singlePost, isLoading:action.payload}

  }

case projectConstants._GET_POST_DETAILS_:{
  console.log({
    ...state,
    singlePost: { ...state.singlePost, 
      isLoading:false, data: [action.payload] },
  });

  return {
    ...state, singlePost : {...state.singlePost, isLoading:false, data:action.payload}
  }
}

case projectConstants._SET_LOADING_STATUS_SINGLE_USER_  :
  return {
    ...state, singleUser : {...state.singleUser, isLoading:action.payload}

  }

case projectConstants._GET_USER_INFO_ : {

    return {
      ...state, singleUser : {...state.singleUser, isLoading:false, 
        data:action.payload}
    }
}

case projectConstants._SET_USER_POST_STATUS_: {

  return {
    ...state, userPost : {...state.userPost, isLoading:action.payload}
  }
}

case projectConstants._GET_USER_POST_:

return {
  ...state, userPost : {...state.userPost, isLoading:false, 
    data:action.payload}
}


case "updateUser" :
  {
   
    const updateUsers = ( updatedUser) =>
    state?.users.data.map(user=> user.username === updatedUser.username ? 
      updatedUser: user )

      return { ...state, users: { ...state.users, data: [...updateUsers(action.payload)] } };
  }
case "addUser" : {
    const user= action.payload
    return { ...state, users: { ...state.users, data: [...state.users.data, user] } };
}

    default:
      return state;
  }
};
