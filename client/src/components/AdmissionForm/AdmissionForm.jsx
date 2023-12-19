import React, { useState, useEffect } from "react";
import "../AdmissionForm/AdmissionForm.css";
import { useNavigate } from "react-router-dom";
import yoga_logo from "../../assets/yoga_logo.jpg";
import axios from "axios";

const AdmissionForm = () => {
  const navigate = useNavigate();
  const isAuth= window.localStorage.getItem("isAuth");
  const [user_data, setUserData] = useState({
    name: "",
    email: "",
    age: "",
    batch: "",
    date: "",
    weight: "",
  });

  const onchange_input = (e) => {
    setUserData({ ...user_data, [e.target.name]: e.target.value });
  };
  const getData = async () => {
    console.log("hii", localStorage.getItem("email"));
    const email = localStorage.getItem("email");
    console.log(email);
    const res = await axios.get(
      `https://enchanting-teal-llama.cyclic.cloud/admission/single?email=${email}`
    );
    const dateIs = res.data.data.date.split("-")[1] 
    let today = new Date().toLocaleDateString().split("/")[0] || 
    console.log(today,dateIs)
    if(today == dateIs){
      alert("you have already subscribed for this month");
      navigate('/')
    }
    
  };
  useEffect(() => {
    getData();

    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    setUserData((prevUserData) => ({
      ...prevUserData,
      name: storedName || "",
      email: storedEmail || "",
    })); 
    console.log(isAuth,"1")
    if(isAuth){
      console.log(isAuth,"2")
      alert("You Need To Login First")
      navigate("/login");
 
    }
  }, []);

  const handleSubmit = async () => {
    if (
      !user_data.name ||
      !user_data.email ||
      !user_data.age ||
      !user_data.batch ||
      !user_data.date ||
      !user_data.weight
    ) {
      alert("fill all details");
      return;
    } else {
      if (user_data.age >= 18 && user_data.age <= 65) {
        console.log(user_data);
        navigate("/payment", { state: { user_data } });
      } else {
        alert("fill age between 18-65");
      }
    }
  };
  
  

  return (
    <div className="admission_form_div" h="700px" pt="30px">
      <div className="admission_form_parent">
        <div className="admission_form_heading">Admission Form</div>
        <img
          className="admission_form_image"
          src={yoga_logo}
          style={{ width: "150px", margin: "auto" }}
        />
        <div className="admission_form_input_parent">
          <input
            onChange={(e) => {
              onchange_input(e);
            }}
            name="name"
            placeholder="Enter your Name"
            value={user_data.name}
            readOnly
          />
          <input
            onChange={(e) => {
              onchange_input(e);
            }}
            name="email"
            placeholder="Enter Your Email Address"
            value={user_data.email}
            readOnly
          />
          <input
            onChange={(e) => {
              onchange_input(e);
            }}
            type="number"
            name="age"
            placeholder="Enter Your Age"
          />
          <select
            onChange={(e) => {
              onchange_input(e);
            }}
            name="batch"
            placeholder="Select Batch"
          >
            <option value={""}>Select Batch</option>
            <option value={"6-7 AM"}>6-7 AM</option>
            <option value={"7-8 AM"}>7-8 AM</option>
            <option value={"8-9 AM"}>8-9 AM</option>
            <option value={"5-6 AM"}>5-6 AM</option>
          </select>
          <input
            onChange={(e) => {
              onchange_input(e);
            }}
            type="date"
            name="date"
            placeholder="Enter Your Joining Date"
          />
          <input
            onChange={(e) => {
              onchange_input(e);
            }}
            type="number"
            name="weight"
            placeholder="Enter Your Weight in Kg"
          />
        </div>

        <button
          style={{ width: "100%", backgroundColor: "gray" }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
        <div style={{ textAlign: "center" }}>
          "Anybody can breathe, therefore anybody can practice yoga"
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
