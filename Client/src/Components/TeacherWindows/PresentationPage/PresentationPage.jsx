import React, { useEffect, useState } from 'react'
import edit_button_black from '../../../assets/edit_button_black.svg';
import delete_logo_black from '../../../assets/delete_logo_black.svg';
import { useNavigate } from 'react-router-dom';
import loadingAnimation from '../../../assets/loading.gif'

const AddPresentationForm = ({collectingData}) => {
    const navigate = useNavigate();
    /*State for input template*/
    const [presentationData, setPresentationData] = useState({
        title: '',
        subject: '',
        course: '',
        section: '',
        dueDate: '',
        attachment: null,
    })

    const handleChange = (e) => {
        if (e.target.name === 'attachment') {
            setPresentationData((prevState) => ({
                ...prevState,
                attachment: e.target.files[0] // Update pdf with the selected file
            }));
        }

        else {
            setPresentationData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    }

    // Add teachers data into database
    const handleSubmit = async (event) => {
        await event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', presentationData.title);
            formData.append('subject', presentationData.subject);
            formData.append('course', presentationData.course);
            formData.append('section', presentationData.section);
            formData.append('dueDate', presentationData.dueDate);
            formData.append('attachment', presentationData.attachment);

            const response = await fetch('http://localhost:4000/api/v1/teacher/presentations', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            // console.log("Data:", data);
            // window.location.reload(); // Reload the page
            collectingData();
            navigate("/teacher/presentations")
        }

        catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center w-[40vw] h-[90vh] gap-y-2'>
            <h2 className='text-[#000080] text-[1.8rem] font-bold'>Add Presentation Details</h2>
            <form
                action=""
                method='post'
                className='flex flex-col justify-between items-center py-[5vh] h-fit gap-y-[8vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]'
                onSubmit={handleSubmit}
            >
                <ul className='flex flex-col justify-center items-center w-[100%] h-[100%] gap-y-[3vh] pr-3'>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="title" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Title</label>
                        <input
                            type="text"
                            name="title"
                            key="title"
                            id="title"
                            placeholder='Title'
                            className='flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                        />
                    </li>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="subject" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            key="subject"
                            id="subject"
                            placeholder='Subject'
                            className='flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                        />
                    </li>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="course" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Course</label>
                        <input
                            type="text"
                            name="course"
                            key="course"
                            id="course"
                            placeholder='Course'
                            className='flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                        />
                    </li>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="section" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Section</label>
                        <input
                            type="text"
                            name="section"
                            key="section"
                            id="section"
                            placeholder='Section'
                            className='flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                        />
                    </li>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="dueDate" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            key="dueDate"
                            id="dueDate"
                            placeholder='Last Date'
                            className='flex justify-start items-center px-[1vw] py-[1vh] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                        />
                    </li>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="attachment" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Attachment</label>
                        <input
                            type="file"
                            accept='application/pdf'
                            name="attachment"
                            key="attachment"
                            id="attachment"
                            placeholder='PDF'
                            className='flex justify-start items-center px-[1vw] w-[75%] rounded-md text-black'
                            onChange={handleChange}
                        />
                    </li>
                </ul>
                <button type='submit' className='flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]'>Add</button>
            </form>
        </div>
    )
}

const EditPresentationForm = ({ data, collectingData }) => {
    const navigate = useNavigate();
    const { _id, title, subject, course, section, dueDate } = data;

    const [updatedData, setUpdatedData] = useState({
        title,
        subject,
        course,
        section,
        dueDate
    });

    const handleChange = (e) => {
        setUpdatedData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        await e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/v1/teacher/presentations/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            const updatedPresentation = await response.json();
            // console.log('Updated presentation:', updatedPresentation);
            // window.location.reload();
            collectingData();
            navigate("/teacher/presentations");
        }

        catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackClick = () => {
        window.location.reload(); // Reload the page
    }

    return (
        <div className='flex flex-col justify-center items-center w-[40vw] h-[90vh] gap-y-2'>
            <h2 className='text-[#000080] text-[1.8rem] font-bold'>Update Presentation</h2>
            <form
                action=""
                method='post'
                className='flex flex-col justify-between items-center py-[5vh] h-fit gap-y-[8vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]'
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <ul className='flex flex-col justify-center items-center w-[100%] h-[100%] gap-y-[3vh] px-1'>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="title" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Title</label>
                        <input
                            type="text"
                            name="title"
                            key="title"
                            id="title"
                            placeholder='Title'
                            className='flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                            value={updatedData.title}
                        />
                    </li>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="subject" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            key="subject"
                            id="subject"
                            placeholder='Subject'
                            className='flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                            value={updatedData.subject}
                        />
                    </li>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="course" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Course</label>
                        <input
                            type="text"
                            name="course"
                            key="course"
                            id="course"
                            placeholder='Course'
                            className='flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                            value={updatedData.course}
                        />
                    </li>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="section" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Section</label>
                        <input
                            type="text"
                            name="section"
                            key="section"
                            id="section"
                            placeholder='Section'
                            className='flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                            value={updatedData.section}
                        />
                    </li>
                    <li className='flex justify-end items-center w-[85%] gap-x-[1vw]'>
                        <label htmlFor="dueDate" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Last Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            key="dueDate"
                            id="dueDate"
                            placeholder='Last Date'
                            className='flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]'
                            onChange={handleChange}
                            value={updatedData.dueDate.split('T')[0]}
                        />
                    </li>
                </ul>
                <div className='flex justify-between items-center gap-x-2'>
                    <button className='flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]' onClick={handleBackClick}>Back</button>
                    <button type='submit' className='flex justify-center items-center bg-[#1ea550] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]'>Update</button>
                </div>
            </form>
        </div>
    );
};

const DeletePresentationForm = ({ data, collectingData }) => {
    const navigate = useNavigate()
    const { _id, attachment, title, subject, course, section, dueDate } = data;

    const handleSubmit = async (e) => {
        await e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/v1/teacher/presentations/${_id}`, {
                method: 'DELETE',
            });
            // window.location.reload(); // Reload the page
            collectingData();
            navigate("/teacher/presentations")
        }

        catch (error) {
            console.error('Error:', error);
            // Handle any errors that occur during the deletion process
        }
    };

    const handleBackClick = async (e) => {
        await e.preventDefault();
        window.location.reload(); // Reload the page 
    }

    return (
        <div className='flex flex-col justify-center items-center w-[40vw] h-[90vh] gap-y-2'>
            <h2 className='text-[#000080] text-[1.8rem] font-bold'>Delete Presentation Details</h2>
            <form
                action=""
                method='post'
                className='flex flex-col justify-center items-center py-[5vh] h-fit gap-y-[5vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-[#fff]'
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <ul className='flex flex-col justify-center items-start w-[100%] h-[100%] gap-y-[1vh] px-1'>
                    <h2><strong>{title}</strong></h2>
                    <p>{subject}</p>
                    <iframe
                        className="h-[100%] w-[100%]"
                        src={`http://localhost:4000/presentations/${attachment}`}
                    />
                </ul>
                <div className='flex justify-between items-center gap-x-2'>
                    <button className='flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]' onClick={handleBackClick}>Back</button>
                    <button type='submit' className='flex justify-center items-center bg-[#c22744] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]'>Delete</button>
                </div>
            </form>
        </div>
    );
}

const SearchBar = ({ type, name, placeholder, value, handleChange }) => {
    return (
        <div className='flex justify-between items-center w-[90%] h-[50%] px-2'>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className='flex justify-start items-center w-full px-[1vw] py-[0.7vh] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none'
            />
        </div>
    )
}

const PresentationCard = ({ data, handleEditClick, handleDeleteClick }) => {
    const { _id, title, subject, course, section, dueDate, attachment } = data;

    return (
        <div className="flex flex-col justify-center items-center min-h-max w-[30vw] rounded-xl p-1">
            <div className="flex justify-between items-center h-fit w-[100%] bg-[#fff] rounded-t-md py-3 px-2 border-[0.2vh] border-black">
                <div className='flex flex-col justify-center items-start w-[95%] h-auto gap-y-[1vh]'>
                    <div className='flex flex-col justify-start items-start'>
                        <h2 className='text-[#000080]'><strong>{title}</strong></h2>
                        <h2 className='font-bold'>{subject}</h2>
                    </div>
                    <p><strong>Last Date -</strong> {dueDate.split('T')[0]}</p>
                    <div className='flex justify-between items-center w-[100%]'>
                        <strong><p className='text-[#000080]'>Course - <span className='text-black'>{course}</span></p></strong>
                        <strong><p className='text-[#000080]'>Section - <span className='text-black'>{section}</span></p></strong>
                    </div>
                </div>
                <div className='flex justify-between items-center px-1 w-[15%]'>
                    <img
                        src={edit_button_black}
                        alt="edit"
                        className="h-[1.2rem] hover:scale-105 hover:cursor-pointer"
                        onClick={() => handleEditClick(_id, data)}
                    />
                    <img
                        src={delete_logo_black}
                        alt="delete"
                        className="h-[1.2rem] hover:scale-105 hover:cursor-pointer"
                        onClick={() => handleDeleteClick(_id, data)}
                    />
                </div>
            </div>
            <div className="flex justify-center items-center min-h-max w-[100%] bg-[#9d1212] rounded-b-xl h-[40vh]">
                <iframe
                    className="h-[100%] w-[100%]"
                    src={`http://localhost:4000/Presentations/${attachment}`}
                />
            </div>
        </div>
    );
};

const Presentations = ({ data, title, handleEditClick, handleDeleteClick }) => {
    if (data?.length > 0) {
        // console.log(data)
        return data.map((element) => (
            <PresentationCard
                key={element._id}
                data={element}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
            />
        ));
    }
    else {
        return (
            <h2 className="font-bold text-[#000080e5] text-xl uppercase">
                {title}
            </h2>
        )
    }
}

const PresentationPage = () => {
    /*State for checking whether data is renderd or not*/
    const [dataRenderd, setDataRenderd] = useState(false);

    // Control visibility of editForm
    const [addForm, setAddForm] = useState(true)
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

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);

        const searchTextValue = e.target.value.trim().toLowerCase();

        setSearchText(searchTextValue);

        setSearchTimeout(
            setTimeout(async () => {
                const searchResult = await fetchedData.filter((item) =>
                    item.title.toLowerCase().includes(searchTextValue)
                );
                setSearchedResults(searchResult);
            }, 100)
        );
    };


    useEffect(() => {
        if (dataRenderd === false) {
            collectingData();
            setDataRenderd(true);
        }
    }, [dataRenderd])

    // Fetching All Data 
    const collectingData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/v1/teacher/presentations', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const collectedData = await response.json();
            // console.log("CollectedData : ", collectedData.data);
            setFetchedData(collectedData.data)
            setDataRenderd(true);
            // console.log("Fetched Data: ", fetchedData)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    // Function to update Teacher's Data
    const handleEditClick = (_id, data) => {
        // console.log(data)
        setEditFormData(data);
        setEditForm(true);
        setAddForm(false);
        setDeleteForm(false);
    }

    const handleDeleteClick = (_id, data) => {
        setDeleteFormData(data);
        setDeleteForm(true);
        setEditForm(false);
        setAddForm(false);
    }

    return (
        <div className='flex justify-start items-center w-[80vw] h-[90vh]'>
            {
                addForm && <AddPresentationForm collectingData={collectingData} />
            }
            {
                editForm && <EditPresentationForm data={editFormData} collectingData={collectingData} />
            }
            {
                deleteForm && <DeletePresentationForm data={deleteFormData} collectingData={collectingData} />
            }
            <div className='flex flex-col justify-center items-center h-[90vh] w-[40vw]'>
                <div className='flex flex-col justify-center items-center w-[100%] h-[25%]'>
                    <SearchBar
                        labelName="Search Data"
                        type="text"
                        name="text"
                        placeholder="Search Data"
                        value={searchText}
                        handleChange={handleSearchChange}
                    />
                </div>
                <div className='flex flex-col justify-start items-center gap-y-1 overflow-auto w-[100%] h-[100%]'>
                    {
                        loading ? (
                            <img src={loadingAnimation} alt="loading" className='h-[5vh]'/>
                        ) : (
                            <>
                                {
                                    searchText && (
                                        <h2 className=' font-medium text-[#666e75] text-xl '>
                                            Showing Results for <span className='text-[#000080e5]'>{searchText}</span>
                                        </h2>
                                    )
                                }

                                {
                                    searchText ? (
                                        <div className='flex flex-col justify-start items-center py-2 gap-y-[1vh]'>
                                            <Presentations
                                                data={searchedResults}
                                                title="Data Not Found"
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                            />
                                        </div>
                                    ) : (
                                        <div className='flex flex-col justify-start items-center py-2 gap-y-[1vh]'>
                                            <Presentations
                                                data={fetchedData}
                                                title="Data Not Found"
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                            />
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default PresentationPage