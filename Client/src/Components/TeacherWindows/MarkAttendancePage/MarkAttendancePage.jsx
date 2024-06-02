import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IITM_color from '../../../assets/IITM_color.png';
import IPU from '../../../assets/IPU.png';
import '../MarkAttendancePage/MarkAttendancePage.css';

const MarkAttendanceForm = ({ searchedResults }) => {
  const navigate = useNavigate();

  const [attendanceData, setAttendanceData] = useState({
    subject: '',
    attendance: {},
    semester: null,
    date: null,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setAttendanceData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, enrollment) => {
    const { checked } = e.target;
    setAttendanceData(prevState => ({
      ...prevState,
      attendance: {
        ...prevState.attendance,
        [enrollment]: checked,
      },
    }));
  };

  const handleSaveClick = async () => {
    try {
      // Loop through searchedResults to send individual student data
      for (const element of searchedResults) {
        const postData = {
          startingYear: element.startingYear,
          course: element.course,
          section: element.section,
          name: element.name,
          enrollment: element.enrollment,
          subject: attendanceData.subject,
          semester: attendanceData.semester,
          attendance: attendanceData.attendance[element.enrollment] || false, // Assuming false if not checked
          date: attendanceData.date,
        };

        console.log(postData);

        const response = await fetch(
          'http://localhost:4000/api/v1/teacher/attendances',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          }
        );

        const data = await response.json();
        // console.log("Data:", data);
        navigate('/teacher/attendance');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center gap-y-[2vh] py-[1vh] px-[1vw] overflow-y-auto">
      <div className="flex justify-start items-center gap-x-[2vw] px-[2vw] py-[2vh] bg-[#fff] rounded-md">
        <div className="flex justify-center items-center gap-x-[1vw]">
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
            placeholder="Enter Subject"
            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center items-center gap-x-[1vw]">
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
            placeholder="Enter Date"
            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center items-center gap-x-[1vw]">
          <label
            htmlFor="totalMarks"
            className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
          >
            Semester
          </label>
          <input
            type="text"
            name="semester"
            key="semester"
            id="semester"
            placeholder="Enter Semester"
            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col justify-start items-center bg-[#f1f0f0] py-[2vh] px-[2vw] gap-y-[1vh] overflow-y-auto">
        <div className="flex justify-between items-center gap-x-[3vw] w-full">
          <img src={IPU} alt="IPU" className="h-[10vh]" />
          <p className="text-[#000080] text-[1.5rem] font-bold markAttendanceContent">
            Institute of Innovation in Technology & Management
          </p>
          <img src={IITM_color} alt="IITM_color" className="h-[8vh]" />
        </div>
        <table className="border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Course</th>
              <th className="border border-gray-400 px-4 py-2">Section</th>
              <th className="border border-gray-400 px-4 py-2">Student Name</th>
              <th className="border border-gray-400 px-4 py-2">
                Enrollment No.
              </th>
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
                  {result.section}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.enrollment}
                </td>
                <td className="border border-gray-400 px-[0.5vw] flex justify-between items-center gap-x-[1vw] py-2">
                  <div className="flex justify-center items-center px-1 gap-x-[0.5vw]">
                    <label
                      htmlFor={`attendance-${result.enrollment}`}
                      className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
                    >
                      Present
                    </label>
                    <input
                      type="checkbox"
                      name={`attendance-${result.enrollment}`}
                      checked={
                        attendanceData.attendance[result.enrollment] || false
                      }
                      onChange={e => handleCheckboxChange(e, result.enrollment)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="submit"
        className="flex justify-center items-center bg-[#1ea550] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
        onClick={handleSaveClick}
      >
        Save
      </button>
    </div>
  );
};

const SearchAttendanceForm = () => {
  const [searchFormData, setSearchFormData] = useState({
    startingYear: null,
    course: '',
    section: '',
  });

  const [fetchedData, setFetchedData] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleChange = e => {
    setSearchFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/admin/students',
        {
          method: 'GET',
        }
      );
      const collectedData = await response.json();
      console.log('Collected Data:', collectedData);

      setFetchedData(collectedData.data);
      console.log('Search Form Data:', searchFormData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log('Fetched Data:', fetchedData);
    console.log('Search Form Data:', searchFormData);

    if (
      fetchedData.length > 0 &&
      searchFormData.startingYear &&
      searchFormData.course &&
      searchFormData.section
    ) {
      const searchedData = fetchedData.filter(
        item =>
          item.startingYear.toString() ===
            searchFormData.startingYear.toString() &&
          item.course.trim().toLowerCase() ===
            searchFormData.course.trim().toLowerCase() &&
          item.section.trim().toLowerCase() ===
            searchFormData.section.trim().toLowerCase()
      );
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
        className="flex justify-between items-center py-[5vh] h-[10vh] gap-x-[8vh]"
        onSubmit={handleSubmit}
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
        <button
          type="submit"
          className="flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
        >
          Search
        </button>
      </form>
      {searchedResults && (
        <MarkAttendanceForm searchedResults={searchedResults} />
      )}
    </div>
  );
};

const MarkAttendancePage = () => {
  return (
    <div className="flex flex-col justify-start items-center w-[80vw] h-[90vh]">
      <SearchAttendanceForm />
    </div>
  );
};

export default MarkAttendancePage;
