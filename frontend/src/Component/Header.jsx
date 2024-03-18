import "./header.css";
import React from "react";
import { Link , useNavigate } from "react-router-dom";

const Headers = () => {
  // let auth = 1;
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <header>
        <nav>
          <div className="left">
            <h1>BRUNEL FIT</h1>
          </div>
          <div className="right">
            {auth ? (
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/healthservices">Health Services</Link>
                </li>
                <li>
                  <Link to="/dietplans">Diet Plans</Link>
                </li>
                <li>
                  <Link to="/checkbmi">Check BMI</Link>
                </li>
                <li>
                  <Link to="/workout">Workout</Link>
                </li>
                <li>
                  <Link to="/goals">Goals</Link>
                </li>
                <li>
                  <Link to="/Social">Social</Link>
                </li>
                <li>
                  <Link to="/Progresstracker">Progress Tracker</Link>
                </li>
                
                <li>
                  <Link to="/login" onClick={logout}><b>Logout</b></Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/login"><b>Log in</b></Link>
                </li>
                <li>
                  <Link to="/register"><b>Register for free</b></Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Headers;
