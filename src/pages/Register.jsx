import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {auth, db, storage} from '../FirebaseConfig';
import {createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'
import Add from '../images/addAvatar.png';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    firstname: "",
    lastname:"",
    password: "",
    email: "",
  });

  const inputHelper = (
    e,
    data
  ) => {
    const tempData = { ...data };
    tempData[e.target.name] = e.target.value;
    return tempData;
  };

  const handleUserInput = (e) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit=async (e)=>{
    setLoading(true);
    e.preventDefault();
    const displayName= userInput.firstname +" "+ userInput.lastname;
    const email = userInput.email;
    const file = e.target[4].files[0];
    try{
      //1. Create a user with email and password
      const res = await createUserWithEmailAndPassword(auth, userInput.email, userInput.password);
       
      //2. Create a unique image name
       const date = new Date().getTime();
       const storageRef = ref(storage, `${displayName + date}`);
      
       //Upload the file then create user profile, userchat in firestore
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    }catch(err){
      setErr(true);
      setLoading(false);
    }
  }

  return (
<section className="">
  <div className="text-center text-lg-start" style={{backgroundColor: "hsl(0, 0%, 96%)"}}>
    <div className="container">
      <div className="row gx-lg-5 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-3 fw-bold ls-tight">
            Chat Application <br />
            <span className="text-primary">For Everyone</span>
          </h1>
          <p style={{color: "hsl(217, 10%, 50.8%)"}}>
           Chat Application built for everyon to connect with your loved ones.
          </p>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form method="post" onSubmit={handleSubmit}>
                <h5 className="display-3 fw-bold ls-tight">
                   Register
                </h5>
                <div className="my-2 py-2"></div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="firstname">First name</label>
                      <input onChange={handleUserInput} value={userInput.firstname} type="text" name="firstname" id="firstname" placeholder="first name" className="form-control" required />
                     
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="lastname">Last name</label>
                      <input onChange={handleUserInput} value={userInput.lastname} type="text" name="lastname" id="lastname" placeholder="last name" className="form-control" required/>
                      
                    </div>
                  </div>
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email address</label>
                  <input onChange={handleUserInput} value={userInput.email} type="email" name="email" id="email" placeholder="email" className="form-control" required />
                 
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">Password</label>
                  <input onChange={handleUserInput} value={userInput.password} type="password" name="password" id="password" placeholder="password" className="form-control" required />
                  
                </div>
                <div className="form-outline mb-4">
                  <input required style={{ display: "none" }} type="file" id="file" />
                  <label htmlFor="file">
                    <img src={Add} alt="#" />
                    <span>Add an avatar</span>
                  </label>
                </div>
                <div className="form-check d-flex justify-content-center mb-4">
                    <button type="submit" className="btn btn-primary btn-block btn-lg">
                    Sign up
                    </button>
                </div>
                {loading && "Uploading and compressing the image please wait..."}
              {err && <span>Something went wrong</span>}
              </form>
              <p>
                Have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}

export default Register;