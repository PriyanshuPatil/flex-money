import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import yogaa from "../assets/yogaa.jpg"
import '../css/homepage.css'
const Homepage = () => {
    useEffect(()=>{
        const storedName = localStorage.setItem("isAuth",false);
    },[])
    return (
        <div>
            <div className='home_parent'>
                <img src={yogaa} />
            </div>
        </div>
    )
}

export default Homepage