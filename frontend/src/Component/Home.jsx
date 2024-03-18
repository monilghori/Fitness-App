// import React from "react"
import { FeatureCard } from "./FeatureCard/FeatureCard";
import data from "../../features";
import "./home.css"

const Home = () => {
  return (
    <>
      <div className="outterr">
        <div className="welcome">
          <h1>Welcome to Brunel Fit</h1>
        </div>
        <div className="features">
          <h6>Features</h6>
          <h1>Features</h1>
          <div className="cards">
          {
            data.map((item) => {
              return <FeatureCard key={item.id} title={item.title} description={item.description} img={item.img} alt={item.alt}/>
            })
          }
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Home;
