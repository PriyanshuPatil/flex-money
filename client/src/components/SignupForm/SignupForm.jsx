import React, { useState } from "react";
import "../SignupForm/SignupForm.css";
import { useNavigate } from "react-router-dom";
import yoga_logo from "../../assets/yoga_logo.jpg";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();
  const isAuth= window.localStorage.getItem("isAuth");
  const [user_data, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onchange_input = (e) => {
    let value = e.target.name;
    if (e.target.name == "username") {
      setUserData({ ...user_data, username: e.target.value });
    } else if (e.target.name == "email") {
      setUserData({ ...user_data, email: e.target.value });
    }else {
      setUserData({ ...user_data, password: e.target.value });
    } 
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Email validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(user_data.email)) {
      alert("invalid email");
      return;
    }
    console.log(user_data.username);
    const username = user_data.username;
    const email = user_data.email;
    const password = user_data.password;
    try {
      const res = await axios.post("https://enchanting-teal-llama.cyclic.cloud/user/register", {
        username,
        email,
        password,
      });
      console.log(res);

      if ((res.status = 201)) {
       
        console.log("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
      
    }
  };

  return (
    <div className="signup_form_div" h="700px" pt="30px">
      <div className="signup_form_parent">
        <div className="signup_form_heading">Signup Form</div>
        <img
          className="signup_form_image"
          src={yoga_logo}
          style={{ width: "150px", margin: "auto" }}
        />
        <input
          onChange={(e) => {
            onchange_input(e);
          }}
          name="username"
          placeholder="Enter your Name"
        />
        <input
          onChange={(e) => {
            onchange_input(e);
          }}
          name="email"
          placeholder="Enter Your Email Address"
        />
        <input
          onChange={(e) => {
            onchange_input(e);
          }}
          name="password"
          placeholder="Create New Password"
          type="password"
        />
        <button
          style={{ width: "100%", backgroundColor: "gray" }}
          onClick={handleSubmit}
        >
          Signup
        </button>
        <div style={{ textAlign: "center" }}>
          Already Account?
          <div
            style={{ textAlign: "center", color: "blue", display: "inline" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Login Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
