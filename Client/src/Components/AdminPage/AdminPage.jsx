import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ASideNavbar from '../SideNavbar/ASideNavbar/ASideNavbar'
import StudentsPage from '../AdminWindows/StudentsPage/StudentsPage'
import NoticesPage from '../AdminWindows/NoticesPage/NoticesPage'
import TeachersPage from '../AdminWindows/TeachersPage/TeachersPage'

const AdminPage = ({ userDetails }) => {
    return (
        <div>
            <div className='flex justify-start items-center h-[90vh] w-[100vw] '>
                <div className='relative z-10 w-[20vw] h-[90vh]'>
                    <ASideNavbar userDetails={userDetails}/>
                </div>
                <div className='w-[80vw] h-[90vh] bg-[#cdcdf7b5]'>
                    <Routes>
                        <Route path='/' element={<TeachersPage />} />
                        <Route path='/students' element={<StudentsPage/>} />
                        <Route path='/notices' element={<NoticesPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
