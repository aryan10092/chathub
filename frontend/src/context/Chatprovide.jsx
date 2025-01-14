import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { server } from "../main";

const Chatcontext=createContext()
export const Chatprovider=({children})=>{
const[messages,setmessages]=useState([])
const[label,setlabel]=useState("")

const[newrequestload,setnewrequestload]=useState(false)

async function getresponse(){
    if(label==="")return alert("enter your query")
        setnewrequestload(true)
    setlabel("")
    try {
        const response = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBkvgGdFsw-u4y01uSYKH2tQfy1nvM49e8",
            method: "post",
            data: {
              contents: [{ parts: [{ text: label }] }],
            },
          });
          console.log(response)
          const generatedText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response available";
          console.log(generatedText)
          const message={
            question:label,
            answer: generatedText 
          }
          setmessages((prev)=>[...prev,message])
          setnewrequestload(false)
    const{data}=await axios.post(`${server}/api/chat/${selected}`,{
      question:label,
      answer:generatedText
    },{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    } catch (error) {
        alert("something went wrong")
        console.log(error)
        setnewrequestload(false)
        
    }
}
    const[chats,setchats]=useState([])
    const [selected, setSelected] = useState(null);


    async function fetchchats() {
        try {
            const{ data}=await axios.get(`${server}/api/chat/allchats`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            console.log(data)
            console.log(data[0].latestmessage)
            
            // console.log(response.latestmessage)
            setchats(data)
            console.log(chats)
            const t=(chats.length>0)
            console.log(t)
            console.log(chats.latestmessage)
            const ids=data[0]._id
            console.log(ids)
            setSelected(ids);
            console.log(selected)
            
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const [createLod, setCreateLod] = useState(false);
    async function createchatss(){
        try {
            const { data } = await axios.post(
                `${server}/api/chat/newchat`,
                {},
                {
                  headers: {
                    token: localStorage.getItem("token"),
                  },
                }
              );
        
              fetchchats();
              setCreateLod(false);
        } catch (error) {
            console.log(error)
            setCreateLod(false);
        }
    }
    console.log(selected)
    async function fetchMessages() {
        if (!selected) {
            console.warn("No chat selected, skipping fetch.");
            return;
          }
        setCreateLod(true);
        try {
            console.log(selected)
          const { data } = await axios.get(`${server}/api/chat/${selected}`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          setmessages(data);
          setCreateLod(false);
        } catch (error) {
          console.log(error);
          setCreateLod(false);
        }
      }
      async function deletechats(id){
        try {
          const {data}=await axios.delete(`${server}/api/chat/${id}`,{
            headers:{
              token:localStorage.getItem("token")
            }
          })
          toast.success(data.message)
          fetchchats()
          window.location.reload()
        } catch (error) {
          console.log(error)
        }
      }

// fetchMessages()
useEffect(()=>{
    fetchchats()
},[])
useEffect(()=>{
    console.log("Selected chat updated:", selected);
    if(selected){
    fetchMessages()}
},[selected])


    return <Chatcontext.Provider value={{
     getresponse,
     messages,
     label,
     setlabel,
     newrequestload,
     chats,
     createchatss,
     createLod,
     selected,
     setSelected,
     
     setCreateLod,
     deletechats

    }}>{children}</Chatcontext.Provider>
}
export const Chatdata=()=> useContext(Chatcontext)