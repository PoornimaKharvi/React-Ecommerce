import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useHistory } from "react-router-dom";
import loginpic from "../images/login.jpg";

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import {  useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
function Login() {
  const [modalshow, setmodalshow] = useState(false);
  const [modalerror, setmodalerror] = useState("")

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

const navigate = useNavigate();

  const [isEmailValid, setisEmailValid] = useState(false);
  const [emailError, setemailError] = useState("");


  let isValid;
  let isValidPass;
  const [isPasswordValid, setisPasswordValid] = useState(false);
  const [passwordError, setpasswordError] = useState("");

  const loginPost = async () => {

        //  fetch("http://localhost:3000/users").then((res) => {
        //         return res.json();
        //     }).then((resp) => {
        //         console.log(resp,"resp==>")
        //         if (Object.keys(resp).length === 0) {
        //             toast.error('Please Enter valid username');
        //         } else {
        //             if (resp.password === password) {
        //                 toast.success('Success');
        //                 sessionStorage.setItem('username',email);
        //                 sessionStorage.setItem('userrole',resp.role);
        //                 // usenavigate('/')
        //             }else{
        //                 toast.error('Please Enter valid credentials');
        //             }
        //         }
        //     }).catch((err) => {
        //         toast.error('Login Failed due to :' + err.message);
        //     });


   fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then(data => {
          console.log(data);
          const userExist = data.some((user) => user.email === email && user.password === password );
          console.log(userExist); // userExist will be true if email and password is present in db

          if(userExist){
         toast.success('Login success')
         localStorage.setItem('user', email);
         navigate("/products");
          }else{
          toast.error("Invalid credentials")
          }

      })



  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((response) => response.json())
  //     .then((data) => 
  //     console.log(data,"data ==>"));
  // }, []);

  // const loginUser = async (email, password) => {
  
  //   // e.preventDefault();

  //       fetch('https://localhost:3000/users')
  //       .then(response => response.json())
  //       .then(json => console.log(json,"json==>"))
  // };

  // const handleLogin = async () => {
  //   console.log(handleLogin,"handleLogin")
  //   const data = await loginUser(email, password);
  //   if (data.length > 0) {
  //     setIsAuthenticated(true);
  //   } else {
  //     alert("Invalid email or password");
  //   }
  // };


  const loginUser = async (e) => {
    e.preventDefault();
    isValid =  validateEmail(email);
    isValidPass = validatePassword(password);

    if (isValid && isValidPass) {
    await loginPost();
    }
  };



  const validateEmail = (email) => {
    const mailexp =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,12})$/;
    if (mailexp.test(email)) {
      setisEmailValid(true);
      setemailError("");
      return true;
    } else {
      setisEmailValid(false);
      setemailError("enter valid email");
      return false;
    }
  };

  const validatePassword = (password) => {
    const passwordExp = /(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}/;
    if (password.length > 3) {
      setisPasswordValid(true);
      setpasswordError("");
      return true;
    } else {
      setisPasswordValid(false);
      setpasswordError(" enter valid password");
      return false;
    }
  };
  // const error = (val) => {
  //   return true;
  // };
  return (
    <div>
      <section className="sign-in">
        <div className="container1 mt-5">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={loginpic} alt="login image" />
              </figure>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>

              <form
                method="POST"
                className="register-form"
                id="register-form" 
                onSubmit={loginUser}
              >
                <div className="mb-3  form-group">
                  <label htmlFor="email">
                    <HiOutlineMail /> 
                  </label>
                  <input
                    onChange={(event) => {
                        console.log(event.target.value)

                      setemail(event.target.value);
                    }}
                    value={email}
                    type="email"
                    id="email"
                    title="email"
                    placeholder="Enter email"
                  />
                  {!isEmailValid ? (
                    <span
                      style={{
                        color: "red",
                        display: "block",
                        fontSize: "15px",
                      }}
                    >
                      {emailError}
                      </span>
                  ) : null}
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="password">
                    <RiLockPasswordFill />
                  </label>
                  <input
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                    value={password}
                    type="password"
                    title="password"
                    placeholder="Enter password"
                    id="password"
                  />
                  {!isPasswordValid ? (
                    <span
                      style={{
                        color: "red",
                        display: "block",
                        fontSize: "15px",
                      }}
                    >
                      {passwordError}
                    </span>
                  ) : null}
                </div>
                <h6>New user ? <Link to="/register">click here to register</Link></h6>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                    // onClick={loginUser}
                    title="loginBtn"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
   
    </div>
  );
}

export default Login;