import React, { useEffect, useState } from 'react';
import iitm_logo_black from '../../../assets/iitm_logo_black.png';
import edit_button_white from '../../../assets/edit_button_white.svg';
import delete_logo_white from '../../../assets/delete_logo_white.svg';
import { useNavigate } from 'react-router-dom'
import '../StudentsPage/StudentPage.css'
import loadingAnimation from '../../../assets/loading.gif'



const AddStudentForm = ({ collectingData }) => {
    /*State for input template*/
    const [studentData, setStudentData] = useState({
        image: null,
        name: '',
        fatherName: '',
        dob: null,
        course: '',
        startingYear: null,
        endingYear: null,
        section: '',
        enrollment: null,
        address: '',
        phone: null,
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setStudentData((prevState) => ({
                ...prevState,
                image: e.target.files[0], // Update image with the selected file
            }));
        } else {
            setStudentData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        // Prevent the default form submission
        await event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', studentData.image);
            formData.append('name', studentData.name);
            formData.append('fatherName', studentData.fatherName);
            formData.append('dob', studentData.dob);
            formData.append('course', studentData.course);
            formData.append('startingYear', studentData.startingYear);
            formData.append('endingYear', studentData.endingYear);
            formData.append('section', studentData.section);
            formData.append('enrollment', studentData.enrollment);
            formData.append('address', studentData.address);
            formData.append('phone', studentData.phone);

            const response = await fetch(
                'http://localhost:4000/api/v1/admin/students',
                {
                    method: 'POST',
                    body: formData,
                }
            );
            
            setStudentData({
                image: '',
                name: '',
                fatherName: '',
                dob: '',
                course: '',
                startingYear: '',
                endingYear: '',
                section: '',
                enrollment: '',
                address: '',
                phone: '',
            });
            // console.log("Data:", data);
            collectingData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-[50vw] h-[90vh] gap-y-2">
            <h2 className="text-[#000080] text-[1.8rem] font-bold studentPageHeading">Add Student Details</h2>
            <form
                action=""
                method="post"
                className="flex justify-center items-center py-[8vh] h-fit gap-y-[5vh] w-[90%] border-[#000080] border-2 rounded-xl px-[1vw] shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <ul className="flex flex-col justify-start items-center w-[100%] h-[100%] gap-y-[3vh] pr-3">
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label htmlFor="image" className="text-[#000080] text-[1rem]">
                            Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            key="image"
                            id="image"
                            placeholder="Image"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md text-black"
                            onChange={handleChange}
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
                            value={studentData.name}
                        />
                    </li>
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label
                            htmlFor="fatherName"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Father Name
                        </label>
                        <input
                            type="text"
                            name="fatherName"
                            key="fatherName"
                            id="fatherName"
                            placeholder="Father Name"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={studentData.fatherName}
                        />
                    </li>
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label htmlFor="dob" className="text-[#000080] text-[1rem]">
                            DOB
                        </label>
                        <input
                            type="date"
                            name="dob"
                            key="dob"
                            id="dob"
                            placeholder="Date of Birth"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={studentData.dob}
                        />
                    </li>
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
                            value={studentData.course}
                        />
                    </li>
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label
                            htmlFor="startingYear"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Starting Year
                        </label>
                        <input
                            type="number"
                            name="startingYear"
                            key="startingYear"
                            id="startingYear"
                            placeholder="Starting Year"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={studentData.startingYear}
                        />
                    </li>
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label
                            htmlFor="endingYear"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Ending Year
                        </label>
                        <input
                            type="number"
                            name="endingYear"
                            key="endingYear"
                            id="endingYear"
                            placeholder="Ending Year"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={studentData.endingYear}
                        />
                    </li>
                </ul>
                <ul className="flex flex-col justify-start items-center w-[100%] h-[100%] gap-y-[3vh] pr-3">
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
                            value={studentData.section}
                        />
                    </li>
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label
                            htmlFor="enrollment"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Enroll. Number
                        </label>
                        <input
                            type="number"
                            name="enrollment"
                            key="enrollment"
                            id="enrollment"
                            placeholder="Enrollment Number"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={studentData.enrollment}
                        />
                    </li>
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label htmlFor="address" className="text-[#000080] text-[1rem]">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            key="address"
                            id="address"
                            placeholder="Address"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={studentData.address}
                        />
                    </li>
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label
                            htmlFor="phone"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Phone No.
                        </label>
                        <input
                            type="number"
                            name="phone"
                            key="phone"
                            id="phone"
                            placeholder="Phone Number"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={studentData.phone}
                        />
                    </li>
                    <button
                        type="submit"
                        className="flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
                    >
                        Add
                    </button>
                </ul>
            </form>
        </div>
    );
};

const EditStudentForm = ({ data, collectingData }) => {
    const {
        _id,
        image,
        name,
        fatherName,
        dob,
        course,
        startingYear,
        endingYear,
        section,
        enrollment,
        address,
        phone,
    } = data;

    const [updatedData, setUpdatedData] = useState({
        name,
        fatherName,
        dob,
        course,
        startingYear,
        endingYear,
        section,
        enrollment,
        address,
        phone,
    });

    const handleChange = (e) => {
        setUpdatedData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        await e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/v1/admin/students/${_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                }
            );
            const updatedStudent = await response.json();
            // console.log('Updated student:', updatedStudent);
            window.location.reload(); // Reload the page
            collectingData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackClick = async (e) => {
        await e.preventDefault();
        window.location.reload(); // Reload the page
    };

    return (
        <div className="flex flex-col justify-center items-center w-[50vw] h-[90vh] gap-y-2">
            <h2 className="text-[#000080] text-[1.8rem] font-bold studentPageHeading">Update Student Details</h2>
            <form
                action=""
                method="post"
                className="flex justify-center items-center py-[8vh] h-fit gap-y-[5vh] w-[90%] border-[#000080] border-2 rounded-xl px-[1vw] shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]"
                onSubmit={handleSubmit}
            >
                <ul className="flex flex-col justify-start items-center w-[100%] h-[100%] gap-y-[3vh] px-1">
                    <img
                        src={`http://localhost:4000/students/${image}`}
                        alt={image}
                        className="h-[10vh]"
                    />
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
                            htmlFor="fatherName"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Father Name
                        </label>
                        <input
                            type="text"
                            name="fatherName"
                            key="fatherName"
                            id="fatherName"
                            placeholder="Father Name"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={updatedData.fatherName}
                        />
                    </li>
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label htmlFor="dob" className="text-[#000080] text-[1rem]">
                            DOB
                        </label>
                        <input
                            type="date"
                            name="dob"
                            key="dob"
                            id="dob"
                            placeholder="Date of Birth"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={updatedData.dob}
                        />
                    </li>
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
                        <label
                            htmlFor="startingYear"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Starting Year
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
                        <label
                            htmlFor="endingYear"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Ending Year
                        </label>
                        <input
                            type="number"
                            name="endingYear"
                            key="endingYear"
                            id="endingYear"
                            placeholder="Ending Year"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={updatedData.endingYear}
                        />
                    </li>
                </ul>
                <ul className="flex flex-col justify-start items-center w-[100%] h-[100%] gap-y-[3vh] pr-3">
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
                        <label
                            htmlFor="enrollment"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Enroll. Number
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
                        <label htmlFor="address" className="text-[#000080] text-[1rem]">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            key="address"
                            id="address"
                            placeholder="Address"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={updatedData.address}
                        />
                    </li>
                    <li className="flex justify-start items-center w-[100%] gap-x-[1vw]">
                        <label
                            htmlFor="phone"
                            className="text-[#000080] text-[1rem] text-nowrap"
                        >
                            Phone No.
                        </label>
                        <input
                            type="number"
                            name="phone"
                            key="phone"
                            id="phone"
                            placeholder="Phone Number"
                            className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                            onChange={handleChange}
                            value={updatedData.phone}
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

const DeleteStudentForm = ({ data, collectingData }) => {
    const navigate = useNavigate()
    const { _id, image, name } = data;

    const handleSubmit = async (e) => {
        await e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/v1/admin/students/${_id}`, {
                method: 'DELETE',
            }
            );
            // window.location.reload(); // Reload the page
            collectingData();
            navigate("/admin/students")
        } catch (error) {
            console.error('Error:', error);
            // Handle any errors that occur during the deletion process
        }
    };

    const handleBackClick = async (e) => {
        await e.preventDefault();
        window.location.reload(); // Reload the page
    };

    return (
        <div className="flex flex-col justify-center items-center w-[50vw] h-[90vh] gap-y-2">
            <h2 className="text-[#000080] text-[1.8rem] font-bold studentPageHeading">Delete Teacher Details</h2>
            <form
                action=""
                method="post"
                className="flex flex-col justify-center items-center py-[5vh] h-fit gap-y-[5vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <ul className="flex flex-col justify-center items-center w-[100%] h-[100%] gap-y-[3vh] pr-3">
                    <h2>Deleting Details of {name}</h2>
                    <img
                        src={`http://localhost:4000/students/${image}`}
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
        <div className="flex justify-between items-center w-[90%] h-[50%] px-2">
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

const StudentIDCArd = ({ data, handleEditClick, handleDeleteClick }) => {
    const {
        _id,
        image,
        name,
        fatherName,
        dob,
        course,
        startingYear,
        endingYear,
        section,
        enrollment,
        address,
        phone,
    } = data;

    return (
        <div className="flex flex-col justify-center items-center h-[16rem] w-[25rem] rounded-xl border-[0.2vh] border-black">
            <div className="flex flex-col justify-center items-center h-[26%] w-[100%] bg-[#fff] rounded-t-xl py-1">
                <div className="flex justify-center items-center w-[100%] h-[40%]">
                    <p className="text-black text-[0.75rem]">
                        INSTITUTE OF INNOVATION IN TECHNOLOGY AND MANAGEMENT
                    </p>
                </div>
                <div className="flex justify-center items-center w-[100%] h-[60%] gap-x-[1vw]">
                    <img src={iitm_logo_black} alt="iitm black" className="h-[10vh]" />
                    <p className="text-black text-[0.7rem]">
                        Affilated to the GGS Indraprastha University, New Delhi
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center h-[75%] w-[100%]  rounded-b-xl border-t-[0.4vh] bg-[#383c53]">
                <div className="flex justify-center items-center h-[100%] w-[90%]">
                    <div className="flex justify-center items-center w-[35%] h-[100%]">
                        <img
                            src={`http://localhost:4000/students/${image}`}
                        alt={`${image}`}
                        className="h-[15vh] border-[0.2vh] border-white"
            />
                    </div>
                    <ul className="flex flex-col justify-start items-center w-[65%] h-[100%] py-[1vh]">
                        <li className="flex justify-start items-center w-[100%] text-nowrap">
                            <p className="w-[50%] text-white text-[0.9rem]">Name</p>
                            <p className="w-[50%] text-white text-[0.9rem]">: {name}</p>
                        </li>
                        <li className="flex justify-start items-center w-[100%] text-nowrap">
                            <p className="w-[50%] text-white text-[0.9rem]">Father's Name</p>
                            <p className="w-[50%] text-white text-[0.9rem]">: {fatherName}</p>
                        </li>
                        <li className="flex justify-start items-center w-[100%] text-nowrap">
                            <p className="w-[50%] text-white text-[0.9rem]">DOB</p>
                            <p className="w-[50%] text-white text-[0.9rem]">
                                : {dob ? dob.split('T')[0] : ''}
                            </p>
                        </li>
                        <div className="flex justify-between items-center w-[100%]">
                            <li className="flex justify-start items-center w-[100%] text-nowrap">
                                <p className="w-[40%] text-white text-[0.9rem]">Course</p>
                                <p className="w-[60%] text-white text-[0.9rem]">: {course}</p>
                            </li>
                            <li className="flex justify-start items-center w-[100%] text-nowrap">
                                <p className="w-[40%] text-white text-[0.9rem]">Batch</p>
                                <p className="w-[60%] text-white text-[0.9rem]">
                                    : {`${startingYear}-${endingYear - 2000}`}
                                </p>
                            </li>
                        </div>
                        <li className="flex justify-start items-center w-[100%] text-nowrap">
                            <p className="w-[50%] text-white text-[0.9rem]">Enrollment</p>
                            <p className="w-[50%] text-white text-[0.9rem]">: {enrollment}</p>
                        </li>
                        <li className="flex justify-start items-center w-[100%] text-nowrap">
                            <p className="w-[50%] text-white text-[0.9rem]">Section</p>
                            <p className="w-[50%] text-white text-[0.9rem]">: {section}</p>
                        </li>
                        <li className="flex justify-start items-center w-[100%] text-nowrap">
                            <p className="w-[50%] text-white text-[0.9rem]">Address</p>
                            <p className="w-[50%] text-white text-[0.9rem]">: {address}</p>
                        </li>
                        <li className="flex justify-start items-center w-[100%] text-nowrap">
                            <p className="w-[50%] text-white text-[0.9rem]">Phone</p>
                            <p className="w-[50%] text-white text-[0.9rem]">: {phone}</p>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-end items-center h-[100%] w-[10%] py-4 gap-y-[1vh]">
                    <img
                        src={edit_button_white}
                        alt="edit"
                        className="h-[1rem] hover:scale-105 hover:cursor-pointer"
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

const StudentCards = ({ data, title, handleEditClick, handleDeleteClick }) => {
    if (data?.length > 0) {
        // console.log(data)
        return data.map(element => (
            <StudentIDCArd
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

const StudentsPage = () => {
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
    const [searchedResults, setSearchedResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const [searchText, setSearchText] = useState(null);

    const [nameText, setNameText] = useState(null);
    const [enrollmentText, setEnrollmentText] = useState(null);
    const [courseText, setCourseText] = useState(null);

    const handleNameSearchChange = (e) => {
        clearTimeout(searchTimeout);

        const searchNameValue = e.target.value.trim().toLowerCase();

        setNameText(searchNameValue);
        setEnrollmentText(null);
        setCourseText(null);

        setSearchTimeout(
            setTimeout(async () => {
                const searchResult = await fetchedData.filter(item =>
                    item.name.toLowerCase().includes(searchNameValue)
                );
                setSearchedResults(searchResult);
            }, 100)
        );
    };

    const handleEnrollmentSearchChange = (e) => {
        clearTimeout(searchTimeout);

        const searchEnrollmentValue = e.target.value
            .toString()
            .trim()
            .toLowerCase();

        setNameText(null);
        setEnrollmentText(searchEnrollmentValue);
        setCourseText(null);

        setSearchTimeout(
            setTimeout(async () => {
                const filteredData = await fetchedData.filter(
                    item =>
                        item.enrollment.toString().toLowerCase() === searchEnrollmentValue
                );
                setSearchedResults(filteredData);
            }, 100)
        );
    };

    const handleCourseSearchChange = (e) => {
        clearTimeout(searchTimeout);

        const selectedCourseValue = e.target.value.trim().toLowerCase();

        setNameText(null);
        setEnrollmentText(null);
        setCourseText(selectedCourseValue);

        setSearchTimeout(
            setTimeout(async () => {
                const filteredData = await fetchedData.filter(
                    item => item.course.toLowerCase() === selectedCourseValue
                );
                setSearchedResults(filteredData);
            }, 100)
        );
    };

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
                'http://localhost:4000/api/v1/admin/students',
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
        <div className="flex justify-start items-center w-[80vw] h-[90vh]">
            {addForm && <AddStudentForm collectingData={collectingData} />}
            {editForm && (
                <EditStudentForm data={editFormData} collectingData={collectingData} />
            )}
            {deleteForm && (
                <DeleteStudentForm
                    data={deleteFormData}
                    collectingData={collectingData}
                />
            )}
            <div className="flex flex-col justify-center items-center h-[90vh] w-[30vw] rounded-md">
                <div className="flex flex-col justify-center items-center w-[100%] h-[25%] gap-y-[2vh]">
                    <div className="flex justify-between items-center gap-x-[1vw]">
                        <SearchBar
                            labelName="Search by Name"
                            type="text"
                            name="text"
                            placeholder="Search by Name"
                            value={nameText}
                            handleChange={handleNameSearchChange}
                        />
                        <SearchBar
                            labelName="Search by Enrollment"
                            type="text"
                            name="enrollment"
                            placeholder="Search by Enrollment"
                            value={enrollmentText}
                            handleChange={handleEnrollmentSearchChange}
                        />
                    </div>
                    <div className="flex justify-between items-center gap-x-[1vw]">
                        <SearchBar
                            labelName="Search by Course"
                            type="text"
                            name="course"
                            placeholder="Search by Course"
                            value={courseText}
                            handleChange={handleCourseSearchChange}
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
                                    Showing Results for Name =
                                    <span className="text-[#000080e5]">{nameText}</span>
                                </h2>
                            )}

                            {nameText && (
                                <div className="flex flex-col justify-start items-center py-2 gap-y-[1vh]">
                                    <StudentCards
                                        data={searchedResults}
                                        title="No Search Result Found"
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                </div>
                            )}

                            {enrollmentText && (
                                <h2 className=" font-medium text-[#666e75] text-xl ">
                                    Showing Results for Name =
                                    <span className="text-[#000080e5]">{enrollmentText}</span>
                                </h2>
                            )}

                            {enrollmentText && (
                                <div className="flex flex-col justify-start items-center py-2 gap-y-[1vh]">
                                    <StudentCards
                                        data={searchedResults}
                                        title="No Search Result Found"
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                </div>
                            )}
                            {courseText && (
                                <h2 className=" font-medium text-[#666e75] text-xl ">
                                    Showing Results for Name =
                                    <span className="text-[#000080e5]">{courseText}</span>
                                </h2>
                            )}

                            {courseText && (
                                <div className="flex flex-col justify-start items-center py-2 gap-y-[1vh]">
                                    <StudentCards
                                        data={searchedResults}
                                        title="No Search Result Found"
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                </div>
                            )}
                            {!nameText && !enrollmentText && !courseText && (
                                <div className="flex flex-col justify-start items-center py-2 gap-y-[1vh]">
                                    <StudentCards
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

export default StudentsPage;