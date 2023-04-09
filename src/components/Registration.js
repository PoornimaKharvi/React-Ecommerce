import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";


import { RiLockPasswordFill } from "react-icons/ri";
import { Link, } from "react-router-dom";
import signup from "../images/signin.png";
import {toast} from 'react-toastify';
import {  useNavigate } from "react-router-dom";

function Registration() {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });
const navigate = useNavigate();
let isValid;
let isValidPass;

  const handleChange = (event) => {
    console.log("user",user);
    //console.log("destructure", ...user);
    //console.log("destructure2", {...user});
    const userCopy = { ...user };
    //console.log("userCopy", userCopy);
//console.log(event.target.name,"==>",event.target.value);
//console.log(userCopy[event.target.name]);
userCopy[event.target.name] = event.target.value;
    setuser(userCopy);
    //console.log(userCopy,"userCopy2");
    //console.log(user,"user");
  };

  const postUserData = async (event) =>{
    event.preventDefault();
    console.log("postUserData")
    isValid =  validateEmail(user.email);
    isValidPass = validatePassword(user.password);
    if (isValid && isValidPass && user.name.length > 3) {
    console.log("valid")
    await isEmailAlreadyExists()
    }
    else{
toast.error("please enter valid credentials")
    }
  }
  const isEmailAlreadyExists = async () =>{
    console.log("isEmailAlreadyExists")
    const {email} =  user
  await  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then(data => {
        const userExist = data.some((user) => user.email === email  );
        console.log(userExist); // userExist will be true if email and password is present in db
        if(userExist){
       toast.warning('user already exist. Please login')
        }else{
          PostData()
        }
    })
  }
  const PostData = async () => {
 console.log("PostData")
    const { name, email, password, } = user;
   await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: name, name, email, password, }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User added:", data);
        toast.success('Registration success')

        setuser({
          name: "",
          email: "",
          password: "",

        })
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const validateEmail = (email) => {
    const mailexp =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,12})$/;
    if (mailexp.test(email)) {
      // setisEmailValid(true);
      // setemailError("");
      return true;
    } else {
      // setisEmailValid(false);
      // setemailError("enter valid email");
      return false;
    }
  };

  const validatePassword = (password) => {
    const passwordExp = /(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}/;
    if (password.length > 3) {
      // setisPasswordValid(true);
      // setpasswordError("");
      return true;
    } else {
      // setisPasswordValid(false);
      // setpasswordError(" enter valid password");
      return false;
    }
  };


  return (
    <div>
      <section className="signup">
        <div className="container1 mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form
                method="POST"
                name="form"
                className="register-form"
                id="register-form"
              >
                <div className="form-group">
                  <label htmlFor="name">
                    <BsPersonCircle />

                  </label>
                  <input
                    onChange={handleChange}
                    value={user.name}
                    name="name"
                    type="text"
                    placeholder="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <HiOutlineMail />
                  </label>
                  <input
                    onChange={handleChange}
                    value={user.email}
                    name="email"
                    type="text"
                    placeholder="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <RiLockPasswordFill />
                  </label>
                  <input
                    onChange={handleChange}
                    value={user.password}
                    type="password"
                    name="password"
                    placeholder="password"
                  />{" "}
                </div>

                <h6>Existing user ? <Link to="/">click here to Login</Link></h6>
                <div className="form-group form-button ">
                  <input type="submit" className='form-submit' onClick={postUserData} />
                </div>
              </form>
            </div>

            <div className="signup-image">
              <figure>
                <img src={signup} alt="registration pic" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registration;