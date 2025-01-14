import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
 import { useUserData } from './context/Userprovider'
import { Loadinglarge } from './components/Loading.jsx'

const App = () => {
   const{user}=useUserData()
   console.log(user)
  const{loading}=useUserData()
  return (
   <>
   {loading ? (<Loadinglarge/>):(
   
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/signin' element={<Signin/>}/>
   </Routes>
   )}
   </>
  )
}

export default App