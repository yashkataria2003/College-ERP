import React, { useState } from 'react';
// import './Login.css'
import { useNavigate } from 'react-router-dom';
import eye_logo_black from '../../assets/eye_logo_black.svg';
import Admin_Login from '../../assets/Admin_Login.svg';
import IITM_color from '../../assets/IITM_color.png';

const AdminLogin = ({ setLoggedIn, setUserDetails }) => {
  const [dataInput, setDataInput] = useState({
    email: '',
    password: '',
  });

  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectPasswordStatement, setIncorrectPasswordStatement] =
    useState('');

  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();

    setDataInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    await event.preventDefault();

    try {
      const requestBody = {
        email: dataInput.email,
        password: dataInput.password,
      };

      const response = await fetch(`http://localhost:4000/api/v1/adminLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      // console.log(response)
      const data = await response.json();
      // console.log(data)
      setUserDetails(data.data);

      if (response.status === 200) {
        setTimeout(() => {
          // On successful login
          setLoggedIn(true);
          localStorage.setItem('loggedIn', true);
          navigate('/admin');
        }, 100);
      } else {
        setIncorrectPassword(true);
        setIncorrectPasswordStatement(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
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

  return (
    <main className="flex justify-between items-center w-[100vw] h-[90vh] gap-x-[1vw] gap-y-[2vh] px-[5vw] bg-[#e0e0e0]">
      <div className="flex justify-center items-center">
        <img src={Admin_Login} alt="Admin_Login" className="h-[90vh]" />
      </div>
      <form
        action=""
        method="post"
        className="flex flex-col justify-start items-center py-[5vh] h-[80%] gap-y-[5vh] w-[40%] border-[#000080] border-2 rounded-xl shadow-[5px_5px_0px_0px_rgba(64,63,63)] bg-white"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <img src={IITM_color} alt="IITM_color" className="h-[10vh]" />
        <div className='flex flex-col justify-between items-center w-full gap-y-[4vh]'>
          <h1 className="text-[#000080] text-[2.8rem] font-bold">
            Login as Admin
          </h1>
          <ul className="flex flex-col justify-center items-center w-[100%] h-[100%] gap-y-[3vh] pr-3">
            <li className="flex justify-end items-center w-[85%] gap-x-[1vw]">
              <label
                htmlFor="email"
                className="text-[#000080] text-[1.2rem] hover:cursor-pointer"
              >
                E-Mail
              </label>
              <input
                type="mail"
                name="email"
                id="email"
                placeholder="Enter your e-mail"
                className="flex justify-start items-center px-[1vw] h-[5vh] w-[75%] rounded-md bg-[#e8f0fe]"
                onChange={handleChange}
              />
            </li>
            <li className="flex flex-col items-center w-[85%] gap-y-[2vh]">
              <div className="flex justify-end items-center w-[100%] gap-x-[1vw]">
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
                />
                <div
                  className={`flex justify-center items-center rounded-full ${
                    isPasswordVisible ? 'opacity-100' : 'opacity-50'
                  } absolute px-[0.5vw]`}
                  onClick={handleShowPasswordClick}
                >
                  <img
                    src={eye_logo_black}
                    alt="Show Password"
                    className="h-[5vh] hover:cursor-pointer"
                  />
                </div>
              </div>
              {incorrectPassword && (
                <div className="flex justify-center items-center w-full h-full">
                  <p className="text-red-700 font-bold">
                    {incorrectPasswordStatement}
                  </p>
                </div>
              )}
            </li>
            <button
              type="submit"
              className="flex justify-center items-center bg-[#000080] px-[2vw] py-[1vh] text-white rounded-md hover:border-white hover:border-[0.1vh]"
            >
              Login
            </button>
          </ul>
        </div>
      </form>
    </main>
  );
};

export default AdminLogin;
