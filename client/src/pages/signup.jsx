import "../components/css/signup.css"; // CSS file for the signup page
import { addUser } from "../services/task-services";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import loginImage from "../images/login.png"; // Replace with your login image path

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmit] = useState(false);
  const navigate = useNavigate();

  const createUser = async (event) => {
    event.preventDefault();
    const user = {
      userId: `${uuidv4()}`,
      username: userName,
      email: email,
      password: password,
    };
    console.log("user", user);
    try {
      await addUser(user);
      navigate("/login");
    } catch (error) {
      alert("Signup failed");
      console.error(error);
    }
    onClick();
  };

  const onClick = () => setSubmit(!submitted);

  if (!submitted) {
    return (
      <>
        <div className="container login">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-6 d-none d-md-block">
              <a className="signText" href="/">
                FinishLine.
              </a>
              <img src={loginImage} alt="Login" className="img-fluid" />
            </div>

            {/* Right Side - Form */}
            <div className="col-md-6 p-5">
              <h3 class="signT">SignUp</h3>
              <div className="d-flex justify-content-start align-items-center mb-3">
                <p className="mb-0 me-1">Already SignedUp?</p>
                <a href="/login">
                  <button className="btn-grad-login btn-primary">Login</button>
                </a>
              </div>
              <form className="signupform" onSubmit={createUser}>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-grad-signup btn-primary w-50"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Signup;
