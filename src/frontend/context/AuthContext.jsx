import React, { createContext, useState } from "react";
import { loginService, signUpService } from "../server/authServer";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();
    
  const loginStorageToken = JSON.parse(localStorage.getItem("token"));
  const loginStorageUser = JSON.parse(localStorage.getItem("user"));

  const [loginUser, setLoginUser] = useState({
    token: loginStorageToken?.token,
    user: loginStorageUser?.user,
    isLogin: loginStorageUser ? true : false,
    isError: loginStorageUser ? true : false,
    errorMessage: null,
  });

const signInUser= async(signUpInput, postDispatch)=>{
  const payload = {
    username: signUpInput.username,
    fullName: signUpInput.fullName,
    password: signUpInput.password
  }
  try {
    
    const {status, data} = await signUpService(payload); 
    if(status === 201){
      const  { createdUser, encodedToken} =  data;
      setLoginUser({
        token : encodedToken,
        isLogin: true,
        isError: false,
        user: createdUser,
        errorMessage: null,
          
      });

      toast.success(`Welcome to the community! ${createdUser.fullName}`);
      localStorage.setItem("token", JSON.stringify({token:encodedToken}));
      localStorage.setItem("user",JSON.stringify({user:createdUser}));
      postDispatch({type: "addUser", payload: createdUser})

    }
  } catch (error) {
    const {response} = error;
    console.log(response);
    if(error.response.data.status == 422){
      setLoginUser({
        ...loginUser,
        isError: true,
        errorMessage: "Username Already Exists.",
          
      });
      toast.error("Username Already Exists.")
    }
    else{
      setLoginUser({
        ...loginUser,
        isError: true,
        errorMessage: "Sign up failed.Internal server error."
      });
      toast.error("Sign up failed.Internal server error.")
    }
  }

}

const signOutUser=() => {
  setLoginUser({
      token: null,
      user: null,
      isLogin: false,
      isError: false,
      errorMessage: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
   
      navigate("/");
    
  }

  const getUserLogin = async (loginPayload) => {
    try {
      const {status, data, statusText} = await loginService(
        loginPayload
      );
      console.log(status, data, statusText);
      if (status === 200) {
        
        const {encodedToken, foundUser} = await data;
        setLoginUser({
          token: encodedToken,
          user: foundUser,
          isLogin: true,
          isError: false,
          errorMessage: null,
        });
        toast.success(`Welcome back! ${foundUser.fullName}`);
        localStorage.setItem("token", JSON.stringify({token:encodedToken}));
        localStorage.setItem("user",JSON.stringify({user:foundUser}));
        navigate(location?.state?.from || "/", { replace: true });
      }
      
    } catch (error) {
        const {response} = error;
        if(response.status === 404){
            setLoginUser({
               ...loginUser,
                isLogin: false,
                isError: true,
                errorMessage: response.data.errors[0],
              });
              toast.error("Login Fail.User not found.");
          }
    
       else if(response.status === 401){
            setLoginUser({
               ...loginUser,
                isLogin: false,
                isError: true,
                errorMessage: response.data.errors[0],
              });

              toast.error("Login Fail.Incorrect Credentials.");
          }


      else {
        setLoginUser({
        ...loginUser,
        isLogin: false,
        isError: true,
        errorMessage: "Something is wrong. Please try again.",
      });
      toast.error("Login fail.");
    }
}
    
  };

  return (
    <AuthContext.Provider value={{ loginUser, 
    setLoginUser, getUserLogin, signOutUser, signInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
