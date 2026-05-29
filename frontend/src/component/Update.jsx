import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { baseUrl1 } from '../../Axios';
import { useParams } from 'react-router-dom';

export default function Update() {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: null
  });

  const changeData = (e) => {

    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  useEffect(() => {
    getOne();
  }, [id]);

  const getOne = async () => {
    try {

      const { data } =
        await baseUrl1.get(`/getOne/${id}`);

      setFormData({
        title: data.todo.title,
        price: data.todo.price,
        image: data.todo.image
      });

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message
      );
    }
  };

  const dataSubmit = async (e) => {
    e.preventDefault();

    try {

      const sendData = new FormData();

      sendData.append(
        "title",
        formData.title
      );

      sendData.append(
        "price",
        formData.price
      );

      if (
        formData.image &&
        typeof formData.image !== "string"
      ) {
        sendData.append(
          "image",
          formData.image
        );
      }

      const { data } =
        await baseUrl1.post(
          `/update/${id}`,
          sendData
        );

      if (data?.success) {
        toast.success(data?.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message
      );
    }
  };

  return (
    <form onSubmit={dataSubmit}>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={changeData}
      />
      <br />

      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={changeData}
      />
      <br />

      {
        formData.image &&
        typeof formData.image === "string" &&
        (
          <img
            src={formData.image}
            alt="img"
            width="120"
          />
        )
      }

      <br />

      <input
        type="file"
        name="image"
        onChange={changeData}
      />
      <br />

      <button>Update</button>

    </form>
  );
}