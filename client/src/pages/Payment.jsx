import React from 'react'
import '../css/payment.css'

import yogaa from "../assets/yogaa.jpg"
import { useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'


const Payment = () => {
    const location = useLocation();
    const user_data = location.state?.user_data || {};
    const navigate = useNavigate()
    let today = new Date().toLocaleDateString()
    const storedName = localStorage.getItem("username")||"";

    const handleSubmit = async()=>{
        // console.log("called")
        try {
            const res = await axios.post(
              "https://enchanting-teal-llama.cyclic.cloud/admission/postData",
              {
                user_data,
              }
            
            );
            console.log(res)
            // if(res.status === 500){
            //   alert("already present ")
            //   return ;
            // }
            alert(res.data.msg)

            
            navigate("/batch") 
          } catch (err) {
            console.log(err.message);
          }
    }

    return (
        <div className='payment_form_div' style={{ "background": `url(${yogaa})`, "background-size": "100%" }}>
            <div className='payment_form_parent'>
                <div className='payment_heading'>Payment In Progress...</div>
                <div className='payment_price'>INR ₹500/Month</div>
                <div className='payment_options'>
                    <div>Ref Number</div>
                    <div>JYKEU9394U93</div>
                    <div>Payment Time</div>
                    <div>{today}</div>
                    <div>Payment Method</div>
                    <div>Bank Transfer</div>
                    <div>Sender Name</div>
                    <div>{storedName}</div>
                    <div>Amount</div>
                    <div>INR 500</div>
                </div>
                <div className='button_parent'>
                    <button onClick={() => { navigate("/form") }}>Cancel</button>
                    <button onClick={()=>{handleSubmit()}}>Confirm</button>
                </div>

            </div>
        </div>
    )
}

export default Payment; 