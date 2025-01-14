import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {


    const [user, setuser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setloading] = useState(true);
   const navigates =useNavigate()

  async function fetchuser(){
try {
    const{data}=await axios.get(`${server}/api/user/me`,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    setuser(data)
    localStorage.setItem("user",data.name)

    console.log(data)
    setIsAuth(true)
    setloading(false)
} catch (error) {
    console.log(error)
    
    setIsAuth(false)
    setloading(false)
}


  }
  async function checkuser(){
    try {
        const t=localStorage.getItem("token")
        if(!t){
            navigates("/signup")

        }
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    fetchuser();
  }, []);


 useEffect(() => {
    checkuser();
  }, []);
  

const logoutfunc=(navigate)=>{
localStorage.clear()
setIsAuth(false)
setuser([])
navigate("/signup")
}
    return (
        <UserContext.Provider 
        
        value={{
            
            isAuth,
            setIsAuth,
            user,
            loading,
            logoutfunc
            }}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    )
};

export const useUserData = () => useContext(UserContext); // Renamed to follow naming conventions
