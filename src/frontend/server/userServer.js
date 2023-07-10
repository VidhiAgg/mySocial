import axios from "axios"
import { projectConstants } from "../utility/MySocialUtil";
import { toast } from "react-toastify";

export const getUserInfo = async (userID,postDispatch)=>{


    postDispatch({type:projectConstants._SET_LOADING_STATUS_SINGLE_USER_, payload:true})

    try {
         const {status, data} = await axios.get(`/api/users/${userID}`);
         console.log(data);
         if(status === 200){
            console.log(data.user);
        postDispatch(
            {type: projectConstants._GET_USER_INFO_, payload : data.user
        })
         }


    } catch (error) {
        const {response} = error;
        console.log(response);

    }finally{
        postDispatch(
            {type:projectConstants._SET_LOADING_STATUS_SINGLE_USER_, 
                payload:false})

    }
}


export const updateUseDetails = async (token, userDataInput, postDispatch, users, userInfo)=>{
    try {

const {userData} = userDataInput;

        const response = await axios.post("/api/users/edit",{userData},{
            headers:{ authorization:token }
        })
        if(response.status === 201){
           localStorage.setItem("user",JSON.stringify({user:response.data.user}));
        const updatedList =  users.map(user=> 
         user.username === response.data.user.username ?
         response.data.user : user)
       
      postDispatch({type:projectConstants._GET_ALL_USERS,payload: updatedList}) 
  
            toast.success("Update successfully.")
                    }
        
    } catch (error) {
        console.error(error);
        toast.error("Unable to upate user.")
    }
}



export const getAllUsers = async (setUserLoader, postDispatch)=>{
    setUserLoader(true)
    try {
        const {status,data} =  await axios.get("/api/users");
        if(status === 200){
            // console.log(data.users)
            //setUsers(data.users);
             postDispatch({type: projectConstants._GET_ALL_USERS, payload: data.users})
        }
    } catch (error) {
        console.error(error);
    }
    finally{
        setUserLoader(false);
    }
}
export const addToBookMark =async (token, postId, username, postDispatch)=>{
    try {
        const {status, data} = await axios.post(`/api/users/bookmark/${postId}`,{},{
            headers:{
           
                    authorization:token
            }
        });
        if(status === 200){

             postDispatch({type: projectConstants._UPDATE_BOOKMARK_, payload:{bookmark:data.bookmarks , username}})      
             toast.success("Post added to bookmark.")
            
            
            }
    } catch (error) {
        const {response} = error
        if(response.status === 400){
            toast.error("This Post is already bookmarked");
    
        }else if(response.status === 404){
            toast.error("Not Found error.");
        }else{
            toast.error("Internal Server error.");
        } 
    }
    
}
export const removeFromBookMark =async(token, postId, username, postDispatch)=>{
try {
    const {status, data}  = await axios.post(`/api/users/remove-bookmark/${postId}`,{},{
        headers:{
            authorization:token
    }
    })
    if(status === 200){
            
        postDispatch({type: projectConstants._UPDATE_BOOKMARK_, payload:{bookmark:data.bookmarks , username}})      
        toast.success("Post removed from bookmark.")
    }
} catch (error) {
    const {response} = error
    if(response.status === 400){
        toast.error("Post not bookmarked yet")

    }else if(response.status === 404){
        toast.error("Not Found error.")
    }else{
        toast.error("Internal Server error.")
    }
}
}
