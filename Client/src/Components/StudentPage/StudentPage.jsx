import React, { useEffect, useState } from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../StudentPage/StudentPage.css'
import loading from '../../assets/loading.gif'
import attachment_logo from '../../assets/attachment_logo.svg'
import ass_pre_white_logo from '../../assets/ass_pre_white_logo.svg'
import IPU from '../../assets/IPU.png'

const SearchBar = ({ type, name, placeholder, value, handleChange }) => {
    return (
        <div className="flex justify-between items-center w-[100%] h-[50%] px-2">
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

const PresentationSections = ({ data, title }) => {
    if (data?.length > 0) {
        // console.log("Data in PresentationSections : ", data);

        return (
            <div className='flex flex-col justify-start items-center h-full w-full overflow-y-auto bg-[#fff] rounded-[4vh] px-[0.5vw] py-[1vh] gap-y-[1vh] '>
                {
                    data.map((element, index) => (
                        <div key={index} className='flex justify-between items-center h-fit w-full bg-[#000080] rounded-[3vh] px-[1vw] py-[1vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] text-white'>
                            <div className='flex flex-col justify-start items-start'>
                                <h2 className='font-bold'>{element.subject}</h2>
                                <p className='font-bold'>{element.title}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center h-full'>
                                <a href={`http://localhost:4000/Presentations/${element.attachment}`} download={element.attachment} target='_blank'>
                                    <img src={ass_pre_white_logo} alt="ass_pre_white_logo" className='h-[3vh] hover:cursor-pointer' />
                                </a>
                            </div>
                            <div className='flex flex-col justify-start items-start'>
                                <h2 className='font-bold'>Last Date</h2>
                                <p>
                                    {
                                        Date.now() < new Date(element.dueDate) ?
                                            element.dueDate.split('T')[0] :
                                            <strike className=" text-[#ffffff62]">{element.dueDate.split('T')[0]}</strike>
                                    }
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    else {
        return (
            <div className='flex flex-col justify-center items-center'>
                <img src={loading} alt="" className='h-[10vh]' />
                <h2 className="font-bold text-[#000080e5] text-xl uppercase">{title}</h2>
            </div>
        );
    }
}

const AssignmentSections = ({ data, title }) => {
    if (data?.length > 0) {
        console.log("Data in AssignmentSections : ", data);

        return (
            <div className='flex flex-col justify-start items-center h-full w-full overflow-y-auto bg-[#fff] rounded-[4vh] px-[0.5vw] py-[1vh] gap-y-[1vh]'>
                {
                    data.map((element, index) => (
                        <div key={index} className='flex justify-between items-center h-fit w-full bg-[#000080] rounded-[3vh] px-[1vw] py-[1vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] text-white'>
                            <div className='flex flex-col justify-start items-start'>
                                <h2 className='font-bold'>{element.subject}</h2>
                                <p className='font-bold'>{element.title}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center h-full'>
                                <a href={`http://localhost:4000/Assignments/${element.attachment}`} download={element.attachment} target='_blank'>
                                    <img src={ass_pre_white_logo} alt="ass_pre_white_logo" className='h-[3vh] hover:cursor-pointer' />
                                </a>
                            </div>
                            <div className='flex flex-col justify-start items-start'>
                                <h2 className='font-bold'>Last Date</h2>
                                <p>
                                {
                                        Date.now() < new Date(element.dueDate) ?
                                            element.dueDate.split('T')[0] :
                                            <strike className=" text-[#ffffff62]">{element.dueDate.split('T')[0]}</strike>
                                    }
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    else {
        return (
            <div className='flex flex-col justify-center items-center'>
                <img src={loading} alt="" className='h-[10vh]' />
                <h2 className="font-bold text-[#000080e5] text-xl uppercase">{title}</h2>
            </div>
        );
    }
}

const NoticeSections = ({ data, title }) => {
    if (data?.length > 0) {
        console.log("Data in NoticeSections : ", data);

        return (
            <div className='flex flex-col justify-start items-center h-full w-full overflow-y-auto bg-[#fff] rounded-[4vh] px-[2vw] py-[1vh] gap-y-[1vh]'>
                {
                    data.map((element, index) => (
                        <>

                            <div className='flex justify-between items-center px-[1vw]'>
                                <div key={index} className='flex flex-col justify-start items-start h-fit w-full'>
                                    <h2 className='font-bold'>{element.title}</h2>
                                    <p>{element.description}</p>
                                </div>
                                <div className='flex flex-col justify-end items-center h-full'>
                                    <a href={`http://localhost:4000/StudentNotices/${element.attachment}`} download={element.attachment} target='_blank'>
                                        <img src={attachment_logo} alt="attachment_logo" className='h-[3vh] hover:cursor-pointer' />
                                    </a>
                                </div>
                            </div>
                            <div className='w-full bg-black h-[0.1vh]'>

                            </div>
                        </>
                    ))
                }
            </div>
        )
    }

    else {
        return (
            <div className='flex flex-col justify-center items-center'>
                <img src={loading} alt="" className='h-[10vh]' />
                <h2 className="font-bold text-[#000080e5] text-xl uppercase">{title}</h2>
            </div>
        );
    }
}

const MarksSections = ({ data, title }) => {
    if (data?.length > 0) {
        // Initialize an empty object to store grouped marks records
        const groupedMarks = {};

        // Group marks records by subject
        data.forEach((marks) => {
            const subject = marks.subject;
            if (!groupedMarks[subject]) {
                groupedMarks[subject] = {
                    totalMarks: 0,
                    totalScoredMarks: 0
                };
            }
            groupedMarks[subject].totalMarks += marks.totalMarks;
            groupedMarks[subject].totalScoredMarks += marks.marks;
        });

        // Calculate marks percentage for each subject
        Object.keys(groupedMarks).forEach((subject) => {
            const { totalMarks, totalScoredMarks } = groupedMarks[subject];
            groupedMarks[subject].marksPercentage = (totalScoredMarks / totalMarks) * 100;
        });

        const renderSubjects = () => {
            return Object.keys(groupedMarks).map((subject, index) => {
                const { totalMarks, totalScoredMarks, marksPercentage } = groupedMarks[subject];
                return (
                    <div key={index} className='flex justify-between items-center gap-x-4 w-[95%] h-[40%] bg-[#fff] rounded-xl px-[1vw] py-[1vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
                        <div className="flex gap-x-[1vw] h-[100%] w-[65%] justify-start items-center">
                            <div className='flex justify-center items-center h-[25%] w-[25%] py-[0.3vh]'>
                                <CircularProgressbarWithChildren
                                    value={marksPercentage.toFixed(1)}
                                    styles={buildStyles({
                                        pathTransitionDuration: 1.5,
                                        pathColor: `#000080`,
                                        trailColor: '#d1d1d1',
                                        backgroundColor: '#3e98c7',
                                    })}
                                >
                                    <div className='text-[1.1rem]'>
                                        <strong>{`${marksPercentage.toFixed(1)}%`}</strong>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                            <div className='flex flex-col justify-center items-start'>
                                <p>Total Marks: {totalMarks}</p>
                                <p>Marks Scored: {totalScoredMarks}</p>
                            </div>
                        </div>
                        <div className='flex justify-end text-right items-center h-[100%]'>
                            <h2 className="font-bold text-[#000080] text-xl uppercase text-wrap">{subject}</h2>
                        </div>
                    </div>
                );
            });
        };

        return (
            <div className='flex flex-col justify-start items-center gap-y-[2vh] h-[100%] w-full bg-[#969393] overflow-y-auto py-[2vh] marksContainer rounded-[4vh]'>
                {
                    renderSubjects()
                }
            </div>
        );
    }

    else {
        return (
            <div className='flex flex-col justify-center items-center'>
                <img src={loading} alt="" className='h-[10vh]' />
                <h2 className="font-bold text-[#000080e5] text-xl uppercase">{title}</h2>
            </div>
        );
    }
};

const AttendanceSections = ({ data, title }) => {
    if (data?.length > 0) {
        // Initialize an empty object to store grouped attendance records
        const groupedAttendance = {};

        data.forEach((attendance) => {
            const subject = attendance.subject;
            if (!groupedAttendance[subject]) {
                groupedAttendance[subject] = {
                    totalClasses: 0,
                    presentCount: 0,
                    absentCount: 0
                };
            }
            groupedAttendance[subject].totalClasses++;
            if (attendance.attendance) {
                groupedAttendance[subject].presentCount++;
            } else {
                groupedAttendance[subject].absentCount++;
            }
        });

        const renderSubjects = (subjects) => {
            return subjects.map((subject, index) => {
                const { totalClasses, presentCount, absentCount } = groupedAttendance[subject];
                const attendancePercentage = totalClasses === 0 ? 0 : (presentCount / totalClasses) * 100;
                return (
                    <div key={index} className='flex justify-between items-center gap-x-[1vw] w-[95%] h-[40vh] bg-[#fff] rounded-xl px-[1vw] py-[1vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
                        <div className='flex justify-center items-center h-[100%]'>
                            <h2 className="font-bold text-[#000080] text-xl uppercase text-wrap">{subject}</h2>
                        </div>
                        <div className="flex gap-x-[1vw] h-[100%] w-[65%] justify-end items-center">
                            <div className='flex flex-col justify-center items-start'>
                                <p>Present: {presentCount}</p>
                                <p>Total Classes: {totalClasses}</p>
                            </div>
                            <div className='flex justify-center items-center h-[25%] w-[25%] py-[0.3vh]'>
                                <CircularProgressbarWithChildren
                                    value={attendancePercentage.toFixed(1)}
                                    styles={buildStyles({
                                        pathTransitionDuration: 1.5,
                                        pathColor: `#000080`,
                                        trailColor: '#d1d1d1',
                                        backgroundColor: '#3e98c7',
                                    })}
                                >
                                    <div className='text-[1.1rem]'>
                                        <strong>{`${attendancePercentage.toFixed(1)}%`}</strong>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>

                    </div>
                );
            });
        };

        return (
            <div className='flex flex-col justify-start items-center gap-y-[2vh] h-full w-full overflow-y-auto py-[2vh] rounded-[4vh] attendanceContainer bg-[#969393]'>
                {
                    renderSubjects(Object.keys(groupedAttendance))
                }
            </div>
        );
    }

    else {
        return (
            <div className='flex flex-col justify-center items-center'>
                <img src={loading} alt="" className='h-[10vh]' />
                <h2 className="font-bold text-[#000080e5] text-xl uppercase">{title}</h2>
            </div>
        );
    }
};


const StudentSection = ({ data }) => {
    const { name, image, enrollment, course, dob, phone, address } = data;
    return (
        <>
            <div className='flex flex-col justify-start items-center h-[100%] w-[100%] py-[1vh] gap-y-[1.1vh]'>
                <div className='flex justify-between items-center bg-[#000080] px-[1vw] py-[1vh] gap-x-[3.9vw] rounded-3xl'>
                    <img src={IPU} alt="IPU" className='h-[10vh]' />
                    <div className='flex flex-col justify-center items-start'>
                        <p className='text-white'>GURU GOBIND</p>
                        <p className='text-white'>SINGH</p>
                        <p className='text-white'>INDRAPRASTHA</p>
                        <p className='text-white'>UNIVERSITY</p>
                    </div>
                </div>
                <div className='w-full h-[0.5%] bg-[#000080]'>
                </div>
                <div className='flex justify-start items-center w-[100%] px-[1vw] h-[20vh] gap-x-[0.5vw]'>
                    <img src={`http://localhost:4000/students/${image}`} alt="" className='h-[13vh] w-[13vh] rounded-full border-[0.3vh] border-black' />
                    <div className='flex flex-col justify-center items-start w-fit'>
                        <p className='text-[1.3rem]'><strong>{name}</strong></p>
                        <p className='text-[1.1rem]'>{enrollment}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start w-[100%] px-[1vw] gap-y-[2vh] h-[70vh] py-[2vh]'>
                    <div className='flex flex-col justify-center items-start'>
                        <p><strong>Course</strong></p>
                        <p>{course}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <p><strong>DOB</strong></p>
                        <p>{dob.split('T')[0]}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <p><strong>Contact</strong></p>
                        <p>{phone}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <p><strong>Address</strong></p>
                        <p>{address}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const StudentSections = ({ data, title }) => {
    if (data?.length > 0) {
        return data.map(element => (
            <div className='flex flex-col justify-start items-center h-[100%] w-[30vw]'>
                <StudentSection
                    key={element._id}
                    data={element}
                />
            </div>

        ));
    }

    else {
        return (
            <div className='flex flex-col justify-center items-center'>
                <img src={loading} alt="" className='h-[10vh]' />
                <h2 className="font-bold text-[#000080e5] text-xl uppercase">{title}</h2>
            </div>
        );
    }
}

const StudentPage = () => {
    /*State for fethed Data*/
    const [fetchedDataStudent, setFetchedDataStudent] = useState([]);
    const [fetchedDataAttendance, setFetchedDataAttendance] = useState([]);
    const [fetchedDataMarks, setFetchedDataMarks] = useState([]);
    const [fetchedDataNotice, setFetchedDataNotice] = useState([]);
    const [fetchedDataAssignment, setFetchedDataAssignment] = useState([]);
    const [fetchedDataPresentation, setFetchedDataPresentation] = useState([]);

    /*State for loading*/
    const [loading, setLoading] = useState(false);

    /*States for Searching*/
    const [studentSearchedResults, setStudentSearchedResults] = useState(null);
    const [attendanceSearchedResults, setAttendanceSearchedResults] = useState(null);
    const [marksSearchedResults, setMarksSearchedResults] = useState(null);
    const [noticeSearchedResults, setNoticeSearchedResults] = useState(null);
    const [assignmentSearchedResults, setAssignmentSearchedResults] = useState(null);
    const [presentationSearchedResults, setPresentationSearchedResults] = useState(null);


    const [searchTimeout, setSearchTimeout] = useState(null);

    const [enrollmentText, setEnrollmentText] = useState(null);

    const handleEnrollmentSearchChange = (e) => {
        clearTimeout(searchTimeout);

        const searchEnrollmentValue = e.target.value.toString().trim().toLowerCase();
        setEnrollmentText(searchEnrollmentValue);

        setSearchTimeout(
            setTimeout(async () => {
                // Filtering Students
                const filteredStudent = fetchedDataStudent.filter(
                    (item) =>
                        item.enrollment.toString().toLowerCase() === searchEnrollmentValue
                );
                setStudentSearchedResults(filteredStudent);
                console.log("filteredStudent : ", filteredStudent)

                if (filteredStudent.length > 0) {
                    const studentCourse = filteredStudent[0].course.toString().toLowerCase();
                    const studentSection = filteredStudent[0].section.toString().toLowerCase();

                    // Filter notices based on the course and section
                    const filteredNotice = fetchedDataNotice.filter(
                        (item) =>
                            item.course.toLowerCase() === studentCourse && item.section.toLowerCase() === studentSection
                    );
                    setNoticeSearchedResults(filteredNotice);
                    // console.log("filteredNotice : ", filteredNotice);

                    // Filter assignments based on the course and section
                    const filteredAssignment = fetchedDataAssignment.filter(
                        (item) =>
                            item.course.toLowerCase() === studentCourse && item.section.toLowerCase() === studentSection
                    );
                    setAssignmentSearchedResults(filteredAssignment);
                    // console.log("filteredAssignment : ", filteredAssignment);

                    // Filter presentations based on the course and section
                    const filteredPresentation = fetchedDataPresentation.filter(
                        (item) =>
                            item.course.toLowerCase() === studentCourse && item.section.toLowerCase() === studentSection
                    );
                    setPresentationSearchedResults(filteredPresentation);
                    // console.log("filteredPresentation : ", filteredPresentation);
                } 
                
                else {
                    // Reset notice, assignment, and presentation search results if no student is found
                    setNoticeSearchedResults(null);
                    setAssignmentSearchedResults(null);
                    setPresentationSearchedResults(null);
                }

                // Filtering Attendance
                const filteredAttendance = fetchedDataAttendance.filter(
                    (item) =>
                        item.enrollment.toString().toLowerCase() === searchEnrollmentValue
                );
                setAttendanceSearchedResults(filteredAttendance);
                // console.log("filteredAttendance : ", filteredAttendance)

                // Filtering Marks
                const filteredMarks = fetchedDataMarks.filter(
                    (item) =>
                        item.enrollment.toString().toLowerCase() === searchEnrollmentValue
                );
                setMarksSearchedResults(filteredMarks);
                // console.log("filteredMarks : ", filteredMarks)
            }, 100)
        );
    };


    useEffect(() => {
        collectingStudentData();
        collectingAttendanceData();
        collectingMarksData();
        collectingNoticeData();
        collectingAssignmentData();
        collectingPresentationData();
    }, []);

    // Fetching All Student Data
    const collectingStudentData = async () => {
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
            setFetchedDataStudent(collectedData.data);
            // console.log("Fetched Data: ", fetchedData)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetching All Attendance Data
    const collectingAttendanceData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                'http://localhost:4000/api/v1/teacher/attendances',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const collectedData = await response.json();
            // console.log("CollectedData : ", collectedData.data);
            setFetchedDataAttendance(collectedData.data);
            // console.log("Fetched Attendance: ", fetchedDataAttendance)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetching All Marks Data
    const collectingMarksData = async () => {
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
            setFetchedDataMarks(collectedData.data);
            // console.log("Fetched Data: ", fetchedData)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetching All Notices Data
    const collectingNoticeData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                'http://localhost:4000/api/v1/teacher/notices',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const collectedData = await response.json();
            // console.log("CollectedData : ", collectedData.data);
            setFetchedDataNotice(collectedData.data);
            console.log("Fetched Data Notices : ", fetchedDataNotice)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // // Fetching All Assignments Data
    const collectingAssignmentData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                'http://localhost:4000/api/v1/teacher/assignments',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const collectedData = await response.json();
            // console.log("CollectedData : ", collectedData.data);
            setFetchedDataAssignment(collectedData.data);
            // console.log("Fetched Data: ", fetchedData)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetching All Assignments Data
    const collectingPresentationData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                'http://localhost:4000/api/v1/teacher/presentations',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const collectedData = await response.json();
            // console.log("CollectedData : ", collectedData.data);
            setFetchedDataPresentation(collectedData.data);
            // console.log("Fetched Data: ", fetchedData)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='flex flex-col justify-start items-center h-[90vh] w-[100vw] bg-[#cecece] px-[1vw] py-[1vh]'>
            <div className='flex flex-col justify-center items-center w-[90%] h-[10%] py-[1vh]'>
                <SearchBar
                    labelName="Search by Enrollment"
                    type="text"
                    name="enrollment"
                    placeholder="Search by Enrollment"
                    value={enrollmentText}
                    handleChange={handleEnrollmentSearchChange}
                />
            </div>
            {
                enrollmentText ? 
                (<div className='flex justify-start items-start h-[90%] w-[100%] gap-x-[1vw]'>
                    <div className='flex justify-center items-center w-[20%] h-[100%] bg-[#fff] rounded-[4vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
                        <StudentSections
                            data={studentSearchedResults}
                            title="Student not Found"
                        />
                    </div>
                    <div className='flex flex-col justify-start items-center w-[45%] h-full overflow-y-auto attendanceAndMarksContainer gap-y-[3vh] py-[1vh]'>
                        <div className='flex justify-center items-center w-full h-[70%] bg-[#fff] rounded-[4vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
                            <AttendanceSections
                                data={attendanceSearchedResults}
                                title="No Attendance Found"
                            />
                        </div>
                        <div className='flex justify-center items-center w-full h-[70%] bg-[#fff] rounded-[4vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
                            <MarksSections
                                data={marksSearchedResults}
                                title="Marks not Found"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-center w-[35%] h-full overflow-y-auto noticeAssignmentAndPresentationContainer gap-y-[3vh]'>
                        <div className='flex flex-col justify-center items-center w-[100%] h-[35%] bg-[#fff] rounded-[4vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
                            <NoticeSections
                                data={noticeSearchedResults}
                                title="Notices not Found"
                            />
                        </div>
                        <div className='flex flex-col justify-center items-center w-[100%] h-[40%] bg-[#fff] rounded-[4vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
                            <AssignmentSections
                                data={assignmentSearchedResults}
                                title="Assignments not Found"
                            />
                        </div>
                        <div className='flex flex-col justify-center items-center w-[100%] h-[40%] bg-[#fff] rounded-[4vh] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
                            <PresentationSections
                                data={presentationSearchedResults}
                                title="Presentations not Found"
                            />
                        </div>
                    </div>
                </div>) : (
                    <div className='flex justify-center items-center h-[90%] w-[100%] gap-x-[1vw]'>
                        <p className=' text-[3rem] text-[#00000064]'>Enter enrollment number to access dashboard</p>
                    </div>
                )
            }
        </div>
    )
}

export default StudentPage
