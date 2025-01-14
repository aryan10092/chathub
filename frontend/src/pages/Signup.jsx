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
const Signup = () => {

    const[name,setname]=useState("")
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
     // Prevent default form submission
    try {
        const response = await axios.post(`${server}/api/user/signup`, {
            name,
            email,
            password,
        });
        toast.success(response.data.message);
        console.log(response.data.message)
        localStorage.setItem('token', response.data.token);
        navigate('/');
        setbuttload(false)
    } catch (error) {
        toast.error(error.response.data.message);
        console.error('Signup failed:', error.response?.data || error.message);
        // alert('Signup failed. Please try again.');
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
        <Toaster position="top-center" reverseOrder={false} />
        <form 
        onSubmit={handleSignup}
          className='backdrop-blur-[10px] p-6 rounded shadow-md w-full md:w-[500px]'>
        <Heading  label={"Sign up"}/>
        <Subheading label={"Enter your information"}/>
        <Inputbox  onchange={(e)=>{
            setname(e.target.value)
        }}
        placeholder="username"
        label={"Username"}

        />
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
        {/* <button
        type='submit'
        className='w-full text-white  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 mt-3 '

        
    > */}
    <button
    type='submit'
className='p-[3px] w-full relative mt-3 mb-2'
    >
        <div className='absolute  inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg'/>
        <div className='px-5 py-2.5  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent'>
{buttload?<Loadingspinner/>:"Sign up"}
</div>

        </button>

      


<Bottomwarning
label={"Already have an account "}
text={" Login"}
to={"/signin"}

>

</Bottomwarning>


        </form>
        </div>
  )
}

export default Signup