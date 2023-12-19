import React, { useEffect, useState } from 'react'
import yogaa from "../assets/yogaa.jpg"
import '../css/changebatch.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Changebatch = () => {
    const [userData,setUserData]=useState({name:"",age:"",batch:"",date:"",weight:"",_id:""})
    const [currentBatch,setBatch]=useState("")
    const [changeDate,setDate]=useState("")
    const isAuth= window.localStorage.getItem("isAuth");
    const navigate=useNavigate()
    const getData = async () => {
        const email = localStorage.getItem("email");
        const res = await axios.get(
          `https://enchanting-teal-llama.cyclic.cloud/admission/single?email=${email}`
        );
        setUserData(res.data.data);
           setDate(res.data.data.date)
      };

      const handleChange=async(e)=>{
        setBatch(e.target.value)
     
      }
      const handleSubmit=async()=>{
        const dateIs = changeDate.split("-")[1] 
    let today = new Date().toLocaleDateString().split("/")[0] 
    if(today == dateIs){
      alert("You Can Not Change Batch In Same Month");
    }else{
       try{
          const res = await axios.put(
            `https://enchanting-teal-llama.cyclic.cloud/admission/update/${userData._id}`,{batch:currentBatch,date:changeDate}
          ); 
          alert("Your Batch Has Been Succesfully Changed.") ;
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }catch(err){
            console.log(err.message)
        }
    }
       
        
      }


      useEffect(() => {
        getData();
        if(isAuth){
          alert("You Need To Login First")
          navigate("/login");
      
        }
      }, []);
    
      
  return  (
    <div className='batch_form_div' style={{ "background": `url(${yogaa})`, "background-size": "100%" }}>
        <div className='batch_form_parent'>
            <div className='batch_heading'>Batch Details</div>
            <div className='batch_options'>
                <div>UserName</div>
                <div>{userData.name}</div>
                <div>Current Batch</div>
                <div>{userData.batch}</div>
                <div>age</div>
                <div>{userData.age}</div>
                <div>Last Subscription Date</div>
                <div>{userData.date}</div>
            </div>
            <div className='batch_heading'>Change Batch </div>
            <select
            onChange={(e) => {
                handleChange(e)
            }}
            name="batch"
            placeholder="Select Batch" style={{width:"80%",margin:"auto"}}
          >
            <option value={userData.batch}>{userData.batch}</option>
            <option value={"6-7 AM"}>6-7 AM</option>
            <option value={"7-8 AM"}>7-8 AM</option>
            <option value={"8-9 AM"}>8-9 AM</option>
            <option value={"5-6 AM"}>5-6 AM</option>
          </select>
          <input
            onChange={(e) => {
              setDate(e.target.value)
            }}  style={{width:"80%",margin:"auto",padding:"10px"}}
            type="date"
            name="date"
            placeholder="From When To Change"
          />
            <div className='button_parent'>
                <button onClick={()=>{navigate("/")}}>Cancel</button>
                <button onClick={()=>{handleSubmit()}}>Change</button>
            </div>

        </div>
    </div>
)
}

export default Changebatch