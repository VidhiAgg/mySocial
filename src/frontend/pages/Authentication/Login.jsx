import React, { useContext, useState } from "react";
import "./authentication.css";
import { Link } from "react-router-dom";
import { projectConstants } from "../../utility/MySocialUtil";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { getUserLogin, loginUser } = useContext(AuthContext);

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (
      !loginCredentials.password.trim() ||
      !loginCredentials.username.trim()
    ) {
      toast.error("Email or password cannot be blank.");
      return;
    }
    getUserLogin(loginCredentials);
  };

  return (
    <div className="container">
      <div className="main-container">
        <div className="top-header">
          <h2>My Social</h2>
          <h3>Social Media just like your world.</h3>
        </div>
        <div className="page-header">
          <h1>Log In</h1>
        </div>
        <div className="form-menu">
          <form className="auth-form" onSubmit={handleSubmitClick}>
            <label htmlFor="userName">Username*</label>

            <input
              required
              id="userName"
              type="text"
              value={loginCredentials.username}
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  username: e.target.value,
                })
              }
            />

            <label htmlFor="password">Password*</label>
            <input
              required
              id="password"
              type="password"
              value={loginCredentials.password}
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  password: e.target.value,
                })
              }
            />

            <div className="page-btns">
              <button type="submit" className="btn-primary">
                Log In
              </button>
              <button
                type="submit"
                onClick={() =>
                  setLoginCredentials({
                    username:"adarshbalika",
                    password:"adarshBalika123"
                    // projectConstants._guest_username_,
                    // password: projectConstants._guest_pwd_,
                  })
                }
              >
                Guest Mode
              </button>
            </div>
          </form>
        </div>

        <div className="foter-area">
          <p style={{ color: "red" }}>
            {loginUser.isError && loginUser.errorMessage}
          </p>
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
