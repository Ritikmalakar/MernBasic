import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '../../Axios';

export default function SignUp() {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  });


  const changeData=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const dataSubmit=async(e)=>{
    e.preventDefault();
    try{
const {data}=await baseUrl.post("/register",formData);
if(data?.success){
  toast.success(data?.message);
}
    }catch(error){
      console.log(error);
      toast.error(error?.response.data?.message)
    }
  }
  return (
    <div>
      <form onSubmit={dataSubmit}>
        <input type='text' name='name' placeholder='enter your name' value={formData.name} onChange={changeData}/><br></br>

        <input type='email' name='email' placeholder='enter your email' value={formData.email} onChange={changeData}/><br></br>

        <input type='text' name='password' placeholder='enter your password' value={formData.password} onChange={changeData}/><br></br>
        <button>Submit</button>
      </form>
    </div>
  )
}
