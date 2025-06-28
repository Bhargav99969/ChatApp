import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar' 
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'
import SettingPage from './components/SettingPage'
import ProfilePage from './components/ProfilePage'
import { axiosInstance } from './config'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import {Toaster} from "react-hot-toast"


function App() {
  
 const authUser = useAuthStore((state) => state.authUser);
 const checkAuth = useAuthStore((state) => state.checkAuth);
 const isCheckinauth = useAuthStore((state) => state.isCheckinauth);
 const OnlineUsers = useAuthStore((state) => state.OnlineUsers);

 console.log(OnlineUsers,"online user")

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  console.log({authUser})



  if(isCheckinauth && !authUser ) return (
    <div className='flex items-center justify-center h-screen'>
       <Loader className='size-10 animate-spin'></Loader>
    </div>
   
  )
  return(
     <>

      <div className='bg-amber-50 m-0 p-0 '> 
        <NavBar></NavBar>
          
<Routes>
  <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
  <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
  <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
  <Route path="/setting" element={<SettingPage />} />
  <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
</Routes>

        <Toaster/>

      </div>
  
    </>
  )
}

export default App
