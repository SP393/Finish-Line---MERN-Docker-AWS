import "../components/css/login.css"; // CSS file for the login page
import loginImage from "../images/login.png"; // Replace with your login image path
import { loginUser } from "../services/task-services";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(formData);
      console.log("newUser", user.data);
      console.log("Login successful");
      navigate("/Home");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="container login">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 d-none d-md-block">
          <a className="loginText" href="/">
            FinishLine.
          </a>
          <img src={loginImage} alt="Login" className="img-fluid" />
        </div>
        <div className="col-md-6 p-5">
          <h3>Login</h3>
          <div className="d-flex justify-content-start align-items-center mb-3">
            <p className="mb-0 me-1">Not signed up?</p>
            <a href="/signup">
              <button className="btn-grad-login btn-primary">SignUp</button>
            </a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn-grad-login btn-primary w-50">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
