import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TSideNavbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className='flex flex-col justify-between items-center'>
      <div className='flex flex-col justify-start items-center w-[20vw] h-[90vh] bg-[#ffffff] gap-y-[1vh] py-[1vh] px-[1vw] fixed z-10 overflow-y-auto'>
        <Link to="" className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${activeLink === "" ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`} onClick={() => handleLinkClick("")}>Notice</Link>
        <Link to="assignments" className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${activeLink === "assignments" ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`} onClick={() => handleLinkClick("assignments")}>Assignment</Link>
        <Link to="presentations" className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${activeLink === "presentations" ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`} onClick={() => handleLinkClick("presentations")}>Presentation</Link>
        <Link to="addResults" className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${activeLink === "addResults" ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`} onClick={() => handleLinkClick("addResults")}>Add Marks</Link>
        {/* Add Marks = Result */}
        <Link to="marksheet" className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${activeLink === "marksheet" ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`} onClick={() => handleLinkClick("marksheet")}>Marksheet</Link>
        <Link to="markAttendance" className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${activeLink === "markAttendance" ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`} onClick={() => handleLinkClick("markAttendance")}>Add Attendance</Link>
        <Link to="attendance" className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${activeLink === "attendance" ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`} onClick={() => handleLinkClick("attendance")}>Attendance</Link>
      </div>
    </div>
  )
}

export default TSideNavbar
