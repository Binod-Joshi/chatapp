import { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { UseGlobalContext } from "../context/Context";
import { BiUserCircle } from "react-icons/bi";
import { CircularProgress } from "@mui/material";


const Register = () => {
  const { registerClicked,user,responseNull,response,isLoading} = UseGlobalContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [profileDP,setProfileDP] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.token){
      navigate('/');
    }
  },[])
  
  setTimeout(() => {
    
  }, 1000);

  useEffect(() => {
    if(response === "user with this email already exist"){
      const timeout =  setTimeout(() => {
        responseNull();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  },[response])

  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 4) {
      setPasswordError("Password should be at least 4 characters");
      if (timeoutId) {
        clearTimeout(timeoutId); // clear the previous timeout if it exists
      }
      const newTimeoutId = setTimeout(() => setPasswordError(""), 5000);
      setTimeoutId(newTimeoutId);
      return;
    }
    registerClicked({navigate,username, email, password,profileDP });
  };

  const imageUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfileDP(base64);
  };

  const convertToBase64 = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleRegister}>
      {/* <label style={{display:"flex",alignItems:"center",justifyContent:"center"}}>Profile Pics</label> */}
         <div className="registerpicManagement">
         
        <label htmlFor="fileInput">
        <BiUserCircle className="settingsPPIcon" />
        </label>
        <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput" accept="image/*"
              onChange={imageUpload}
            />
        {profileDP?<img src={profileDP} alt="" /> :''}   
         </div>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <button className="registerButton" type="onsubmit">
          {isLoading ? "Register" :<CircularProgress size={20} color="inherit" />}
        </button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">
          LOGIN
        </Link>
      </button>
      <div >
        <p style={{color:"red"}}>{response}</p>
      </div>
    </div>
  );
};

export default Register;
