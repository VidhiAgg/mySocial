import React from "react";
import { Route } from "react-router-dom";
import Profile from "../pages/UserProfile.jsx/Profile";
import PrivateRoute from "../context/PrivateRoute";
import HomePage from "../pages/UserFeed/HomePage";
import Explore from "../pages/Explore/Explore";
import Bookmark from "../pages/Bookmark/Bookmark";
import "../layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="top-navbar">Navigation</div>
      <div className="navigation">Side navigation</div>
      <div className="content-area">
        <Route path="/feed"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <Explore />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookmark"
          element={
            <PrivateRoute>
              <Bookmark />
            </PrivateRoute>
          }
        />
      </div>

      <div className="searchBar">Search bar</div>
      <div className="footer">footer</div>
    </div>
  );
};

export default Layout;
