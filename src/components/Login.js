import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Login = () => {

const[creditainls,setcreditainls] = useState({email:"",password:""});
const navigate = useNavigate();

const submithandle = async(e)=>{
    e.preventDefault();
    const u = "http://localhost:5000/get/auth/login"

    const response = await fetch(u, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
    

      },

      body: JSON.stringify({email:creditainls.email,password:creditainls.password}) // body data type must match "Content-Type" header
    });

    const j = await response.json();
    if (j.sucess===true){
        

        // Save the auth token and redirect
        localStorage.setItem('token', j.authtoken); 
      navigate("/")

    }
    else{
        alert("Invalid credentials");
    }

}




    const onChange = (e)=>{
        setcreditainls({...creditainls,[e.target.name]: e.target.value})

}
  return (
    <div>
    <form onSubmit={submithandle}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"  value={creditainls.email} aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="password" value={creditainls.password} onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
