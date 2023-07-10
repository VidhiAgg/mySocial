import React, { useContext } from "react";
import "./sideBar.css";
import { Bookmark, Explore, Home, Logout } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../../utility/UserAvatar";

const SideNavigationBar = () => {
  const { signOutUser, loginUser:{user, token} } = useContext(AuthContext);
console.log(user);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.stopPropagation();
    signOutUser();
  };
  return (
    <div className="side-nav-container">
      
      <ul className="nav-menu-list">
        <li
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
        >
          <Home /> <span className="hide-text">Home</span>
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation();
            navigate("/explore");
          }}
        >
          <Explore /> <span className="hide-text">Explore</span>
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation();
            navigate("/bookmark");
          }}
        >
          <Bookmark />
          <span className="hide-text">Bookmarks</span>
        </li>
        <li onClick={handleLogout}>
          <Logout />
          <span className="hide-text">Logout</span>
        </li>
      </ul>
      <div style={{cursor:"pointer"}} className="profile-containr" onClick={(e)=> {
        e.stopPropagation();
        navigate(`/profile/${user.username}`)
      }}>
      <div className="avatar-conatiner">
<UserAvatar  userProp={user}/>
</div>
<div  className="name-conatiner">
              <h5>{user.fullName}</h5>
              <p>@{user.username}</p>
          </div>
      </div>
    </div>
  );
};

export default SideNavigationBar;
