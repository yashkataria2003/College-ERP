import React from 'react'
import TSideNavbar from '../SideNavbar/TSideNavbar/TSideNavbar'
import NoticePage from '../TeacherWindows/NoticePage/NoticePage'
import AssignmentPage from '../TeacherWindows/AssignmentPage/AssignmentPage'
import PresentationPage from '../TeacherWindows/PresentationPage/PresentationPage'
import AddResultPage from '../TeacherWindows/AddResultPage/AddResultPage'
import { Routes, Route } from 'react-router-dom'
import MarksheetPage from '../TeacherWindows/MarksheetPage/MarksheetPage'
import MarkAttendancePage from '../TeacherWindows/MarkAttendancePage/MarkAttendancePage'
import AttendancePage from '../TeacherWindows/AttendancePage/AttendancePage'

const TeacherPage = ({ userDetails }) => {
    return (
        <div className='flex justify-start items-center h-[90vh] w-[100vw]'>
            <div className='relative z-10 w-[20vw] h-[90vh]'>
                <TSideNavbar userDetails={userDetails}/>
            </div>
            <div className='w-[80vw] h-fit bg-[#cdcdf7b5]'>
                <Routes>
                    <Route path='/' element={<NoticePage />} />
                    <Route path='/assignments' element={<AssignmentPage />} />
                    <Route path='/presentations' element={<PresentationPage />} />
                    <Route path='/addResults' element={<AddResultPage />} />
                    <Route path='/marksheet' element={<MarksheetPage />} />
                    <Route path='/markAttendance' element={<MarkAttendancePage />} />
                    <Route path='/attendance' element={<AttendancePage />} />
                </Routes>
            </div>
        </div>
    )
}

export default TeacherPage
