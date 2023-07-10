import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const location = useLocation();
  const {loginUser} = useContext(AuthContext);
  return loginUser.isLogin ? (
    children ):
    (<Navigate to ="/login" 
    state= {{from: location.pathname}}
     replace />
     ) 
  
}

export default PrivateRoute