import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./authentication.css";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";
const SignUp = () => {
  const [signUp, setSignUp] = useState({
    input:{},
    isPasswordMatch: true,
    showPwd :{pwd: true, confirmedPwd: true},

  });
const navigate = useNavigate();
const location = useLocation();

  const {signInUser, loginUser} = useContext(AuthContext);
const {postDispatch} = useContext(PostContext);

  useEffect(()=>{
    if (loginUser.isLogin) {
      navigate("/");
    }
    }, [loginUser.isLogin, navigate, location]);


  const handleInputChange = (e)=>{
    
    const {name,value} = e.target;
    if(name === "confirmedPassword"){
      setSignUp({...signUp, input: {...signUp.input, [name]: value}, 
        isPasswordMatch : signUp.input.password === value ? true : false
       })

    }
    else if(name === "password"){
      setSignUp({...signUp, input: {...signUp.input, [name]: value}, 
        isPasswordMatch : signUp.input.confirmedPassword === value ? true : false
       })

    }
    else{
      setSignUp({...signUp, input: {...signUp.input, [name]: value} })
    }

  }
  const handleSubmitClick = (e)=>{
e.preventDefault();
signInUser(signUp.input, postDispatch);
  }
  return (
    <div className="container">
    <div className="main-container">
    <div className="top-header">
          <h2>My Social</h2>
          <h3>Social Media just like your world.</h3>
        </div>
        <div className="page-header">
          <h1>Sign Up</h1>
          </div>
          <div className="form-menu">
          <form className="auth-form" onSubmit={handleSubmitClick}>
          <label htmlFor="fullName">Full Name*</label>

<input
  required
  id="fullName"
  placeholder="Adarsh Balika"
  name="fullName"
  type="text"
  value={signUp.input.fullName}
  onChange={handleInputChange}
/>

<label htmlFor="userName">Username*</label>

<input
  required
  id="userName"
  type="text"
  name="username"
  placeholder="adarshBalika"
  value={signUp.input.username}
  onChange={handleInputChange}
  
/>


           <div className="passwor-tag">
           <label htmlFor="password">Password* </label>
            <i onClick={(e)=>{
              setSignUp({...signUp,showPwd : 
                {...signUp.showPwd, pwd : !signUp.showPwd.pwd}})
            }}>{signUp.showPwd.pwd ? <Visibility/> :<VisibilityOff /> }</i>
            
            
           </div>
            
            <input
              required
              id="password"
              type= {signUp.showPwd.pwd ? "text" :  "password"}
              name="password"
              value={signUp.input.password}
              onChange={handleInputChange}
            />
            <div className="passwor-tag">
            <label htmlFor="confirmedPassword">Confirmed Password*</label>
            <i onClick={(e)=>{
              setSignUp({...signUp,showPwd : {...signUp.showPwd, confirmedPwd : 
                !signUp.showPwd.confirmedPwd}})
            }}>{signUp.showPwd.confirmedPwd ? <Visibility/> :<VisibilityOff /> }</i>
            
            </div>

            <input
              required
              id="confirmedPassword"
              type= {signUp.showPwd.confirmedPwd ? "text" :  "password"}
              name="confirmedPassword"
              value={signUp.input.confirmedPassword}
              onChange={handleInputChange}

            />
             
            <div className="page-btns">
              <button disabled ={!signUp.isPasswordMatch} type="submit" className="btn-primary">
                Create an Account
              </button>
              
            </div>
          </form>
        </div>

        <div className="foter-area">
       {!signUp.isPasswordMatch && <p style={{ color: "red" }}>
           Password doesn't match.
          </p>
}
          <p>
            Already Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default SignUp