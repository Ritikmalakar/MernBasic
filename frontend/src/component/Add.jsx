import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { baseUrl1 } from '../../Axios'
import { useNavigate } from 'react-router-dom';

export default function Add() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: null
  });

  // const changeData = (e) => {

  //   if (e.target.name === "image") {
  //     setFormData({
  //       ...formData,
  //       image: e.target.files[0]
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value
  //     });
  //   }
  // };


  

  const submitData = async (e) => {
    e.preventDefault();

    try {

      const sendData = new FormData();

      sendData.append("title", formData.title);
      sendData.append("price", formData.price);
      sendData.append("image", formData.image);

      const { data } = await baseUrl1.post(
        "/create",
        sendData
      );

      if (data?.success) {
        toast.success(data?.message);
        navigate("/");
      }

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message
      );
    }
  };

  return (
    <form onSubmit={submitData}>

      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={changeData}
      />
      <br />

      <input
        type="text"
        name="price"
        placeholder="price"
        onChange={changeData}
      />
      <br />

      <input
        type="file"
        name="image"
        onChange={changeData}
      />
      <br />

      <button>Submit</button>

    </form>
  );
}