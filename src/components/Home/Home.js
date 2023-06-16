import React from "react";
import Header from "../Navbar/Header";
import Video from "../Navbar/Video";
import "./Home.css";
import Navbar from '../Navbar2/Navbar'
import Feature from "../Feature/Feature";
import PropertyList from "../PropertyList/PropertyList";
import GuestLove from "../Guest/GeuestLove";

function Home() {
  return (
    <>
      <div className="home">
        {/* background will be here */}
        <Video />
        {/* header will be here */}
        <Header />
        <Navbar />
      </div>
      <div className="homeContainer">
        <Feature />
        {/* <Feature/> */}
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1>Homes guests love</h1>
        <GuestLove />  
      </div>
    </>
  );
}

export default Home;
