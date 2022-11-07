import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Signup = () => {

const[creditainls,setcreditainls] = useState({name:"",email:"",password:""});
const navigate = useNavigate();

const submithandle = async(e)=>{
  e.preventDefault();
  const u = "http://localhost:5000/get/auth/createuser"

  const response = await fetch(u, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.

    headers: {
      'Content-Type': 'application/json',
  

    },

    body: JSON.stringify({name:creditainls.name,email:creditainls.email,password:creditainls.password}) // body data type must match "Content-Type" header
  });

  const j = await response.json();
 
      

      // Save the auth token and redirect
      localStorage.setItem('token', j.authtoken); 
    navigate("/")

 

}




    const onChange = (e)=>{
        setcreditainls({...creditainls,[e.target.name]: e.target.value})

}
  return (
    <div>
    <form onSubmit={submithandle}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name"  value={creditainls.name} aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
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

export default Signup;
