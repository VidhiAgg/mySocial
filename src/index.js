import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import PostContextProvider from "./frontend/context/PostContext";
import AuthContextProvider from "./frontend/context/AuthContext";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
    <PostContextProvider>
      
                  <App />
                  </PostContextProvider>  
                  </AuthContextProvider>    
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById("root")
);

