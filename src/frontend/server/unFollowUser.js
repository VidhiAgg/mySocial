import axios from "axios";
import { toast } from "react-toastify";
import { projectConstants } from "../utility/MySocialUtil";

export const followUser = async(token,users,
     followUserId,postDispatch)=>{
    try {
        const {status, data} = await axios.post(`/api/users/follow/${followUserId}`,{},{
            headers: {
                authorization: token,
              },
         },   
        )
         if(status === 200 ){
;
            postDispatch({
                type: "updateUser",payload:  data.followUser,
              });
           
        postDispatch({
            type: "updateUser",
            payload: data.user,
          });
        
            toast.success(`You have starte following ${data.followUser.fullName}. `)
         }
    } catch (error) {
        console.error(error)
        const {response} = error;
        if(response.status === 400){
            toast.error(`${response.data.errors[0]}`)
        }
        if(response.status === 404){
            toast.error(`${response.data.errors[0]}`)
        }
        if(response.status === 500){
            console.error("in follow user");
            toast.error("Internal Server error. Plese try after some time")
        }
    }
}
export const unFollowUser = async (token, followerId, users, postDispatch)=>{
    try {
        const {status, data} = await axios.post(`/api/users/unfollow/${followerId}`,{},
     {
        headers: {
            authorization: token,
          },
     },       
        )
        if(status === 200){
            postDispatch({
                type: "updateUser",payload:  data.followUser});
           
        postDispatch({
            type: "updateUser",payload: data.user});
        
       
            toast.success(`${data.followUser.fullName} has been unfollowed successfully.`)

        }
        
    } catch (error) {
        console.error(error)
        const {response} = error;
        if(response.status === 400){
            toast.error(`${response.data.errors[0]}`)
        }
    }
}