import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [userData, setData] = useState({
    name: "",
    email: "",
    password: "",
    age: undefined,
    gender: "male",
  });

  const handleChange = (e) => {
    //   console.log(data)
    setData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (event) => {
    setData({
      ...userData,
      gender: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "http://localhost:3001/user/createuser";

      const res = await axios
        .post(url, userData)
        .then((response) => {
          //    console.log(res.response.data);
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message);
          return err.response.data;
        });

      console.log(res);
      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="out">
        <div className="login-page">
          <h1 style={{ textAlign: "center" }}>Create Account</h1>
          <div className="form">
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                onChange={handleChange}
              />
              <div className="radio-btn">
              <label>
                Male:
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={userData.gender === "male"}
                  onChange={handleRadioChange}
                />  
                Female:
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={userData.gender === "female"}
                  onChange={handleRadioChange}
                />
              </label>
              </div>
              {error && <div className="error_msg">{error}</div>}

              <button type="submit">create account</button>
              <p className="message">
                Already have account! <a href="/login">Login</a>
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

export default Register;
