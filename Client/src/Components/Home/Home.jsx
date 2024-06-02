import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Library from '../../assets/BCA.png';
import BBAimg from '../../assets/BBA.png';
import BCOMimg from '../../assets/Bcom.png';
import Card_L from '../Cards/Card_L/Card_L.jsx';
import Card_R from '../Cards/Card_R/Card_R.jsx';
import './Home.css';
import College from '../../assets/College.jpg';
import IITM_color from '../../assets/IITM_color.png';
import Background_College from '../../assets/Background_College.mp4';

const Home = () => {
  const activeStudents = 3000;
  const alumini = 7000;
  const yearOfHistory = 20;
  const libraryBooks = 45000;

  const [activeStudentsCount, setActiveStudentsCount] = useState(0);
  const [aluminiCount, setAluminiCount] = useState(0);
  const [yearOfHistoryCount, setYearOfHistoryCount] = useState(0);
  const [libraryBooksCount, setLibraryBooksCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeStudentsCount != activeStudents) {
        setActiveStudentsCount(activeStudentsCount + 1);
      }
    }, 1);

    return () => clearInterval(interval);
  }, [activeStudentsCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (aluminiCount != alumini) {
        setAluminiCount(aluminiCount + 1);
      }
    }, 1);

    return () => clearInterval(interval);
  }, [aluminiCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (yearOfHistoryCount != yearOfHistory) {
        setYearOfHistoryCount(yearOfHistoryCount + 1);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [yearOfHistoryCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (libraryBooksCount != libraryBooks) {
        setLibraryBooksCount(libraryBooksCount + 1);
      }
    }, 1);

    return () => clearInterval(interval);
  }, [libraryBooksCount]);

  return (
    <main className="flex flex-col justify-start items-center w-[100vw] h-[90vh] overflow-x-hidden gap-y-[2vh]">
      <div className="flex flex-col justify-center items-center px-[7vw] py-[1vh]  w-full">
        <h1 className="text-[2.4rem] text-[#000080] headingIITM font-bold">
          INSTITUTE OF INNOVATION IN TECHNOLOGY & MANAGEMENT
        </h1>
        <h2 className="text-[1.5rem] text-[#192041] subHeadingIITM font-bold">
          AFFILIATED TO GGSIPU, NAAC Grade ‘A’, ISO 14001:2015, 17020:2012,
          21001:2018 & 50001:2018 Certified,
        </h2>
        <h2 className="text-[1.5rem] text-[#192041] subHeadingIITM font-bold">
          A Grade by GNCTD, A Grade by SFRC
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center px-[7vw] bg-[#90979833] py-[1vh] border-[0.1vh] border-black">
        <h3 className="text-center text-[1.2rem] content">
          The Institute of Innovation in Technology and Management (IITM) is
          dedicated to preparing students for future challenges by providing
          both theoretical knowledge and practical skills. Through innovative
          teaching methods, research, and industry partnerships, IITM aims to
          develop adaptable and creative leaders equipped to thrive in a rapidly
          changing world.
        </h3>
      </div>
      <div className="flex flex-col justify-center items-center py-[1vh] w-[100vw] relative">
        <ReactPlayer
          url={Background_College} // Change 'temp' to the actual path of your video file
          playing
          loop
          muted
          width="100vw"
          height="" // Adjust the height to your desired size
          className="top-0 left-0 z-0"
        />
        <div className="absolute flex flex-col justify-center items-center px-[2vw] w-[100%] z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-[3.2rem] text-[#fff] text-center videoContent">
            Nurturing Excellence
          </h2>
          <h2 className="text-[1.5rem] text-[#fff] text-center videoContent">
            AFFILIATED TO GGSIPU, NAAC Grade ‘A’, ISO 14001:2015, 17020:2012,
            21001:2018 & 50001:2018 Certified, A Grade by GNCTD, A Grade by SFRC
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-[#9ac7ec] w-[100%] px-[4vw] py-[2vh] gap-y-[2vh] content">
        <Card_L
          image={Library}
          title={<strong>BCA</strong>}
          description="Bachelor of Computer Applications (BCA) program at IITM equips students with a strong foundation in computer science and applications, preparing them for careers in software development, database management, and IT consulting."
        />
        <Card_R
          image={BBAimg}
          title={<strong>BBA</strong>}
          description="Bachelor of Business Administration (BBA) course at IITM focuses on providing students with a comprehensive understanding of business principles and practices, nurturing their managerial skills and preparing them for roles in various industries such as marketing, finance, and human resources."
        />
        <Card_L
          image={BCOMimg}
          title={<strong>BCom.(H)</strong>}
          description="Bachelor of Commerce (H) (B.Com (H)) program at IITM offers a broad-based education in commerce, economics, and business management, empowering students with the knowledge and skills necessary for careers in accounting, finance, and corporate governance"
        />
      </div>
      {/* <div className='flex justify-center items-center bg-orange-300 w-[100vw] h-[70vh]'>
                <h2>Notice</h2>
            </div> */}
      <div className="w-[100vw] flex flex-col justify-start items-center bg-College py-[4vh] gap-y-[5vh] bg-blend-color-burn content">
        <div className="flex justify-between items-center">
          <img src={IITM_color} alt="iitm_logo" className="h-[10vh]" />
        </div>
        <div className="flex justify-between items-center px-[8vw] w-[100%] py-[4vh] gap-y-[10vh]">
          <div className="flex flex-col justify-center items-center h-[5vh] w-auto text-white">
            <p className="text-[1.7rem]">{activeStudentsCount}+</p>
            <h2 className=" text-[1.5rem] font-bold">Active Stundents</h2>
          </div>
          <div className="flex flex-col justify-center items-center h-[5vh] w-auto text-black">
            <p className="text-[1.7rem]">{aluminiCount}+</p>
            <h2 className=" text-[1.5rem] font-bold">Alumini</h2>
          </div>
          <div className="flex flex-col justify-center items-center h-[5vh] w-auto text-black">
            <p className="text-[1.7rem]">{yearOfHistoryCount}+</p>
            <h2 className=" text-[1.5rem] font-bold">Year of History</h2>
          </div>
          <div className="flex flex-col justify-center items-center h-[5vh] w-auto text-black">
            <p className="text-[1.7rem]">{libraryBooksCount}+</p>
            <h2 className=" text-[1.5rem] font-bold">Library Books</h2>
          </div>
        </div>
        <p className="text-black text-center w-[50vw] text-[1.3rem]">
          Your time at IITM is a great opportunity to meet people, try new
          things, and develop your interests.
        </p>
      </div>
    </main>
  );
};

export default Home;
