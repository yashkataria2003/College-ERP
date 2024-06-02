import React, { useEffect, useState } from 'react'
import edit_button_black from '../../../assets/edit_button_black.svg';
import delete_logo_black from '../../../assets/delete_logo_black.svg';
import { useNavigate } from 'react-router-dom';
import loadingAnimation from '../../../assets/loading.gif'

const AddNoticeForm = () => {
    /*State for input template*/
    const [noticeData, setNoticeData] = useState({
        title: '',
        description: '',
        attachment: null,
    })

    const handleChange = (e) => {
        if (e.target.name === 'attachment') {
            setNoticeData((prevState) => ({
                ...prevState,
                attachment: e.target.files[0] // Update image with the selected file
            }));
        }

        else {
            setNoticeData((prevState) => ({
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
            formData.append('title', noticeData.title);
            formData.append('description', noticeData.description);
            formData.append('attachment', noticeData.attachment);

            const response = await fetch('http://localhost:4000/api/v1/admin/notices', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            // console.log("Data:", data);
            window.location.reload(); // Reload the page
            collectingData();
        }

        catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center w-[40vw] h-[90vh] gap-y-2'>
            <h2 className='text-[#000080] text-[1.8rem] font-bold'>Add Notice Details</h2>
            <form
                action=""
                method='post'
                className='flex flex-col justify-between items-center py-[5vh] h-[60%] gap-y-[8vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-white'
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
                        <label htmlFor="description" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Description</label>
                        <textarea
                            type="text"
                            name="description"
                            key="description"
                            id="description"
                            placeholder='Description'
                            className='flex justify-start items-center px-[1vw] py-[1vh] h-[10vh] w-[75%] rounded-md bg-[#e8f0fe] resize-none'
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
                    <button type='submit' className='flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]'>Add</button>
                </ul>
            </form>
        </div>
    )
}

const EditNoticeForm = ({ data, collectingData }) => {
    const { _id, title, description, attachment } = data;

    const [updatedData, setUpdatedData] = useState({
        title,
        description
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
            const response = await fetch(`http://localhost:4000/api/v1/admin/notices/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            const updatedNotice = await response.json();
            // console.log('Updated notice:', updatedNotice);
            window.location.reload();
            collectingData();
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
            <h2 className='text-[#000080] text-[1.8rem] font-bold'>Update Notice</h2>
            <form
                action=""
                method='post'
                className='flex flex-col justify-between items-center py-[5vh] h-fit gap-y-[8vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)]'
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <ul className='flex flex-col justify-center items-center w-[100%] h-[100%] gap-y-[3vh] px-1'>
                    <iframe
                        className="h-[100%] w-[100%] "
                        src={`http://localhost:4000/notices/${attachment}`}
                    />
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
                        <label htmlFor="description" className='text-[#000080] text-[1.2rem] hover:cursor-pointer'>Description</label>
                        <textarea
                            type="text"
                            name="description"
                            key="description"
                            id="description"
                            placeholder='Description'
                            className='flex justify-start items-center px-[1vw] py-[1vh] h-[10vh] w-[75%] rounded-md bg-[#e8f0fe] resize-none'
                            onChange={handleChange}
                            value={updatedData.description}
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

const DeleteNoticeForm = ({ data, collectingData }) => {
    const navigate = useNavigate();

    const { _id, attachment, title, description } = data;

    const handleSubmit = async (e) => {
        await e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/v1/admin/notices/${_id}`, {
                method: 'DELETE',
            });
            // window.location.reload(); // Reload the page
            collectingData();
            navigate("/admin/notices")
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
            <h2 className='text-[#000080] text-[1.8rem] font-bold'>Delete Notice</h2>
            <form
                action=""
                method='post'
                className='flex flex-col justify-center items-center py-[5vh] h-fit gap-y-[5vh] w-[80%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)]'
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <ul className='flex flex-col justify-center items-start w-[100%] h-[100%] gap-y-[1vh] px-1'>
                    <h2><strong>{title}</strong></h2>
                    <p>{description}</p>
                    <iframe
                        className="h-[100%] w-[100%]"
                        src={`http://localhost:4000/notices/${attachment}`}
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

const NoticeCard = ({ data, handleEditClick, handleDeleteClick }) => {
    const { _id, title, description, attachment } = data;

    return (
        <div className="flex flex-col justify-center items-center min-h-max w-[30vw] rounded-xl p-1">
            <div className="flex justify-between items-center h-fit w-[100%] bg-[#fff] rounded-t-md py-3 px-2 border-[0.2vh] border-black">
                <div className='flex flex-col justify-center items-start w-[95%] h-auto'>
                    <p className=''><strong>{title}</strong></p>
                    <p className='text-wrap'>{description}</p>
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
            <div className="flex justify-center items-center min-h-max w-[100%] bg-[#9d1212] rounded-b-xl border-t-[0.1vh] border-t-white h-[50vh]">
                <iframe
                    className="h-[100%] w-[100%]"
                    src={`http://localhost:4000/notices/${attachment}`}
                />
            </div>
        </div>
    );
};

const Notices = ({ data, title, handleEditClick, handleDeleteClick }) => {
    if (data?.length > 0) {
        // console.log(data)
        return data.map((element) => (
            <NoticeCard
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

const NoticesPage = () => {
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
            const response = await fetch('http://localhost:4000/api/v1/admin/notices', {
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
                addForm && <AddNoticeForm collectingData={collectingData} />
            }
            {
                editForm && <EditNoticeForm data={editFormData} collectingData={collectingData} />
            }
            {
                deleteForm && <DeleteNoticeForm data={deleteFormData} collectingData={collectingData} />
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
                                            <Notices
                                                data={searchedResults}
                                                title="Data Not Found"
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                            />
                                        </div>
                                    ) : (
                                        <div className='flex flex-col justify-start items-center py-2 gap-y-[1vh]'>
                                            <Notices
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

export default NoticesPage
