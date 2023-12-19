import React, { useState } from "react";
import "../LoginForm/LoginForm.css";
import { useNavigate } from "react-router-dom";
import yoga_logo from "../../assets/yoga_logo.jpg";
import { useCookies } from "react-cookie";
import axios from 'axios'

const LoginForm = () => {
    const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
 const isAuth= window.localStorage.getItem("isAuth");
  const [user_data, setUserData] = useState({ email: "", password: "" });
  const onchange_input = (e) => {
    let value = e.target.name;
    if (e.target.name == "email") {
      setUserData({ ...user_data, email: e.target.value });
    } else {
      setUserData({ ...user_data, password: e.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(user_data.email)) {
       alert("invalid email")
      return;
    }

    try {
      const result = await axios.post("https://enchanting-teal-llama.cyclic.cloud/user/login", {
        user_data
      });
      console.log(result)
      setCookie("access_token", JSON.stringify(result.data.token));
      window.localStorage.setItem("email", (result.data.email));
      window.localStorage.setItem("username",(result.data.username));
      window.localStorage.setItem("userId",(result.data.userId));
      window.localStorage.setItem("isAuth",true);
      console.log("succes")
      console.log(result)
      setTimeout(() => {
        navigate("/form");
      }, 1500);
    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <div className="login_form_div" h="700px" pt="30px">
      <div className="login_form_parent">
        <div className="login_form_heading">Login Form</div>
        <img
          className="login_form_image"
          src={yoga_logo}
          style={{ width: "150px", margin: "auto" }}
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
          placeholder="Password"
          type="password"
        />
        <button
          style={{ width: "100%", backgroundColor: "gray" }}
          onClick={handleSubmit}
        >
          Login
        </button>
        <div style={{ textAlign: "center" }}>
          Not Have account?
          <div
            style={{ textAlign: "center", color: "blue", display: "inline" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            {" "}
            Signup Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
