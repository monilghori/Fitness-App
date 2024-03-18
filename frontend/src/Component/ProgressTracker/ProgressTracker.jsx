import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./ProgressTracker.css";

Chart.register(...registerables);

const ProgressTracker = () => {
  const [formData, setFormData] = useState({
    date: "",
    weight: "",
    calories: "",
    exerciseDuration: "",
  });
    const [submittedData, setSubmittedData] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
  const loadProgressData = async () => {
    
    axios
      .post(
        "http://localhost:3001/user/getprogress",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSubmittedData(res.data.progress);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadProgressData();
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, user: userId };
    axios
      .post("http://localhost:3001/user/addprogress", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const newData = [...submittedData, formData];
        newData.sort((a, b) => new Date(a.date) - new Date(b.date));
        setSubmittedData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
    setFormData({ date: "", weight: "", calories: "", exerciseDuration: "" });
  };

  const data = {
    labels: submittedData.map((data) => data.date),
    datasets: [
      {
        label: "Weight Progress",
        data: submittedData.map((data) => data.weight),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight (kg)",
        },
      },
    },
  };

  return (
    <div className="tracker">
      <form onSubmit={handleSubmit} className="tracker-form">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          max={getTodayDate()}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (in kg)"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories Consumed"
          value={formData.calories}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="exerciseDuration"
          placeholder="Exercise Duration (in mins)"
          value={formData.exerciseDuration}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {submittedData.length > 0 && <Line data={data} options={options} />}
    </div>
  );
};

export default ProgressTracker;
