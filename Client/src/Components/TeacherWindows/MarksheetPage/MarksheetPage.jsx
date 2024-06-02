import React, { useEffect, useRef, useState } from 'react';
import edit_button_black from '../../../assets/edit_button_black.svg';
import delete_logo_black from '../../../assets/delete_logo_black.svg';
import { useNavigate } from 'react-router-dom';
import IITM_color from '../../../assets/IITM_color.png';
import print_logo from '../../../assets/print_logo.svg';
import IPU from '../../../assets/IPU.png';
import '../MarksheetPage/MarksheetPage.css';
import { ReactToPrint } from 'react-to-print';

const EditMarksForm = ({ data }) => {
  const navigate = useNavigate();
  const {
    _id,
    course,
    enrollment,
    name,
    startingYear,
    section,
    semester,
    subject,
    totalMarks,
    marks,
  } = data;

  const [updatedData, setUpdatedData] = useState({
    course,
    enrollment,
    name,
    startingYear,
    section,
    semester,
    subject,
    totalMarks,
    marks,
  });

  const handleChange = e => {
    setUpdatedData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    await e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/results/${_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );
      const updatedMarks = await response.json();
      // console.log('Updated student:', updatedMarks);
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBackClick = async e => {
    await e.preventDefault();
    window.location.reload(); // Reload the page
  };

  return (
    <div className="flex flex-col justify-center items-center w-[50vw] h-[90vh] gap-y-2">
      <div className="flex flex-col justify-center items-start">
        <h2 className="text-[#000080] text-[1.5rem]">
          Updating marks of <strong>{data.name}</strong>, Class :{' '}
          <strong>{data.course}</strong>-<strong>{data.section}</strong>
        </h2>
        <h2 className="text-[#000080] text-[1.5rem]">
          Subject : <strong>{subject}</strong>
        </h2>
      </div>
      <form
        action=""
        method="post"
        className="flex justify-center items-center py-[8vh] h-fit gap-y-[5vh] w-[90%] border-[#000080] border-2 rounded-xl px-[1vw] gap-x-[2vw] bg-[#fff] shadow-[5px_5px_0px_0px_rgba(64,63,63)]"
        onSubmit={handleSubmit}
      >
        <ul className="flex flex-col justify-start items-center w-[100%] h-[100%] gap-y-[3vh] px-1">
          <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
            <label htmlFor="course" className="text-[#000080] text-[1rem]">
              Course
            </label>
            <input
              type="text"
              name="course"
              key="course"
              id="course"
              placeholder="Course"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.course}
            />
          </li>
          <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
            <label htmlFor="enrollment" className="text-[#000080] text-[1rem]">
              Enrollment
            </label>
            <input
              type="number"
              name="enrollment"
              key="enrollment"
              id="enrollment"
              placeholder="Enrollment Number"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.enrollment}
            />
          </li>
          <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
            <label htmlFor="name" className="text-[#000080] text-[1rem]">
              Name
            </label>
            <input
              type="text"
              name="name"
              key="name"
              id="name"
              placeholder="Name"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.name}
            />
          </li>
          <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
            <label
              htmlFor="startingYear"
              className="text-[#000080] text-[1rem]"
            >
              Acedmic
            </label>
            <input
              type="number"
              name="startingYear"
              key="startingYear"
              id="startingYear"
              placeholder="Starting Year"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.startingYear}
            />
          </li>
          <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
            <label htmlFor="section" className="text-[#000080] text-[1rem]">
              Section
            </label>
            <input
              type="text"
              name="section"
              key="section"
              id="section"
              placeholder="Section"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.section}
            />
          </li>
          <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
            <label htmlFor="semester" className="text-[#000080] text-[1rem]">
              Semester
            </label>
            <input
              type="text"
              name="semester"
              key="semester"
              id="semester"
              placeholder="Semester"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.semester}
            />
          </li>
        </ul>
        <ul className="flex flex-col justify-start items-center w-[100%] h-[100%] gap-y-[3vh] pr-3">
          <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
            <label htmlFor="subject" className="text-[#000080] text-[1rem]">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              key="subject"
              id="subject"
              placeholder="Subject"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.subject}
            />
          </li>
          <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
            <label htmlFor="marks" className="text-[#000080] text-[1rem]">
              Marks
            </label>
            <input
              type="number"
              name="marks"
              key="marks"
              id="marks"
              placeholder="Marks"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.marks}
            />
          </li>
          <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
            <label htmlFor="totalMarks" className="text-[#000080] text-[1rem]">
              Total
            </label>
            <input
              type="number"
              name="totalMarks"
              key="totalMarks"
              id="totalMarks"
              placeholder="Total"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.totalMarks}
            />
          </li>
          <div className="flex justify-between items-center gap-x-2">
            <button
              className="flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
              onClick={handleBackClick}
            >
              Back
            </button>
            <button
              type="submit"
              className="flex justify-center items-center bg-[#1ea550] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
            >
              Update
            </button>
          </div>
        </ul>
      </form>
    </div>
  );
};

const DeleteMarksForm = ({ data }) => {
  const { _id, name, course, section, subject } = data;

  const handleSubmit = async e => {
    await e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/teacher/results/${_id}`,
        {
          method: 'DELETE',
        }
      );
      window.location.reload(); // Reload the page
      // collectingData();
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that occur during the deletion process
    }
  };

  const handleBackClick = async e => {
    await e.preventDefault();
    window.location.reload(); // Reload the page
  };

  return (
    <div className="flex flex-col justify-center items-center w-[50vw] h-[90vh] gap-y-2">
      <h2 className="text-[#000080] text-[1.8rem] font-bold">Delete Marks</h2>
      <form
        action=""
        method="post"
        className="flex flex-col justify-center items-center py-[5vh] h-fit gap-y-[5vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <ul className="flex flex-col justify-center items-center w-[100%] h-[100%] gap-y-[3vh] pr-3">
          <h2 className="text-[#000080] text-[1.4rem]">
            Deleting marks of <strong>{name}</strong> of Class{' '}
            <strong>
              {course}-{section}
            </strong>
          </h2>
          <h2 className="text-[#000080] text-[1.4rem]">
            Subject : <strong>{subject}</strong>
          </h2>
        </ul>
        <div className="flex justify-between items-center gap-x-2">
          <button
            className="flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
            onClick={handleBackClick}
          >
            Back
          </button>
          <button
            type="submit"
            className="flex justify-center items-center bg-[#c22744] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

const MarksForm = ({ searchedResults, handleEditClick, handleDeleteClick }) => {
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
      <div
        className="flex flex-col justify-start items-center bg-[#f1f0f0] py-[2vh] px-[2vw] gap-y-[1vh] overflow-y-scroll"
        ref={componentRef}
      >
        <div className="flex justify-between items-center gap-x-[3vw] w-full">
          <img src={IPU} alt="IPU" className="h-[10vh]" />
          <p className="text-[#000080] text-[1.5rem] font-bold marksheetPageContent">
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
              <th className="border border-gray-400 px-4 py-2">Total Marks</th>
              <th className="border border-gray-400 px-4 py-2">Marks Scored</th>
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
                  {result.totalMarks}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {result.marks}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <div className="flex justify-between items-center gap-x-[1vw] px-[1vw]">
                    <img
                      src={edit_button_black}
                      alt="edit"
                      className="h-[1rem] hover:scale-105 hover:cursor-pointer"
                      onClick={() => handleEditClick(result._id, result)}
                    />
                    <img
                      src={delete_logo_black}
                      alt="delete"
                      className="h-[1.2rem] hover:scale-105 hover:cursor-pointer"
                      onClick={() => handleDeleteClick(result._id, result)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const SearchResultForm = ({
  fetchedData,
  handleEditClick,
  handleDeleteClick,
}) => {
  const [searchFormData, setSearchFormData] = useState({
    startingYear: null,
    course: '',
    section: '',
    subject: '',
    semester: null,
  });
  const [searchedResults, setSearchedResults] = useState([]);

  const handleChange = e => {
    setSearchFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    // console.log("Fetched Data:", fetchedData);
    // console.log("Search Form Data:", searchFormData);

    if (
      fetchedData.length > 0 &&
      searchFormData.startingYear &&
      searchFormData.course &&
      searchFormData.section &&
      searchFormData.semester &&
      searchFormData.semester
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
          item.semester.toString() === searchFormData.semester.toString()
      );
      setSearchedResults(searchedData);
    } else {
      setSearchedResults(null);
    }
  }, [fetchedData, searchFormData]);

  return (
    <div className="flex flex-col justify-start items-center w-[100%] h-[90vh] gap-y-2 py-[1vh] px-[1vw] ">
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
        </ul>
      </form>
      {searchedResults ? (
        <MarksForm
          searchedResults={searchedResults}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      ) : (
        <MarksForm
          searchedResults={fetchedData}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}
    </div>
  );
};

const MarksheetPage = () => {
  /*State for checking whether data is renderd or not*/
  const [dataRenderd, setDataRenderd] = useState(false);

  // Control visibility of editForm
  const [searchResultForm, setSearchResultForm] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  const [editFormData, setEditFormData] = useState(null);
  const [deleteFormData, setDeleteFormData] = useState(null);

  /*State for fethed Data*/
  const [fetchedData, setFetchedData] = useState([]);

  /*State for loading*/
  const [loading, setLoading] = useState(false);

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
    setSearchResultForm(false);
    setDeleteForm(false);
  };

  const handleDeleteClick = (_id, data) => {
    setDeleteFormData(data);
    setDeleteForm(true);
    setEditForm(false);
    setSearchResultForm(false);
  };

  return (
    <div className="flex flex-col justify-start items-center w-[80vw] h-[90vh]">
      {searchResultForm && (
        <SearchResultForm
          fetchedData={fetchedData}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}
      {editForm && <EditMarksForm data={editFormData} />}
      {deleteForm && <DeleteMarksForm data={deleteFormData} />}
    </div>
  );
};

export default MarksheetPage;
