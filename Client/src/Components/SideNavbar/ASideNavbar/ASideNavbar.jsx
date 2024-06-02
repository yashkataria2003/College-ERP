import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ASideNavbar.css';

const ASideNavbar = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex flex-col justify-start items-center w-[20vw] h-[90vh] bg-[#ffffff] gap-y-[1vh] py-[1vh] px-[1vw] fixed z-10">
      <Link
        to=""
        className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${
          activeLink === ''
            ? 'bg-[#000080] text-white'
            : 'hover:bg-[#000080] hover:text-white'
        }`}
        onClick={() => handleLinkClick("")}
      >
        Teachers
      </Link>
      <Link
        to="students"
        className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${
            activeLink === 'students'
              ? 'bg-[#000080] text-white'
              : 'hover:bg-[#000080] hover:text-white'
          }`}
          onClick={() => handleLinkClick("students")}
      >
        Students
      </Link>
      <Link
        to="notices"
        className={`text-center text-black text-[1rem] w-[100%] py-[0.5vh] rounded-lg ${
            activeLink === 'notices'
              ? 'bg-[#000080] text-white'
              : 'hover:bg-[#000080] hover:text-white'
          }`}
          onClick={() => handleLinkClick("notices")}
      >
        Notice
      </Link>
    </div>
  );
};

export default ASideNavbar;
