import "./App.css";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Login from "./Component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Component/Register";
import AboutUs from "./Component/AboutUs";
import HealthServices from "./Component/HealthServices";
import DietPlans from "./Component/DietPlans";
import BMICalculator from "./Component/BMICalculator";
import Goals from "./Component/Goals";
import Social from "./Component/Social/Social";
import ProgressTracker from "./Component/ProgressTracker/ProgressTracker";
import Workout from "./Component/Workout/Workout";
function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/healthservices" element={<HealthServices />}/>
          <Route path="/dietplans" element={<DietPlans />}/>
          <Route path="/checkbmi" element={<BMICalculator />}/>
          <Route path="/goals" element={<Goals />}/>
          <Route path="/social" element={<Social />}/>
          <Route path="/Progresstracker" element={<ProgressTracker />}/>
          <Route path="/workout" element={<Workout />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
