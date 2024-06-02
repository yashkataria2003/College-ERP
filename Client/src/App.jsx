import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './Components/Authentication/Login'
import AdminPage from './Components/AdminPage/AdminPage'
import TeacherPage from './Components/TeacherPage/TeacherPage'
import AdminLogin from './Components/Authentication/AdminLogin'
import StudentPage from './Components/StudentPage/StudentPage'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation();

  // Initialize userName state from sessionStorage
  const [userDetails, setUserDetails] = useState(localStorage.getItem('userDetails'));

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('loggedIn');
    if (isAuthenticated) {
      setLoggedIn(true);
    }
  }, [location]);


  return (
    <div className=''>
      <div className='h-[10vh] relative z-10'>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
      <div className='h-[90vh]'>
        <Routes>
          <Route path='/' element={<Home />}/>

          <Route path='/admin/login' element={<AdminLogin  setLoggedIn={setLoggedIn} setUserDetails={setUserDetails} userDetails={userDetails}/>}/>
          <Route path='/teacher/login' element={<Login setLoggedIn={setLoggedIn} setUserDetails={setUserDetails} userDetails={userDetails}/>}/>

          <Route path='/admin/*' element={<AdminPage userDetails={userDetails}/>}/>
          <Route path='/teacher/*' element={<TeacherPage userDetails={userDetails}/>}/>
          <Route path='/student/*' element={<StudentPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

