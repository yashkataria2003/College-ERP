import React, { useEffect, useRef, useState } from 'react';
import edit_button_black from '../../../assets/edit_button_black.svg';
import delete_logo_black from '../../../assets/delete_logo_black.svg';
import IITM_color from '../../../assets/IITM_color.png';
import IPU from '../../../assets/IPU.png';
import print_logo from '../../../assets/print_logo.svg';
import '../AttendancePage/AttendancePage.css';
import {ReactToPrint} from 'react-to-print';

const AttendanceForm = ({ searchedResults }) => {
  const componentRef = useRef(null);
  return (
    <>
      <div className="flex w-full justify-end items-center">
        <ReactToPrint
          trigger={() => (
            <button className="flex justify-center items-center bg-[#000080] px-[1vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh] gap-x-[1vw]">
              Print
              <img src={print_logo} alt="print_logo" className='h-[4vh]'/>
            </button>
          )}
          content={() => componentRef.current} // Access the current property of the ref
          documentTitle="Marksheet"
          pageStyle="print"
        />
      </div>
      <div className="flex flex-col justify-start items-center bg-[#f1f0f0] py-[2vh] px-[2vw] gap-y-[1vh] overflow-y-scroll" ref={componentRef}>
        <div className="flex justify-between items-center gap-x-[3vw] w-full">
          <img src={IPU} alt="IPU" className="h-[10vh]" />
          <p className="text-[#000080] text-[1.5rem] font-bold attendanceContent">
            Institute of Innovation in Technology & Management
          </p>
          <img src={IITM_color} alt="IITM_color" className="h-[8vh]" />
        </div>
        <table className="border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Course</th>
              <th className="border border-gray-400 px-4 py-2">
                Enrollment No.
              </th>
              <th className="border border-gray-400 px-4 py-2">Student Name</th>
              <th className="border border-gray-400 px-4 py-2">Acedmic</th>
              <th className="border border-gray-400 px-4 py-2">Section</th>
              <th className="border border-gray-400 px-4 py-2">Semester</th>
              <th className="border border-gray-400 px-4 py-2">Subject</th>
              <th className="border border-gray-400 px-4 py-2">Date</th>
              <th className="border border-gray-400 px-4 py-2">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {searchedResults.map((result, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {result.course}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.enrollment}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.startingYear}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.section}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.semester}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.subject}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.date.split('T')[0]}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.attendance ? 'Present' : 'Absent'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const SearchResultForm = () => {
  const [searchFormData, setSearchFormData] = useState({
    startingYear: null,
    course: '',
    section: '',
    subject: '',
    semester: null,
    date: null,
  });

  const [fetchedData, setFetchedData] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);

  const collectingData = async event => {
    // event.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/teacher/attendances',
        {
          method: 'GET',
        }
      );
      const collectedData = await response.json();
      //   console.log("Collected Data:", collectedData);

      setFetchedData(collectedData.data);
      //   console.log("Fetched Data:", fetchedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = e => {
    setSearchFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    collectingData();
  }, []);

  useEffect(() => {
    if (
      fetchedData.length > 0 &&
      searchFormData.startingYear &&
      searchFormData.course &&
      searchFormData.section &&
      searchFormData.semester &&
      searchFormData.semester &&
      searchFormData.date
    ) {
      const searchedData = fetchedData.filter(
        item =>
          item.startingYear.toString() ===
            searchFormData.startingYear.toString() &&
          item.course.trim().toLowerCase() ===
            searchFormData.course.trim().toLowerCase() &&
          item.section.trim().toLowerCase() ===
            searchFormData.section.trim().toLowerCase() &&
          item.subject.trim().toLowerCase() ===
            searchFormData.subject.trim().toLowerCase() &&
          item.semester.toString() === searchFormData.semester.toString() &&
          item.date.split('T')[0].toString() ===
            searchFormData.date.split('T')[0].toString()
      );
      //   console.log("searchedData : ",searchedData)
      setSearchedResults(searchedData);
    } else {
      setSearchedResults(null);
    }
  }, [fetchedData, searchFormData]);

  return (
    <div className="flex flex-col justify-start items-center w-[100%] h-[90vh] gap-y-2 py-[1vh] px-[1vw]">
      <form
        action=""
        method="post"
        className="flex flex-col justify-between items-center py-[5vh] h-[20vh] gap-y-[2vh]"
      >
        <ul className="flex justify-center items-center w-[100%] h-[100%] gap-x-[3vw]">
          <li className="flex justify-end items-center w-[100%] gap-x-[1vw]">
            <label
              htmlFor="startingYear"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Year
            </label>
            <input
              type="text"
              name="startingYear"
              key="startingYear"
              id="startingYear"
              placeholder="Strarting Year"
              className="flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[100%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={searchFormData.startingYear}
            />
          </li>
          <li className="flex justify-end items-center w-[100%] gap-x-[1vw]">
            <label
              htmlFor="course"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Course
            </label>
            <input
              type="text"
              name="course"
              key="course"
              id="course"
              placeholder="Course"
              className="flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[100%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={searchFormData.course}
            />
          </li>
          <li className="flex justify-end items-center w-[100%] gap-x-[1vw]">
            <label
              htmlFor="semester"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Section
            </label>
            <input
              type="text"
              name="section"
              key="section"
              id="section"
              placeholder="Section"
              className="flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[100%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={searchFormData.section}
            />
          </li>
        </ul>
        <ul className="flex justify-center items-center w-[100%] h-[100%] gap-x-[3vw]">
          <li className="flex justify-end items-center w-[100%] gap-x-[1vw]">
            <label
              htmlFor="subject"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              key="subject"
              id="subject"
              placeholder="Subject"
              className="flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[100%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={searchFormData.subject}
            />
          </li>
          <li className="flex justify-end items-center w-[100%] gap-x-[1vw]">
            <label
              htmlFor="semester"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Semester
            </label>
            <input
              type="number"
              name="semester"
              key="semester"
              id="semester"
              placeholder="Semester"
              className="flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[100%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={searchFormData.semester}
            />
          </li>
          <li className="flex justify-end items-center w-[100%] gap-x-[1vw]">
            <label
              htmlFor="date"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              key="date"
              id="date"
              placeholder="Date"
              className="flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[100%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={searchFormData.date}
            />
          </li>
        </ul>
      </form>
      {searchedResults ? (
        <AttendanceForm searchedResults={searchedResults} />
      ) : (
        <AttendanceForm searchedResults={fetchedData} />
      )}
    </div>
  );
};

const AttendancePage = () => {
  /*State for checking whether data is renderd or not*/
  const [dataRenderd, setDataRenderd] = useState(false);

  // Control visibility of editForm
  const [addForm, setAddForm] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  const [editFormData, setEditFormData] = useState(null);
  const [deleteFormData, setDeleteFormData] = useState(null);

  /*State for fethed Data*/
  const [fetchedData, setFetchedData] = useState([]);

  /*State for loading*/
  const [loading, setLoading] = useState(false);

  /*States for Searching*/
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [searchFormData, setSearchFormData] = useState({
    section: '',
    subject: '',
    totalMarks: null,
    marks: null,
  });

  useEffect(() => {
    if (dataRenderd === false) {
      collectingData();
      setDataRenderd(true);
    }
  }, [dataRenderd]);

  // Fetching All Data
  const collectingData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/teacher/results',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const collectedData = await response.json();
      // console.log("CollectedData : ", collectedData.data);
      setFetchedData(collectedData.data);
      setDataRenderd(true);
      // console.log("Fetched Data: ", fetchedData)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update Teacher's Data
  const handleEditClick = (_id, data) => {
    // console.log(data)
    setEditFormData(data);
    setEditForm(true);
    setAddForm(false);
    setDeleteForm(false);
  };

  const handleDeleteClick = (_id, data) => {
    setDeleteFormData(data);
    setDeleteForm(true);
    setEditForm(false);
    setAddForm(false);
  };

  return (
    <div className="flex flex-col justify-start items-center w-[80vw] h-[90vh]">
      {searchFormData && <SearchResultForm />}
    </div>
  );
};

export default AttendancePage;
