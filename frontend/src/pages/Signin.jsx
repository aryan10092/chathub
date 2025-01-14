import React, { useEffect, useState } from 'react'
import { Heading } from '../components/Heading'
import { Subheading } from '../components/Subhad'
import { Inputbox } from '../components/Inputbox'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Bottomwarning } from '../components/Bottomwarning'
import { server } from '../main'
import toast, { Toaster } from "react-hot-toast";
import { Loadingspinner } from '../components/Loading'
import bg from '../assets/download.jpg'

const Signin = () => {

  const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[user,setuser]=useState("")
    const[buttload,setbuttload]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
    const usertoken=localStorage.getItem("token")

   if(usertoken){
    navigate("/")
   }
    },[])
const handleSignup = async (e) => {
    e.preventDefault();
    setbuttload(true)
   
    try {
        const response = await axios.post(`${server}/api/user/signin`, {
            email,
            password,
        });
        toast.success(response.data.message);
        localStorage.clear();
        localStorage.setItem('token', response.data.token);
        navigate('/');
        setbuttload(false)
        setuser(response.data.user)
        
    } catch (error) {
        console.error('Signup failed:', error.response?.data || error.message);
        alert('Signup failed. Please try again.');
        setbuttload(false)
    }
};
useEffect(()=>{
document.body.className="bg-cover"
document.body.style.backgroundImage=`url(${bg})`
return()=>{
document.body.className=""
document.body.style.backgroundImage=""
}
},[])


  return (
    <div className='flex justify-center items-center h-screen text-white'>
        <form 
        onSubmit={handleSignup}
          className='backdrop-blur-[10px] p-6 rounded shadow-md w-full md:w-[500px]'>
        <Heading  label={"Login"}/>
        <Subheading label={"Enter your information to access your account"}/>
        
        <Inputbox  onchange={(e)=>{
            setemail(e.target.value)
        }}
        placeholder="email"
        label={"Email"}

        />
        <Inputbox  onchange={(e)=>{
            setpassword(e.target.value)
        }}
        placeholder="password"
        label={"Password"}

        />
        <button
        type='submit'
        className='w-full p-[3px] relative mb-2 mt-3 '>
    <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg'/>
        <div className='px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent'>
    {buttload?<Loadingspinner/>:"Login"}

    </div>

        </button>
       


<Bottomwarning
label={"Don't have an account"}
text={"Signup"}
to={"/signup"}

>

</Bottomwarning>


        </form>
        </div>
  )
}

export default Signin