import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./frontend/pages/Authentication/Login";
import SignUp from "./frontend/pages/Authentication/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import MockmanPage from "./frontend/pages/Mockman";
import PrivateRoute from "./frontend/context/PrivateRoute";
import HomePage from "./frontend/pages/UserFeed/HomePage";
import Profile from "./frontend/pages/UserProfile.jsx/Profile";
import ExplorePage from "./frontend/pages/Explore/Explore";
import PostPage from "./frontend/pages/Post/PostPage";
import BookmarkPage from "./frontend/pages/Bookmark/Bookmark";
import { useContext } from "react";
import { AuthContext } from "./frontend/context/AuthContext";

function App() {
  const { loginUser } = useContext(AuthContext);
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:username"
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
              <ExplorePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookmark"
          element={
            <PrivateRoute>
              <BookmarkPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/post/:postID"
          element={
            <PrivateRoute>
              <PostPage />
            </PrivateRoute>
          }
        />

        <Route path="/mockman" element={<MockmanPage />} />

        {!loginUser.token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
