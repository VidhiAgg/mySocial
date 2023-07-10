import axios from "axios"

export const loginService = (loginPayload) =>{
 return axios.post("/api/auth/login",loginPayload)
} 

export const signUpService = (signupPayload) =>{
    return axios.post("/api/auth/signup",
    signupPayload)
   }