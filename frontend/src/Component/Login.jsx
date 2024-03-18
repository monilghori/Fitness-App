import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "./login.css";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "http://localhost:3001/user/login";
      let res;

      res = await axios
        .post(
          url,
          {
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          return data.data;
        })
        .catch((err) => {
          throw err
        });

      if (res.success) {
        navigate("/home");
        const user = {
          ...res.user,
          token: res.token,
        };
        toast.success(res.message, {
          position: "top-right",
          autoClose: 5000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false, 
      });
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="outter">
        <div className="login-page">
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <div className="form">
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                required
              />

              {error && <div className="error_msg">{error}</div>}

              <button type="submit">Login</button>
              
              <p className="message">
                Not Registerd? <a href="/register">Create an account</a>
              </p>
            </form>
            {/* <button className='login-with-google-btn'>
                    Sign In With Google
                </button>
                <button className='login-with-facebook-btn'>
                    Sign In With Facebook
                </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
