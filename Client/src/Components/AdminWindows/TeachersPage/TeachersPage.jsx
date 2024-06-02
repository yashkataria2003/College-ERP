import React, { useEffect, useState } from 'react';
import eye_logo_black from '../../../assets/eye_logo_black.svg';
import iitm_logo_black from '../../../assets/iitm_logo_black.png';
import edit_button_white from '../../../assets/edit_button_white.svg';
import delete_logo_white from '../../../assets/delete_logo_white.svg';
import { useNavigate } from 'react-router-dom';
import loadingAnimation from '../../../assets/loading.gif'

const AddTeacherForm = ({ collectingData }) => {
  /*State for input template*/
  const [teacherData, setTeacherData] = useState({
    image: null,
    name: '',
    department: '',
    designation: '',
    experience: null,
    email: '',
    password: '',
  });

  /*State for password visibility*/
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setTeacherData(prevState => ({
        ...prevState,
        image: e.target.files[0], // Update image with the selected file
      }));
    } else {
      setTeacherData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // Show password and eye icon opacity
  const handleShowPasswordClick = () => {
    // console.log('handleEyeClick is on');
    var x = document.getElementById('password');
    x.type === 'password' ? (x.type = 'text') : (x.type = 'password');
    handleEyeClick();
  };

  const handleEyeClick = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Add teachers data into database
  const handleSubmit = async (event) => {
    await event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', teacherData.image);
      formData.append('name', teacherData.name);
      formData.append('department', teacherData.department);
      formData.append('designation', teacherData.designation);
      formData.append('experience', teacherData.experience);
      formData.append('email', teacherData.email);
      formData.append('password', teacherData.password);

      const response1 = await fetch(
        'http://localhost:4000/api/v1/admin/teachers',
        {
          method: 'POST',
          body: formData,
        }
      );

      setTeacherData({
        image: '',
        name: '',
        department: '',
        designation: '',
        experience: '',
        email: '',
        password: '',
      });

      // window.location.reload(); // Reload the page
      collectingData();
    } 
    
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[40vw] h-[90vh] gap-y-2">
      <h2 className="text-[#000080] text-[1.8rem] font-bold">
        Add Teacher Details
      </h2>
      <form
        action=""
        method="post"
        className="flex flex-col justify-center items-center py-[5vh] h-fit gap-y-[5vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <ul className="flex flex-col justify-center items-center w-[100%] h-[100%] gap-y-[3vh] pr-3">
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="image"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              key="image"
              id="image"
              placeholder="Image"
              className="flex justify-start items-center px-[1vw] w-[75%] rounded-md text-black"
              onChange={handleChange}
              // value={teacherData.image}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="name"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              key="name"
              placeholder="Name"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={teacherData.name}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="department"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Department
            </label>
            <input
              type="text"
              name="department"
              key="department"
              placeholder="Department"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={teacherData.department}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="designation"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Designation
            </label>
            <input
              type="text"
              name="designation"
              key="designation"
              placeholder="Designation"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={teacherData.designation}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="experience"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Experience
            </label>
            <input
              type="number"
              name="experience"
              key="experience"
              placeholder="Experience"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={teacherData.experience}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="email"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              key="email"
              placeholder="E-Mail"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={teacherData.email}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="password"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={teacherData.password}
            />
            <div
              className={`flex justify-center items-center rounded-full ${
                isPasswordVisible ? 'opacity-100' : 'opacity-50'
              } absolute`}
              onClick={handleShowPasswordClick}
            >
              <img
                src={eye_logo_black}
                alt="Show Password"
                className="h-[4.5vh] hover:cursor-pointer"
              />
            </div>
          </li>
        </ul>
        <button
          type="submit"
          className="flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
        >
          Add
        </button>
      </form>
    </div>
  );
};

const EditTeacherForm = ({ data, collectingData }) => {
  const navigate = useNavigate();
  const {
    _id,
    image,
    name,
    department,
    designation,
    experience,
    email,
    password,
  } = data;

  const [updatedData, setUpdatedData] = useState({
    name: name,
    department: department,
    designation: designation,
    experience: experience,
    email: email,
    password: password,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Show password and eye icon opacity
  const handleShowPasswordClick = () => {
    // console.log('handleEyeClick is on');
    var x = document.getElementById('password');
    x.type === 'password' ? (x.type = 'text') : (x.type = 'password');
    handleEyeClick();
  };
  const handleEyeClick = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    setUpdatedData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/teachers/${_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );
      const updatedTeacher = await response.json();
      // console.log('Updated teacher:', updatedTeacher);

      collectingData();
      navigate('/admin');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBackClick = () => {
    window.location.reload(); // Reload the page
  };

  return (
    <div className="flex flex-col justify-center items-center w-[40vw] h-[90vh] gap-y-2">
      <h2 className="text-[#000080] text-[1.8rem] font-bold">
        Update Teacher Details
      </h2>
      <form
        action=""
        method="post"
        className="flex flex-col justify-center items-center py-[5vh] h-fit gap-y-[5vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <ul className="flex flex-col justify-center items-center w-[100%] h-[100%] gap-y-[3vh] px-3">
          <img
            src={`http://localhost:4000/teachers/${image}`}
            alt={image}
            className="h-[10vh]"
          />
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="name"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              key="name"
              placeholder="Name"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.name}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="department"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Department
            </label>
            <input
              type="text"
              name="department"
              key="department"
              placeholder="Department"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.department}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="designation"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Designation
            </label>
            <input
              type="text"
              name="designation"
              key="designation"
              placeholder="Designation"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.designation}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="experience"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Experience
            </label>
            <input
              type="number"
              name="experience"
              key="experience"
              placeholder="Experience"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.experience}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="email"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              key="email"
              placeholder="E-Mail"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.email}
            />
          </li>
          <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
            <label
              htmlFor="password"
              className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
              onChange={handleChange}
              value={updatedData.password}
            />
            <div
              className={`flex justify-center items-center rounded-full ${
                isPasswordVisible ? 'opacity-100' : 'opacity-50'
              } absolute`}
              onClick={handleShowPasswordClick}
            >
              <img
                src={eye_logo_black}
                alt="Show Password"
                className="h-[4.5vh] hover:cursor-pointer"
              />
            </div>
          </li>
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
            className="flex justify-center items-center bg-[#1ea550] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

const DeleteTeacherForm = ({ data, collectingData }) => {
  const navigate = useNavigate();
  const { _id, image, name } = data;

  const handleSubmit = async e => {
    await e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/teachers/${_id}`,
        {
          method: 'DELETE',
        }
      );
      // window.location.reload(); // Reload the page
      collectingData();
      navigate('/admin');
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
    <div className="flex flex-col justify-center items-center w-[40vw] h-[90vh] gap-y-2">
      <h2 className="text-[#000080] text-[1.8rem] font-bold">
        Delete Teacher Details
      </h2>
      <form
        action=""
        method="post"
        className="flex flex-col justify-center items-center py-[5vh] h-fit gap-y-[5vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <ul className="flex flex-col justify-center items-center w-[100%] h-[100%] gap-y-[3vh] pr-3">
          <h2>
            Deleting Details of <strong>{name}</strong>
          </h2>
          <img
            src={`http://localhost:4000/teachers/${image}`}
            alt={image}
            className="h-[10vh]"
          />
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

const SearchBar = ({ type, name, placeholder, value, handleChange }) => {
  return (
    <div className="flex justify-between items-center w-[50%] h-[50%] px-2">
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="flex justify-start items-center w-full px-[1vw] py-[0.7vh] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none"
      />
    </div>
  );
};

const TeacherIDCard = ({ data, handleEditClick, handleDeleteClick }) => {
  const { _id, image, name, department, designation, experience, email } = data;

  return (
    <div className="flex flex-col justify-center items-center h-[12.5rem] w-[25rem] rounded-xl border-[0.2vh] border-black">
      <div className="flex flex-col justify-center items-center h-[26%] w-[100%] bg-[#fff] rounded-t-xl py-1">
        <div className="flex justify-center items-center w-[100%] h-[40%]">
          <p className="text-black text-[0.75rem]">
            INSTITUTE OF INNOVATION IN TECHNOLOGY AND MANAGEMENT
          </p>
        </div>
        <div className="flex justify-center items-center w-[100%] h-[60%] gap-x-[1vw]">
          <img src={iitm_logo_black} alt="iitm white" className="h-[10vh] " />
          <p className="text-black text-[0.7rem]">
            Affilated to the GGS Indraprastha University, New Delhi
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center h-[75%] w-[100%] bg-[#000080] rounded-b-xl border-t-[0.1vh] border-t-white">
        <div className="flex justify-center items-center h-[100%] w-[90%]">
          <div className="flex justify-center items-center w-[35%] h-[100%]">
            <img
              src={`http://localhost:4000/teachers/${image}`}
              alt={`${image}`}
              className="h-[15vh]"
            />
          </div>
          <ul className="flex flex-col justify-start items-center w-[65%] h-[100%] py-[1vh]">
            <li className="flex justify-start items-center w-[100%] text-nowrap">
              <p className="w-[32%] text-white text-[0.9rem]">Name</p>
              <p className="w-[65%] text-white text-[0.9rem]">: {name}</p>
            </li>
            <li className="flex justify-start items-center w-[100%] text-nowrap">
              <p className="w-[32%] text-white text-[0.9rem]">Department</p>
              <p className="w-[65%] text-white text-[0.9rem]">: {department}</p>
            </li>
            <li className="flex justify-start items-center w-[100%] text-nowrap">
              <p className="w-[32%] text-white text-[0.9rem]">Designation</p>
              <p className="w-[65%] text-white text-[0.9rem]">
                : {designation}
              </p>
            </li>
            <li className="flex justify-start items-center w-[100%] text-nowrap">
              <p className="w-[32%] text-white text-[0.9rem]">Experience</p>
              <p className="w-[65%] text-white text-[0.9rem]">: {experience}</p>
            </li>
            <li className="flex justify-start items-center w-[100%] text-nowrap">
              <p className="w-[32%] text-white text-[0.9rem]">E-Mail</p>
              <p className="w-[65%] text-white text-[0.9rem]">: {email}</p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-end items-center h-[100%] w-[10%] py-4 gap-y-[1vh]">
          <img
            src={edit_button_white}
            alt="edit"
            className="h-[1.2rem] hover:scale-105 hover:cursor-pointer"
            onClick={() => handleEditClick(_id, data)}
          />
          <img
            src={delete_logo_white}
            alt="delete"
            className="h-[1.2rem] hover:scale-105 hover:cursor-pointer"
            onClick={() => handleDeleteClick(_id, data)}
          />
        </div>
      </div>
    </div>
  );
};

const TeacherCards = ({ data, title, handleEditClick, handleDeleteClick }) => {
  if (data?.length > 0) {
    // console.log(data)
    return data.map(element => (
      <TeacherIDCard
        key={element._id}
        data={element}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    ));
  } else {
    return (
      <h2 className="font-bold text-[#000080e5] text-xl uppercase">{title}</h2>
    );
  }
};

const TeachersPage = () => {
  /*State for checking whether data is renderd or not*/

  // Control visibility of editForm
  const [addForm, setAddForm] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  const [editFormData, setEditFormData] = useState(null);
  const [deleteFormData, setDeleteFormData] = useState(null);

  /*State for fethed Data*/
  const [fetchedData, setFetchedData] = useState(null);

  /*State for loading*/
  const [loading, setLoading] = useState(false);

  /*States for Searching*/
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [nameText, setNameText] = useState(null);
  const [designationText, setDesignationText] = useState(null);
  const [experienceText, setExperienceText] = useState(null);
  const [departmentText, setDepartmentText] = useState(null);

  const handleNameSearchChange = (e) => {
    clearTimeout(searchTimeout);

    const searchNameValue = e.target.value.trim().toLowerCase();

    setNameText(searchNameValue);
    setDesignationText(null);
    setExperienceText(null);
    setDepartmentText(null);

    setSearchTimeout(
      setTimeout(async () => {
        const searchResult = await fetchedData.filter((item) =>
          item.name.toLowerCase().includes(searchNameValue)
        );
        setSearchedResults(searchResult);
      }, 100)
    );
  };

  const handleDesignationSearchChange =( e )=> {
    clearTimeout(searchTimeout);

    const selectedDesignationValue = e.target.value.trim().toLowerCase();

    setNameText(null);
    setDesignationText(selectedDesignationValue);
    setExperienceText(null);
    setDepartmentText(null);

    setSearchTimeout(
      setTimeout(async () => {
        const filteredData = await fetchedData.filter(
          (item) => item.designation.toLowerCase() === selectedDesignationValue
        );
        setSearchedResults(filteredData);
      }, 100)
    );
  };

  const handleDepartmentSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const selectedDepartmentValue = e.target.value.trim().toLowerCase();

    setNameText(null);
    setDesignationText(null);
    setExperienceText(null);
    setDepartmentText(selectedDepartmentValue);

    setSearchTimeout(
      setTimeout(async () => {
        const filteredData = await fetchedData.filter(
          (item) => item.department.toLowerCase() === selectedDepartmentValue
        );
        setSearchedResults(filteredData);
      }, 100)
    );
  };

  const handleExperienceSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const selectedExperienceValue = e.target.value
      .toString()
      .trim()
      .toLowerCase();

    setNameText(null);
    setDesignationText(null);
    setExperienceText(selectedExperienceValue);
    setDepartmentText(null);

    setSearchTimeout(
      setTimeout(async () => {
        const filteredData = await fetchedData.filter(
          (item) =>
            item.experience.toString().toLowerCase() === selectedExperienceValue
        );
        setSearchedResults(filteredData);
      }, 100)
    );
  };

  useEffect(() => {
    collectingData();
  }, []);

  // Fetching All Data
  const collectingData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/admin/teachers',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const collectedData = await response.json();
      // console.log("CollectedData : ", collectedData.data);
      setFetchedData(collectedData.data.reverse());
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
    <div className="flex justify-between items-center w-[80vw] h-[90vh]">
      {addForm && <AddTeacherForm collectingData={collectingData} />}
      {editForm && (
        <EditTeacherForm data={editFormData} collectingData={collectingData} />
      )}
      {deleteForm && (
        <DeleteTeacherForm
          data={deleteFormData}
          collectingData={collectingData}
        />
      )}

      <div className="flex flex-col justify-center items-center h-[90vh] w-[40vw]">
        <div className="flex flex-col justify-center items-center w-[100%] h-[25%] gap-y-[2vh]">
          <div className="flex justify-between items-center px-1 gap-x-[1vw]">
            <SearchBar
              labelName="Search by Name"
              type="text"
              name="text"
              placeholder="Search by Name"
              value={nameText}
              handleChange={handleNameSearchChange}
            />
            <SearchBar
              labelName="Search by Designation"
              type="text"
              name="designation"
              placeholder="Search by Designation"
              value={designationText}
              handleChange={handleDesignationSearchChange}
            />
          </div>
          <div className="flex justify-between items-center px-1 gap-x-[1vw]">
            <SearchBar
              labelName="Search by Department"
              type="text"
              name="department"
              placeholder="Search by Department"
              value={departmentText}
              handleChange={handleDepartmentSearchChange}
            />
            <SearchBar
              labelName="Search by Experience"
              type="text"
              name="experience"
              placeholder="Search by Experience"
              value={experienceText}
              handleChange={handleExperienceSearchChange}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-center gap-y-1 overflow-auto w-[100%] h-[100%]">
          {loading ? (
            <img src={loadingAnimation} alt="loading" className='h-[5vh]'/>
          ) : (
            <>
              {nameText && (
                <h2 className=" font-medium text-[#666e75] text-xl ">
                  Showing Results for Name ={' '}
                  <span className="text-[#000080e5]">{nameText}</span>
                </h2>
              )}

              {nameText && (
                <div className="flex flex-col justify-start items-center py-2 gap-y-[1vh]">
                  <TeacherCards
                    data={searchedResults}
                    title="No Search Result Found"
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                </div>
              )}

              {designationText && (
                <h2 className=" font-medium text-[#666e75] text-xl ">
                  Showing Results for Designation ={' '}
                  <span className="text-[#000080e5]">{designationText}</span>
                </h2>
              )}

              {designationText && (
                <div className="flex flex-col justify-start items-center py-2 gap-y-[1vh]">
                  <TeacherCards
                    data={searchedResults}
                    title="No Search Result Found"
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                </div>
              )}

              {departmentText && (
                <h2 className=" font-medium text-[#666e75] text-xl ">
                  Showing Results for Department ={' '}
                  <span className="text-[#000080e5]">{departmentText}</span>
                </h2>
              )}

              {departmentText && (
                <div className="flex flex-col justify-start items-center py-2 gap-y-[1vh]">
                  <TeacherCards
                    data={searchedResults}
                    title="No Search Result Found"
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                </div>
              )}

              {experienceText && (
                <h2 className=" font-medium text-[#666e75] text-xl ">
                  Showing Results for Experience ={' '}
                  <span className="text-[#000080e5]">{experienceText}</span>
                </h2>
              )}

              {experienceText && (
                <div className="flex flex-col justify-start items-center py-2 gap-y-[1vh]">
                  <TeacherCards
                    data={searchedResults}
                    title="No Search Result Found"
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                </div>
              )}

              {!nameText &&
                !departmentText &&
                !designationText &&
                !experienceText && (
                  <div className="flex flex-col justify-start items-center py-2 gap-y-[1vh]">
                    <TeacherCards
                      data={fetchedData}
                      title="No User Found"
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;
