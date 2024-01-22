import React from 'react'
import {auth, provider,db} from '../FirebaseConfig';
import {signInWithPopup,signInWithEmailAndPassword} from 'firebase/auth'
//import Cookies from 'universal-cookie';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc,getDoc,updateDoc} from "firebase/firestore";

//const cookies= new Cookies();
function Login(props) {
  //const {setIsAuth} = props;
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", res.user.uid), {
        status: "online"
      });
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  }; 

  const handleGoogleSignIn= async ()=>{
    try{
      const res = await signInWithPopup(auth,provider);
      //const date = new Date().getTime();
      const displayName=res.user.displayName;
      const photoURL = res.user.photoURL;
      const email = res.user.email;
      const status = "online";
      //create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL,
        status
      });

      //Check if user exists or not then create empty user chats
      
      const userchats = await getDoc(doc(db, "userChats", res.user.uid));
      
      if (!userchats.data()) {
        console.log("user chat not found");
        await setDoc(doc(db, "userChats", res.user.uid), {});
      }
      navigate("/");
    }catch(err){
      setErr(true);
    }
   
    
  }
    return (
        <section className="pb-5">
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
                      <form onSubmit={handleSubmit}>
                        <h5 className="display-3 fw-bold ls-tight">
                           Login
                        </h5>
                        <div className="my-2 py-2"></div>
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                          <input type="email" id="form3Example3" className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="form3Example4">Password</label>
                          <input type="password" id="form3Example4" className="form-control" />

                        </div>
                        {err && <span>Something went wrong</span>}
                        <div className="form-check d-flex justify-content-center mb-4">
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                            Login
                            </button>
                        </div>
                        
                      </form>
                      <div className="form-check d-flex justify-content-center mb-4">
                          <button onClick={handleGoogleSignIn}className="justify-content-center" style={{border:"none" }}>
                            <a className="btn btn-warning btn-lg btn-block" style={{backgroundColor: "#" }}href="#!"
                            role="button">
                            <i className="fab fa-google me-2"></i>Continue with Google
                            </a>
                          </button>
                      </div>
                      <p>
                        You do have an account? <Link to="/signup">SignUp</Link>
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

export default Login;