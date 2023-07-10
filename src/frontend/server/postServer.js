import axios from "axios";
import { projectConstants } from "../utility/MySocialUtil";
import { toast } from "react-toastify";

export const likedByLoginUser = (post, username) =>
  post?.likes.likedBy.find((likByName) => likByName === username);





export const checkLoginUserComment = (post, username) =>
  post?.comments.some((data) => data.username === username);

export const getSortedPost = (sortCategory, post) => {
  if (post === null && post?.length <= 0) {
    return [];
  }
  if (sortCategory === projectConstants.sortByTrending) {
    return [...post].sort(
      (a, b) =>
        a.likes.likeCount +
        a.comments.length +
        a.likes.dislikedBy.length -
        (b.likes.likeCount + b.comments.length + b.likes?.dislikedBy.length)
    );
  } else if (sortCategory === projectConstants.sortByLates) {
    return post.sort(({ createdAt: value1 }, { createdAt: value2 }) =>
      value2.localeCompare(value1)
    );
  } else {
    return post.sort(({ createdAt: value1 }, { createdAt: value2 }) =>
      value1.localeCompare(value2)
    );
  }
};

export const getAllPost = async (setLoader, postDispatch) => {
  setLoader(true);
  try {
    const { status, data } = await axios.get("/api/posts");
    console.log(data.posts);
    if (status === 200) {
     // setAllPost(data.posts);
      postDispatch({
        type: projectConstants._GET_ALL_POSTS,
        payload: data.posts,
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoader(false);
  }
};


export const getUserPost = async (username,postDispatch)=>{
  // console.log("in server");
  postDispatch({type:projectConstants._SET_USER_POST_STATUS_, payload:true})
  try {
       const {status, data } = await axios.get(`/api/posts/user/${username}`);
       console.log(status);
       console.log(data);
       if(status === 200){
      postDispatch({type: projectConstants._GET_USER_POST_, payload : data.posts
      })
       }


  } catch (error) {
      const {response} = error;
      console.log(error);
      console.error(response.data[0]);

  }finally{
      postDispatch(
          {type:projectConstants._SET_USER_POST_STATUS_, 
              payload:false})

  }
}



export const getSinglePost = async (postID, postDispatch) =>{
  postDispatch({type:projectConstants._SET_LOADING_STATUS_POST_, payload: true})
  try {

    const {status, data} = await axios.get(`/api/posts/${postID}`);
    if(status === 200){
      console.log(data.post);
      postDispatch({type:projectConstants._GET_POST_DETAILS_, payload: data.post})

    }
    
  } catch (error) {
    
    const {response} = error
    if(response.status ===  500) {
      toast.error("Session Expired.Please Login again.")
    }else{
      toast.error("Internal Server error")
    }
    
  }finally{
    postDispatch({type:projectConstants._SET_LOADING_STATUS_POST_, payload: false})

  }
}


export const deletePost = async (token, postID, postDispatch)=>{
    try {
        const{status, data} = await axios.delete(`/api/posts/${postID}`,{
            headers:{
                authorization:token
            }
        })
        if(status === 201 ){
            postDispatch({
                type: projectConstants._GET_ALL_POSTS,
                payload: data.posts,
              });
              toast.success("Post deleted!");
        }
    } catch (error) {
        const {response} = error;
        if(response.status === 404){
            toast.error("Inccorect credentials to delete post")
        }
        if(response.status === 400){
            toast.error("Authorization error. ")
        }
        else{
            toast.error("Faile to delete. Please try after some time")
        }
    }
}

export const addNewPost = async (
  addPostPayload,
  token,
  postDb,
  postDispatch,
  setDisablePostButton
) => {
  setDisablePostButton(true);
  try {
    const response = await axios.post(
      "/api/posts",
      {
        postData: addPostPayload,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(response);
    if (response.status === 201) {
      // setAllPost(response.data.posts);
      postDispatch({
        type: projectConstants._GET_ALL_POSTS,
        payload: response.data.posts,
      });
      toast.success("Post added!");
    }
  } catch (error) {
    const { response } = error;
    console.log(response);
    if (response.status === 404) {
      toast.error(`${response.data.errors[0]}`);
    } else {
      toast.error("Something is wrong. Please try after some time.");
    }
  } finally {
    setDisablePostButton(false);
  }
};

export const editPost = async (token, payload, postID, postDispatch) => {
  try {
    const { status, data } = await axios.post(
      `/api/posts/edit/${postID}`,{ postData:payload},
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 201) {
      postDispatch({
        type: projectConstants._GET_ALL_POSTS,
        payload: data.posts,
      });
    }
  } catch (error) {
    const {response} = error;
    if(response.status === 400){
        toast.error("Cannot edit a Post doesn't belong to the logged in User.")
    }else{
        toast.error("")
    }

  } finally {
  }
};

// export { getAllPost, getSortedPost };
