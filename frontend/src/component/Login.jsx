import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.jsx";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // input change
  const changeData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  // Normal Login
  const dataSubmit = async (e) => {
    e.preventDefault();

    try {

      const { data } = await baseUrl.post(
        "/login",
        formData
      );

      if (data?.success) {

        toast.success(data?.message);

        localStorage.setItem(
          "token",
          data.token
        );

        navigate("/");
        window.location.reload();
      }

    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message
      );
    }
  };

  // Google Login
  const googleLogin = async () => {
    try {

      const result = await signInWithPopup(
        auth,
        provider
      );

      const user = result.user;

      const { data } = await baseUrl.post(
        "/google-login",
        {
          name: user.displayName,
          email: user.email,
          googleId: user.uid
        }
      );

      if (data?.success) {

        toast.success(data?.message);

        localStorage.setItem(
          "token",
          data.token
        );

        navigate("/");
        window.location.reload();
      }

    } catch (error) {
      console.log(error);
      toast.error("Google Login Failed");
    }
  };

  return (
    <div>

      <form onSubmit={dataSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={changeData}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={changeData}
        />
        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

      <br />

      <button onClick={googleLogin}>
        Login With Google
      </button>

    </div>
  )
}